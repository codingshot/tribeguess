import tribesData from '@/data/tribes.json';
import { detectGlobalOrigin } from './globalOrigins';

export interface NameBreakdown {
  fullName: string;
  prefix?: { text: string; tribes: { name: string; percentage: number }[] };
  suffix?: { text: string; tribes: { name: string; percentage: number }[] };
  root?: { text: string; meaning?: string };
  religiousIndicator?: { type: string; note: string };
}

export interface SimilarName {
  name: string;
  tribe: string;
  tribeSlug: string;
  similarity: number;
}

export interface GlobalMatch {
  origin: string;
  region: string;
  confidence: number;
}

// Common prefix patterns with tribe associations
const prefixPatterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {
  'achi': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.9 }],
  'odhi': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.95 }],
  'oti': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.9 }],
  'wan': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.85 }],
  'njo': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.9 }],
  'kam': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.8 }],
  'naf': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.95 }],
  'waf': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.95 }],
  'nek': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.9 }],
  'kip': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.95 }],
  'chep': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.95 }],
  'jer': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.9 }],
  'chi': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.85 }],
  'nneka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.95 }],
  'ade': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.9 }],
  'ola': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.85 }],
  'nzi': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.9 }, { tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.85 }],
  'ngo': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.9 }],
  'den': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.95 }],
  'mab': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.9 }],
  'gat': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.95 }],
  'rie': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.9 }],
  'nyi': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.9 }],
  'ret': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.95 }],
  'sav': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.95 }],
  'tch': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.9 }],
  'abdul': [{ tribe: 'coastal', tribeName: 'Swahili/Coastal', weight: 0.9 }],
  'fat': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.8 }],
  'abd': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.85 }],
};

// Common suffix patterns with tribe associations
const suffixPatterns: Record<string, { tribe: string; tribeName: string; weight: number }[]> = {
  'ambo': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.9 }],
  'ieno': [{ tribe: 'luo', tribeName: 'Luo', weight: 0.9 }],
  'iku': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.9 }],
  'eri': [{ tribe: 'kikuyu', tribeName: 'Kikuyu', weight: 0.8 }],
  'ula': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.9 }],
  'esa': [{ tribe: 'luhya', tribeName: 'Luhya', weight: 0.9 }],
  'oge': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.95 }],
  'yot': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.95 }],
  'ich': [{ tribe: 'kalenjin', tribeName: 'Kalenjin', weight: 0.9 }],
  'emeka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.98 }],
  'nneka': [{ tribe: 'igbo', tribeName: 'Igbo', weight: 0.98 }],
  'tunde': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.98 }],
  'wale': [{ tribe: 'yoruba', tribeName: 'Yoruba', weight: 0.95 }],
  'imana': [{ tribe: 'hutu_tutsi', tribeName: 'Banyarwanda', weight: 0.98 }],
  'inga': [{ tribe: 'kongo', tribeName: 'Kongo', weight: 0.9 }, { tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.85 }],
  'anda': [{ tribe: 'kimbundu', tribeName: 'Kimbundu', weight: 0.9 }],
  'bior': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.95 }],
  'uol': [{ tribe: 'dinka', tribeName: 'Dinka', weight: 0.9 }],
  'uoth': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.98 }],
  'luak': [{ tribe: 'nuer', tribeName: 'Nuer', weight: 0.95 }],
  'kang': [{ tribe: 'shilluk', tribeName: 'Shilluk', weight: 0.9 }],
  'undu': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.98 }],
  'imbi': [{ tribe: 'ovimbundu', tribeName: 'Ovimbundu', weight: 0.95 }],
  'llah': [{ tribe: 'coastal', tribeName: 'Swahili/Coastal', weight: 0.85 }],
  'ddin': [{ tribe: 'somali', tribeName: 'Somali', weight: 0.9 }],
};

// Religious indicators
const islamicPrefixes = ['abdul', 'abd', 'abu', 'umm', 'ibn', 'al'];
const islamicSuffixes = ['allah', 'din', 'uddin', 'ullah'];
const christianIndicators = ['grace', 'faith', 'hope', 'blessing', 'divine', 'mercy'];

