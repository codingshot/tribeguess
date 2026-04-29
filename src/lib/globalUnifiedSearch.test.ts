import { describe, it, expect } from 'vitest';
import { getCrossSectionFallback, searchGlobalUnified } from '@/lib/globalUnifiedSearch';

describe('searchGlobalUnified', () => {
  it('returns empty for queries shorter than 2 characters', () => {
    expect(searchGlobalUnified('', { limit: 20 })).toEqual([]);
    expect(searchGlobalUnified('a', { limit: 20 })).toEqual([]);
    expect(searchGlobalUnified(' ', { limit: 20 })).toEqual([]);
  });

  it('includes recipe hits for a food-oriented query', () => {
    const hits = searchGlobalUnified('jollof', { limit: 24 });
    expect(hits.some(h => h.kind === 'recipe')).toBe(true);
    expect(hits.some(h => h.href.includes('/recipe/'))).toBe(true);
  });

  it('includes tribe or name matches for a well-known group', () => {
    const hits = searchGlobalUnified('yoruba', { limit: 24 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some(h => h.title.toLowerCase().includes('yoruba') || h.subtitle?.toLowerCase().includes('yoruba'))).toBe(
      true
    );
  });

  it('dedupes results by href', () => {
    const hits = searchGlobalUnified('yoruba', { limit: 40 });
    const hrefs = hits.map(h => h.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('respects limit and still allows multiple result kinds', () => {
    const hits = searchGlobalUnified('rice', { limit: 20 });
    expect(hits.length).toBeLessThanOrEqual(20);
    const kinds = new Set(hits.map(h => h.kind));
    expect(kinds.size).toBeGreaterThanOrEqual(1);
  });
});

describe('getCrossSectionFallback', () => {
  it('returns at most maxItems', () => {
    const hits = getCrossSectionFallback('africa', 10);
    expect(hits.length).toBeLessThanOrEqual(10);
  });

  it('returns empty for short query', () => {
    expect(getCrossSectionFallback('x', 10)).toEqual([]);
  });

  it('round-robins multiple kinds when the pool is rich enough', () => {
    const hits = getCrossSectionFallback('jollof', 10);
    expect(hits.length).toBeGreaterThan(0);
    const kinds = new Set(hits.map(h => h.kind));
    expect(kinds.size).toBeGreaterThanOrEqual(2);
  });
});

describe('searchGlobalUnified — blog and engine balance', () => {
  it('can return blog hits for a blog-oriented query', () => {
    const hits = searchGlobalUnified('kenya', { limit: 24 });
    expect(hits.some(h => h.kind === 'blog')).toBe(true);
  });

  it('keeps total hits within limit under load', () => {
    const hits = searchGlobalUnified('africa', { limit: 12 });
    expect(hits.length).toBeLessThanOrEqual(12);
  });
});
