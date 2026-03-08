import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    } catch {}

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
const TribeCompare = lazy(() => import("./pages/TribeCompare"));
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
                  <Route path="/compare" element={<TribeCompare />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
