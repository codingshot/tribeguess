import { describe, it, expect } from 'vitest';
import { blogPosts } from '@/data/blogPosts';

describe('blogPosts catalog', () => {
  it('uses unique slugs (manual + generated)', () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('includes the Kenyan naming traditions article', () => {
    expect(blogPosts.some((p) => p.slug === 'kenyan-naming-traditions-birth-time')).toBe(true);
  });
});
