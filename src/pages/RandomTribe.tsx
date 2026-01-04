import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTribes } from '@/lib/tribeDetection';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

/**
 * RandomTribe page - SEO-optimized redirect to a random tribe
 * This page has proper meta tags for SEO and immediately redirects to a random tribe page
 */
export default function RandomTribe() {
  const navigate = useNavigate();

  useEffect(() => {
    const tribes = getAllTribes();
    if (tribes.length > 0) {
      const randomIndex = Math.floor(Math.random() * tribes.length);
      const randomTribe = tribes[randomIndex];
      // Use replace to avoid back button returning to /random
      navigate(`/learn/${randomTribe.slug}`, { replace: true });
    } else {
      navigate('/learn', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Discover a Random African Tribe | TribeGuess</title>
        <meta 
          name="description" 
          content="Explore African cultural heritage by discovering a random tribe. Learn about their traditions, naming conventions, history, and famous people from across the continent." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tribeguess.com/random" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Discover a Random African Tribe | TribeGuess" />
        <meta property="og:description" content="Explore African cultural heritage by discovering a random tribe. Learn about traditions, naming conventions, and history." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tribeguess.com/random" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Discover a Random African Tribe | TribeGuess" />
        <meta name="twitter:description" content="Explore African cultural heritage by discovering a random tribe." />
        
        {/* Keywords */}
        <meta name="keywords" content="African tribes, random tribe, discover Africa, African culture, tribal traditions, ethnic groups, African heritage" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Discovering a random tribe...</p>
        </div>
      </div>
    </>
  );
}
