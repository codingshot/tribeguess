import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Play, Grid, List } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VideoCard } from '@/components/VideoCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getAllVideos, getVideoTribes, searchVideos } from '@/lib/videoAggregation';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';

export default function VideoGallery() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [tribeFilter, setTribeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { addManyToQueue } = useGlobalVideoPlayer();
  const tribes = useMemo(() => getVideoTribes(), []);
  const allVideos = useMemo(() => getAllVideos(), []);
  
  const filteredVideos = useMemo(() => {
    return searchVideos(query, {
      category: category !== 'all' ? category : undefined,
      tribeIds: tribeFilter !== 'all' ? [tribeFilter] : undefined,
    });
  }, [query, category, tribeFilter]);
  
  const stats = useMemo(() => ({
    total: allVideos.length,
    documentaries: allVideos.filter(v => v.category === 'documentary').length,
    recipes: allVideos.filter(v => v.category === 'recipe').length,
    languages: allVideos.filter(v => v.category === 'language').length,
  }), [allVideos]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Video Gallery - African Culture Documentaries & Tutorials | TribeGuess</title>
        <meta name="description" content="Browse our collection of African cultural documentaries, recipe tutorials, and language lessons. Watch videos about tribes across the continent." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-tribal mb-2">Video Gallery</h1>
            <p className="text-muted-foreground">
              Explore {stats.total} videos about African culture, recipes, and languages
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <Badge variant="secondary">{stats.documentaries} Documentaries</Badge>
              <Badge variant="secondary">{stats.recipes} Recipes</Badge>
              <Badge variant="secondary">{stats.languages} Languages</Badge>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="recipe">Recipe</SelectItem>
                <SelectItem value="language">Language</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={tribeFilter} onValueChange={setTribeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tribe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tribes</SelectItem>
                {tribes.slice(0, 30).map(tribe => (
                  <SelectItem key={tribe.id} value={tribe.id}>
                    {tribe.name} ({tribe.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => addManyToQueue(filteredVideos.slice(0, 10), { dedupeByYoutubeId: true })}
            >
              <Play className="h-4 w-4 mr-1" />
              Add Top 10
            </Button>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No videos found</p>
              <Button variant="link" onClick={() => { setQuery(''); setCategory('all'); setTribeFilter('all'); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
