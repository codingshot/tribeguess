/**
 * Optimized Search Engine with Inverted Index and Fuzzy Matching
 * Provides fast O(1) lookups with fallback to fuzzy search
 */

import tribesData from '@/data/tribes.json';
import globalTribeNames from '@/data/globalTribeNames.json';
import { soundex, metaphone, africanPhonetic } from './phoneticMatching';
import { normalizeForSearch } from './dataValidation';

// Types
export interface SearchResult {
  id: string;
  name: string;
  type: 'tribe' | 'name' | 'recipe' | 'blog';
  tribe?: string;
  tribeSlug?: string;
  gender?: 'male' | 'female';
  score: number;
  matchType: 'exact' | 'prefix' | 'phonetic' | 'fuzzy' | 'ngram';
}

interface IndexEntry {
  id: string;
  name: string;
  tribe?: string;
  tribeSlug?: string;
  gender?: 'male' | 'female';
  type: 'tribe' | 'name';
}

// ============= INVERTED INDEX =============
// Pre-built at module load for O(1) lookups

let _exactIndex: Map<string, IndexEntry[]> | null = null;
let _prefixIndex: Map<string, IndexEntry[]> | null = null;
let _phoneticIndex: Map<string, IndexEntry[]> | null = null;
let _ngramIndex: Map<string, Set<string>> | null = null;
let _allEntries: IndexEntry[] | null = null;

/**
 * Build the exact match index - O(1) lookups
 */
function buildExactIndex(): Map<string, IndexEntry[]> {
  if (_exactIndex) return _exactIndex;
  
  const index = new Map<string, IndexEntry[]>();
  const entries = getAllEntries();
  
  for (const entry of entries) {
    const key = entry.name.toLowerCase();
    const existing = index.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      index.set(key, [entry]);
    }
  }
  
  _exactIndex = index;
  return index;
}

/**
 * Build prefix index for autocomplete - grouped by 2-4 char prefixes
 */
function buildPrefixIndex(): Map<string, IndexEntry[]> {
  if (_prefixIndex) return _prefixIndex;
  
  const index = new Map<string, IndexEntry[]>();
  const entries = getAllEntries();
  
  for (const entry of entries) {
    const name = entry.name.toLowerCase();
    
    // Index by 2, 3, and 4 character prefixes
    for (let len = 2; len <= Math.min(4, name.length); len++) {
      const prefix = name.slice(0, len);
      const existing = index.get(prefix);
      if (existing) {
        existing.push(entry);
      } else {
        index.set(prefix, [entry]);
      }
    }
  }
  
  _prefixIndex = index;
  return index;
}

/**
 * Build phonetic index using multiple algorithms
 */
function buildPhoneticIndex(): Map<string, IndexEntry[]> {
  if (_phoneticIndex) return _phoneticIndex;
  
  const index = new Map<string, IndexEntry[]>();
  const entries = getAllEntries();
  
  for (const entry of entries) {
    // Index by all three phonetic codes
    const codes = [
      `s:${soundex(entry.name)}`,
      `m:${metaphone(entry.name)}`,
      `a:${africanPhonetic(entry.name)}`
    ];
    
    for (const code of codes) {
      const existing = index.get(code);
      if (existing) {
        existing.push(entry);
      } else {
        index.set(code, [entry]);
      }
    }
  }
  
  _phoneticIndex = index;
  return index;
}

/**
 * Build n-gram index for fuzzy substring matching
 */
function buildNgramIndex(): Map<string, Set<string>> {
  if (_ngramIndex) return _ngramIndex;
  
  const index = new Map<string, Set<string>>();
  const entries = getAllEntries();
  
  for (const entry of entries) {
    const name = entry.name.toLowerCase();
    const ngrams = getNgrams(name, 3);
    
    for (const ngram of ngrams) {
      const existing = index.get(ngram);
      if (existing) {
        existing.add(name);
      } else {
        index.set(ngram, new Set([name]));
      }
    }
  }
  
  _ngramIndex = index;
  return index;
}

/**
 * Get all searchable entries
 */
