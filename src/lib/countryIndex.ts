/**
 * Country directory: stats, search, and helpers for country pages.
 */

import { getAllTribes, getCountries, getCountryFacts, type Country } from '@/lib/tribeDetection';
import { getAllRecipes } from '@/data/recipes';
import { getAllPerformances } from '@/data/dances';
import { countryCodeToSlug, getCountryIntro } from '@/lib/seoConstants';
import { normalizeForSearch } from '@/lib/dataValidation';

export interface CountryStats extends Country {
  slug: string;
  tribeCount: number;
  recipeCount: number;
  danceCount: number;
  languageFamilies: string[];
  facts: string[];
  intro: string;
}

/** Common alternate names for search (normalized keys) */
const COUNTRY_ALIASES: Record<string, string> = {
  drc: 'CD',
  congo: 'CG',
  'dr congo': 'CD',
  'democratic republic of the congo': 'CD',
  'ivory coast': 'CI',
  'cote divoire': 'CI',
  'côte divoire': 'CI',
  'south africa': 'ZA',
  sa: 'ZA',
  ethiopia: 'ET',
  kenya: 'KE',
  nigeria: 'NG',
  ghana: 'GH',
  tanzania: 'TZ',
  uganda: 'UG',
  senegal: 'SN',
  cameroon: 'CM',
  zimbabwe: 'ZW',
  zambia: 'ZM',
  botswana: 'BW',
  namibia: 'NA',
  madagascar: 'MG',
  egypt: 'EG',
  morocco: 'MA',
  algeria: 'DZ',
  tunisia: 'TN',
  libya: 'LY',
  somalia: 'SO',
  eritrea: 'ER',
  rwanda: 'RW',
  burundi: 'BI',
  malawi: 'MW',
  mozambique: 'MZ',
  angola: 'AO',
  gabon: 'GA',
  chad: 'TD',
  niger: 'NE',
  mali: 'ML',
  gambia: 'GM',
  benin: 'BJ',
  togo: 'TG',
  guinea: 'GN',
  liberia: 'LR',
  'sierra leone': 'SL',
  'burkina faso': 'BF',
  'central african republic': 'CF',
  car: 'CF',
  'equatorial guinea': 'GQ',
  eswatini: 'SZ',
  swaziland: 'SZ',
  lesotho: 'LS',
  sudan: 'SD',
  'south sudan': 'SS',
  djibouti: 'DJ',
};

let statsCache: CountryStats[] | null = null;

export function getCountriesWithStats(): CountryStats[] {
  if (statsCache) return statsCache;

  const allTribes = getAllTribes();
  const recipes = getAllRecipes();
  const performances = getAllPerformances();

  statsCache = getCountries()
    .map((c) => {
      const tribes = allTribes.filter((t) => (t.countries ?? []).includes(c.code));
      const families = new Set<string>();
      tribes.forEach((t) => {
        if (t.language?.family) families.add(t.language.family);
      });

      return {
        ...c,
        slug: countryCodeToSlug(c.code),
        tribeCount: tribes.length,
        recipeCount: recipes.filter((r) => r.country === c.code).length,
        danceCount: performances.filter((p) => p.country === c.code).length,
        languageFamilies: Array.from(families).sort(),
        facts: getCountryFacts(c.code),
        intro: getCountryIntro(c.code, c.name, tribes.length),
      };
    })
    .filter((c) => c.tribeCount > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return statsCache;
}

export function getCountryStatsByCode(code: string): CountryStats | undefined {
  return getCountriesWithStats().find((c) => c.code === code);
}

export function getCountryStatsBySlug(slug: string): CountryStats | undefined {
  const normalized = slug.toLowerCase().trim();
  return getCountriesWithStats().find((c) => c.slug === normalized);
}

export interface CountrySearchResult {
  stats: CountryStats;
  score: number;
}

/**
 * Search countries by name, code, slug, or common aliases.
 */
export function searchCountries(query: string, limit = 6): CountrySearchResult[] {
  const norm = normalizeForSearch(query);
  if (!norm || norm.length < 2) return [];

  const aliasCode = COUNTRY_ALIASES[norm];
  const results: CountrySearchResult[] = [];
  const seen = new Set<string>();

  const add = (stats: CountryStats, score: number) => {
    if (seen.has(stats.code)) return;
    seen.add(stats.code);
    results.push({ stats, score });
  };

  if (aliasCode) {
    const hit = getCountryStatsByCode(aliasCode);
    if (hit) add(hit, 0.98);
  }

  for (const c of getCountriesWithStats()) {
    const nameNorm = normalizeForSearch(c.name);
    const slugNorm = normalizeForSearch(c.slug);
    const codeNorm = c.code.toLowerCase();

    if (codeNorm === norm) {
      add(c, 0.97);
      continue;
    }
    if (nameNorm === norm || slugNorm === norm) {
      add(c, 0.96);
      continue;
    }
    if (nameNorm.startsWith(norm) || slugNorm.startsWith(norm)) {
      add(c, 0.9);
      continue;
    }
    if (nameNorm.includes(norm) || slugNorm.includes(norm)) {
      add(c, 0.78);
      continue;
    }
    if (c.facts.some((f) => normalizeForSearch(f).includes(norm))) {
      add(c, 0.65);
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Invalidate cache after data hot-reload in dev (optional) */
export function clearCountryStatsCache(): void {
  statsCache = null;
}
