import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { RouteErrorFallback } from '@/components/RouteErrorFallback';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found | African Tribe Names</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore African tribes, recipes, dances, and more." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <RouteErrorFallback
          variant="not-found"
          pathname={location.pathname}
          showStatusCode
        />
      </main>
    </div>
  );
};

export default NotFound;
