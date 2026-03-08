import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// Sitemap Generator Plugin
function sitemapGenerator(): Plugin {
  return {
    name: 'sitemap-generator',
    closeBundle() {
      // Only run in production builds
      console.log('📍 Generating sitemap.xml...');
      
      try {
        const TODAY = new Date().toISOString().split('T')[0];
        const SITE_URL = 'https://tribeguess.com';
        
        interface SitemapEntry {
          loc: string;
          lastmod: string;
          changefreq: string;
          priority: number;
        }
        
        const entries: SitemapEntry[] = [];
        
        // Static pages
        const staticPages = [
          { loc: '/', priority: 1.0 },
          { loc: '/learn', priority: 0.9 },
          { loc: '/names', priority: 0.9 },
          { loc: '/recipes', priority: 0.9 },
          { loc: '/languages', priority: 0.9 },
          { loc: '/religions', priority: 0.9 },
          { loc: '/religion-compare', priority: 0.7 },
          { loc: '/religion-timeline', priority: 0.7 },
          { loc: '/global-origins', priority: 0.8 },
          { loc: '/people', priority: 0.8 },
          { loc: '/quiz', priority: 0.8 },
          { loc: '/blog', priority: 0.8 },
          { loc: '/video-gallery', priority: 0.7 },
          { loc: '/docs', priority: 0.7 },
          { loc: '/random', priority: 0.6 },
          { loc: '/privacy', priority: 0.3 },
          { loc: '/terms', priority: 0.3 },
        ];

        // Also add tribe-blog slugs
        const tribeBlogEntries: SitemapEntry[] = [];
        
        for (const page of staticPages) {
          entries.push({
            loc: page.loc,
            lastmod: TODAY,
            changefreq: page.priority >= 0.8 ? 'weekly' : 'monthly',
            priority: page.priority
          });
        }
        
        // Load tribes
        const tribesPath = path.resolve(__dirname, 'src/data/tribes.json');
        if (fs.existsSync(tribesPath)) {
          const tribesData = JSON.parse(fs.readFileSync(tribesPath, 'utf-8'));
          if (tribesData.tribes) {
            for (const tribe of tribesData.tribes) {
              if (tribe.slug) {
                entries.push({
                  loc: `/learn/${tribe.slug}`,
                  lastmod: TODAY,
                  changefreq: 'monthly',
                  priority: 0.8
                });
              }
            }
          }
          console.log(`   ✓ ${tribesData.tribes?.length || 0} tribes`);
        }
        
        // Load blog posts
        const blogPath = path.resolve(__dirname, 'src/data/blogPosts.json');
        if (fs.existsSync(blogPath)) {
          const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf-8'));
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
          console.log(`   ✓ ${blogData.length} blog posts`);
        }
        
        // Load language families
        const langPath = path.resolve(__dirname, 'src/data/languageFamilies.json');
        if (fs.existsSync(langPath)) {
          const langData = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
          if (langData.languageFamilies) {
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
          console.log(`   ✓ ${langData.languageFamilies?.length || 0} language families`);
        }
        
        // Load recipes (extract IDs from TS file)
        const recipesPath = path.resolve(__dirname, 'src/data/recipes.ts');
        if (fs.existsSync(recipesPath)) {
          const recipesContent = fs.readFileSync(recipesPath, 'utf-8');
          const idMatches = [...recipesContent.matchAll(/^\s+id:\s*["']([^"']+)["']/gm)];
          for (const match of idMatches) {
            entries.push({
              loc: `/recipe/${match[1]}`,
              lastmod: TODAY,
              changefreq: 'monthly',
              priority: 0.7
            });
          }
          console.log(`   ✓ ${idMatches.length} recipes`);
        }
        
        // Load religions (extract IDs from TS file)
        const religionsPath = path.resolve(__dirname, 'src/data/traditionalReligions.ts');
        if (fs.existsSync(religionsPath)) {
          const religionsContent = fs.readFileSync(religionsPath, 'utf-8');
          const idMatches = [...religionsContent.matchAll(/^\s+id:\s*["']([^"']+)["']/gm)];
          for (const match of idMatches) {
            entries.push({
              loc: `/religions/${match[1]}`,
              lastmod: TODAY,
              changefreq: 'monthly',
              priority: 0.7
            });
          }
          console.log(`   ✓ ${idMatches.length} religions`);
        }
        
        // Load ingredients (extract IDs from TS file)
        const ingredientsPath = path.resolve(__dirname, 'src/data/ingredients.ts');
        if (fs.existsSync(ingredientsPath)) {
          const ingredientsContent = fs.readFileSync(ingredientsPath, 'utf-8');
          const idMatches = [...ingredientsContent.matchAll(/^\s+id:\s*["']([^"']+)["']/gm)];
          for (const match of idMatches) {
            entries.push({
              loc: `/ingredient/${match[1]}`,
              lastmod: TODAY,
              changefreq: 'monthly',
              priority: 0.6
            });
          }
          console.log(`   ✓ ${idMatches.length} ingredients`);
        }
        
        // Remove duplicates
        const uniqueEntries = Array.from(
          new Map(entries.map(entry => [entry.loc, entry])).values()
        );
        
        // Generate XML
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(e => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;
        
        // Write to dist folder (build output)
        const distPath = path.resolve(__dirname, 'dist/sitemap.xml');
        fs.writeFileSync(distPath, xml);
        
        console.log(`✅ Sitemap generated: ${uniqueEntries.length} URLs`);
      } catch (error) {
        console.error('❌ Sitemap generation failed:', error);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && sitemapGenerator(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'favicon.ico', 'robots.txt'],
      manifest: false, // Use custom manifest from public/manifest.json
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        globIgnores: ['**/og-image.png'], // Exclude large OG image from precache
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.youtube\.com\/.*/i,
            handler: 'NetworkOnly'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
