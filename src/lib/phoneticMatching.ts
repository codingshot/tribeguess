/**
 * Phonetic Matching Algorithms for African Name Detection
 * Optimized for speed with pre-computed caches
 * 
 * Implements: Soundex, Metaphone, African-specific patterns, N-gram matching
 */

import globalTribeNames from '@/data/globalTribeNames.json';

// ============= CACHES FOR O(1) LOOKUPS =============
let _soundexCache: Map<string, string> | null = null;
let _metaphoneCache: Map<string, string> | null = null;
let _africanPhoneticCache: Map<string, string> | null = null;
let _trigramIndex: Map<string, Set<string>> | null = null;
let _nameToPhoneticMap: Map<string, { soundex: string; metaphone: string; african: string }> | null = null;

// ============= SOUNDEX ALGORITHM =============
// Classic Soundex with optimizations for speed

const SOUNDEX_MAP: Record<string, string> = {
  'b': '1', 'f': '1', 'p': '1', 'v': '1',
  'c': '2', 'g': '2', 'j': '2', 'k': '2', 'q': '2', 's': '2', 'x': '2', 'z': '2',
  'd': '3', 't': '3',
  'l': '4',
  'm': '5', 'n': '5',
  'r': '6',
  // Vowels and h, w, y are ignored
};

export function soundex(str: string): string {
  if (!str || str.length === 0) return '';
  
  const normalized = str.toLowerCase().replace(/[^a-z]/g, '');
  if (normalized.length === 0) return '';
  
  // First letter is kept
  let result = normalized[0].toUpperCase();
  let prevCode = SOUNDEX_MAP[normalized[0]] || '';
  
  for (let i = 1; i < normalized.length && result.length < 4; i++) {
    const code = SOUNDEX_MAP[normalized[i]];
    if (code && code !== prevCode) {
      result += code;
      prevCode = code;
    } else if (!code) {
      prevCode = ''; // Reset after vowel/h/w/y
    }
  }
  
  // Pad with zeros
  return (result + '000').slice(0, 4);
}

// ============= METAPHONE ALGORITHM =============
// Double Metaphone simplified for African names

const METAPHONE_RULES: Array<[RegExp, string, number]> = [
  // African-specific consonant clusters
  [/^(nk|ng|nd|mb|mp|nt|ny|dj|tj|ts|tz)/i, '$1', 2],
  [/^(kw|gw|bw|pw|sw|zw|ch|sh|th|wh)/i, '$1', 2],
  
  // Standard rules
  [/^x/i, 'S', 1],
  [/^wr/i, 'R', 2],
  [/^wh/i, 'W', 2],
  [/^w([aeiou])/i, 'W', 1],
  [/^w/i, '', 1],
  [/^kn/i, 'N', 2],
  [/^gn/i, 'N', 2],
  [/^pn/i, 'N', 2],
  [/^ae/i, 'E', 2],
  [/^([aeiou])/i, '$1', 1],
  
  // Consonants
  [/^b/i, 'P', 1],
  [/^c([iey])/i, 'S', 1],
  [/^c([kq])/i, 'K', 2],
  [/^c/i, 'K', 1],
  [/^d([ge])/i, 'J', 1],
  [/^d/i, 'T', 1],
  [/^f/i, 'F', 1],
  [/^g([iey])/i, 'J', 1],
  [/^gh([^aeiou]|$)/i, '', 2],
  [/^g/i, 'K', 1],
  [/^h([aeiou])/i, 'H', 1],
  [/^h/i, '', 1],
  [/^j/i, 'J', 1],
  [/^k/i, 'K', 1],
  [/^l/i, 'L', 1],
  [/^m/i, 'M', 1],
  [/^n/i, 'N', 1],
  [/^p([h])/i, 'F', 2],
  [/^p/i, 'P', 1],
  [/^q/i, 'K', 1],
  [/^r/i, 'R', 1],
  [/^s([ch])/i, 'X', 2],
  [/^s/i, 'S', 1],
  [/^t([ioa])/i, 'X', 1],
  [/^t([h])/i, '0', 2], // 0 for TH
  [/^t/i, 'T', 1],
  [/^v/i, 'F', 1],
  [/^w([aeiou])/i, 'W', 1],
  [/^w/i, '', 1],
  [/^x/i, 'KS', 1],
  [/^y([aeiou])/i, 'Y', 1],
  [/^y/i, '', 1],
  [/^z/i, 'S', 1],
];

