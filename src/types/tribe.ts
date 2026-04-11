/**
 * Tribe data types — derived from tribes.json structure.
 * Used across the app to eliminate `as any` casts.
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

export interface TribeHistory {
  origins?: string;
  migration?: string;
  colonial?: string;
  modern?: string;
  [key: string]: string | undefined;
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
  genderStereotypes?: { male?: string[]; female?: string[] };
  genderRoles?: { male?: string; female?: string };
  culturalTraits?: string[];
  funFacts?: string[];
  traditionalFood?: string[];
  eatingCustoms?: string[];
  traditionalDance?: string[];
  religion?: string;
  traditionalReligion?: string;
  history?: TribeHistory;
  language?: TribeLanguage;
  tradeHistory?: string;
  independenceHistory?: string;
  famousPeople?: TribeFamousPerson[];
  description?: string;
  relatedTribes?: string[];
  diaspora?: string[];
  [key: string]: unknown; // allow extra fields gracefully
}
