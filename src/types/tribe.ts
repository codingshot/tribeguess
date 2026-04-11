/**
 * Tribe data types — derived from tribes.json structure.
 * The JSON data has highly varied shapes across 140+ tribes,
 * so fields that vary significantly use `unknown` with runtime checks.
 */

export interface TribeLanguage {
  name?: string;
  speakers?: string;
  greeting?: string;
  greetingMeaning?: string;
  additionalGreetings?: { phrase: string; meaning: string }[];
  commonPhrases?: { phrase: string; meaning: string }[];
  family?: string;
  writingSystem?: string;
}

export interface TribeCommonNames {
  female?: string[];
  male?: string[];
}

export interface TribeFamousPerson {
  name: string;
  title?: string;
  description?: string;
  image?: string;
}

/**
 * Core tribe interface. Fields with highly varied JSON shapes
 * use permissive types to avoid brittle type mismatches.
 */
export interface TribeData {
  id: string;
  name: string;
  slug: string;
  slugAliases?: string[];
  youtubeVideoId?: string;
  languageVideoId?: string;
  countries?: string[];
  region: string;
  population?: string;
  populationPercent?: string;
  genderRatio?: { male: number; female: number };
  mapCoordinates?: { lat: number; lng: number };
  counties?: string[];
  namePrefixes?: string[];
  commonNames?: TribeCommonNames;
  timeBasedNames?: Record<string, string[]>;
  stereotypes?: string[];
  culturalTraits?: string[];
  funFacts?: string[];
  religion?: string;
  language?: TribeLanguage;
  famousPeople?: TribeFamousPerson[];
  description?: string;
  relatedTribes?: string[];
  // These fields have highly varied shapes across tribes
  // Use runtime checks when accessing sub-properties
  traditionalFood?: unknown;
  eatingCustoms?: unknown;
  traditionalDance?: unknown;
  traditionalReligion?: unknown;
  history?: unknown;
  tradeHistory?: unknown;
  independenceHistory?: unknown;
  genderStereotypes?: unknown;
  genderRoles?: unknown;
  diaspora?: unknown;
  [key: string]: unknown;
}