export function metaphone(str: string): string {
  if (!str || str.length === 0) return '';
  
  let normalized = str.toLowerCase().replace(/[^a-z]/g, '');
  if (normalized.length === 0) return '';
  
  let result = '';
  let pos = 0;
  
  while (pos < normalized.length && result.length < 6) {
    const remaining = normalized.slice(pos);
    let matched = false;
    
    for (const [pattern, replacement, advance] of METAPHONE_RULES) {
      const match = remaining.match(pattern);
      if (match) {
        if (replacement) {
          result += replacement.replace('$1', match[1] || '').toUpperCase();
        }
        pos += advance;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      pos++;
    }
  }
  
  return result.slice(0, 6);
}

// ============= AFRICAN-SPECIFIC PHONETIC ALGORITHM =============
// Handles click consonants, tone markers, and African phoneme clusters

const AFRICAN_PHONEME_MAP: Record<string, string> = {
  // Click consonants (Khoisan, Nguni)
  'x': 'K', 'q': 'K', 'c': 'K',
  
  // Labial consonants
  'mb': 'M', 'mp': 'M', 'mv': 'M',
  
  // Nasal clusters  
  'ng': 'N', 'nk': 'NK', 'nd': 'NT', 'nt': 'NT', 'ny': 'NY', 'nj': 'NJ',
  
  // Aspirates (kh maps to H for Semitic, others preserved)
  'ph': 'P', 'th': 'T', 'kh': 'H', 'ch': 'C', 'sh': 'S', 'gh': 'G',
  
  // Double consonants (simplify)
  'bb': 'B', 'dd': 'D', 'gg': 'G', 'kk': 'K', 'll': 'L', 'mm': 'M', 'nn': 'N', 'pp': 'P', 'rr': 'R', 'ss': 'S', 'tt': 'T',
  
  // Vowel harmonization
  'aa': 'A', 'ee': 'E', 'ii': 'I', 'oo': 'O', 'uu': 'U',
  
  // Swahili/Bantu clusters
  'dz': 'J', 'dj': 'J', 'tj': 'C', 'ts': 'S', 'tz': 'S',
  
  // Apostrophe removal
  "'": '',
};

// Sorted by length for longest-first matching
const AFRICAN_PATTERNS = Object.keys(AFRICAN_PHONEME_MAP).sort((a, b) => b.length - a.length);

export function africanPhonetic(str: string): string {
  if (!str || str.length === 0) return '';
  
  let normalized = str.toLowerCase().replace(/[^a-z'-]/g, '');
  if (normalized.length === 0) return '';
  
  // Apply African phoneme mappings
  for (const pattern of AFRICAN_PATTERNS) {
    normalized = normalized.split(pattern).join(AFRICAN_PHONEME_MAP[pattern]);
  }
  
  // Remove remaining special chars and simplify
  let result = '';
  let prevChar = '';
  
  for (const char of normalized.toUpperCase()) {
    if (/[A-Z]/.test(char) && char !== prevChar) {
      result += char;
      prevChar = char;
    }
  }
  
  return result.slice(0, 8);
}

// ============= N-GRAM / TRIGRAM MATCHING =============
// For fuzzy substring matching

function getTrigrams(str: string): string[] {
  const normalized = str.toLowerCase().replace(/[^a-z]/g, '');
  if (normalized.length < 3) return [normalized];
  
  const trigrams: string[] = [];
  for (let i = 0; i <= normalized.length - 3; i++) {
    trigrams.push(normalized.slice(i, i + 3));
  }
  return trigrams;
}

function buildTrigramIndex(): Map<string, Set<string>> {
  if (_trigramIndex) return _trigramIndex;
  
  const index = new Map<string, Set<string>>();
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  
  for (const [tribe, names] of Object.entries(commonNames)) {
    for (const name of [...names.male, ...names.female]) {
      const trigrams = getTrigrams(name);
      for (const trigram of trigrams) {
        const existing = index.get(trigram);
        if (existing) {
          existing.add(`${name.toLowerCase()}:${tribe}`);
        } else {
          index.set(trigram, new Set([`${name.toLowerCase()}:${tribe}`]));
        }
      }
    }
  }
  
  _trigramIndex = index;
  return index;
}

// ============= BUILD PHONETIC INDEX =============
// Pre-compute all phonetic codes for fast lookup

function buildPhoneticIndex(): Map<string, { soundex: string; metaphone: string; african: string }> {
  if (_nameToPhoneticMap) return _nameToPhoneticMap;
  
  const map = new Map<string, { soundex: string; metaphone: string; african: string }>();
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  
  for (const names of Object.values(commonNames)) {
    for (const name of [...names.male, ...names.female]) {
      const key = name.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          soundex: soundex(name),
          metaphone: metaphone(name),
          african: africanPhonetic(name)
        });
      }
    }
  }
  
  _nameToPhoneticMap = map;
  return map;
}

