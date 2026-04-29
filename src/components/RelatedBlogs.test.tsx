import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RelatedBlogs } from '@/components/RelatedBlogs';
import { blogPosts } from '@/data/blogPosts';

describe('RelatedBlogs', () => {
  it('renders related articles for a manual blog post', () => {
    const post = blogPosts.find((p) => p.slug === 'kenyan-naming-traditions-birth-time');
    expect(post).toBeTruthy();
    if (!post) return;

    render(
      <MemoryRouter>
        <RelatedBlogs currentPost={post} maxPosts={3} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /related articles/i })).toBeTruthy();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links.some((a) => a.getAttribute('href')?.startsWith('/blog/'))).toBe(true);
  });

  it('returns null when no other posts score (edge: maxPosts 0)', () => {
    const post = blogPosts[0];
    const { container } = render(
      <MemoryRouter>
        <RelatedBlogs currentPost={post} maxPosts={0} />
      </MemoryRouter>
    );
    expect(container.textContent).toBe('');
  });
});