/**
 * Analyze a name and break it down into components
 */
export function analyzeNameBreakdown(name: string): NameBreakdown {
  const normalized = name.toLowerCase().trim().replace(/['-]/g, '');
  const breakdown: NameBreakdown = { fullName: name };
  
  // Find matching prefix
  const sortedPrefixes = Object.keys(prefixPatterns).sort((a, b) => b.length - a.length);
  for (const prefix of sortedPrefixes) {
    if (normalized.startsWith(prefix)) {
      const matches = prefixPatterns[prefix];
      breakdown.prefix = {
        text: name.slice(0, prefix.length).toUpperCase(),
        tribes: matches.map(m => ({ name: m.tribeName, percentage: Math.round(m.weight * 100) }))
      };
      break;
    }
  }
  
  // Find matching suffix
  const sortedSuffixes = Object.keys(suffixPatterns).sort((a, b) => b.length - a.length);
  for (const suffix of sortedSuffixes) {
    if (normalized.endsWith(suffix)) {
      const matches = suffixPatterns[suffix];
      breakdown.suffix = {
        text: name.slice(-suffix.length).toUpperCase(),
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
    // No prefix/suffix found, the whole name is the root
    breakdown.root = { text: normalized };
  }
  
  // Check for religious indicators
  for (const prefix of islamicPrefixes) {
    if (normalized.startsWith(prefix)) {
      breakdown.religiousIndicator = { 
        type: 'Islamic origin', 
        note: `"${prefix}" prefix indicates Arabic/Islamic naming tradition` 
      };
      break;
    }
  }
  
  if (!breakdown.religiousIndicator) {
    for (const suffix of islamicSuffixes) {
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
    for (const word of christianIndicators) {
      if (normalized.includes(word)) {
        breakdown.religiousIndicator = { 
          type: 'Christian origin', 
          note: 'This name reflects Christian virtue/Biblical influence' 
        };
        break;
      }
    }
  }
  
  return breakdown;
}

/**
 * Find similar names in the database
 */
export function findSimilarNames(inputName: string, limit: number = 6): SimilarName[] {
  const normalized = inputName.toLowerCase().trim();
  const similarNames: SimilarName[] = [];
  
  // Collect all names from all tribes
  for (const tribe of tribesData.tribes) {
    const allNames = [
      ...(tribe.commonNames?.female || []),
      ...(tribe.commonNames?.male || [])
    ];
    
    for (const name of allNames) {
      const nameLower = name.toLowerCase();
      const similarity = calculateSimilarity(normalized, nameLower);
      
      if (similarity > 0.4 && nameLower !== normalized) {
        similarNames.push({
          name,
          tribe: tribe.name,
          tribeSlug: tribe.slug || tribe.id,
          similarity
        });
      }
    }
  }
  
  // Sort by similarity and return top matches
  return similarNames
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
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
 * Calculate string similarity using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0 || len2 === 0) return 0;
  
  // Check for common prefix
  let commonPrefix = 0;
  const minLen = Math.min(len1, len2);
  for (let i = 0; i < minLen; i++) {
    if (str1[i] === str2[i]) {
      commonPrefix++;
    } else {
      break;
    }
  }
  
  // Check for common suffix
  let commonSuffix = 0;
  for (let i = 0; i < minLen - commonPrefix; i++) {
    if (str1[len1 - 1 - i] === str2[len2 - 1 - i]) {
      commonSuffix++;
    } else {
      break;
    }
  }
  
  // Calculate similarity based on common characters
  const commonChars = commonPrefix + commonSuffix;
  const maxLen = Math.max(len1, len2);
  
  // Levenshtein distance for more accuracy
  const distance = levenshteinDistance(str1, str2);
  const levenshteinSimilarity = 1 - (distance / maxLen);
  
  // Combine both metrics
  return (commonChars / maxLen) * 0.4 + levenshteinSimilarity * 0.6;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  if (m === 0) return n;
  if (n === 0) return m;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return dp[m][n];
}