import { useState, useEffect, useCallback } from 'react';
import { validateYoutubeVideo } from '@/lib/videoAggregation';

interface VideoStatus {
  valid: boolean;
  loading: boolean;
  title?: string;
  error?: string;
}

const videoStatusCache = new Map<string, VideoStatus>();
const recentlyReportedErrors = new Set<string>();

export function useVideoValidation(youtubeId: string): VideoStatus {
  const [status, setStatus] = useState<VideoStatus>(() => {
    const cached = videoStatusCache.get(youtubeId);
    return cached || { valid: true, loading: true };
  });

  useEffect(() => {
    if (!youtubeId) {
      setStatus({ valid: false, loading: false });
      return;
    }

    // Check cache first
    const cached = videoStatusCache.get(youtubeId);
    if (cached && !cached.loading) {
      setStatus(cached);
      return;
    }

    // Validate video
    let cancelled = false;
    
    validateYoutubeVideo(youtubeId).then((result) => {
      if (cancelled) return;
      
      const newStatus = {
        valid: result.valid,
        loading: false,
        title: result.title,
        error: !result.valid ? 'Video unavailable or removed' : undefined,
      };
      
      // Log broken videos for maintainers (console only, not intrusive)
      if (!result.valid && !recentlyReportedErrors.has(youtubeId)) {
        console.warn(`[VideoAudit] Broken video detected: ${youtubeId}`, {
          youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
          suggestion: 'Consider replacing this video ID in the data files'
        });
        recentlyReportedErrors.add(youtubeId);
        // Clear from recent after 5 minutes to allow re-checking
        setTimeout(() => recentlyReportedErrors.delete(youtubeId), 300000);
      }
      
      videoStatusCache.set(youtubeId, newStatus);
      setStatus(newStatus);
    });

    return () => {
      cancelled = true;
    };
  }, [youtubeId]);

  return status;
}

// Hook to validate multiple videos
export function useMultipleVideoValidation(youtubeIds: string[]): Map<string, VideoStatus> {
  const [statuses, setStatuses] = useState<Map<string, VideoStatus>>(new Map());

  useEffect(() => {
    if (!youtubeIds.length) return;

    const newStatuses = new Map<string, VideoStatus>();
    
    // Initialize with cached or loading state
    youtubeIds.forEach(id => {
      const cached = videoStatusCache.get(id);
      newStatuses.set(id, cached || { valid: true, loading: true });
    });
    
    setStatuses(new Map(newStatuses));

    // Validate all uncached videos
    const uncachedIds = youtubeIds.filter(id => !videoStatusCache.has(id));
    
    if (uncachedIds.length > 0) {
      Promise.all(
        uncachedIds.map(async (id) => {
          const result = await validateYoutubeVideo(id);
          return { id, result };
        })
      ).then((results) => {
        results.forEach(({ id, result }) => {
          const status = {
            valid: result.valid,
            loading: false,
            title: result.title,
          };
          videoStatusCache.set(id, status);
          newStatuses.set(id, status);
        });
        setStatuses(new Map(newStatuses));
      });
    }
  }, [youtubeIds.join(',')]);

  return statuses;
}

// Get all invalid video IDs from cache
export function getInvalidVideoIds(): string[] {
  const invalid: string[] = [];
  videoStatusCache.forEach((status, id) => {
    if (!status.valid && !status.loading) {
      invalid.push(id);
    }
  });
  return invalid;
}
