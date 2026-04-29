/**
 * Unified search across names, tribes (search engine), blog posts, and recipes.
 * Used by the header typeahead and cross-section “no results” hints.
 */

import { searchNames } from '@/lib/searchEngine';
import { blogPosts } from '@/data/blogPosts';
import { getAllRecipes, type Recipe } from '@/data/recipes';
import { sanitizeSearchQuery, normalizeForSearch } from '@/lib/dataValidation';

export type UnifiedHitKind = 'tribe' | 'name' | 'blog' | 'recipe';

export interface UnifiedSearchHit {
  id: string;
  kind: UnifiedHitKind;
  title: string;
  subtitle?: string;
  href: string;
  /** Higher = better match */
  score: number;
}

function blogMatches(post: (typeof blogPosts)[number], norm: string): boolean {
  if (!post.title) return false;
  return (
    normalizeForSearch(post.title).includes(norm) ||
    normalizeForSearch(post.excerpt || '').includes(norm) ||
    (post.tags || []).some(t => normalizeForSearch(t).includes(norm)) ||
    normalizeForSearch(post.region || '').includes(norm)
  );
}

function recipeMatches(recipe: Recipe, norm: string): boolean {
  return (
    normalizeForSearch(recipe.name).includes(norm) ||
    normalizeForSearch(recipe.tribeName).includes(norm) ||
    normalizeForSearch(recipe.description || '').includes(norm) ||
    normalizeForSearch(recipe.category || '').includes(norm)
  );
}

/**
 * Global unified search: names + tribes (phonetic/fuzzy via search engine), blog, recipes.
 */
export function searchGlobalUnified(query: string, opts?: { limit?: number }): UnifiedSearchHit[] {
  const limit = Math.min(40, Math.max(4, opts?.limit ?? 24));
  const sanitized = sanitizeSearchQuery(query, 100);
  if (!sanitized || sanitized.length < 2) return [];

  const norm = normalizeForSearch(sanitized);
  const hits: UnifiedSearchHit[] = [];
  const seenHref = new Set<string>();

  const push = (h: UnifiedSearchHit): boolean => {
    if (seenHref.has(h.href)) return false;
    seenHref.add(h.href);
    hits.push(h);
    return hits.length >= limit;
  };

  // Name/tribe matches can crowd out blog and recipes; reserve slots for cross-type results.
  const engineSlotBudget = Math.min(12, Math.max(3, limit - 6));
  let engineUsed = 0;
  const engineHits = searchNames(sanitized, 28);

  for (const e of engineHits) {
    if (hits.length >= limit || engineUsed >= engineSlotBudget) break;
    const slug = e.tribeSlug;
    if (!slug) continue;

    const lenBefore = hits.length;

    if (e.type === 'name') {
      if (
        push({
          id: `name-${e.id}`,
          kind: 'name',
          title: e.name,
          subtitle: e.tribe ? `${e.tribe}${e.gender ? ` · ${e.gender}` : ''}` : 'Name',
          href: `/learn/${slug}`,
          score: 0.5 + e.score * 0.5,
        })
      )
        break;
    } else if (e.type === 'tribe') {
      if (
        push({
          id: `tribe-${slug}`,
          kind: 'tribe',
          title: e.name,
          subtitle: 'Tribe',
          href: `/learn/${slug}`,
          score: 0.45 + e.score * 0.5,
        })
      )
        break;
    }

    if (hits.length > lenBefore) engineUsed++;
  }

  let blogAdded = 0;
  const blogCap = 8;
  for (const post of blogPosts) {
    if (blogAdded >= blogCap || hits.length >= limit) break;
    if (!post.slug || !blogMatches(post, norm)) continue;
    const n = hits.length;
    if (
      push({
        id: `blog-${post.slug}`,
        kind: 'blog',
        title: post.title,
        subtitle: post.region ? `${post.region} · Blog` : 'Blog',
        href: `/blog/${post.slug}`,
        score: 0.62,
      })
    )
      break;
    if (hits.length > n) blogAdded++;
  }

  let recipeAdded = 0;
  const recipeCap = 8;
  for (const recipe of getAllRecipes()) {
    if (recipeAdded >= recipeCap || hits.length >= limit) break;
    if (!recipe.id || !recipeMatches(recipe, norm)) continue;
    const n = hits.length;
    if (
      push({
        id: `recipe-${recipe.id}`,
        kind: 'recipe',
        title: recipe.name,
        subtitle: `${recipe.tribeName} · Recipe`,
        href: `/recipe/${recipe.id}`,
        score: 0.58,
      })
    )
      break;
    if (hits.length > n) recipeAdded++;
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

const FALLBACK_KIND_ORDER: UnifiedHitKind[] = ['recipe', 'blog', 'tribe', 'name'];

/**
 * When a page-specific list is empty, surface a mix of tribes, names, blog, and recipes
 * so food- or culture-oriented queries still find something useful.
 */
export function getCrossSectionFallback(query: string, maxItems = 10): UnifiedSearchHit[] {
  const pool = searchGlobalUnified(query, { limit: 36 });
  if (pool.length === 0) return [];

  const buckets: Record<UnifiedHitKind, UnifiedSearchHit[]> = {
    recipe: [],
    blog: [],
    tribe: [],
    name: [],
  };
  for (const h of pool) {
    buckets[h.kind].push(h);
  }

  const out: UnifiedSearchHit[] = [];
  let progress = true;
  while (out.length < maxItems && progress) {
    progress = false;
    for (const k of FALLBACK_KIND_ORDER) {
      const next = buckets[k].shift();
      if (next) {
        out.push(next);
        progress = true;
        if (out.length >= maxItems) break;
      }
    }
  }
  return out;
}
