/**
 * Sitemap Utilities
 * 
 * Helper functions for generating sitemap data at runtime.
 * This is useful for dynamic sitemap generation or for 
 * providing sitemap data to the frontend.
 */

import tribesData from '@/data/tribes.json';
import blogPosts from '@/data/blogPosts.json';
import languageFamilies from '@/data/languageFamilies.json';
import { recipes } from '@/data/recipes';
import { traditionalReligions } from '@/data/traditionalReligions';
import { ingredients } from '@/data/ingredients';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  title?: string;
  section: 'static' | 'tribe' | 'recipe' | 'blog' | 'language' | 'religion' | 'ingredient';
}

const TODAY = new Date().toISOString().split('T')[0];

/**
 * Get all URLs for the sitemap
 */
export function getAllSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  
  // Static pages
  const staticPages = [
    { loc: '/', title: 'Home', priority: 1.0 },
    { loc: '/learn', title: 'Explore Tribes', priority: 0.9 },
    { loc: '/names', title: 'Names Gallery', priority: 0.9 },
    { loc: '/recipes', title: 'Traditional Recipes', priority: 0.9 },
    { loc: '/languages', title: 'Language Families', priority: 0.9 },
    { loc: '/religions', title: 'Religions & Traditions', priority: 0.9 },
    { loc: '/people', title: 'Famous People', priority: 0.8 },
    { loc: '/quiz', title: 'Cultural Quizzes', priority: 0.8 },
    { loc: '/blog', title: 'Cultural Blog', priority: 0.8 },
    { loc: '/global-origins', title: 'Global Origins', priority: 0.8 },
    { loc: '/docs', title: 'Documentation', priority: 0.7 },
  ];
  
  for (const page of staticPages) {
    urls.push({
      loc: page.loc,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: page.priority,
      title: page.title,
      section: 'static'
    });
  }
  
  // Tribes
  if (tribesData.tribes && Array.isArray(tribesData.tribes)) {
    for (const tribe of tribesData.tribes as { slug: string; name: string }[]) {
      if (tribe.slug) {
        urls.push({
          loc: `/learn/${tribe.slug}`,
          lastmod: TODAY,
          changefreq: 'monthly',
          priority: 0.8,
          title: tribe.name,
          section: 'tribe'
        });
      }
    }
  }
  
  // Recipes
  for (const recipe of recipes) {
    urls.push({
      loc: `/recipe/${recipe.id}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: 0.7,
      title: recipe.name,
      section: 'recipe'
    });
  }
  
  // Blog posts
  for (const post of blogPosts as { slug: string; title: string; publishDate?: string }[]) {
    urls.push({
      loc: `/blog/${post.slug}`,
      lastmod: post.publishDate || TODAY,
      changefreq: 'monthly',
      priority: 0.7,
      title: post.title,
      section: 'blog'
    });
  }
  
  // Language families
  if (languageFamilies.languageFamilies && Array.isArray(languageFamilies.languageFamilies)) {
    for (const family of languageFamilies.languageFamilies as { slug: string; name: string }[]) {
      if (family.slug) {
        urls.push({
          loc: `/languages/${family.slug}`,
          lastmod: TODAY,
          changefreq: 'monthly',
          priority: 0.8,
          title: family.name,
          section: 'language'
        });
      }
    }
  }
  
  // Religions
  for (const religion of traditionalReligions) {
    urls.push({
      loc: `/religions/${religion.id}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: 0.7,
      title: religion.name,
      section: 'religion'
    });
  }
  
  // Ingredients
  for (const ingredient of ingredients) {
    urls.push({
      loc: `/ingredient/${ingredient.id}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: 0.6,
      title: ingredient.name,
      section: 'ingredient'
    });
  }
  
  return urls;
}

/**
 * Get sitemap stats
 */
export function getSitemapStats() {
  const urls = getAllSitemapUrls();
  
  const bySection = urls.reduce((acc, url) => {
    acc[url.section] = (acc[url.section] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: urls.length,
    bySection,
    lastUpdated: TODAY
  };
}

/**
 * Generate sitemap XML string
 */
export function generateSitemapXML(baseUrl: string = 'https://africantribenames.com'): string {
  const urls = getAllSitemapUrls();
  
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  const footer = '\n</urlset>';
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('');
  
  return header + urlElements + footer;
}
