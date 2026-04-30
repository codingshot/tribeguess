/**
 * Full Name Analysis - First + Last Name Combined Logic
 * Tracks cross-cultural naming, Muslim name popularity, and historical origins
 */

import globalTribeNames from '@/data/globalTribeNames.json';
import { 
  analyzeNameBreakdown, 
  findSimilarNames, 
  lookupExactName,
  type NameBreakdown,
  type SimilarName
} from './nameAnalysis';
import { 
  findPhoneticMatches, 
  trackHistoricalOrigins,
  soundex,
  metaphone,
  africanPhonetic
} from './phoneticMatching';
import { detectGlobalOrigin, muslimNameIndicators, christianNameIndicators } from './globalOrigins';

// ============= TYPES =============

export interface FullNameAnalysis {
  fullName: string;
  firstName: NameComponentAnalysis;
  lastName: NameComponentAnalysis;
  combinedAnalysis: CombinedAnalysis;
  crossCulturalMatches: CrossCulturalMatch[];
  religiousContext?: ReligiousContext;
  popularityData: PopularityData;
}

export interface NameComponentAnalysis {
  name: string;
  breakdown: NameBreakdown;
  exactMatch?: { tribe: string; gender: 'male' | 'female' };
  similarNames: SimilarName[];
  phoneticCodes: { soundex: string; metaphone: string; african: string };
  globalOrigin?: { region: string; confidence: number };
}

export interface CombinedAnalysis {
  primaryTribe?: string;
  primaryTribeSlug?: string;
  confidence: number;
  matchReason: string;
  isMixedHeritage: boolean;
  heritageNotes?: string[];
}

export interface CrossCulturalMatch {
  name: string;
  originCulture: string;
  africanTribes: string[];
  sharedPattern: 'prefix' | 'suffix' | 'phonetic' | 'religious' | 'migration';
  historicalNote?: string;
  popularity: number; // 0-100 scale
}

export interface ReligiousContext {
  religion: 'muslim' | 'christian' | 'traditional' | 'mixed';
  indicators: string[];
  africanTribesWithReligion: TribeReligionMapping[];
  note: string;
}

export interface TribeReligionMapping {
  tribe: string;
  religion: string;
  percentage: number;
  countries: string[];
}

export interface PopularityData {
  firstName: NamePopularity;
  lastName: NamePopularity;
  crossCultural: CrossCulturalPopularity[];
}

export interface NamePopularity {
  name: string;
  globalRank?: number;
  africanRank?: number;
  peakDecade?: string;
  trendDirection: 'rising' | 'stable' | 'declining';
  regions: { region: string; popularity: number }[];
}

export interface CrossCulturalPopularity {
  culture: string;
  names: string[];
  sharedWithAfrica: boolean;
  popularityScore: number;
}

// ============= MUSLIM NAME POPULARITY MAPPING =============

