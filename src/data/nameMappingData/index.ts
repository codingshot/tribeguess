/**
 * Name mapping data — optimized for detection and lookup.
 * Adapted from MuslimName project for TribeGuess integration.
 */

import { christianToMuslimNameMapping } from "./mappingRecord";
import { westernNameVariants } from "./variants";

export { christianToMuslimNameMapping, westernNameVariants };
export type { NameMapping, NameMappingCategory } from "./types";

/** Names grouped by first character */
const namesByFirstChar = new Map<string, string[]>();
for (const key of Object.keys(christianToMuslimNameMapping)) {
  const c = key.charAt(0).toLowerCase();
  if (!c) continue;
  const list = namesByFirstChar.get(c) ?? [];
  list.push(key);
  namesByFirstChar.set(c, list);
}

/** Get candidate names for search */
export function getNamesForSearch(input: string): string[] {
  const first = input.toLowerCase().charAt(0);
  if (!first) return Object.keys(christianToMuslimNameMapping);
  return namesByFirstChar.get(first) ?? [];
}

/** Reverse index: muslim name → western keys */
export const muslimNameToWesternKeys = new Map<string, string[]>();
/** Reverse index: category → western keys */
export const categoryToWesternKeys = new Map<string, string[]>();
for (const [key, m] of Object.entries(christianToMuslimNameMapping)) {
  for (const mn of m.muslimNames) {
    const l = mn.toLowerCase();
    const list = muslimNameToWesternKeys.get(l) ?? [];
    if (!list.includes(key)) list.push(key);
    muslimNameToWesternKeys.set(l, list);
  }
  const cat = m.category;
  const list = categoryToWesternKeys.get(cat) ?? [];
  list.push(key);
  categoryToWesternKeys.set(cat, list);
}

export const allMappedWesternNames = Object.keys(christianToMuslimNameMapping);
