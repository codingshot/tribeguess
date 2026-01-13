import tribesData from '@/data/tribes.json';
import globalTribeNames from '@/data/globalTribeNames.json';
import { detectGlobalOrigin } from './globalOrigins';
import { 
  findPhoneticMatches, 
  trackHistoricalOrigins,
  soundex,
  metaphone,
  africanPhonetic,
  phoneticLevenshtein,
  type PhoneticMatch,
  type HistoricalOrigin
} from './phoneticMatching';

// Re-export phonetic functions for external use
export { 
  findPhoneticMatches, 
  trackHistoricalOrigins,
  soundex,
  metaphone,
  africanPhonetic,
  phoneticLevenshtein,
  type PhoneticMatch,
  type HistoricalOrigin
};

// Re-export full name analysis
export { 
  analyzeFullName, 
  isMuslimName,
  muslimNamePopularityByRegion,
  crossCulturalPatterns,
  type FullNameAnalysis,
  type CrossCulturalMatch,
  type ReligiousContext,
  type PopularityData
} from './fullNameAnalysis';

export interface NameBreakdown {
  fullName: string;
  prefix?: { text: string; tribes: { name: string; percentage: number }[] };
  suffix?: { text: string; tribes: { name: string; percentage: number }[] };
  root?: { text: string; meaning?: string };
  religiousIndicator?: { type: string; note: string };
  phoneticCode?: { soundex: string; metaphone: string; african: string };
}

export interface SimilarName {
  name: string;
  tribe: string;
  tribeSlug: string;
  similarity: number;
  matchType?: 'exact' | 'pattern' | 'phonetic' | 'fuzzy';
}

export interface GlobalMatch {
  origin: string;
  region: string;
  confidence: number;
}

interface PatternMatch {
  tribe: string;
  tribeName: string;
  weight: number;
}

// ============= OPTIMIZED PATTERN CACHE =============
// Pre-compute and cache all patterns at module load for O(1) lookups

// Cache for built patterns
let _prefixCache: Map<string, PatternMatch[]> | null = null;
let _suffixCache: Map<string, PatternMatch[]> | null = null;
let _prefixLengths: number[] | null = null;
let _suffixLengths: number[] | null = null;
let _nameToTribeCache: Map<string, { tribe: string; gender: 'male' | 'female' }> | null = null;

// Capitalize tribe name
const formatTribeName = (key: string): string => 
  key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

// Build prefix patterns from JSON - optimized with Map
function buildPrefixCache(): Map<string, PatternMatch[]> {
  if (_prefixCache) return _prefixCache;
  
  const cache = new Map<string, PatternMatch[]>();
  
  // Process all regions from JSON
  const regionData = globalTribeNames.prefixPatterns as Record<string, Record<string, { prefixes: string[]; weight: number }>>;
  
  for (const region of Object.values(regionData)) {
    for (const [tribeKey, data] of Object.entries(region)) {
      const tribeName = formatTribeName(tribeKey);
      const weight = data.weight;
      
      for (const prefix of data.prefixes) {
        const existing = cache.get(prefix);
        const match: PatternMatch = { tribe: tribeKey, tribeName, weight };
        
        if (existing) {
          // Only add if tribe doesn't exist
          if (!existing.some(m => m.tribe === tribeKey)) {
            existing.push(match);
          }
        } else {
          cache.set(prefix, [match]);
        }
      }
    }
  }
  
  _prefixCache = cache;
  return cache;
}

// Build suffix patterns from JSON - optimized with Map
function buildSuffixCache(): Map<string, PatternMatch[]> {
  if (_suffixCache) return _suffixCache;
  
  const cache = new Map<string, PatternMatch[]>();
  
  // Process all regions from JSON
  const regionData = globalTribeNames.suffixPatterns as Record<string, Record<string, { suffixes: string[]; weight: number }>>;
  
  for (const region of Object.values(regionData)) {
    for (const [tribeKey, data] of Object.entries(region)) {
      const tribeName = formatTribeName(tribeKey);
      const weight = data.weight;
      
      for (const suffix of data.suffixes) {
        const existing = cache.get(suffix);
        const match: PatternMatch = { tribe: tribeKey, tribeName, weight };
        
        if (existing) {
          if (!existing.some(m => m.tribe === tribeKey)) {
            existing.push(match);
          }
        } else {
          cache.set(suffix, [match]);
        }
      }
    }
  }
  
  _suffixCache = cache;
  return cache;
}

