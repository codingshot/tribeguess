import { useMemo } from 'react';
import { getAllTribes } from '@/lib/tribeDetection';
import { sanitizeSearchQuery, safeArray, normalizeForSearch } from '@/lib/dataValidation';
import { blogPosts, BlogPost } from '@/data/blogPosts';

export interface SearchResult {
  type: 'tribe' | 'blog';
  title: string;
  description: string;
  slug: string;
  tags: string[];
  region?: string;
  emoji?: string;
}

export function useGlobalSearch(query: string): SearchResult[] {
  return useMemo(() => {
    const sanitized = sanitizeSearchQuery(query, 100);
    if (!sanitized || sanitized.length < 2) return [];
    
    const searchNorm = normalizeForSearch(sanitized);
    const results: SearchResult[] = [];
    const seen = new Set<string>();
    
    // Search tribes
    const tribes = getAllTribes();
    tribes.forEach(tribe => {
      // Deduplicate by slug
      if (seen.has(tribe.slug)) return;
      
      const nameNorm = normalizeForSearch(tribe.name || '');
      const descNorm = normalizeForSearch(tribe.description || '');
      const regionNorm = normalizeForSearch(tribe.region || '');
      const matchesName = nameNorm.includes(searchNorm);
      const matchesDescription = descNorm.includes(searchNorm);
      const matchesRegion = regionNorm.includes(searchNorm);
      const matchesNames = [
        ...safeArray<string>(tribe.commonNames?.male),
        ...safeArray<string>(tribe.commonNames?.female)
      ].some(n => typeof n === 'string' && normalizeForSearch(n).includes(searchNorm));
      
      if (matchesName || matchesDescription || matchesRegion || matchesNames) {
        seen.add(tribe.slug);
        results.push({
          type: 'tribe',
          title: tribe.name,
          description: (tribe.description || 'African ethnic group').slice(0, 100) + '...',
          slug: `/learn/${tribe.slug}`,
          tags: [tribe.region, tribe.language?.family || ''].filter(Boolean),
          region: tribe.region,
        });
      }
    });
    
    // Search blog posts
    blogPosts.forEach(post => {
      if (!post.title || !post.slug) return;
      const titleNorm = normalizeForSearch(post.title);
      const excerptNorm = normalizeForSearch(post.excerpt || '');
      const matchesTitle = titleNorm.includes(searchNorm);
      const matchesExcerpt = excerptNorm.includes(searchNorm);
      const matchesTags = (post.tags || []).some(t => normalizeForSearch(t).includes(searchNorm));
      const matchesRegion = normalizeForSearch(post.region || '').includes(searchNorm);
      
      if (matchesTitle || matchesExcerpt || matchesTags || matchesRegion) {
        results.push({
          type: 'blog',
          title: post.title,
          description: (post.excerpt || '').slice(0, 100) + '...',
          slug: `/blog/${post.slug}`,
          tags: (post.tags || []).slice(0, 3),
          region: post.region,
          emoji: post.emoji,
        });
      }
    });
    
    // Sort: prioritize exact title matches, then description matches
    return results.sort((a, b) => {
      const aTitleMatch = normalizeForSearch(a.title).includes(searchNorm) ? 0 : 1;
      const bTitleMatch = normalizeForSearch(b.title).includes(searchNorm) ? 0 : 1;
      return aTitleMatch - bTitleMatch;
    }).slice(0, 20);
  }, [query]);
}

export function getAllBlogTags(): string[] {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getAllBlogRegions(): string[] {
  const regionSet = new Set<string>();
  blogPosts.forEach(post => {
    regionSet.add(post.region);
  });
  return Array.from(regionSet).sort();
}
