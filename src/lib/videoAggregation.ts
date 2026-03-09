// Video aggregation utilities - collects all videos from tribes, recipes, and other sources

import tribesData from '@/data/tribes.json';
import { recipes } from '@/data/recipes';

export type VideoSourceType = 'TRIBE_PAGE' | 'TRIBE_LANGUAGE' | 'RECIPE' | 'DOCUMENTARY' | 'YOUTUBE_GENERIC';

export interface VideoItem {
  id: string;
  youtube: string;
  youtubeId: string;
  title?: string;
  channelTitle?: string;
  description?: string;
  thumbnailUrl?: string;
  sourceType: VideoSourceType;
  tribeIds?: string[];
  tribeNames?: string[];
  tags?: string[];
  durationSeconds?: number;
  originUrl?: string;
  originLabel?: string;
  category?: string;
  region?: string;
  createdAt?: string;
}

// Fallback videos for when queue is empty
export const VIBE_VIDEOS: string[] = [
  'c-T7_mJTOkI', // Kikuyu documentary
  '8yN643vymPg', // Luo documentary
  'GsDCFDLOQFo', // Maasai documentary
  '_W1cHwldsCI', // Yoruba documentary
  't9F3eIJgD2I', // Igbo documentary
  'Jh5VQYwJfNY', // Zulu documentary
  'N_K8TvdIoPM', // Shona documentary
];

export function getYoutubeId(url: string): string {
  if (!url) return '';
  
  // Already a video ID (11 chars, alphanumeric with _ and -)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  // YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return url;
}

export function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export function getYoutubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// Validate if a YouTube video ID looks valid
export function isValidYoutubeId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

// Check if video is playable and get metadata (async validation with timeout)
export async function validateYoutubeVideo(videoId: string): Promise<{ 
  valid: boolean; 
  title?: string;
  duration?: string;
  durationSeconds?: number;
  errorType?: 'removed' | 'private' | 'restricted' | 'network' | 'unknown';
}> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout
    
    const response = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    
    if (!response.ok) {
      // Network or service error - fail open to avoid false positives
      if (response.status >= 500) {
        return { valid: true, errorType: 'network' };
      }
      return { valid: true }; // Fail open on client errors too
    }
    
    const data = await response.json();
    
    if (data.error) {
      const errorMsg = data.error.toLowerCase();
      let errorType: 'removed' | 'private' | 'restricted' | 'unknown' = 'unknown';
      
      if (errorMsg.includes('not found') || errorMsg.includes('removed')) {
        errorType = 'removed';
      } else if (errorMsg.includes('private')) {
        errorType = 'private';
      } else if (errorMsg.includes('unavailable') || errorMsg.includes('restricted')) {
        errorType = 'restricted';
      }
      
      console.warn(`[VideoAudit] Invalid video ${videoId}: ${data.error} (type: ${errorType})`);
      return { valid: false, errorType };
    }
    
    return { 
      valid: true, 
      title: data.title,
    };
  } catch (err) {
    // If fetch fails (timeout, network error), assume valid (fail open)
    // This prevents temporary network issues from marking videos as broken
    if (err instanceof Error && err.name === 'AbortError') {
      console.warn(`[VideoAudit] Validation timeout for ${videoId} - assuming valid`);
    }
    return { valid: true, errorType: 'network' };
  }
}

// Cache for video durations
const videoDurationCache = new Map<string, number>();

// Get video duration using YouTube oEmbed (limited info) or img trick
export async function getVideoDuration(videoId: string): Promise<number | null> {
  if (videoDurationCache.has(videoId)) {
    return videoDurationCache.get(videoId)!;
  }
  
  try {
    // Try to get duration from YouTube's thumbnail - if it loads, video exists
    const img = new Image();
    img.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    
    return new Promise((resolve) => {
      img.onload = () => {
        // Video exists but we can't get duration without API key
        // Return null to indicate video is valid but duration unknown
        resolve(null);
      };
      img.onerror = () => {
        resolve(null);
      };
      // Timeout after 3 seconds
      setTimeout(() => resolve(null), 3000);
    });
  } catch {
    return null;
  }
}