export const muslimNamePopularityByRegion: Record<string, {
  countries: string[];
  popularMale: string[];
  popularFemale: string[];
  africanTribes: string[];
  historicalNote: string;
}> = {
  'northAfrica': {
    countries: ['Egypt', 'Libya', 'Tunisia', 'Algeria', 'Morocco', 'Mauritania'],
    popularMale: ['muhammad', 'ahmed', 'mahmoud', 'omar', 'yusuf', 'karim', 'hassan', 'hussein', 'mostafa', 'ibrahim'],
    popularFemale: ['fatima', 'maryam', 'aisha', 'noor', 'layla', 'zahra', 'huda', 'amina', 'sara', 'yasmin'],
    africanTribes: ['amazigh', 'kabyle', 'tuareg', 'nubian', 'coptic', 'beja'],
    historicalNote: 'Islam spread through conquest (7th century) and trade. Arabic became dominant, blending with Berber traditions.'
  },
  'hornOfAfrica': {
    countries: ['Somalia', 'Djibouti', 'Eritrea', 'Ethiopia (Harari/Afar)'],
    popularMale: ['abdullahi', 'mohamed', 'hassan', 'ali', 'omar', 'abdi', 'farah', 'yusuf', 'ismail', 'hussein'],
    popularFemale: ['fatima', 'amina', 'hawa', 'mariam', 'khadija', 'ayan', 'ifrah', 'halima', 'sahra', 'fardowsa'],
    africanTribes: ['somali', 'afar', 'harari', 'oromo'],
    historicalNote: 'Early Islamic contact via Red Sea trade routes. Somali Islam dates to the 7th century.'
  },
  'westAfricaSahel': {
    countries: ['Senegal', 'Gambia', 'Mali', 'Niger', 'Chad', 'Nigeria (North)', 'Burkina Faso'],
    popularMale: ['amadou', 'mamadou', 'ousmane', 'ibrahima', 'abdoulaye', 'moussa', 'saidou', 'modibo', 'boubacar', 'cheikh'],
    popularFemale: ['aminata', 'fatou', 'mariama', 'aissatou', 'kadiatou', 'fatoumata', 'oumou', 'binta', 'hawa', 'maimouna'],
    africanTribes: ['fulani', 'wolof', 'hausa', 'kanuri', 'tukulor', 'bambara', 'mandinka', 'songhai', 'sara', 'toubou'],
    historicalNote: 'Trans-Saharan trade brought Islam from 8th century. Fulani jihads (18th-19th c.) spread Islam further.'
  },
  'eastAfricaCoast': {
    countries: ['Kenya (Coast)', 'Tanzania (Zanzibar)', 'Comoros', 'Mozambique (North)'],
    popularMale: ['ali', 'hassan', 'mohamed', 'omar', 'salim', 'rashid', 'hamisi', 'juma', 'bakari', 'yusuf'],
    popularFemale: ['fatuma', 'mwanaisha', 'zuhura', 'salma', 'amina', 'khadija', 'mariamu', 'zaina', 'asha', 'rehema'],
    africanTribes: ['swahili', 'mijikenda', 'shirazi'],
    historicalNote: 'Arab traders established Islam on Swahili coast from 8th century. Swahili culture blends Bantu and Arab.'
  },
  'sudanicBelt': {
    countries: ['Sudan', 'South Sudan (parts)', 'Chad (East)'],
    popularMale: ['mohamed', 'ahmed', 'ibrahim', 'abdullah', 'osman', 'ali', 'hassan', 'khaled', 'mustafa', 'salah'],
    popularFemale: ['fatima', 'maryam', 'aisha', 'zeinab', 'huda', 'amira', 'sara', 'nada', 'eman', 'rania'],
    africanTribes: ['nubian', 'beja', 'fur', 'zaghawa'],
    historicalNote: 'Islam arrived via Egypt and Red Sea. Funj Sultanate (1504-1821) established Islamic rule.'
  }
};

// ============= CROSS-CULTURAL NAME PATTERNS =============

export const crossCulturalPatterns: Record<string, {
  sharedNames: string[];
  africanOrigins: string[];
  diasporaPresence: string[];
  historicalConnection: string;
}> = {
  'islamic_global': {
    sharedNames: ['fatima', 'muhammad', 'aisha', 'omar', 'ali', 'hassan', 'ibrahim', 'maryam', 'yusuf', 'khadija'],
    africanOrigins: ['somali', 'hausa', 'fulani', 'wolof', 'swahili', 'tuareg', 'nubian', 'kanuri'],
    diasporaPresence: ['USA', 'UK', 'France', 'Germany', 'Brazil', 'Caribbean'],
    historicalConnection: 'Islamic names connect African Muslims to the global Ummah (1.8 billion).'
  },
  'bantu_diaspora': {
    sharedNames: ['simba', 'zuri', 'nia', 'amara', 'imani', 'kaya', 'zola', 'thabo'],
    africanOrigins: ['swahili', 'zulu', 'shona', 'kikuyu', 'luhya', 'kongo'],
    diasporaPresence: ['USA', 'Brazil', 'Jamaica', 'Haiti', 'Cuba', 'UK'],
    historicalConnection: 'Transatlantic slave trade dispersed Bantu names. African American naming renaissance revived them.'
  },
  'nilo_saharan': {
    sharedNames: ['deng', 'bol', 'garang', 'akol', 'achol', 'ayen', 'nyandeng'],
    africanOrigins: ['dinka', 'nuer', 'shilluk', 'luo', 'maasai', 'kalenjin'],
    diasporaPresence: ['USA', 'Australia', 'Canada', 'UK'],
    historicalConnection: 'South Sudanese diaspora (post-civil war) spread Nilotic names globally.'
  },
  'portuguese_african': {
    sharedNames: ['joao', 'maria', 'antonio', 'manuel', 'ana', 'pedro'],
    africanOrigins: ['kimbundu', 'ovimbundu', 'kongo', 'tsonga'],
    diasporaPresence: ['Brazil', 'Portugal', 'USA', 'South Africa'],
    historicalConnection: 'Portuguese colonialism (Angola, Mozambique, Cape Verde) created naming overlap.'
  },
  'french_african': {
    sharedNames: ['jean', 'marie', 'pierre', 'paul', 'amadou', 'mamadou'],
    africanOrigins: ['wolof', 'fulani', 'bambara', 'fang', 'bamileke'],
    diasporaPresence: ['France', 'Belgium', 'Canada', 'USA'],
    historicalConnection: 'French colonialism in West/Central Africa blended French and African naming.'
  }
};

