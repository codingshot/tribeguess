import { describe, it, expect } from 'vitest';
import { getPerformanceById, getDancesOnly } from '@/data/dances';
import { getDanceGalleryVideos } from '@/lib/videoAggregation';

/** Smoke tests for dance pages and route data (no browser router required). */
describe('dance routes', () => {
  it('dance gallery has playable videos for every dance entry', () => {
    const dances = getDancesOnly();
    const gallery = getDanceGalleryVideos();
    expect(dances.length).toBeGreaterThan(0);
    expect(gallery.length).toBe(dances.length);
    for (const d of dances) {
      expect(gallery.some((v) => v.id.startsWith(`dance-${d.id}-`)), d.id).toBe(true);
    }
  });

  it('resolves detail pages for known dance and music ids', () => {
    expect(getPerformanceById('zulu-indlamu-dance')?.contentType).toBe('dance');
    expect(getPerformanceById('luo-ohangla-traditional')?.contentType).toBe('music');
  });

  it('page modules load (lazy route targets)', async () => {
    const [DancesGallery, DancePage, AfricanDances] = await Promise.all([
      import('./DancesGallery'),
      import('./DancePage'),
      import('./AfricanDances'),
    ]);
    expect(typeof DancesGallery.default).toBe('function');
    expect(typeof DancePage.default).toBe('function');
    expect(typeof AfricanDances.default).toBe('function');
  }, 10_000);
});
