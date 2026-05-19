import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Recipes from './Recipes';

describe('Recipes', () => {
  it('renders the recipes gallery without nested anchor errors', () => {
    const router = createMemoryRouter([{ path: '/recipes', element: <Recipes /> }], {
      initialEntries: ['/recipes'],
    });
    const { container } = render(
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /traditional african recipes/i })).toBeTruthy();

    // Recipe cards must not nest <a> inside <a> (invalid HTML / React crash)
    container.querySelectorAll('a').forEach(anchor => {
      expect(anchor.querySelector('a')).toBeNull();
    });
  });
});