function getAllEntries(): IndexEntry[] {
  if (_allEntries) return _allEntries;
  
  const entries: IndexEntry[] = [];
  
  // Add tribes
  for (const tribe of tribesData.tribes) {
    entries.push({
      id: tribe.id,
      name: tribe.name,
      tribeSlug: tribe.slug || tribe.id,
      type: 'tribe'
    });
  }
  
  // Add names from globalTribeNames
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  for (const [tribeId, names] of Object.entries(commonNames)) {
    const tribe = tribesData.tribes.find(t => t.id === tribeId || t.name.toLowerCase() === tribeId);
    const tribeName = tribe?.name || tribeId;
    const tribeSlug = tribe?.slug || tribe?.id || tribeId;
    
    for (const name of names.male) {
      entries.push({
        id: `${tribeId}-${name}`,
        name,
        tribe: tribeName,
        tribeSlug,
        gender: 'male',
        type: 'name'
      });
    }
    
    for (const name of names.female) {
      entries.push({
        id: `${tribeId}-${name}`,
        name,
        tribe: tribeName,
        tribeSlug,
        gender: 'female',
        type: 'name'
      });
    }
  }
  
  _allEntries = entries;
  return entries;
}

/**
 * Generate n-grams from a string
 */
function getNgrams(str: string, n: number): string[] {
  const ngrams: string[] = [];
  const padded = `  ${str}  `; // Pad for edge n-grams
  
  for (let i = 0; i <= padded.length - n; i++) {
    ngrams.push(padded.slice(i, i + n));
  }
  
  return ngrams;
}

/**
 * Calculate Jaccard similarity between two n-gram sets
 */
function jaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

/**
 * Fast Levenshtein distance with early termination
 */
function levenshteinFast(s1: string, s2: string, maxDist: number = 3): number {
  const len1 = s1.length;
  const len2 = s2.length;
  
  // Quick length check
  if (Math.abs(len1 - len2) > maxDist) return maxDist + 1;
  
  // Use single-row optimization
  let prev = Array.from({ length: len2 + 1 }, (_, i) => i);
  let curr = new Array(len2 + 1);
  
  for (let i = 1; i <= len1; i++) {
    curr[0] = i;
    let minVal = i;
    
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,      // deletion
        curr[j - 1] + 1,  // insertion
        prev[j - 1] + cost // substitution
      );
      minVal = Math.min(minVal, curr[j]);
    }
    
    // Early termination if min exceeds threshold
    if (minVal > maxDist) return maxDist + 1;
    
    [prev, curr] = [curr, prev];
  }
  
  return prev[len2];
}

/**
 * Main search function - uses tiered approach for speed
 */
