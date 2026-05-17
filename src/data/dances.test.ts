import { describe, it, expect } from 'vitest';
import {
  culturalPerformances,
  getDancesOnly,
  getMusicOnly,
  getPerformancesByTribe,
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
    expect(getMusicOnly().length).toBeGreaterThanOrEqual(10);
  });

  it('all YouTube IDs are valid format', () => {
    for (const p of culturalPerformances) {
      expect(isValidYoutubeId(p.youtubeVideoId), p.id).toBe(true);
    }
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