// Get sorted unique lengths for prefix matching (longest first)
function getPrefixLengths(): number[] {
  if (_prefixLengths) return _prefixLengths;
  
  const cache = buildPrefixCache();
  const lengths = new Set<number>();
  for (const prefix of cache.keys()) {
    lengths.add(prefix.length);
  }
  
  _prefixLengths = Array.from(lengths).sort((a, b) => b - a);
  return _prefixLengths;
}

// Get sorted unique lengths for suffix matching (longest first)
function getSuffixLengths(): number[] {
  if (_suffixLengths) return _suffixLengths;
  
  const cache = buildSuffixCache();
  const lengths = new Set<number>();
  for (const suffix of cache.keys()) {
    lengths.add(suffix.length);
  }
  
  _suffixLengths = Array.from(lengths).sort((a, b) => b - a);
  return _suffixLengths;
}

// Build name-to-tribe lookup cache for fast exact matches
function buildNameCache(): Map<string, { tribe: string; gender: 'male' | 'female' }> {
  if (_nameToTribeCache) return _nameToTribeCache;
  
  const cache = new Map<string, { tribe: string; gender: 'male' | 'female' }>();
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  
  for (const [tribe, names] of Object.entries(commonNames)) {
    for (const name of names.male) {
      cache.set(name.toLowerCase(), { tribe, gender: 'male' });
    }
    for (const name of names.female) {
      cache.set(name.toLowerCase(), { tribe, gender: 'female' });
    }
  }
  
  _nameToTribeCache = cache;
  return cache;
}

// Religious patterns from JSON - cached references
const islamicPrefixes = globalTribeNames.religiousPatterns.islamic.prefixes;
const islamicSuffixes = globalTribeNames.religiousPatterns.islamic.suffixes;
const christianIndicators = globalTribeNames.religiousPatterns.christian.prefixes;

// Pre-build Set for O(1) religious lookups
const islamicPrefixSet = new Set(islamicPrefixes);
const islamicSuffixSet = new Set(islamicSuffixes);
const christianIndicatorSet = new Set(christianIndicators);

/**
 * Get all names from the global tribe names index
 */
export function getAllTribeNamesIndex(): Record<string, { male: string[]; female: string[] }> {
  return globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
}

/**
 * Fast exact name lookup - O(1)
 */
export function lookupExactName(name: string): { tribe: string; gender: 'male' | 'female' } | null {
  const cache = buildNameCache();
  return cache.get(name.toLowerCase()) || null;
}

/**
 * Search the global tribe names index - optimized with cached Map
 */
export function searchGlobalTribeNames(query: string): { name: string; tribe: string; gender: 'male' | 'female' }[] {
  const normalizedQuery = query.toLowerCase();
  const results: { name: string; tribe: string; gender: 'male' | 'female' }[] = [];
  
  // First check exact match
  const exactMatch = lookupExactName(normalizedQuery);
  if (exactMatch) {
    // Find the actual casing
    const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
    const names = commonNames[exactMatch.tribe];
    const nameList = exactMatch.gender === 'male' ? names.male : names.female;
    const originalName = nameList.find(n => n.toLowerCase() === normalizedQuery) || query;
    results.push({ name: originalName, tribe: exactMatch.tribe, gender: exactMatch.gender });
  }
  
  // Then do substring search for partial matches
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  
  for (const [tribe, names] of Object.entries(commonNames)) {
    for (const name of names.male) {
      const nameLower = name.toLowerCase();
      if (nameLower !== normalizedQuery && nameLower.includes(normalizedQuery)) {
        results.push({ name, tribe, gender: 'male' });
      }
    }
    for (const name of names.female) {
      const nameLower = name.toLowerCase();
      if (nameLower !== normalizedQuery && nameLower.includes(normalizedQuery)) {
        results.push({ name, tribe, gender: 'female' });
      }
    }
  }
  
  return results;
}

