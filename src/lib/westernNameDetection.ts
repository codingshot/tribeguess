/**
 * Western Name Detection — integrates MuslimName mapping database
 * into TribeGuess detection pipeline for cross-faith tribal context.
 */

import { christianToMuslimNameMapping, westernNameVariants, categoryToWesternKeys, muslimNameToWesternKeys } from '@/data/nameMappingData';
import type { NameMapping, NameMappingCategory } from '@/data/nameMappingData';

export interface WesternNameResult {
  found: boolean;
  canonicalName: string;
  resolvedFrom?: string; // If resolved via variant/nickname
  mapping?: NameMapping;
  muslimEquivalents: string[];
  westernEquivalents?: string[]; // For reverse lookup (Muslim name → Western)
  isReverseLookup?: boolean; // True when user searched a Muslim name
  christianTribes: string[];
  muslimTribes: string[];
  relatedNames: string[];
  categoryLabel: string;
  genderHint: 'male' | 'female' | 'unknown';
}

// Map categories to human labels
const categoryLabels: Partial<Record<NameMappingCategory, string>> = {
  'biblical-male': 'Biblical',
  'biblical-female': 'Biblical',
  'western-male': 'Western',
  'western-female': 'Western',
  'hebrew': 'Hebrew',
  'virtue': 'Virtue',
  'latin-male': 'Latin',
  'latin-female': 'Latin',
  'french-male': 'French',
  'french-female': 'French',
  'german-male': 'Germanic',
  'german-female': 'Germanic',
  'italian-male': 'Italian',
  'italian-female': 'Italian',
  'spanish-male': 'Spanish',
  'spanish-female': 'Spanish',
  'greek-male': 'Greek',
  'greek-female': 'Greek',
  'scandinavian-male': 'Scandinavian',
  'scandinavian-female': 'Scandinavian',
  'dutch-male': 'Dutch',
  'dutch-female': 'Dutch',
  'portuguese-male': 'Portuguese',
  'portuguese-female': 'Portuguese',
  'russian-male': 'Russian/Slavic',
  'russian-female': 'Russian/Slavic',
  'polish-male': 'Polish',
  'polish-female': 'Polish',
  'celtic-male': 'Celtic',
  'celtic-female': 'Celtic',
  'hungarian-male': 'Hungarian',
  'hungarian-female': 'Hungarian',
  'persian-male': 'Persian',
  'persian-female': 'Persian',
  'turkish-male': 'Turkish',
  'turkish-female': 'Turkish',
};

// African tribes with strong Christian influence
const christianTribes = [
  'kikuyu', 'luo', 'luhya', 'kamba', 'kalenjin', 'yoruba', 'igbo',
  'zulu', 'xhosa', 'shona', 'amhara', 'tigrinya', 'baganda', 'hutu_tutsi',
  'tswana', 'sotho', 'akan', 'ewe', 'kimbundu', 'ovimbundu', 'kongo', 'luba',
];

// African tribes with strong Muslim influence
const muslimTribes = [
  'somali', 'hausa', 'fulani', 'wolof', 'tuareg', 'amazigh', 'tigre', 'afar',
  'swahili', 'mandinka', 'soninke', 'bambara', 'songhai', 'kanuri',
  'toubou', 'zaghawa', 'djerma', 'harari',
];

function getGender(category: string): 'male' | 'female' | 'unknown' {
  if (category.endsWith('-male')) return 'male';
  if (category.endsWith('-female')) return 'female';
  return 'unknown';
}

