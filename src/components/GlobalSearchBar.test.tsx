import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GlobalSearchBar } from '@/components/GlobalSearchBar';

function renderBar(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<GlobalSearchBar />} />
        <Route path="/learn" element={<GlobalSearchBar />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('GlobalSearchBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows listbox suggestions after debounced query', async () => {
    renderBar('/');
    const input = screen.getByPlaceholderText(/search names, tribes, food/i);
    fireEvent.change(input, { target: { value: 'yoruba' } });
    fireEvent.focus(input);

    await waitFor(
      () => {
        expect(screen.getByRole('listbox', { name: /search suggestions/i })).toBeTruthy();
      },
      { timeout: 800 }
    );

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('clears input when clear button is used', () => {
    renderBar('/');
    const input = screen.getByPlaceholderText(/search names, tribes, food/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
    expect(input.value).toBe('');
  });

  it('closes dropdown on Escape', async () => {
    renderBar('/');
    const input = screen.getByPlaceholderText(/search names, tribes, food/i);
    fireEvent.change(input, { target: { value: 'yoruba' } });
    fireEvent.focus(input);

    await waitFor(() => expect(screen.queryByRole('listbox')).toBeTruthy(), { timeout: 800 });

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