/**
 * Analyze a name and break it down into components - optimized
 */
export function analyzeNameBreakdown(name: string): NameBreakdown {
  const normalized = name.toLowerCase().trim().replace(/['-]/g, '');
  const breakdown: NameBreakdown = { fullName: name };
  
  const prefixCache = buildPrefixCache();
  const suffixCache = buildSuffixCache();
  const prefixLengths = getPrefixLengths();
  const suffixLengths = getSuffixLengths();
  
  // Find matching prefix - iterate by length (longest first)
  for (const len of prefixLengths) {
    if (len > normalized.length) continue;
    
    const prefix = normalized.slice(0, len);
    const matches = prefixCache.get(prefix);
    
    if (matches) {
      breakdown.prefix = {
        text: name.slice(0, len).toUpperCase(),
        tribes: matches.map(m => ({ name: m.tribeName, percentage: Math.round(m.weight * 100) }))
      };
      break;
    }
  }
  
  // Find matching suffix - iterate by length (longest first)
  for (const len of suffixLengths) {
    if (len > normalized.length) continue;
    
    const suffix = normalized.slice(-len);
    const matches = suffixCache.get(suffix);
    
    if (matches) {
      breakdown.suffix = {
        text: name.slice(-len).toUpperCase(),
        tribes: matches.map(m => ({ name: m.tribeName, percentage: Math.round(m.weight * 100) }))
      };
      break;
    }
  }
  
  // Extract root (middle part)
  if (breakdown.prefix || breakdown.suffix) {
    const prefixLen = breakdown.prefix?.text.length || 0;
    const suffixLen = breakdown.suffix?.text.length || 0;
    const rootText = name.slice(prefixLen, name.length - suffixLen);
    if (rootText.length > 0) {
      breakdown.root = { text: rootText.toLowerCase() };
    }
  } else {
    breakdown.root = { text: normalized };
  }
  
  // Check for religious indicators using Set for O(1) lookup
  for (const prefix of islamicPrefixSet) {
    if (normalized.startsWith(prefix)) {
      breakdown.religiousIndicator = { 
        type: 'Islamic origin', 
        note: `"${prefix}" prefix indicates Arabic/Islamic naming tradition` 
      };
      break;
    }
  }
  
  if (!breakdown.religiousIndicator) {
    for (const suffix of islamicSuffixSet) {
      if (normalized.endsWith(suffix)) {
        breakdown.religiousIndicator = { 
          type: 'Islamic origin', 
          note: `"${suffix}" suffix means "of Allah/God"` 
        };
        break;
      }
    }
  }
  
  if (!breakdown.religiousIndicator) {
    for (const word of christianIndicatorSet) {
      if (normalized.includes(word)) {
        breakdown.religiousIndicator = { 
          type: 'Christian origin', 
          note: 'This name reflects Christian virtue/Biblical influence' 
        };
        break;
      }
    }
  }
  
  // Add phonetic codes to breakdown
  breakdown.phoneticCode = {
    soundex: soundex(name),
    metaphone: metaphone(name),
    african: africanPhonetic(name)
  };
  
  return breakdown;
}

/**
 * Find similar names using multiple matching strategies - optimized
 * Combines: exact prefix/suffix, phonetic algorithms, and fuzzy matching
 */
export function findSimilarNames(inputName: string, limit: number = 8): SimilarName[] {
  const normalized = inputName.toLowerCase().trim();
  const similarNames: SimilarName[] = [];
  const seen = new Set<string>();
  const minSimilarity = 0.35;
  
  // 1. EXACT PATTERN MATCHES - fastest path
  const nameCache = buildNameCache();
  for (const [cachedName, info] of nameCache) {
    if (cachedName === normalized || seen.has(cachedName)) continue;
    
    const similarity = calculateSimilarityFast(normalized, cachedName);
    if (similarity > minSimilarity) {
      const tribe = tribesData.tribes.find(t => t.id === info.tribe || t.name.toLowerCase() === info.tribe);
      if (tribe) {
        seen.add(cachedName);
        similarNames.push({
          name: cachedName.charAt(0).toUpperCase() + cachedName.slice(1),
          tribe: tribe.name,
          tribeSlug: tribe.slug || tribe.id,
          similarity,
          matchType: 'pattern'
        });
      }
    }
  }
  
  // 2. PHONETIC MATCHES - finds spelling variations
  const phoneticMatches = findPhoneticMatches(inputName, Math.max(5, limit - similarNames.length));
  for (const match of phoneticMatches) {
    const nameLower = match.name.toLowerCase();
    if (nameLower === normalized || seen.has(nameLower)) continue;
    
    const tribe = tribesData.tribes.find(t => 
      t.id === match.tribe || 
      t.name.toLowerCase() === match.tribe.toLowerCase()
    );
    
    if (tribe) {
      seen.add(nameLower);
      similarNames.push({
        name: match.name,
        tribe: tribe.name,
        tribeSlug: tribe.slug || tribe.id,
        similarity: match.similarity,
        matchType: 'phonetic'
      });
    }
  }
  
  // 3. TRIBES.JSON BACKUP - for names not in globalTribeNames
  if (similarNames.length < limit) {
    for (const tribe of tribesData.tribes) {
      const allNames = [
        ...(tribe.commonNames?.female || []),
        ...(tribe.commonNames?.male || [])
      ];
      
      for (const name of allNames) {
        const nameLower = name.toLowerCase();
        if (nameLower === normalized || seen.has(nameLower)) continue;
        
        // Use phonetic Levenshtein for better fuzzy matching
        const similarity = phoneticLevenshtein(normalized, nameLower);
        if (similarity > minSimilarity) {
          seen.add(nameLower);
          similarNames.push({
            name,
            tribe: tribe.name,
            tribeSlug: tribe.slug || tribe.id,
            similarity,
            matchType: 'fuzzy'
          });
        }
      }
    }
  }
  
  // Sort by similarity and return top results
  return similarNames
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Get historical origin tracking for a name
 */
export function getHistoricalOrigins(inputName: string): HistoricalOrigin[] {
  return trackHistoricalOrigins(inputName);
}

/**
 * Get global origin matches for a name
 */
export function getGlobalMatches(inputName: string): GlobalMatch[] {
  const result = detectGlobalOrigin(inputName);
  
  if (!result.origins || result.origins.length === 0) {
    return [];
  }
  
  return result.origins.slice(0, 3).map(origin => ({
    origin: origin.name,
    region: origin.region,
    confidence: Math.round(result.confidence)
  }));
}

/**
 * Fast similarity calculation - optimized for speed
 */
function calculateSimilarityFast(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0 || len2 === 0) return 0;
  
  // Quick length-based early exit
  const lenDiff = Math.abs(len1 - len2);
  const maxLen = Math.max(len1, len2);
  if (lenDiff / maxLen > 0.6) return 0; // Too different in length
  
  // Common prefix (fast path)
  let commonPrefix = 0;
  const minLen = Math.min(len1, len2);
  for (let i = 0; i < minLen; i++) {
    if (str1[i] === str2[i]) commonPrefix++;
    else break;
  }
  
  // If names start identically for 3+ chars, boost similarity
  if (commonPrefix >= 3) {
    return 0.5 + (commonPrefix / maxLen) * 0.5;
  }
  
  // Common suffix
  let commonSuffix = 0;
  for (let i = 0; i < minLen - commonPrefix; i++) {
    if (str1[len1 - 1 - i] === str2[len2 - 1 - i]) commonSuffix++;
    else break;
  }
  
  // If names end identically for 3+ chars, boost
  if (commonSuffix >= 3) {
    return 0.4 + (commonSuffix / maxLen) * 0.5;
  }
  
  // Combined metric
  const commonChars = commonPrefix + commonSuffix;
  return (commonChars / maxLen) * 0.7 + (1 - lenDiff / maxLen) * 0.3;
}

/**
 * Full Levenshtein distance - used only when needed
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  if (m === 0) return n;
  if (n === 0) return m;
  
  // Use single row optimization for memory efficiency
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  
  for (let j = 0; j <= n; j++) prev[j] = j;
  
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,      // deletion
        curr[j - 1] + 1,  // insertion
        prev[j - 1] + cost // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }
  
  return prev[n];
}
