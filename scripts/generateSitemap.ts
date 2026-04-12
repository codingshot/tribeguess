/**
 * Sitemap Generator Script
 * 
 * Generates a comprehensive sitemap.xml from all data sources:
 * - Static pages
 * - Tribes from tribes.json
 * - Recipes from recipes.ts
 * - Blog posts from blogPosts.json
 * - Language families from languageFamilies.json
 * - Religions from traditionalReligions.ts
 * 
 * Run with: npx tsx scripts/generateSitemap.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://africantribenames.com';
const TODAY = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Static pages
const staticPages: SitemapEntry[] = [
  { loc: '/', lastmod: TODAY, changefreq: 'weekly', priority: 1.0 },
  { loc: '/learn', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/tribes', lastmod: TODAY, changefreq: 'weekly', priority: 0.95 },
  { loc: '/names', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/recipes', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/languages', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/religions', lastmod: TODAY, changefreq: 'weekly', priority: 0.9 },
  { loc: '/religion-compare', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/religion-timeline', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/global-origins', lastmod: TODAY, changefreq: 'monthly', priority: 0.8 },
  { loc: '/people', lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
  { loc: '/quiz', lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
  { loc: '/blog', lastmod: TODAY, changefreq: 'weekly', priority: 0.8 },
  { loc: '/compare', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/video-gallery', lastmod: TODAY, changefreq: 'weekly', priority: 0.7 },
  { loc: '/docs', lastmod: TODAY, changefreq: 'monthly', priority: 0.7 },
  { loc: '/random', lastmod: TODAY, changefreq: 'monthly', priority: 0.6 },
  { loc: '/privacy', lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  { loc: '/terms', lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
];

function generateSitemapXML(entries: SitemapEntry[]): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
  
  const footer = '\n</urlset>';
  
  const urls = entries.map(entry => `
  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('');
  
  return header + urls + footer;
}

async function loadTribes(): Promise<SitemapEntry[]> {
  try {
    const tribesPath = path.join(process.cwd(), 'src/data/tribes.json');
    const tribesData = JSON.parse(fs.readFileSync(tribesPath, 'utf-8'));
    
    const entries: SitemapEntry[] = [];
    
    // Extract all tribes with slugs
    if (tribesData.tribes && Array.isArray(tribesData.tribes)) {
      for (const tribe of tribesData.tribes) {
        if (tribe.slug) {
          entries.push({
            loc: `/learn/${tribe.slug}`,
            lastmod: TODAY,
            changefreq: 'monthly',
            priority: 0.8
          });
          
          // Add slug aliases if they exist
          if (tribe.slugAliases && Array.isArray(tribe.slugAliases)) {
            for (const alias of tribe.slugAliases) {
              entries.push({
                loc: `/learn/${alias}`,
                lastmod: TODAY,
                changefreq: 'monthly',
                priority: 0.7
              });
            }
          }
        }
      }
    }
    
    console.log(`✓ Loaded ${entries.length} tribe pages`);
    return entries;
  } catch (error) {
    console.error('Error loading tribes:', error);
    return [];
  }
}

async function loadRecipes(): Promise<SitemapEntry[]> {
  try {
    // Read the TypeScript file as text and extract recipe IDs
    const recipesPath = path.join(process.cwd(), 'src/data/recipes.ts');
    const recipesContent = fs.readFileSync(recipesPath, 'utf-8');
    
    // Extract all recipe IDs using regex
    const idMatches = recipesContent.matchAll(/id:\s*["']([^"']+)["']/g);
    const entries: SitemapEntry[] = [];
    
    for (const match of idMatches) {
      entries.push({
        loc: `/recipe/${match[1]}`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: 0.7
      });
    }
    
    console.log(`✓ Loaded ${entries.length} recipe pages`);
    return entries;
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
}

async function loadBlogPosts(): Promise<SitemapEntry[]> {
  try {
    const blogPath = path.join(process.cwd(), 'src/data/blogPosts.json');
    const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
    
    const entries: SitemapEntry[] = [];
    
    if (Array.isArray(blogData)) {
      for (const post of blogData) {
        if (post.slug) {
          entries.push({
            loc: `/blog/${post.slug}`,
            lastmod: post.publishDate || TODAY,
            changefreq: 'monthly',
            priority: 0.7
          });
        }
      }
    }
    
    console.log(`✓ Loaded ${entries.length} blog posts`);
    return entries;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

async function loadLanguageFamilies(): Promise<SitemapEntry[]> {
  try {
    const langPath = path.join(process.cwd(), 'src/data/languageFamilies.json');
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
    
    const entries: SitemapEntry[] = [];
    
    if (langData.languageFamilies && Array.isArray(langData.languageFamilies)) {
      for (const family of langData.languageFamilies) {
        if (family.slug) {
          entries.push({
            loc: `/languages/${family.slug}`,
            lastmod: TODAY,
            changefreq: 'monthly',
            priority: 0.8
          });
        }
      }
    }
    
    console.log(`✓ Loaded ${entries.length} language family pages`);
    return entries;
  } catch (error) {
    console.error('Error loading language families:', error);
    return [];
  }
}

async function loadReligions(): Promise<SitemapEntry[]> {
  try {
    // Read the TypeScript file as text and extract religion IDs
    const religionsPath = path.join(process.cwd(), 'src/data/traditionalReligions.ts');
    const religionsContent = fs.readFileSync(religionsPath, 'utf-8');
    
    // Extract all religion IDs using regex
    const idMatches = religionsContent.matchAll(/^\s+id:\s*["']([^"']+)["']/gm);
    const entries: SitemapEntry[] = [];
    
    for (const match of idMatches) {
      entries.push({
        loc: `/religion/${match[1]}`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: 0.7
      });
    }
    
    console.log(`✓ Loaded ${entries.length} religion pages`);
    return entries;
  } catch (error) {
    console.error('Error loading religions:', error);
    return [];
  }
}

async function loadIngredients(): Promise<SitemapEntry[]> {
  try {
    // Read the TypeScript file as text and extract ingredient IDs
    const ingredientsPath = path.join(process.cwd(), 'src/data/ingredients.ts');
    const ingredientsContent = fs.readFileSync(ingredientsPath, 'utf-8');
    
    // Extract all ingredient IDs using regex
    const idMatches = ingredientsContent.matchAll(/^\s+id:\s*["']([^"']+)["']/gm);
    const entries: SitemapEntry[] = [];
    
    for (const match of idMatches) {
      entries.push({
        loc: `/ingredient/${match[1]}`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: 0.6
      });
    }
    
    console.log(`✓ Loaded ${entries.length} ingredient pages`);
    return entries;
  } catch (error) {
    console.error('Error loading ingredients:', error);
    return [];
  }
}

async function main() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  // Load all data sources in parallel
  const [tribes, recipes, blogPosts, languages, religions, ingredients] = await Promise.all([
    loadTribes(),
    loadRecipes(),
    loadBlogPosts(),
    loadLanguageFamilies(),
    loadReligions(),
    loadIngredients()
  ]);
  
  // Combine all entries
  const allEntries = [
    ...staticPages,
    ...blogPosts,
    ...tribes,
    ...languages,
    ...religions,
    ...recipes,
    ...ingredients
  ];
  
  // Remove duplicates based on loc
  const uniqueEntries = Array.from(
    new Map(allEntries.map(entry => [entry.loc, entry])).values()
  );
  
  // Generate XML
  const sitemapXML = generateSitemapXML(uniqueEntries);
  
  // Write to public folder
  const outputPath = path.join(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXML);
  
  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`📄 Total URLs: ${uniqueEntries.length}`);
  console.log(`📍 Output: ${outputPath}`);
  
  // Summary breakdown
  console.log('\n📊 Breakdown:');
  console.log(`   Static pages: ${staticPages.length}`);
  console.log(`   Tribe pages: ${tribes.length}`);
  console.log(`   Recipe pages: ${recipes.length}`);
  console.log(`   Blog posts: ${blogPosts.length}`);
  console.log(`   Language families: ${languages.length}`);
  console.log(`   Religion pages: ${religions.length}`);
  console.log(`   Ingredient pages: ${ingredients.length}`);
}

main().catch(console.error);