// Batch validate videos
export async function validateVideos(videoIds: string[]): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();
  
  const validations = await Promise.all(
    videoIds.map(async (id) => {
      const result = await validateYoutubeVideo(id);
      return { id, valid: result.valid };
    })
  );
  
  validations.forEach(({ id, valid }) => {
    results.set(id, valid);
  });
  
  return results;
}

// Get all videos from all sources
export function getAllVideos(): VideoItem[] {
  const videos: VideoItem[] = [];
  const tribes = tribesData.tribes as any[];
  const seenIds = new Set<string>(); // Dedupe by generated video ID
  // Collect tribe videos
  tribes.forEach((tribe) => {
    // Culture documentary video
    if (tribe.youtubeVideoId && isValidYoutubeId(tribe.youtubeVideoId)) {
      const videoId = `tribe-culture-${tribe.id}-${tribe.youtubeVideoId}`;
      if (!seenIds.has(videoId)) {
        seenIds.add(videoId);
        videos.push({
          id: videoId,
          youtube: tribe.youtubeVideoId,
          youtubeId: tribe.youtubeVideoId,
          title: `${tribe.name} Culture & Traditions`,
          description: tribe.description?.substring(0, 200),
          thumbnailUrl: getYoutubeThumbnail(tribe.youtubeVideoId),
          sourceType: 'TRIBE_PAGE',
          tribeIds: [tribe.id],
          tribeNames: [tribe.name],
          tags: ['culture', 'documentary', 'traditions'],
          originUrl: `/learn/${tribe.slug}`,
          originLabel: `${tribe.name} Tribe Page`,
          category: 'documentary',
          region: tribe.region
        });
      }
    }
    
    // Language tutorial video
    if (tribe.languageVideoId && isValidYoutubeId(tribe.languageVideoId)) {
      const videoId = `tribe-language-${tribe.id}-${tribe.languageVideoId}`;
      if (!seenIds.has(videoId)) {
        seenIds.add(videoId);
        videos.push({
          id: videoId,
          youtube: tribe.languageVideoId,
          youtubeId: tribe.languageVideoId,
          title: `Learn ${tribe.language?.name || tribe.name} Language`,
          description: `Language tutorial for the ${tribe.name} people`,
          thumbnailUrl: getYoutubeThumbnail(tribe.languageVideoId),
          sourceType: 'TRIBE_LANGUAGE',
          tribeIds: [tribe.id],
          tribeNames: [tribe.name],
          tags: ['language', 'tutorial', 'learning'],
          originUrl: `/learn/${tribe.slug}`,
          originLabel: `${tribe.name} Language`,
          category: 'language',
          region: tribe.region
        });
      }
    }
  });
  
  // Collect recipe videos - use youtubeId as part of key to ensure uniqueness
  const seenYoutubeIds = new Set<string>();
  
  recipes.forEach((recipe) => {
    if (recipe.youtubeVideoId && isValidYoutubeId(recipe.youtubeVideoId)) {
      // Skip if we've already added this youtubeId
      if (seenYoutubeIds.has(recipe.youtubeVideoId)) {
        return;
      }
      seenYoutubeIds.add(recipe.youtubeVideoId);
      
      const tribe = tribes.find(t => t.slug === recipe.tribeSlug);
      videos.push({
        id: `recipe-${recipe.id}-${recipe.youtubeVideoId}`,
        youtube: recipe.youtubeVideoId,
        youtubeId: recipe.youtubeVideoId,
        title: `How to Cook ${recipe.name}`,
        description: recipe.description?.substring(0, 200),
        thumbnailUrl: getYoutubeThumbnail(recipe.youtubeVideoId),
        sourceType: 'RECIPE',
        tribeIds: tribe ? [tribe.id] : [],
        tribeNames: [recipe.tribeName],
        tags: ['recipe', 'cooking', recipe.category],
        originUrl: `/recipe/${recipe.id}`,
        originLabel: `${recipe.name} Recipe`,
        category: 'recipe',
        region: recipe.region
      });
    }
  });
  
  return videos;
}

