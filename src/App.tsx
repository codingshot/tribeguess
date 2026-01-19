import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GlobalVideoPlayerProvider } from "@/contexts/GlobalVideoPlayerContext";
import { GlobalVideoPlayer } from "@/components/GlobalVideoPlayer";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { warmSearchIndexes } from "@/lib/searchEngine";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import TribePage from "./pages/TribePage";
import RandomTribe from "./pages/RandomTribe";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import RecipePage from "./pages/RecipePage";
import Recipes from "./pages/Recipes";
import ReligionsPage from "./pages/ReligionsPage";
import ReligionTimeline from "./pages/ReligionTimeline";
import ReligionDetailPage from "./pages/ReligionDetailPage";
import ReligionCompare from "./pages/ReligionCompare";
import IngredientPage from "./pages/IngredientPage";
import Quiz from "./pages/Quiz";
import LanguagesIndex from "./pages/LanguagesIndex";
import LanguageFamilyPage from "./pages/LanguageFamilyPage";
import GlobalOrigins from "./pages/GlobalOrigins";
import People from "./pages/People";
import PersonPage from "./pages/PersonPage";
import Docs from "./pages/Docs";
import NamesGallery from "./pages/NamesGallery";
import VideoGallery from "./pages/VideoGallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Pre-warm search indexes on app load for faster searches
  useEffect(() => {
    // Warm indexes after initial render for better perceived performance
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <GlobalVideoPlayer />
              <PWAInstallPrompt />
            </BrowserRouter>
          </GlobalVideoPlayerProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