export function searchNames(query: string, limit: number = 20): SearchResult[] {
  const normalized = normalizeForSearch(query);
  if (normalized.length < 1) return [];
  
  const results: SearchResult[] = [];
  const seen = new Set<string>();
  
  // TIER 1: Exact match (O(1))
  const exactIndex = buildExactIndex();
  const exactMatches = exactIndex.get(normalized);
  if (exactMatches) {
    for (const entry of exactMatches) {
      if (!seen.has(entry.id)) {
        seen.add(entry.id);
        results.push({
          ...entry,
          score: 1.0,
          matchType: 'exact'
        });
      }
    }
  }
  
  // TIER 2: Prefix match (O(1))
  if (results.length < limit && normalized.length >= 2) {
    const prefixIndex = buildPrefixIndex();
    const prefixLen = Math.min(4, normalized.length);
    const prefix = normalized.slice(0, prefixLen);
    const prefixMatches = prefixIndex.get(prefix);
    
    if (prefixMatches) {
      for (const entry of prefixMatches) {
        if (!seen.has(entry.id) && entry.name.toLowerCase().startsWith(normalized)) {
          seen.add(entry.id);
          results.push({
            ...entry,
            score: 0.9 - (entry.name.length - normalized.length) * 0.01,
            matchType: 'prefix'
          });
        }
      }
    }
  }
  
  // TIER 3: Phonetic match (O(1))
  if (results.length < limit) {
    const phoneticIndex = buildPhoneticIndex();
    const queryCodes = [
      `s:${soundex(normalized)}`,
      `m:${metaphone(normalized)}`,
      `a:${africanPhonetic(normalized)}`
    ];
    
    for (const code of queryCodes) {
      const matches = phoneticIndex.get(code);
      if (matches) {
        for (const entry of matches) {
          if (!seen.has(entry.id)) {
            seen.add(entry.id);
            results.push({
              ...entry,
              score: 0.75,
              matchType: 'phonetic'
            });
          }
        }
      }
    }
  }
  
  // TIER 4: N-gram fuzzy match (for typos)
  if (results.length < limit && normalized.length >= 3) {
    const ngramIndex = buildNgramIndex();
    const queryNgrams = new Set(getNgrams(normalized, 3));
    const candidates = new Map<string, number>();
    
    // Find candidates that share n-grams
    for (const ngram of queryNgrams) {
      const matches = ngramIndex.get(ngram);
      if (matches) {
        for (const name of matches) {
          candidates.set(name, (candidates.get(name) || 0) + 1);
        }
      }
    }
    
    // Score candidates by Jaccard similarity
    const exactIndex = buildExactIndex();
    for (const [name, count] of candidates) {
      // Skip if too few shared n-grams
      if (count < 2) continue;
      
      const entries = exactIndex.get(name);
      if (!entries) continue;
      
      for (const entry of entries) {
        if (seen.has(entry.id)) continue;
        
        const nameNgrams = new Set(getNgrams(name, 3));
        const similarity = jaccardSimilarity(queryNgrams, nameNgrams);
        
        if (similarity > 0.3) {
          seen.add(entry.id);
          results.push({
            ...entry,
            score: similarity * 0.6,
            matchType: 'ngram'
          });
        }
      }
    }
  }
  
  // TIER 5: Levenshtein fallback (expensive, limited)
  if (results.length < limit && normalized.length >= 2) {
    const allEntries = getAllEntries();
    const remaining = limit - results.length;
    const fuzzyResults: Array<{ entry: IndexEntry; distance: number }> = [];
    
    for (const entry of allEntries) {
      if (seen.has(entry.id)) continue;
      
      const distance = levenshteinFast(normalized, entry.name.toLowerCase(), 2);
      if (distance <= 2) {
        fuzzyResults.push({ entry, distance });
        if (fuzzyResults.length >= remaining * 2) break;
      }
    }
    
    // Sort by distance and add top results
    fuzzyResults.sort((a, b) => a.distance - b.distance);
    for (const { entry, distance } of fuzzyResults.slice(0, remaining)) {
      seen.add(entry.id);
      results.push({
        ...entry,
        score: 0.5 - distance * 0.1,
        matchType: 'fuzzy'
      });
    }
  }
  
  // Sort by score and return
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get search suggestions for autocomplete
 */
export function getSearchSuggestions(prefix: string, limit: number = 8): string[] {
  const normalized = prefix.toLowerCase().trim();
  if (normalized.length < 2) return [];
  
  const prefixIndex = buildPrefixIndex();
  const prefixLen = Math.min(4, normalized.length);
  const key = normalized.slice(0, prefixLen);
  const matches = prefixIndex.get(key);
  
  if (!matches) return [];
  
  const suggestions = new Set<string>();
  for (const entry of matches) {
    if (entry.name.toLowerCase().startsWith(normalized)) {
      suggestions.add(entry.name);
      if (suggestions.size >= limit) break;
    }
  }
  
  return Array.from(suggestions);
}

/**
 * Pre-warm all indexes (call on app load)
 */
export function warmSearchIndexes(): void {
  buildExactIndex();
  buildPrefixIndex();
  buildPhoneticIndex();
  buildNgramIndex();
}

/**
 * Get index statistics for debugging
 */
export function getIndexStats(): {
  totalEntries: number;
  exactIndexSize: number;
  prefixIndexSize: number;
  phoneticIndexSize: number;
  ngramIndexSize: number;
} {
  return {
    totalEntries: getAllEntries().length,
    exactIndexSize: buildExactIndex().size,
    prefixIndexSize: buildPrefixIndex().size,
    phoneticIndexSize: buildPhoneticIndex().size,
    ngramIndexSize: buildNgramIndex().size
  };
}
