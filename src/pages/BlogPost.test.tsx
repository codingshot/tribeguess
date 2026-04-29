import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import BlogPost from './BlogPost';

describe('BlogPost', () => {
  it('renders Kenyan naming traditions article', () => {
    const router = createMemoryRouter([{ path: '/blog/:slug', element: <BlogPost /> }], {
      initialEntries: ['/blog/kenyan-naming-traditions-birth-time'],
    });
    render(
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    );
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Kenyan Names Reveal the Time/i);
  });
});
