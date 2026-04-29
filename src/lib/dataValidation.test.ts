import { describe, it, expect } from 'vitest';
import { sanitizeSearchQuery, normalizeForSearch, sanitizeTextInput } from '@/lib/dataValidation';

describe('sanitizeSearchQuery', () => {
  it('returns empty for non-strings', () => {
    expect(sanitizeSearchQuery(null)).toBe('');
    expect(sanitizeSearchQuery(undefined)).toBe('');
    expect(sanitizeSearchQuery(123 as unknown)).toBe('');
  });

  it('trims and caps length', () => {
    const long = 'a'.repeat(200);
    expect(sanitizeSearchQuery(long, 50).length).toBe(50);
  });

  it('strips control characters', () => {
    expect(sanitizeSearchQuery('hello\x00world')).toBe('helloworld');
  });
});

describe('normalizeForSearch', () => {
  it('folds diacritics for comparison', () => {
    expect(normalizeForSearch('Ndèye')).toContain('nde');
  });
});

describe('sanitizeTextInput', () => {
  it('handles edge inputs', () => {
    expect(sanitizeTextInput('  ok  ', 10)).toBe('ok');
  });
});
