import { describe, it, expect } from 'vitest';
import {
  culturalPerformances,
  getDancesOnly,
  getMusicOnly,
  getPerformancesByTribe,
  getTraditionalMusic,
  getModernMusic,
  getResolvedYoutubeId,
} from '@/data/dances';
import { validateAllPerformances } from '@/lib/danceValidation';
import { isValidYoutubeId } from '@/lib/videoAggregation';

describe('culturalPerformances data', () => {
  it('passes validation (IDs, tribes, no duplicates)', () => {
    const result = validateAllPerformances();
    expect(result.duplicateIds).toEqual([]);
    expect(result.unknownTribes).toEqual([]);
    const errors = result.issues.filter((i) => i.severity === 'error');
    expect(errors).toEqual([]);
  });

  it('has dance and music entries', () => {
    expect(getDancesOnly().length).toBeGreaterThanOrEqual(17);
    expect(getMusicOnly().length).toBeGreaterThanOrEqual(14);
  });

  it('music entries have musicEra and genre metadata', () => {
    for (const m of getMusicOnly()) {
      expect(m.musicEra).toBeDefined();
      expect(m.musicGenre).toBeTruthy();
    }
  });

  it('traditional and modern music are both represented', () => {
    expect(getTraditionalMusic().length).toBeGreaterThanOrEqual(8);
    expect(getModernMusic().length).toBeGreaterThanOrEqual(5);
  });

  it('all performances resolve to a valid YouTube ID', () => {
    for (const p of culturalPerformances) {
      const id = getResolvedYoutubeId(p);
      expect(isValidYoutubeId(id), p.id).toBe(true);
    }
  });

  it('Luo modern music is not the same clip as traditional dance', () => {
    const dance = culturalPerformances.find((p) => p.id === 'luo-traditional-dance');
    const modern = culturalPerformances.find((p) => p.id === 'luo-benga-modern');
    expect(getResolvedYoutubeId(dance)).toBe('P0GAFqqexbM');
    expect(getResolvedYoutubeId(modern)).not.toBe(getResolvedYoutubeId(dance));
  });

  it('combined traditional music shares dance video via sharedVideoFromId', () => {
    const music = culturalPerformances.find((p) => p.id === 'luo-ohangla-traditional');
    expect(music?.sharedVideoFromId).toBe('luo-traditional-dance');
    expect(music?.youtubeVideoId).toBeUndefined();
    expect(getResolvedYoutubeId(music!)).toBe('P0GAFqqexbM');
  });

  it('includes user-curated Kamba, Zulu, and Wodaabe dances', () => {
    const ids = culturalPerformances.map((p) => p.id);
    expect(ids).toContain('kamba-kilumi-dance');
    expect(ids).toContain('zulu-indlamu-dance');
    expect(ids).toContain('wodaabe-gerewol-dance');
  });

  it('links performances to tribes with content', () => {
    const kamba = getPerformancesByTribe('kamba');
    expect(kamba.some((p) => p.contentType === 'dance')).toBe(true);
  });
});