// ============= PUBLIC MATCHING FUNCTIONS =============

export interface PhoneticMatch {
  name: string;
  tribe: string;
  matchType: 'soundex' | 'metaphone' | 'african' | 'trigram';
  similarity: number;
}

/**
 * Find phonetically similar names using all algorithms
 */
export function findPhoneticMatches(inputName: string, limit: number = 10): PhoneticMatch[] {
  const inputLower = inputName.toLowerCase();
  const inputSoundex = soundex(inputName);
  const inputMetaphone = metaphone(inputName);
  const inputAfrican = africanPhonetic(inputName);
  
  const phoneticIndex = buildPhoneticIndex();
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  const matches: PhoneticMatch[] = [];
  const seen = new Set<string>();
  
  // Check each name in the index
  for (const [tribe, names] of Object.entries(commonNames)) {
    for (const name of [...names.male, ...names.female]) {
      const key = name.toLowerCase();
      if (key === inputLower || seen.has(key)) continue;
      seen.add(key);
      
      const codes = phoneticIndex.get(key);
      if (!codes) continue;
      
      // Soundex match (exact code match)
      if (codes.soundex === inputSoundex) {
        matches.push({ name, tribe, matchType: 'soundex', similarity: 0.9 });
        continue;
      }
      
      // Metaphone match (exact or prefix)
      if (codes.metaphone === inputMetaphone) {
        matches.push({ name, tribe, matchType: 'metaphone', similarity: 0.85 });
        continue;
      }
      if (codes.metaphone.startsWith(inputMetaphone.slice(0, 3)) || inputMetaphone.startsWith(codes.metaphone.slice(0, 3))) {
        matches.push({ name, tribe, matchType: 'metaphone', similarity: 0.7 });
        continue;
      }
      
      // African phonetic match
      if (codes.african === inputAfrican) {
        matches.push({ name, tribe, matchType: 'african', similarity: 0.88 });
        continue;
      }
      const africanSim = calculateCodeSimilarity(codes.african, inputAfrican);
      if (africanSim > 0.6) {
        matches.push({ name, tribe, matchType: 'african', similarity: africanSim });
      }
    }
  }
  
  // Trigram-based fuzzy matching for remaining slots
  if (matches.length < limit) {
    const trigramIndex = buildTrigramIndex();
    const inputTrigrams = getTrigrams(inputName);
    const candidateScores = new Map<string, number>();
    
    for (const trigram of inputTrigrams) {
      const candidates = trigramIndex.get(trigram);
      if (candidates) {
        for (const candidate of candidates) {
          const current = candidateScores.get(candidate) || 0;
          candidateScores.set(candidate, current + 1);
        }
      }
    }
    
    // Calculate Jaccard-like similarity
    const totalTrigrams = inputTrigrams.length;
    for (const [candidate, count] of candidateScores) {
      const [name, tribe] = candidate.split(':');
      if (seen.has(name)) continue;
      
      const candidateTrigrams = getTrigrams(name);
      const union = new Set([...inputTrigrams, ...candidateTrigrams]).size;
      const similarity = count / union;
      
      if (similarity > 0.3) {
        const originalName = findOriginalCasing(name, commonNames);
        matches.push({ 
          name: originalName || name, 
          tribe, 
          matchType: 'trigram', 
          similarity: Math.min(similarity + 0.2, 0.75) // Boost but cap
        });
      }
    }
  }
  
  return matches
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Calculate similarity between two phonetic codes
 */
function calculateCodeSimilarity(code1: string, code2: string): number {
  if (code1 === code2) return 1;
  if (!code1 || !code2) return 0;
  
  const maxLen = Math.max(code1.length, code2.length);
  let matches = 0;
  
  // Count matching characters at same positions
  const minLen = Math.min(code1.length, code2.length);
  for (let i = 0; i < minLen; i++) {
    if (code1[i] === code2[i]) matches++;
  }
  
  // Penalize length difference
  const lenPenalty = 1 - (Math.abs(code1.length - code2.length) / maxLen);
  
  return (matches / maxLen) * 0.7 + lenPenalty * 0.3;
}

/**
 * Find original casing for a name
 */
function findOriginalCasing(
  nameLower: string, 
  commonNames: Record<string, { male: string[]; female: string[] }>
): string | null {
  for (const names of Object.values(commonNames)) {
    for (const name of [...names.male, ...names.female]) {
      if (name.toLowerCase() === nameLower) return name;
    }
  }
  return null;
}

// ============= LEVENSHTEIN WITH PHONETIC BOOST =============

/**
 * Enhanced Levenshtein that considers phonetic similarity
 */
export function phoneticLevenshtein(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1;
  
  const m = s1.length;
  const n = s2.length;
  
  if (m === 0 || n === 0) return 0;
  
  // Standard Levenshtein with transposition
  const d: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // Cost: 0 if same, reduced if phonetically similar
      let cost = s1[i-1] === s2[j-1] ? 0 : 1;
      
      // Reduce cost for phonetically similar characters
      if (cost === 1 && arePhoneticallySimilar(s1[i-1], s2[j-1])) {
        cost = 0.5;
      }
      
      d[i][j] = Math.min(
        d[i-1][j] + 1,     // deletion
        d[i][j-1] + 1,     // insertion
        d[i-1][j-1] + cost // substitution
      );
      
      // Transposition (Damerau-Levenshtein)
      if (i > 1 && j > 1 && s1[i-1] === s2[j-2] && s1[i-2] === s2[j-1]) {
        d[i][j] = Math.min(d[i][j], d[i-2][j-2] + cost);
      }
    }
  }
  
  const maxLen = Math.max(m, n);
  return 1 - (d[m][n] / maxLen);
}