// Get videos by tribe
export function getVideosByTribe(tribeId: string): VideoItem[] {
  return getAllVideos().filter(v => v.tribeIds?.includes(tribeId));
}

// Get videos by category
export function getVideosByCategory(category: 'recipe' | 'documentary' | 'language' | 'all'): VideoItem[] {
  if (category === 'all') return getAllVideos();
  return getAllVideos().filter(v => v.category === category);
}

// Search videos
export function searchVideos(query: string, filters?: {
  category?: string;
  tribeIds?: string[];
  sourceType?: VideoSourceType;
}): VideoItem[] {
  let videos = getAllVideos();
  
  // Apply filters
  if (filters?.category && filters.category !== 'all') {
    videos = videos.filter(v => v.category === filters.category);
  }
  
  if (filters?.tribeIds?.length) {
    videos = videos.filter(v => 
      v.tribeIds?.some(id => filters.tribeIds!.includes(id))
    );
  }
  
  if (filters?.sourceType) {
    videos = videos.filter(v => v.sourceType === filters.sourceType);
  }
  
  // Apply search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    videos = videos.filter(v => 
      v.title?.toLowerCase().includes(lowerQuery) ||
      v.description?.toLowerCase().includes(lowerQuery) ||
      v.tribeNames?.some(n => n.toLowerCase().includes(lowerQuery)) ||
      v.tags?.some(t => t.toLowerCase().includes(lowerQuery)) ||
      v.originLabel?.toLowerCase().includes(lowerQuery)
    );
  }
  
  return videos;
}

// Get unique tribes that have videos
export function getVideoTribes(): { id: string; name: string; count: number }[] {
  const videos = getAllVideos();
  const tribeMap = new Map<string, { name: string; count: number }>();
  
  videos.forEach(v => {
    v.tribeIds?.forEach((id, idx) => {
      const name = v.tribeNames?.[idx] || id;
      const existing = tribeMap.get(id);
      if (existing) {
        existing.count++;
      } else {
        tribeMap.set(id, { name, count: 1 });
      }
    });
  });
  
  return Array.from(tribeMap.entries())
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.count - a.count);
}

// Find unplayed fallback video
export function findUnplayedFallbackVideo(playedIds: string[]): VideoItem | null {
  const playedSet = new Set(playedIds);
  
  // First try from VIBE_VIDEOS
  for (const id of VIBE_VIDEOS) {
    if (!playedSet.has(id)) {
      return {
        id: `fallback-${id}`,
        youtube: id,
        youtubeId: id,
        title: 'African Culture Documentary',
        thumbnailUrl: getYoutubeThumbnail(id),
        sourceType: 'DOCUMENTARY',
        tags: ['fallback', 'documentary'],
        category: 'documentary'
      };
    }
  }
  
  // Then try random from all videos
  const allVideos = getAllVideos();
  const unplayed = allVideos.filter(v => !playedSet.has(v.youtubeId));
  if (unplayed.length > 0) {
    return unplayed[Math.floor(Math.random() * unplayed.length)];
  }
  
  // Last resort: random from VIBE_VIDEOS
  const randomId = VIBE_VIDEOS[Math.floor(Math.random() * VIBE_VIDEOS.length)];
  return {
    id: `fallback-${randomId}`,
    youtube: randomId,
    youtubeId: randomId,
    title: 'African Culture Documentary',
    thumbnailUrl: getYoutubeThumbnail(randomId),
    sourceType: 'DOCUMENTARY',
    tags: ['fallback'],
    category: 'documentary'
  };
}
