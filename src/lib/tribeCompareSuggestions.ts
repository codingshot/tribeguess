import type { TribeData } from '@/types/tribe';
import { buildCompareVsPath } from '@/lib/tribeCompareUrl';

export type ComparePairSuggestion = {
  slugA: string;
  slugB: string;
  title: string;
  hint: string;
  href: string;
};

/** Curated pairs (slugs) — validated at runtime against tribe data. */
export const CURATED_COMPARE_SLUG_PAIRS: readonly [string, string][] = [
  ['yoruba', 'igbo'],
  ['yoruba', 'hausa'],
  ['hausa', 'fulani'],
  ['zulu', 'xhosa'],
  ['kikuyu', 'luo'],
  ['amhara', 'oromo'],
  ['shona', 'ndebele'],
  ['swahili', 'chagga'],
  ['bambara', 'fulani'],
  ['ashanti', 'ewe'],
];

function dedupePairKey(a: string, b: string): string {
  return [a, b].sort().join('|');
}

function slugKey(t: TribeData): string {
  return String(t.slug || t.id || '')
    .trim()
    .toLowerCase();
}

function tribeBySlugKey(tribes: TribeData[], key: string): TribeData | undefined {
  return tribes.find(tr => slugKey(tr) === key);
}

/**
 * Suggested side-by-side comparisons: curated pairs, then `relatedTribes` links,
 * then a few same-primary-country pairs for major countries (deduped).
 */
export function getComparePairSuggestions(tribes: TribeData[], maxPairs = 14): ComparePairSuggestion[] {
  const valid = new Set(tribes.map(t => slugKey(t)).filter(Boolean));
  const out: ComparePairSuggestion[] = [];
  const seen = new Set<string>();

  const push = (a: string, b: string, hint: string) => {
    const x = a.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const y = b.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!valid.has(x) || !valid.has(y) || x === y) return;
    const pk = dedupePairKey(x, y);
    if (seen.has(pk)) return;
    seen.add(pk);
    const ta = tribeBySlugKey(tribes, x);
    const tb = tribeBySlugKey(tribes, y);
    if (!ta || !tb) return;
    out.push({
      slugA: slugKey(ta),
      slugB: slugKey(tb),
      title: `${ta.name} vs ${tb.name}`,
      hint,
      href: buildCompareVsPath(x, y),
    });
  };

  for (const [a, b] of CURATED_COMPARE_SLUG_PAIRS) {
    push(a, b, 'Popular comparison');
    if (out.length >= maxPairs) return out;
  }

  for (const t of tribes) {
    const sid = slugKey(t);
    if (!sid || !valid.has(sid)) continue;
    const rel = t.relatedTribes as string[] | undefined;
    if (!rel?.length) continue;
    for (const r of rel) {
      const rs = String(r)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');
      if (!rs) continue;
      push(sid, rs, `Neighbors · ${t.name}`);
      if (out.length >= maxPairs) return out;
    }
  }

  const byCountry = new Map<string, TribeData[]>();
  for (const t of tribes) {
    const c = t.countries?.[0]?.toUpperCase();
    if (!c || c === 'ALL' || !/^[A-Z]{2}$/.test(c)) continue;
    if (!byCountry.has(c)) byCountry.set(c, []);
    byCountry.get(c)!.push(t);
  }

  const bonusCountries = ['NG', 'KE', 'ZA', 'ET', 'GH', 'TZ', 'UG', 'RW'];
  for (const code of bonusCountries) {
    if (out.length >= maxPairs) break;
    const list = byCountry.get(code);
    if (!list || list.length < 2) continue;
    const ordered = [...list].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    const u = slugKey(ordered[0]);
    const v = slugKey(ordered[1]);
    push(u, v, `Same region · ${code}`);
  }

  return out.slice(0, maxPairs);
}

/** Lightweight links for footer (no tribe list needed). */
export function getCuratedCompareFooterLinks(): { href: string; label: string }[] {
  const seen = new Set<string>();
  const links: { href: string; label: string }[] = [];
  for (const [a, b] of CURATED_COMPARE_SLUG_PAIRS) {
    const x = a.toLowerCase();
    const y = b.toLowerCase();
    const k = dedupePairKey(x, y);
    if (seen.has(k)) continue;
    seen.add(k);
    const title = `${capWords(x)} vs ${capWords(y)}`;
    links.push({ href: buildCompareVsPath(x, y), label: title });
    if (links.length >= 6) break;
  }
  return links;
}

function capWords(slug: string): string {
  return slug
    .split('-')
    .map(w => (w.length ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

