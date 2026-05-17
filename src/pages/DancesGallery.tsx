import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Footprints, Play, Grid, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VideoCard } from '@/components/VideoCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  getDancesOnly,
  danceRegions,
  getPerformanceTribeSlugs,
  type DanceStyle,
} from '@/data/dances';
import { getDanceGalleryVideos } from '@/lib/videoAggregation';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { canonical, SITE_NAME } from '@/lib/seoConstants';

const PAGE_SIZE = 24;
const STYLE_OPTIONS: DanceStyle[] = ['traditional', 'modern', 'ceremonial', 'folk', 'social'];

export default function DancesGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [region, setRegion] = useState(searchParams.get('region') || 'all');
  const [tribe, setTribe] = useState(searchParams.get('tribe') || 'all');
  const [style, setStyle] = useState(searchParams.get('style') || 'all');
  const [country, setCountry] = useState(searchParams.get('country') || 'all');
  const [view, setView] = useState<'grid' | 'list'>(
    searchParams.get('view') === 'list' ? 'list' : 'grid'
  );
  const [page, setPage] = useState(1);

  const allDances = useMemo(() => getDancesOnly(), []);
  const galleryVideos = useMemo(() => getDanceGalleryVideos(), []);
  const { addManyToQueue } = useGlobalVideoPlayer();

  const tribeOptions = useMemo(() => {
    const slugs = getPerformanceTribeSlugs();
    return slugs
      .map((slug) => {
        const d = allDances.find((p) => p.tribeSlug === slug);
        return { slug, name: d?.tribeName ?? slug };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allDances]);

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matchingIds = new Set(
      allDances
        .filter((p) => {
          const matchesSearch =
            !q ||
            p.name.toLowerCase().includes(q) ||
            p.tribeName.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            (p.localName?.toLowerCase().includes(q) ?? false) ||
            (p.relatedForms?.some((f) => f.toLowerCase().includes(q)) ?? false);
          const matchesRegion = region === 'all' || p.region === region;
          const matchesTribe = tribe === 'all' || p.tribeSlug === tribe;
          const matchesStyle = style === 'all' || p.style === style;
          const matchesCountry = country === 'all' || p.country === country;
          return matchesSearch && matchesRegion && matchesTribe && matchesStyle && matchesCountry;
        })
        .map((p) => p.id)
    );
    return galleryVideos.filter((v) =>
      [...matchingIds].some((id) => v.id.startsWith(`dance-${id}-`))
    );
  }, [allDances, galleryVideos, query, region, tribe, style, country]);

  const paginatedVideos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredVideos.slice(start, start + PAGE_SIZE);
  }, [filteredVideos, page]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / PAGE_SIZE));

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (region !== 'all') params.set('region', region);
    if (tribe !== 'all') params.set('tribe', tribe);
    if (style !== 'all') params.set('style', style);
    if (country !== 'all') params.set('country', country);
    if (view === 'list') params.set('view', 'list');
    if (page > 1) params.set('page', String(page));
    setSearchParams(params, { replace: true });
  }, [query, region, tribe, style, country, view, page, setSearchParams]);

  useEffect(() => {
    setPage(1);
  }, [query, region, tribe, style, country]);

  const pageParam = searchParams.get('page');
  useEffect(() => {
    const urlPage = parseInt(pageParam || '1', 10);
    if (Number.isFinite(urlPage) && urlPage > 0) {
      setPage((p) => (p !== urlPage ? urlPage : p));
    }
  }, [pageParam]);

  const clearFilters = () => {
    setQuery('');
    setRegion('all');
    setTribe('all');
    setStyle('all');
    setCountry('all');
    setPage(1);
  };

  const hasFilters =
    query || region !== 'all' || tribe !== 'all' || style !== 'all' || country !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>African Tribal Dances Gallery — Watch &amp; Search | {SITE_NAME}</title>
        <meta
          name="description"
          content="Browse traditional African tribal dances with search, filters, and instant playback. Explore dances by tribe and region across the continent."
        />
        <link rel="canonical" href={canonical('/dances')} />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-tribal mb-2 flex items-center justify-center gap-2">
              <Footprints className="w-8 h-8 text-orange-600" aria-hidden="true" />
              African Dances Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {allDances.length} curated tribal dances — search, filter, and play in the global video
              player.{' '}
              <Link to="/african-dances?type=music" className="text-primary hover:underline">
                Browse music separately →
              </Link>
            </p>
          </header>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dances, tribes, forms…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                aria-label="Search dances"
              />
            </div>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                {danceRegions.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.emoji} {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tribe} onValueChange={setTribe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tribe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tribes</SelectItem>
                {tribeOptions.map((t) => (
                  <SelectItem key={t.slug} value={t.slug}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All styles</SelectItem>
                {STYLE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-1 border rounded-md p-0.5">
              <Button
                type="button"
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-9 w-9"
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => addManyToQueue(filteredVideos.slice(0, 12), { dedupeByYoutubeId: true })}
              disabled={filteredVideos.length === 0}
            >
              <Play className="h-4 w-4 mr-1" />
              Queue {Math.min(12, filteredVideos.length)}
            </Button>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>
              Showing {filteredVideos.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filteredVideos.length)} of {filteredVideos.length} dances
            </span>
            {totalPages > 1 && (
              <span>
                Page {page} of {totalPages}
              </span>
            )}
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {paginatedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="space-y-1 max-w-3xl mx-auto">
              {paginatedVideos.map((video) => (
                <VideoCard key={video.id} video={video} compact showOrigin />
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No dances match your filters.{' '}
              <button type="button" className="text-primary underline" onClick={clearFilters}>
                Clear filters
              </button>
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => {
                  setPage((p) => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => {
                  setPage((p) => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
