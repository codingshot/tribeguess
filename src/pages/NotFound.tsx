import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Home, Search, Map, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found | African Tribe Names</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore African tribes and naming traditions instead." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-lg">
          {/* African pattern decoration */}
          <div className="mb-6 text-8xl font-bold gradient-gold-text">404</div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Lost in the Savanna
          </h1>
          
          <p className="text-muted-foreground mb-8 text-lg">
            The path you seek doesn't exist. But don't worry — there are over 3,000 African tribes waiting to be discovered!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/learn">
                <Search className="w-4 h-4" />
                Explore Tribes
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/learn?view=map">
                <Map className="w-4 h-4" />
                View Map
              </Link>
            </Button>
          </div>
          
          <button
            onClick={() => window.history.back()}
            className="mt-6 text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back to previous page
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
