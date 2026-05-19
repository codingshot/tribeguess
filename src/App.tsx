import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RouteErrorFallback } from "@/components/RouteErrorFallback";
import { HelmetProvider } from "react-helmet-async";
import { GlobalVideoPlayerProvider } from "@/contexts/GlobalVideoPlayerContext";
import { GlobalVideoPlayer } from "@/components/GlobalVideoPlayer";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import React from "react";

// Error boundary to prevent video player crashes from breaking the whole app
class VideoPlayerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  private recoverTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[VideoPlayer] Recovered from crash:', error.message);
    // Clear potentially corrupted video state
    try {
      localStorage.removeItem('tribeguess_current_video');
    } catch {
      /* localStorage may be unavailable */
    }

    // Auto-recover after 2s
    if (!this.recoverTimer) {
      this.recoverTimer = setTimeout(() => {
        this.setState({ hasError: false });
        this.recoverTimer = null;
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.recoverTimer) {
      clearTimeout(this.recoverTimer);
      this.recoverTimer = null;
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// Error boundary for page-level crashes (prevents white screens)
class PageErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('[PageErrorBoundary] Caught render crash:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageErrorRecovery
          error={this.state.error}
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}

function PageErrorRecovery({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) {
  const location = useLocation();

  return (
    <div
      role="alert"
      className="min-h-screen bg-gradient-to-b from-muted/40 to-background flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-lg">
        <RouteErrorFallback
          variant="error"
          pathname={location.pathname}
          errorMessage={error?.message}
          onRetry={onReset}
          showStatusCode={false}
        />
      </div>
    </div>
  );
}

import { warmSearchIndexes } from "@/lib/searchEngine";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Eagerly loaded (critical path)
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import TribePage from "./pages/TribePage";

// Lazily loaded (code splitting)
const RandomTribe = lazy(() => import("./pages/RandomTribe"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const RecipePage = lazy(() => import("./pages/RecipePage"));
const Recipes = lazy(() => import("./pages/Recipes"));
const ReligionsPage = lazy(() => import("./pages/ReligionsPage"));
const ReligionTimeline = lazy(() => import("./pages/ReligionTimeline"));
const ReligionDetailPage = lazy(() => import("./pages/ReligionDetailPage"));
const ReligionCompare = lazy(() => import("./pages/ReligionCompare"));
const IngredientPage = lazy(() => import("./pages/IngredientPage"));
const Quiz = lazy(() => import("./pages/Quiz"));
const LanguagesIndex = lazy(() => import("./pages/LanguagesIndex"));
const LanguageFamilyPage = lazy(() => import("./pages/LanguageFamilyPage"));
const GlobalOrigins = lazy(() => import("./pages/GlobalOrigins"));
const People = lazy(() => import("./pages/People"));
const PersonPage = lazy(() => import("./pages/PersonPage"));
const Docs = lazy(() => import("./pages/Docs"));
const NamesGallery = lazy(() => import("./pages/NamesGallery"));
const VideoGallery = lazy(() => import("./pages/VideoGallery"));
const AfricanDances = lazy(() => import("./pages/AfricanDances"));
const DancePage = lazy(() => import("./pages/DancePage"));
const DancesGallery = lazy(() => import("./pages/DancesGallery"));
const CountriesIndex = lazy(() => import("./pages/CountriesIndex"));
const TribeCompare = lazy(() => import("./pages/TribeCompare"));
const TribesIndex = lazy(() => import("./pages/TribesIndex"));
const CountryTribes = lazy(() => import("./pages/CountryTribes"));
const RegionTribes = lazy(() => import("./pages/RegionTribes"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <LoadingSpinner />
  </div>
);

const App = () => {
  // Pre-warm search indexes on app load for faster searches
  useEffect(() => {
    const timer = setTimeout(() => {
      warmSearchIndexes();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <GlobalVideoPlayerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<LazyFallback />}>
                <PageErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/learn/:slug" element={<TribePage />} />
                  <Route path="/random" element={<RandomTribe />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/recipe/:id" element={<RecipePage />} />
                  <Route path="/religions" element={<ReligionsPage />} />
                  <Route path="/religion/:id" element={<ReligionDetailPage />} />
                  <Route path="/religion-compare" element={<ReligionCompare />} />
                  <Route path="/religion-timeline" element={<ReligionTimeline />} />
                  <Route path="/ingredient/:id" element={<IngredientPage />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/languages" element={<LanguagesIndex />} />
                  <Route path="/languages/:familySlug" element={<LanguageFamilyPage />} />
                  <Route path="/global-origins" element={<GlobalOrigins />} />
                  <Route path="/people" element={<People />} />
                  <Route path="/person/:slug" element={<PersonPage />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/names" element={<NamesGallery />} />
                  <Route path="/video-gallery" element={<VideoGallery />} />
                  <Route path="/african-dances" element={<AfricanDances />} />
                  <Route path="/dances" element={<DancesGallery />} />
                  <Route path="/dance" element={<Navigate to="/dances" replace />} />
                  <Route path="/dance/:id" element={<DancePage />} />
                  <Route path="/compare/:slugA/vs/:slugB" element={<TribeCompare />} />
                  <Route path="/compare" element={<TribeCompare />} />
                  <Route path="/tribes" element={<TribesIndex />} />
                  <Route path="/countries" element={<CountriesIndex />} />
                  <Route path="/country/:countrySlug" element={<CountryTribes />} />
                  <Route path="/region/:regionSlug" element={<RegionTribes />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </PageErrorBoundary>
              </Suspense>
              <VideoPlayerErrorBoundary>
                <GlobalVideoPlayer />
              </VideoPlayerErrorBoundary>
              <PWAInstallPrompt />
            </BrowserRouter>
          </GlobalVideoPlayerProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
