/** Max tribes supported on the compare page (must match TribeCompare UI). */
export const MAX_COMPARE_TRIBES = 4;

/**
 * Parse and validate tribe slugs from a comma-separated `tribes` query value.
 * Unknown segments are dropped; order preserved; deduped.
 */
export function parseCompareTribeSlugs(
  tribesParam: string | null | undefined,
  validSlugs: ReadonlySet<string>
): string[] {
  if (!tribesParam?.trim()) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  const parts = tribesParam.split(',');
  for (const part of parts) {
    if (out.length >= MAX_COMPARE_TRIBES) break;
    const raw = part.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!raw || !validSlugs.has(raw) || seen.has(raw)) continue;
    seen.add(raw);
    out.push(raw);
  }
  return out;
}

/** Build `tribes` query value (no leading `?`). */
export function serializeCompareTribes(slugs: string[]): string {
  return slugs
    .map(s => s.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
    .filter(Boolean)
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, MAX_COMPARE_TRIBES)
    .join(',');
}

/**
 * Map alternate ids/slugs onto the canonical segment stored in URLs (first match wins).
 * `aliases` entries: [canonicalOrAliasLower, ...sameTribeKeysLower].
 */
export function canonicalizeCompareSegments(
  segments: string[],
  aliases: ReadonlyMap<string, string>
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of segments) {
    const k = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!k) continue;
    const canon = aliases.get(k) ?? k;
    if (seen.has(canon)) continue;
    seen.add(canon);
    out.push(canon);
    if (out.length >= MAX_COMPARE_TRIBES) break;
  }
  return out;
}

/** Shareable path for exactly two tribes. */
export function buildCompareVsPath(slugA: string, slugB: string): string {
  const a = slugA.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  const b = slugB.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  return `/compare/${encodeURIComponent(a)}/vs/${encodeURIComponent(b)}`;
}
