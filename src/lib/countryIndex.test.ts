import { describe, it, expect } from 'vitest';
import { searchCountries, getCountriesWithStats } from '@/lib/countryIndex';

describe('countryIndex', () => {
  it('returns countries with tribe counts', () => {
    const list = getCountriesWithStats();
    expect(list.length).toBeGreaterThan(10);
    expect(list.every((c) => c.tribeCount > 0 && c.slug)).toBe(true);
  });

  it('finds Kenya by name', () => {
    const hits = searchCountries('kenya');
    expect(hits.some((h) => h.stats.code === 'KE')).toBe(true);
  });

  it('finds DRC by alias', () => {
    const hits = searchCountries('drc');
    expect(hits.some((h) => h.stats.code === 'CD')).toBe(true);
  });

  it('finds South Africa by full name', () => {
    const hits = searchCountries('south africa');
    expect(hits.some((h) => h.stats.code === 'ZA')).toBe(true);
  });
});
