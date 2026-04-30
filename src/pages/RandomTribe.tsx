import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllTribes } from '@/lib/tribeDetection';
import { Helmet } from 'react-helmet-async';
import { Loader2, RefreshCw } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Session-level recency buffer to avoid repeat picks
const RECENT_KEY = 'tribeguess_recent_random';
const RECENT_MAX = 15;

function getRecentSlugs(): string[] {
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s: unknown) => typeof s === 'string').slice(0, RECENT_MAX) : [];
  } catch { return []; }
}

function pushRecentSlug(slug: string) {
  try {
    const recent = getRecentSlugs();
    recent.push(slug);
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(-RECENT_MAX)));
  } catch { /* storage unavailable */ }
}

/** Eligibility: tribe must have slug, name, description, and region to be "displayable" */
function isEligible(tribe: ReturnType<typeof getAllTribes>[number]): boolean {
  return Boolean(
    tribe.slug &&
    tribe.name &&
    tribe.description &&
    tribe.description.length > 10 &&
    tribe.region
  );
}

/**
 * RandomTribe page - SEO-optimized redirect to a random tribe
 * Filters for displayable records and avoids recent duplicates within session.
 */
export default function RandomTribe() {
  const navigate = useNavigate();
  const attempted = useRef(false);

  useEffect(() => {
    // Guard against double-fire in StrictMode
    if (attempted.current) return;
    attempted.current = true;

    const allTribes = getAllTribes();
    const eligible = allTribes.filter(isEligible);

    if (eligible.length === 0) {
      // No eligible tribes at all — go to browse
      navigate('/learn', { replace: true });
      return;
    }

    const recentSlugs = new Set(getRecentSlugs());

    // Prefer tribes not recently shown
    let pool = eligible.filter(t => !recentSlugs.has(t.slug));
    // If all eligible were recently shown, reset and use full pool
    if (pool.length === 0) {
      try { sessionStorage.removeItem(RECENT_KEY); } catch {
        /* sessionStorage unavailable */
      }
      pool = eligible;
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    pushRecentSlug(pick.slug);
    // Use replace to avoid back button returning to /random
    navigate(`/learn/${pick.slug}`, { replace: true });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Discover a Random African Tribe | TribeGuess</title>
        <meta 
          name="description" 
          content="Explore African cultural heritage by discovering a random tribe. Learn about their traditions, naming conventions, history, and famous people from across the continent." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://africantribenames.com/random" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Discover a Random African Tribe | TribeGuess" />
        <meta property="og:description" content="Explore African cultural heritage by discovering a random tribe. Learn about traditions, naming conventions, and history." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://africantribenames.com/random" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discover a Random African Tribe | TribeGuess" />
        <meta name="twitter:description" content="Explore African cultural heritage by discovering a random tribe." />
        
        {/* Keywords */}
        <meta name="keywords" content="African tribes, random tribe, discover Africa, African culture, tribal traditions, ethnic groups, African heritage" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-6">Discovering a random tribe...</p>
          <noscript>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">JavaScript is required for random discovery.</p>
              <Link to="/learn" className="text-primary hover:underline">Browse all tribes instead →</Link>
            </div>
          </noscript>
        </div>
      </div>
    </>
  );
}