// ============= MAIN ANALYSIS FUNCTION =============

/**
 * Analyze a full name (first + last) with combined tribal detection
 */
export function analyzeFullName(fullName: string): FullNameAnalysis {
  const parts = fullName.trim().split(/\s+/).filter(p => p.length > 0);
  
  const firstName = parts[0] || '';
  let lastName = parts.length > 1 ? parts[parts.length - 1] : '';
  
  // If single name, treat it as first name
  if (parts.length === 1) {
    lastName = '';
  }
  
  // Analyze each component
  const firstNameAnalysis = analyzeNameComponent(firstName);
  const lastNameAnalysis = lastName ? analyzeNameComponent(lastName) : createEmptyAnalysis(lastName);
  
  // Combined analysis
  const combined = combineAnalyses(firstNameAnalysis, lastNameAnalysis);
  
  // Cross-cultural matching
  const crossCultural = findCrossCulturalMatches(firstName, lastName);
  
  // Religious context
  const religious = detectReligiousContext(firstName, lastName);
  
  // Popularity data
  const popularity = calculatePopularityData(firstName, lastName);
  
  return {
    fullName,
    firstName: firstNameAnalysis,
    lastName: lastNameAnalysis,
    combinedAnalysis: combined,
    crossCulturalMatches: crossCultural,
    religiousContext: religious,
    popularityData: popularity
  };
}

/**
 * Analyze a single name component
 */
function analyzeNameComponent(name: string): NameComponentAnalysis {
  if (!name) return createEmptyAnalysis('');
  
  const breakdown = analyzeNameBreakdown(name);
  const exactMatch = lookupExactName(name) || undefined;
  const similarNames = findSimilarNames(name, 5);
  const phoneticCodes = {
    soundex: soundex(name),
    metaphone: metaphone(name),
    african: africanPhonetic(name)
  };
  
  // Check global origin
  const globalResult = detectGlobalOrigin(name);
  const globalOrigin = globalResult.origins.length > 0 
    ? { region: globalResult.origins[0].region, confidence: globalResult.confidence }
    : undefined;
  
  return {
    name,
    breakdown,
    exactMatch,
    similarNames,
    phoneticCodes,
    globalOrigin
  };
}

function createEmptyAnalysis(name: string): NameComponentAnalysis {
  return {
    name,
    breakdown: { fullName: name },
    similarNames: [],
    phoneticCodes: { soundex: '', metaphone: '', african: '' }
  };
}

/**
 * Combine first and last name analyses for unified result
 */
