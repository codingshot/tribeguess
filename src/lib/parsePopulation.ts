/**
 * Parse tribe population strings for sorting and charts.
 * Uses the primary (first) figure only — never applies "million" from a later city/metro note.
 */
export function parsePopulation(pop: string | undefined | null): number {
  if (!pop?.trim()) return 0;

  // Ignore metro/city counts when ethnic population is listed first
  const primary = pop.split(/\(\s*city\b/i)[0].trim();

  const match = primary.match(/~?\s*([\d][\d.,]*)\s*(million|m|thousand|k|billion|b)?/i);
  if (!match) return 0;

  let num = parseFloat(match[1].replace(/,/g, ''));
  const unit = match[2]?.toLowerCase();

  if (unit === 'million' || unit === 'm') num *= 1_000_000;
  else if (unit === 'thousand' || unit === 'k') num *= 1_000;
  else if (unit === 'billion' || unit === 'b') num *= 1_000_000_000;

  return num;
}
