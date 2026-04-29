import { describe, it, expect } from 'vitest';
import { getAllTribes } from '@/lib/tribeDetection';
import {
  getComparePairSuggestions,
  getCuratedCompareFooterLinks,
  CURATED_COMPARE_SLUG_PAIRS,
} from '@/lib/tribeCompareSuggestions';

describe('getComparePairSuggestions', () => {
  const tribes = getAllTribes();

  it('includes a well-known curated pair when slugs exist', () => {
    const pairs = getComparePairSuggestions(tribes, 24);
    const yorubaIgbo = pairs.find(p => p.slugA === 'yoruba' && p.slugB === 'igbo');
    const yorubaIgboAlt = pairs.find(p => p.slugA === 'igbo' && p.slugB === 'yoruba');
    expect(yorubaIgbo || yorubaIgboAlt).toBeTruthy();
  });

  it('dedupes so each unordered pair appears once', () => {
    const pairs = getComparePairSuggestions(tribes, 40);
    const keys = new Set(pairs.map(p => [p.slugA, p.slugB].sort().join('|')));
    expect(keys.size).toBe(pairs.length);
  });

  it('respects maxPairs', () => {
    expect(getComparePairSuggestions(tribes, 3).length).toBeLessThanOrEqual(3);
  });
});

describe('getCuratedCompareFooterLinks', () => {
  it('returns a small list of hrefs and labels', () => {
    const links = getCuratedCompareFooterLinks();
    expect(links.length).toBeGreaterThan(0);
    expect(links.length).toBeLessThanOrEqual(6);
    expect(links[0].href).toMatch(/^\/compare\//);
  });
});

describe('CURATED_COMPARE_SLUG_PAIRS', () => {
  it('every curated slug exists in tribe data', () => {
    const valid = new Set(getAllTribes().map(t => String(t.slug || t.id).toLowerCase()));
    for (const [a, b] of CURATED_COMPARE_SLUG_PAIRS) {
      expect(valid.has(a), `missing slug: ${a}`).toBe(true);
      expect(valid.has(b), `missing slug: ${b}`).toBe(true);
    }
  });
});
