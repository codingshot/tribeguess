import { describe, it, expect } from 'vitest';
import { processTextWithTribeLinks, getTribeSlug } from '@/lib/tribeLinks';

describe('processTextWithTribeLinks', () => {
  it('wraps first occurrence of a known tribe name in a link', () => {
    const html = processTextWithTribeLinks('The Yoruba people have rich traditions.');
    expect(html).toContain('<a href="/learn/');
    expect(html).toContain('Yoruba');
    expect(html).toMatch(/href="\/learn\/[^"]+"/);
  });

  it('does not double-wrap when HTML already contains a link', () => {
    const already = '<a href="/learn/yoruba">Yoruba</a> and more text';
    expect(processTextWithTribeLinks(already)).toBe(already);
  });

  it('returns plain text unchanged when no tribe token matches', () => {
    const t = 'Hello world without tribe names.';
    expect(processTextWithTribeLinks(t)).toBe(t);
  });
});

describe('getTribeSlug', () => {
  it('returns a slug or null for inputs', () => {
    expect(getTribeSlug('Yoruba') === null || typeof getTribeSlug('Yoruba') === 'string').toBe(true);
    expect(getTribeSlug('')).toBeNull();
  });
});