// Phonetically similar character pairs
const PHONETIC_PAIRS: Set<string> = new Set([
  'bp', 'pb', 'dt', 'td', 'gk', 'kg', 'sz', 'zs', 'fv', 'vf',
  'mn', 'nm', 'iy', 'yi', 'ou', 'uo', 'ae', 'ea', 'ck', 'kc',
  'cq', 'qc', 'ks', 'sk', 'cs', 'sc', 'jg', 'gj', 'xs', 'sx'
]);

function arePhoneticallySimilar(c1: string, c2: string): boolean {
  return PHONETIC_PAIRS.has(c1 + c2);
}

// ============= HISTORICAL ORIGIN TRACKING =============

export interface HistoricalOrigin {
  name: string;
  tribe: string;
  originRegion: string;
  migrationPath?: string[];
  timePeriod?: string;
  confidence: number;
}

/**
 * Track historical origins of names across migrations
 */
export function trackHistoricalOrigins(inputName: string): HistoricalOrigin[] {
  const origins: HistoricalOrigin[] = [];
  const phoneticMatches = findPhoneticMatches(inputName, 20);
  
  // Group by tribe to find migration patterns
  const tribeMatches = new Map<string, PhoneticMatch[]>();
  for (const match of phoneticMatches) {
    const existing = tribeMatches.get(match.tribe) || [];
    existing.push(match);
    tribeMatches.set(match.tribe, existing);
  }
  
  // Map tribes to their regions
  const tribeRegions: Record<string, { region: string; migrations?: string[] }> = {
    // East Africa
    'luo': { region: 'East Africa - Nilotic', migrations: ['Bahr el Ghazal', 'Northern Uganda', 'Western Kenya'] },
    'kikuyu': { region: 'East Africa - Bantu', migrations: ['Congo Basin', 'Great Lakes', 'Mt. Kenya'] },
    'maasai': { region: 'East Africa - Nilotic', migrations: ['Nile Valley', 'Great Rift Valley'] },
    'kalenjin': { region: 'East Africa - Nilotic', migrations: ['Nile Valley', 'Ethiopian Highlands'] },
    
    // West Africa
    'yoruba': { region: 'West Africa - Niger-Congo', migrations: ['Ancient Ife', 'Oyo Empire'] },
    'igbo': { region: 'West Africa - Niger-Congo' },
    'hausa': { region: 'West Africa - Chadic', migrations: ['Trans-Saharan routes'] },
    'fulani': { region: 'Sahel - Atlantic', migrations: ['Senegal', 'Nigeria', 'Chad'] },
    'wolof': { region: 'West Africa - Atlantic' },
    'dogon': { region: 'Sahel - Dogon', migrations: ['Mandé region', 'Bandiagara'] },
    
    // Southern Africa
    'zulu': { region: 'Southern Africa - Nguni', migrations: ['Great Lakes', 'Mfecane'] },
    'xhosa': { region: 'Southern Africa - Nguni', migrations: ['Great Lakes', 'Eastern Cape'] },
    'shona': { region: 'Southern Africa - Shona', migrations: ['Great Zimbabwe'] },
    'himba': { region: 'Southern Africa - Herero', migrations: ['Great Lakes', 'Angola'] },
    'san': { region: 'Southern Africa - Khoisan', migrations: ['Indigenous - 20,000+ years'] },
    
    // Central Africa
    'kongo': { region: 'Central Africa - Bantu', migrations: ['Bantu Expansion', 'Kongo Kingdom'] },
    'luba': { region: 'Central Africa - Bantu', migrations: ['Luba Empire'] },
    'fang': { region: 'Central Africa - Bantu' },
    
    // Horn of Africa
    'somali': { region: 'Horn of Africa - Cushitic', migrations: ['Arabian Peninsula influence'] },
    'oromo': { region: 'Horn of Africa - Cushitic' },
    'amhara': { region: 'Horn of Africa - Semitic', migrations: ['Aksumite Empire'] },
    'dinka': { region: 'East Africa - Nilotic', migrations: ['Sudd region'] },
    'nuer': { region: 'East Africa - Nilotic' },
    
    // North Africa
    'amazigh': { region: 'North Africa - Berber' },
    'tuareg': { region: 'Sahara - Berber', migrations: ['Trans-Saharan trade routes'] },
  };
  
  for (const [tribe, matches] of tribeMatches) {
    const info = tribeRegions[tribe];
    if (info && matches.length > 0) {
      const bestMatch = matches[0];
      origins.push({
        name: inputName,
        tribe,
        originRegion: info.region,
        migrationPath: info.migrations,
        confidence: bestMatch.similarity * 100
      });
    }
  }
  
  return origins.sort((a, b) => b.confidence - a.confidence);
}

// ============= BATCH PROCESSING =============

/**
 * Process multiple names efficiently
 */
export function batchPhoneticAnalysis(names: string[]): Map<string, PhoneticMatch[]> {
  // Pre-build all caches
  buildPhoneticIndex();
  buildTrigramIndex();
  
  const results = new Map<string, PhoneticMatch[]>();
  
  for (const name of names) {
    results.set(name, findPhoneticMatches(name, 5));
  }
  
  return results;
}