export function detectWesternName(name: string): WesternNameResult {
  const normalized = name.toLowerCase().trim();
  const empty: WesternNameResult = {
    found: false, canonicalName: normalized, muslimEquivalents: [],
    christianTribes: [], muslimTribes: [], relatedNames: [],
    categoryLabel: '', genderHint: 'unknown',
  };

  if (normalized.length < 2) return empty;

  // Categories that are African tribal — should NOT trigger western detection
  const africanCategories = new Set([
    'african-male', 'african-female', 'tribal-male', 'tribal-female',
    'yoruba-male', 'yoruba-female', 'igbo-male', 'igbo-female',
    'hausa-male', 'hausa-female', 'akan-male', 'akan-female',
    'zulu-male', 'zulu-female', 'somali-male', 'somali-female',
    'swahili-male', 'swahili-female', 'amhara-male', 'amhara-female',
    'shona-male', 'shona-female', 'wolof-male', 'wolof-female',
    'fulani-male', 'fulani-female', 'mandinka-male', 'mandinka-female',
    'tswana-male', 'tswana-female', 'ethiopian-male', 'ethiopian-female',
    'malagasy-male', 'malagasy-female',
  ]);

  // 1. Direct lookup
  let mapping = christianToMuslimNameMapping[normalized];
  let canonical = normalized;
  let resolvedFrom: string | undefined;

  // Skip if it's an African-category name (handled by tribal detection)
  if (mapping && africanCategories.has(mapping.category)) return empty;

  // 2. Try variant resolution
  if (!mapping) {
    const variant = westernNameVariants[normalized];
    if (variant) {
      mapping = christianToMuslimNameMapping[variant];
      if (mapping && africanCategories.has(mapping.category)) return empty;
      if (mapping) {
        canonical = variant;
        resolvedFrom = normalized;
      }
    }
  }

  // 3. Try stripping suffixes like _ig, _fr, etc. (mapping keys with culture suffix)
  if (!mapping) {
    for (const key of Object.keys(christianToMuslimNameMapping)) {
      const baseName = key.replace(/_[a-z]{2,3}$/, '');
      if (baseName === normalized) {
        const candidate = christianToMuslimNameMapping[key];
        if (africanCategories.has(candidate.category)) continue;
        mapping = candidate;
        canonical = key;
        break;
      }
    }
  }

  // 4. Reverse lookup: user searched a Muslim name → find Western equivalents
  // Skip for very common Muslim names that are self-standing (not primarily "equivalents")
  const commonMuslimNames = new Set([
    'muhammad', 'mohammed', 'ahmed', 'ali', 'omar', 'fatima', 'aisha', 'khadija',
    'zainab', 'hassan', 'hussein', 'mustafa', 'mahmoud', 'abdallah', 'abdullah',
    'bilal', 'hamza', 'khalid', 'rashid', 'faisal', 'ismail', 'idris', 'umar',
    'uthman', 'zaid', 'amina', 'huda', 'samira', 'yasmin', 'rania', 'hanan',
    'lubna', 'zahra', 'sumaya', 'asma', 'halima', 'nafisa', 'ruqayya', 'safiya',
    'noor', 'layla', 'karim', 'salim', 'tariq', 'yusuf', 'musa', 'isa',
  ]);
  
  if (!mapping && !commonMuslimNames.has(normalized)) {
    const westernKeys = muslimNameToWesternKeys.get(normalized);
    if (westernKeys && westernKeys.length > 0) {
      // Find the best non-African mapping
      for (const wk of westernKeys) {
        const candidate = christianToMuslimNameMapping[wk];
        if (candidate && !africanCategories.has(candidate.category)) {
          const catLabel = categoryLabels[candidate.category] || candidate.category.replace(/-/g, ' ');
          const gender = getGender(candidate.category);
          const westernNames = westernKeys
            .filter(k => !k.includes('_'))
            .slice(0, 4)
            .map(k => k.charAt(0).toUpperCase() + k.slice(1));
          
          return {
            found: true,
            canonicalName: normalized,
            isReverseLookup: true,
            mapping: candidate,
            muslimEquivalents: [normalized],
            westernEquivalents: westernNames,
            christianTribes: christianTribes.slice(0, 8),
            muslimTribes: muslimTribes.slice(0, 8),
            relatedNames: westernNames,
            categoryLabel: catLabel,
            genderHint: gender,
          };
        }
      }
    }
  }
  if (!mapping) return empty;

  // Get related names from same category (up to 6)
  const sameCat = categoryToWesternKeys.get(mapping.category) ?? [];
  const relatedNames = sameCat
    .filter(k => k !== canonical && !k.includes('_'))
    .slice(0, 6)
    .map(k => k.charAt(0).toUpperCase() + k.slice(1));

  const catLabel = categoryLabels[mapping.category] || mapping.category.replace(/-/g, ' ');
  const gender = getGender(mapping.category);

  // Determine which tribe set to show based on category
  const isBiblicalOrWestern = mapping.category.startsWith('biblical') || mapping.category.startsWith('western');

  return {
    found: true,
    canonicalName: canonical,
    resolvedFrom,
    mapping,
    muslimEquivalents: mapping.muslimNames,
    christianTribes: isBiblicalOrWestern ? christianTribes.slice(0, 8) : [],
    muslimTribes: muslimTribes.slice(0, 8),
    relatedNames,
    categoryLabel: catLabel,
    genderHint: gender,
  };
}
