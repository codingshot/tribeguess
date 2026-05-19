import { describe, it, expect } from 'vitest';
import { parsePopulation } from '@/lib/parsePopulation';

describe('parsePopulation', () => {
  it('parses simple million figures', () => {
    expect(parsePopulation('~4 million')).toBe(4_000_000);
    expect(parsePopulation('~8.1 million')).toBe(8_100_000);
  });

  it('parses thousands without false million multiplier', () => {
    expect(parsePopulation('~200,000')).toBe(200_000);
  });

  it('does not treat Douala ethnic count as 200 million', () => {
    expect(parsePopulation('~200,000 (ethnic), ~3.5 million (city)')).toBe(200_000);
  });

  it('ignores city population after (city) marker', () => {
    expect(parsePopulation('~500,000 (ethnic), ~2 million (city metro)')).toBe(500_000);
  });
});