function combineAnalyses(first: NameComponentAnalysis, last: NameComponentAnalysis): CombinedAnalysis {
  const tribes: Record<string, { count: number; confidence: number }> = {};
  const heritageNotes: string[] = [];
  
  // Count tribe occurrences from both names
  const addTribe = (tribeName: string, confidence: number) => {
    const normalized = tribeName.toLowerCase();
    if (!tribes[normalized]) {
      tribes[normalized] = { count: 0, confidence: 0 };
    }
    tribes[normalized].count++;
    tribes[normalized].confidence = Math.max(tribes[normalized].confidence, confidence);
  };
  
  // First name matches
  if (first.exactMatch) {
    addTribe(first.exactMatch.tribe, 95);
  }
  first.similarNames.slice(0, 3).forEach((s, i) => {
    addTribe(s.tribe, s.similarity * 100 * (1 - i * 0.1));
  });
  if (first.breakdown.prefix?.tribes) {
    first.breakdown.prefix.tribes.forEach(t => addTribe(t.name, t.percentage));
  }
  if (first.breakdown.suffix?.tribes) {
    first.breakdown.suffix.tribes.forEach(t => addTribe(t.name, t.percentage));
  }
  
  // Last name matches
  if (last.exactMatch) {
    addTribe(last.exactMatch.tribe, 95);
  }
  last.similarNames.slice(0, 3).forEach((s, i) => {
    addTribe(s.tribe, s.similarity * 100 * (1 - i * 0.1));
  });
  if (last.breakdown.prefix?.tribes) {
    last.breakdown.prefix.tribes.forEach(t => addTribe(t.name, t.percentage));
  }
  if (last.breakdown.suffix?.tribes) {
    last.breakdown.suffix.tribes.forEach(t => addTribe(t.name, t.percentage));
  }
  
  // Find best match
  const sortedTribes = Object.entries(tribes)
    .map(([tribe, data]) => ({ tribe, ...data, score: data.confidence * (1 + data.count * 0.2) }))
    .sort((a, b) => b.score - a.score);
  
  const primaryTribe = sortedTribes[0];
  const secondaryTribe = sortedTribes[1];
  
  // Detect mixed heritage
  const isMixed = secondaryTribe && 
    secondaryTribe.score > primaryTribe.score * 0.6 &&
    secondaryTribe.tribe !== primaryTribe.tribe;
  
  if (isMixed) {
    heritageNotes.push(`First name suggests ${first.exactMatch?.tribe || first.similarNames[0]?.tribe || 'unknown'} heritage`);
    heritageNotes.push(`Last name suggests ${last.exactMatch?.tribe || last.similarNames[0]?.tribe || 'unknown'} heritage`);
    heritageNotes.push('Mixed tribal heritage is common in urban areas and inter-tribal marriages');
  }
  
  // Build match reason
  let matchReason = '';
  if (primaryTribe) {
    if (first.exactMatch && last.exactMatch && first.exactMatch.tribe === last.exactMatch.tribe) {
      matchReason = `Both names are common ${primaryTribe.tribe} names`;
    } else if (first.exactMatch) {
      matchReason = `First name "${first.name}" is a known ${primaryTribe.tribe} name`;
    } else if (last.exactMatch) {
      matchReason = `Last name "${last.name}" is a known ${primaryTribe.tribe} name`;
    } else if (first.breakdown.prefix?.tribes?.length || first.breakdown.suffix?.tribes?.length) {
      matchReason = `Name patterns match ${primaryTribe.tribe} naming conventions`;
    } else if (first.similarNames.length > 0) {
      matchReason = `Names are phonetically similar to ${primaryTribe.tribe} names`;
    } else {
      matchReason = `Pattern analysis suggests ${primaryTribe.tribe} origin`;
    }
  }
  
  return {
    primaryTribe: primaryTribe?.tribe,
    primaryTribeSlug: primaryTribe?.tribe.toLowerCase().replace(/\s+/g, '-'),
    confidence: primaryTribe?.score || 0,
    matchReason,
    isMixedHeritage: isMixed,
    heritageNotes: heritageNotes.length > 0 ? heritageNotes : undefined
  };
}

/**
 * Find cross-cultural name matches
 */
function findCrossCulturalMatches(firstName: string, lastName: string): CrossCulturalMatch[] {
  const matches: CrossCulturalMatch[] = [];
  const names = [firstName.toLowerCase(), lastName.toLowerCase()].filter(n => n);
  
  for (const [patternKey, pattern] of Object.entries(crossCulturalPatterns)) {
    for (const name of names) {
      for (const sharedName of pattern.sharedNames) {
        // Check exact or phonetic match
        if (name === sharedName || soundex(name) === soundex(sharedName)) {
          matches.push({
            name,
            originCulture: patternKey.replace(/_/g, ' '),
            africanTribes: pattern.africanOrigins,
            sharedPattern: name === sharedName ? 'prefix' : 'phonetic',
            historicalNote: pattern.historicalConnection,
            popularity: 75 + Math.random() * 20 // Simulate popularity score
          });
          break;
        }
      }
    }
  }
  
  // Check Muslim name regions
  for (const [region, data] of Object.entries(muslimNamePopularityByRegion)) {
    for (const name of names) {
      if (data.popularMale.includes(name) || data.popularFemale.includes(name)) {
        matches.push({
          name,
          originCulture: `Islamic (${region.replace(/([A-Z])/g, ' $1').trim()})`,
          africanTribes: data.africanTribes,
          sharedPattern: 'religious',
          historicalNote: data.historicalNote,
          popularity: 85
        });
      }
    }
  }
  
  return matches.slice(0, 5);
}

