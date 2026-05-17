import {
  culturalPerformances,
  getPerformanceById,
  getResolvedYoutubeId,
  type CulturalPerformance,
} from '@/data/dances';
import { isValidYoutubeId } from '@/lib/videoAggregation';
import { getAllTribes } from '@/lib/tribeDetection';

export interface DanceValidationIssue {
  id: string;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validatePerformanceEntry(entry: CulturalPerformance): DanceValidationIssue[] {
  const issues: DanceValidationIssue[] = [];

  if (!entry.id?.trim()) {
    issues.push({ id: entry.id || '?', field: 'id', message: 'Missing id', severity: 'error' });
  }
  if (!entry.name?.trim()) {
    issues.push({ id: entry.id, field: 'name', message: 'Missing name', severity: 'error' });
  }
  if (!entry.tribeSlug?.trim()) {
    issues.push({ id: entry.id, field: 'tribeSlug', message: 'Missing tribeSlug', severity: 'error' });
  }
  const resolvedId = getResolvedYoutubeId(entry);
  if (!resolvedId || !isValidYoutubeId(resolvedId)) {
    issues.push({
      id: entry.id,
      field: 'youtubeVideoId',
      message: `Missing or invalid video (need youtubeVideoId or valid sharedVideoFromId)`,
      severity: 'error',
    });
  }
  if (entry.sharedVideoFromId && !getPerformanceById(entry.sharedVideoFromId)) {
    issues.push({
      id: entry.id,
      field: 'sharedVideoFromId',
      message: `Unknown sharedVideoFromId: ${entry.sharedVideoFromId}`,
      severity: 'error',
    });
  }
  if (
    entry.contentType === 'music' &&
    entry.musicEra === 'modern' &&
    entry.youtubeVideoId &&
    entry.relatedPerformanceId
  ) {
    const related = getPerformanceById(entry.relatedPerformanceId);
    if (
      related?.youtubeVideoId === entry.youtubeVideoId &&
      entry.videoContext !== 'documentary'
    ) {
      issues.push({
        id: entry.id,
        field: 'musicEra',
        message: 'Modern music reuses dance clip — use sharedVideoFromId or a documentary/performance video',
        severity: 'warning',
      });
    }
  }
  if (!['dance', 'music'].includes(entry.contentType)) {
    issues.push({
      id: entry.id,
      field: 'contentType',
      message: `Invalid contentType: ${entry.contentType}`,
      severity: 'error',
    });
  }
  if (entry.contentType === 'music' && !entry.musicEra) {
    issues.push({
      id: entry.id,
      field: 'musicEra',
      message: 'Music entries should specify musicEra (traditional | modern)',
      severity: 'warning',
    });
  }
  if (!entry.description?.trim() || entry.description.length < 20) {
    issues.push({
      id: entry.id,
      field: 'description',
      message: 'Description too short for SEO',
      severity: 'warning',
    });
  }

  return issues;
}

export function validateAllPerformances(): {
  valid: boolean;
  issues: DanceValidationIssue[];
  duplicateIds: string[];
  unknownTribes: string[];
} {
  const tribeSlugs = new Set(getAllTribes().map((t) => t.slug));
  const seenIds = new Map<string, number>();
  const issues: DanceValidationIssue[] = [];
  const unknownTribes: string[] = [];

  for (const entry of culturalPerformances) {
    for (const issue of validatePerformanceEntry(entry)) {
      issues.push(issue);
    }
    seenIds.set(entry.id, (seenIds.get(entry.id) || 0) + 1);
    if (entry.tribeSlug && !tribeSlugs.has(entry.tribeSlug)) {
      unknownTribes.push(`${entry.id} → ${entry.tribeSlug}`);
    }
  }

  const duplicateIds = [...seenIds.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);

  for (const id of duplicateIds) {
    issues.push({ id, field: 'id', message: 'Duplicate performance id', severity: 'error' });
  }

  const hasErrors = issues.some((i) => i.severity === 'error') || duplicateIds.length > 0;

  return {
    valid: !hasErrors && unknownTribes.length === 0,
    issues,
    duplicateIds,
    unknownTribes,
  };
}
