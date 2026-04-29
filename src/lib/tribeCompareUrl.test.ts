import { describe, it, expect } from 'vitest';
import {
  MAX_COMPARE_TRIBES,
  parseCompareTribeSlugs,
  serializeCompareTribes,
  buildCompareVsPath,
  canonicalizeCompareSegments,
} from '@/lib/tribeCompareUrl';

const SLUGS = new Set(['yoruba', 'igbo', 'hausa', 'zulu', 'kikuyu']);

describe('parseCompareTribeSlugs', () => {
  it('returns empty for empty or invalid', () => {
    expect(parseCompareTribeSlugs('', SLUGS)).toEqual([]);
    expect(parseCompareTribeSlugs('   ', SLUGS)).toEqual([]);
    expect(parseCompareTribeSlugs('nope,also-bad', SLUGS)).toEqual([]);
  });

  it('parses comma list and dedupes', () => {
    expect(parseCompareTribeSlugs('yoruba,igbo', SLUGS)).toEqual(['yoruba', 'igbo']);
    expect(parseCompareTribeSlugs('yoruba,yoruba,igbo', SLUGS)).toEqual(['yoruba', 'igbo']);
  });

  it('respects max length', () => {
    const many = 'yoruba,igbo,hausa,zulu,kikuyu,extra';
    expect(parseCompareTribeSlugs(many, SLUGS).length).toBeLessThanOrEqual(MAX_COMPARE_TRIBES);
  });
});

describe('serializeCompareTribes', () => {
  it('joins and normalizes', () => {
    expect(serializeCompareTribes(['Yoruba', ' igbo '])).toBe('yoruba,igbo');
  });
});

describe('buildCompareVsPath', () => {
  it('builds two-slug path', () => {
    expect(buildCompareVsPath('yoruba', 'igbo')).toBe('/compare/yoruba/vs/igbo');
  });

  it('sanitizes and encodes unsafe slug characters', () => {
    expect(buildCompareVsPath(' Test ', 'Igbo!')).toBe('/compare/test/vs/igbo');
  });
});

describe('parseCompareTribeSlugs — extra', () => {
  it('strips junk between valid slugs', () => {
    expect(parseCompareTribeSlugs('yoruba,,, igbo ', SLUGS)).toEqual(['yoruba', 'igbo']);
  });
});

describe('canonicalizeCompareSegments', () => {
  const aliases = new Map<string, string>([
    ['hutu', 'banyarwanda'],
    ['yoruba', 'yoruba'],
  ]);

  it('maps aliases to canonical slugs and dedupes', () => {
    expect(canonicalizeCompareSegments(['hutu', 'igbo'], aliases)).toEqual(['banyarwanda', 'igbo']);
  });

  it('dedupes when two aliases resolve to the same canonical slug', () => {
    expect(canonicalizeCompareSegments(['hutu', 'hutu'], aliases)).toEqual(['banyarwanda']);
  });
});