/**
 * Detect religious context from names
 */
function detectReligiousContext(firstName: string, lastName: string): ReligiousContext | undefined {
  const names = [firstName.toLowerCase(), lastName.toLowerCase()].filter(n => n);
  const indicators: string[] = [];
  let religion: 'muslim' | 'christian' | 'traditional' | 'mixed' | undefined;
  
  // Check Muslim indicators
  const muslimMale = muslimNameIndicators.commonMaleNames;
  const muslimFemale = muslimNameIndicators.commonFemaleNames;
  
  for (const name of names) {
    if (muslimMale.includes(name) || muslimFemale.includes(name)) {
      indicators.push(`"${name}" is a common Muslim name`);
      religion = religion === 'christian' ? 'mixed' : 'muslim';
    }
    
    for (const prefix of muslimNameIndicators.prefixes) {
      if (name.startsWith(prefix)) {
        indicators.push(`"${prefix}" prefix indicates Islamic origin`);
        religion = religion === 'christian' ? 'mixed' : 'muslim';
      }
    }
  }
  
  // Check Christian indicators
  const christianMale = [...christianNameIndicators.biblicalMale, ...christianNameIndicators.saintsMale];
  const christianFemale = [...christianNameIndicators.biblicalFemale, ...christianNameIndicators.saintsFemale];
  
  for (const name of names) {
    if (christianMale.includes(name) || christianFemale.includes(name)) {
      indicators.push(`"${name}" is a Biblical/Saints name`);
      religion = religion === 'muslim' ? 'mixed' : 'christian';
    }
  }
  
  if (!religion || indicators.length === 0) return undefined;
  
  // Map tribes with this religion
  const tribesWithReligion = getTribesWithReligion(religion);
  
  return {
    religion,
    indicators,
    africanTribesWithReligion: tribesWithReligion,
    note: religion === 'muslim' 
      ? 'This name is common among African Muslim communities from the Sahel to the Swahili coast.'
      : religion === 'christian'
      ? 'This name is common among Christian communities, especially in East, Central, and Southern Africa.'
      : 'This name shows both Islamic and Christian influences, common in religiously diverse regions.'
  };
}

/**
 * Get tribes associated with a religion
 */
function getTribesWithReligion(religion: 'muslim' | 'christian' | 'traditional' | 'mixed'): TribeReligionMapping[] {
  const muslimTribes: TribeReligionMapping[] = [
    { tribe: 'Somali', religion: 'Islam', percentage: 99, countries: ['Somalia', 'Kenya', 'Ethiopia'] },
    { tribe: 'Hausa', religion: 'Islam', percentage: 95, countries: ['Nigeria', 'Niger', 'Ghana'] },
    { tribe: 'Fulani', religion: 'Islam', percentage: 90, countries: ['Nigeria', 'Senegal', 'Mali', 'Guinea'] },
    { tribe: 'Wolof', religion: 'Islam', percentage: 95, countries: ['Senegal', 'Gambia'] },
    { tribe: 'Swahili', religion: 'Islam', percentage: 95, countries: ['Kenya', 'Tanzania', 'Comoros'] },
    { tribe: 'Tuareg', religion: 'Islam', percentage: 99, countries: ['Mali', 'Niger', 'Algeria'] },
    { tribe: 'Kanuri', religion: 'Islam', percentage: 95, countries: ['Nigeria', 'Niger', 'Chad'] },
    { tribe: 'Amazigh', religion: 'Islam', percentage: 99, countries: ['Morocco', 'Algeria', 'Tunisia'] }
  ];
  
  const christianTribes: TribeReligionMapping[] = [
    { tribe: 'Kikuyu', religion: 'Christianity', percentage: 85, countries: ['Kenya'] },
    { tribe: 'Igbo', religion: 'Christianity', percentage: 80, countries: ['Nigeria'] },
    { tribe: 'Yoruba', religion: 'Christianity', percentage: 50, countries: ['Nigeria'] },
    { tribe: 'Zulu', religion: 'Christianity', percentage: 75, countries: ['South Africa'] },
    { tribe: 'Shona', religion: 'Christianity', percentage: 70, countries: ['Zimbabwe'] },
    { tribe: 'Baganda', religion: 'Christianity', percentage: 60, countries: ['Uganda'] },
    { tribe: 'Amhara', religion: 'Orthodox', percentage: 90, countries: ['Ethiopia'] },
    { tribe: 'Coptic', religion: 'Orthodox', percentage: 95, countries: ['Egypt'] }
  ];
  
  if (religion === 'muslim') return muslimTribes;
  if (religion === 'christian') return christianTribes;
  return [...muslimTribes.slice(0, 3), ...christianTribes.slice(0, 3)];
}

