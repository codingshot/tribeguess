import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TribeCompare from '@/pages/TribeCompare';

function renderAt(path: string) {
  const router = createMemoryRouter(
    [
      { path: '/compare/:slugA/vs/:slugB', element: <TribeCompare /> },
      { path: '/compare', element: <TribeCompare /> },
    ],
    { initialEntries: [path] }
  );
  return render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

describe('TribeCompare', () => {
  afterEach(() => cleanup());

  it('renders compare page with two tribes from query string', async () => {
    renderAt('/compare?tribes=yoruba,igbo');

    expect(await screen.findByRole('heading', { name: /compare tribes/i })).toBeTruthy();

    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: /yoruba/i }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByRole('link', { name: /igbo/i }).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows copy share link when two tribes selected', async () => {
    renderAt('/compare?tribes=yoruba,igbo');
    expect(await screen.findByRole('button', { name: /copy share link/i })).toBeTruthy();
  });

  it('loads two tribes from /compare/:a/vs/:b path (canonicalizes to query)', async () => {
    renderAt('/compare/yoruba/vs/igbo');

    expect(await screen.findByRole('heading', { name: /compare tribes/i })).toBeTruthy();

    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: /yoruba/i }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByRole('link', { name: /igbo/i }).length).toBeGreaterThanOrEqual(1);
    });
  });
});
