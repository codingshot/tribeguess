/**
 * Unified search across names, tribes (search engine), blog posts, and recipes.
 * Used by the header typeahead and cross-section “no results” hints.
 */

import type { TribeData } from '@/types/tribe';
import { searchNames } from '@/lib/searchEngine';
import { blogPosts } from '@/data/blogPosts';
import { getAllRecipes, type Recipe } from '@/data/recipes';
import { sanitizeSearchQuery, normalizeForSearch } from '@/lib/dataValidation';
import { getAllTribes } from '@/lib/tribeDetection';

export type UnifiedHitKind = 'tribe' | 'name' | 'blog' | 'recipe';

export interface UnifiedSearchHit {
  id: string;
  kind: UnifiedHitKind;
  title: string;
  subtitle?: string;
  href: string;
  /** Higher = better match */
  score: number;
  /** Site-relative or absolute image when we have a real asset (tribe gallery, recipe photo, etc.) */
  thumbnailUrl?: string;
  /** ISO 3166-1 alpha-2 for flagcdn flag tile when no thumbnail */
  flagCountryCode?: string;
}

let tribeSlugLookupCache: Map<string, TribeData> | null = null;

function getTribeBySlugLookup(): Map<string, TribeData> {
  if (tribeSlugLookupCache) return tribeSlugLookupCache;
  const map = new Map<string, TribeData>();
  const addKey = (raw: string | undefined, tribe: TribeData) => {
    if (!raw) return;
    const k = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!k || map.has(k)) return;
    map.set(k, tribe);
  };
  for (const tribe of getAllTribes()) {
    addKey(typeof tribe.slug === 'string' ? tribe.slug : undefined, tribe);
    addKey(typeof tribe.id === 'string' ? tribe.id : undefined, tribe);
    const aliases = (tribe as { slugAliases?: string[] }).slugAliases;
    if (Array.isArray(aliases)) {
      for (const a of aliases) addKey(a, tribe);
    }
  }
  tribeSlugLookupCache = map;
  return map;
}

function firstGalleryImage(tribe: TribeData | undefined): string | undefined {
  if (!tribe) return undefined;
  const gallery = tribe.gallery as { url?: string; src?: string }[] | undefined;
  if (!gallery?.length) return undefined;
  for (const g of gallery) {
    const u = typeof g?.url === 'string' ? g.url.trim() : typeof g?.src === 'string' ? g.src.trim() : '';
    if (u) return u;
  }
  return undefined;
}

function firstValidCountryCode(tribe: TribeData | undefined, recipe?: Recipe): string | undefined {
  const fromRecipe = recipe?.country?.trim().toUpperCase();
  if (fromRecipe && /^[A-Z]{2}$/.test(fromRecipe) && fromRecipe !== 'ALL') return fromRecipe;
  const codes = tribe?.countries?.filter(
    (c): c is string => typeof c === 'string' && /^[A-Z]{2}$/i.test(c) && c.toUpperCase() !== 'ALL'
  );
  const c0 = codes?.[0]?.toUpperCase();
  return c0 && /^[A-Z]{2}$/.test(c0) ? c0 : undefined;
}

function tribeMediaForSlug(slug: string, tribeLookup: Map<string, TribeData>): Pick<UnifiedSearchHit, 'thumbnailUrl' | 'flagCountryCode'> {
  const key = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  const tribe = key ? tribeLookup.get(key) : undefined;
  const thumb = firstGalleryImage(tribe);
  const flag = firstValidCountryCode(tribe);
  return {
    ...(thumb ? { thumbnailUrl: thumb } : {}),
    ...(!thumb && flag ? { flagCountryCode: flag } : {}),
  };
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
  const tribeLookup = getTribeBySlugLookup();

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
          ...tribeMediaForSlug(slug, tribeLookup),
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
          ...tribeMediaForSlug(slug, tribeLookup),
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
    const relatedSlug = post.relatedTribes?.find(r => r.slug?.trim())?.slug;
    const blogTribeMedia = relatedSlug ? tribeMediaForSlug(relatedSlug, tribeLookup) : {};
    if (
      push({
        id: `blog-${post.slug}`,
        kind: 'blog',
        title: post.title,
        subtitle: post.region ? `${post.region} · Blog` : 'Blog',
        href: `/blog/${post.slug}`,
        score: 0.62,
        ...blogTribeMedia,
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
    const recipeTribeKey = recipe.tribeSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    const recipeTribe = recipeTribeKey ? tribeLookup.get(recipeTribeKey) : undefined;
    const tribeKeys = tribeMediaForSlug(recipe.tribeSlug, tribeLookup);
    const recipeImage = recipe.imageUrl?.trim();
    const thumb = recipeImage || tribeKeys.thumbnailUrl;
    const flagOnly =
      !thumb && (tribeKeys.flagCountryCode || firstValidCountryCode(recipeTribe, recipe));
    if (
      push({
        id: `recipe-${recipe.id}`,
        kind: 'recipe',
        title: recipe.name,
        subtitle: `${recipe.tribeName} · Recipe`,
        href: `/recipe/${recipe.id}`,
        score: 0.58,
        ...(thumb ? { thumbnailUrl: thumb } : {}),
        ...(flagOnly ? { flagCountryCode: flagOnly } : {}),
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
