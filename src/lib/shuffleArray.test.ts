import { describe, it, expect } from 'vitest';
import { shuffleArray } from './shuffleArray';

describe('shuffleArray', () => {
  it('preserves length and multiset of elements', () => {
    const input = [1, 2, 2, 3];
    const out = shuffleArray(input);
    expect(out).toHaveLength(input.length);
    expect(out.sort()).toEqual([...input].sort());
    expect(input).toEqual([1, 2, 2, 3]);
  });

  it('returns a new array instance', () => {
    const input = ['a', 'b'];
    const out = shuffleArray(input);
    expect(out).not.toBe(input);
  });
});
