import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CrossSectionSearchHints } from '@/components/CrossSectionSearchHints';

describe('CrossSectionSearchHints', () => {
  afterEach(() => cleanup());

  it('renders cross-links when query has hits', () => {
    render(
      <MemoryRouter>
        <CrossSectionSearchHints query="jollof" />
      </MemoryRouter>
    );
    expect(screen.getByText(/nothing matched here/i)).toBeTruthy();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('returns null for short query', () => {
    const { container } = render(
      <MemoryRouter>
        <CrossSectionSearchHints query="x" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });
});