/**
 * Calculate popularity data for names
 */
function calculatePopularityData(firstName: string, lastName: string): PopularityData {
  return {
    firstName: getNamePopularity(firstName),
    lastName: getNamePopularity(lastName),
    crossCultural: getCrossCulturalPopularity(firstName, lastName)
  };
}

function getNamePopularity(name: string): NamePopularity {
  if (!name) {
    return { 
      name: '', 
      trendDirection: 'stable', 
      regions: [] 
    };
  }
  
  const normalized = name.toLowerCase();
  const regions: { region: string; popularity: number }[] = [];
  
  // Check in Muslim regions
  for (const [region, data] of Object.entries(muslimNamePopularityByRegion)) {
    if (data.popularMale.includes(normalized) || data.popularFemale.includes(normalized)) {
      regions.push({ 
        region: region.replace(/([A-Z])/g, ' $1').trim(), 
        popularity: 85 + Math.random() * 10 
      });
    }
  }
  
  // Check in tribe names
  const commonNames = globalTribeNames.commonNames as Record<string, { male: string[]; female: string[] }>;
  for (const [tribe, names] of Object.entries(commonNames)) {
    if (names.male.some(n => n.toLowerCase() === normalized) || 
        names.female.some(n => n.toLowerCase() === normalized)) {
      regions.push({ 
        region: `${tribe.charAt(0).toUpperCase() + tribe.slice(1)} territory`, 
        popularity: 70 + Math.random() * 20 
      });
    }
  }
  
  return {
    name,
    trendDirection: regions.length > 3 ? 'rising' : regions.length > 0 ? 'stable' : 'declining',
    regions: regions.slice(0, 5)
  };
}

function getCrossCulturalPopularity(firstName: string, lastName: string): CrossCulturalPopularity[] {
  const results: CrossCulturalPopularity[] = [];
  
  for (const [patternKey, pattern] of Object.entries(crossCulturalPatterns)) {
    const matchingNames = pattern.sharedNames.filter(n => 
      n === firstName.toLowerCase() || 
      n === lastName.toLowerCase() ||
      soundex(n) === soundex(firstName) ||
      soundex(n) === soundex(lastName)
    );
    
    if (matchingNames.length > 0) {
      results.push({
        culture: patternKey.replace(/_/g, ' '),
        names: matchingNames,
        sharedWithAfrica: true,
        popularityScore: 60 + matchingNames.length * 10
      });
    }
  }
  
  return results;
}

// ============= BATCH PROCESSING =============

/**
 * Analyze multiple full names efficiently
 */
export function batchAnalyzeFullNames(fullNames: string[]): Map<string, FullNameAnalysis> {
  const results = new Map<string, FullNameAnalysis>();
  
  for (const fullName of fullNames) {
    results.set(fullName, analyzeFullName(fullName));
  }
  
  return results;
}

/**
 * Quick check if name appears Muslim
 */
export function isMuslimName(name: string): { isMuslim: boolean; region?: string; tribes: string[] } {
  const normalized = name.toLowerCase();
  
  for (const [region, data] of Object.entries(muslimNamePopularityByRegion)) {
    if (data.popularMale.includes(normalized) || data.popularFemale.includes(normalized)) {
      return { 
        isMuslim: true, 
        region: region.replace(/([A-Z])/g, ' $1').trim(),
        tribes: data.africanTribes 
      };
    }
  }
  
  // Check prefixes
  for (const prefix of muslimNameIndicators.prefixes) {
    if (normalized.startsWith(prefix)) {
      return { isMuslim: true, tribes: ['hausa', 'fulani', 'somali', 'wolof', 'swahili'] };
    }
  }
  
  return { isMuslim: false, tribes: [] };
}
