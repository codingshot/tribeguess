import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Music2, Footprints, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PerformanceCard } from '@/components/PerformanceCard';
import {
  getAllPerformances,
  getDancesOnly,
  getMusicOnly,
  getTraditionalMusic,
  getModernMusic,
  danceRegions,
  type CulturalPerformance,
  type MusicEra,
} from '@/data/dances';
import { canonical, SITE_NAME } from '@/lib/seoConstants';

export default function AfricanDances() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const contentFilter = searchParams.get('type') || 'all';
  const eraFilter = (searchParams.get('era') || '') as MusicEra | '';
  const regionFilter = searchParams.get('region') || '';
  const tribeFilter = searchParams.get('tribe') || '';
  const countryFilter = searchParams.get('country') || '';

  const all = getAllPerformances();
  const dances = getDancesOnly();
  const music = getMusicOnly();
  const traditionalMusic = getTraditionalMusic();
  const modernMusic = getModernMusic();

  const tribeOptions = useMemo(() => {
    const map = new Map<string, string>();
    all.forEach((p) => map.set(p.tribeSlug, p.tribeName));
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tribeName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.musicGenre?.toLowerCase().includes(q) ?? false);
      const matchesType =
        contentFilter === 'all' ||
        (contentFilter === 'dance' && p.contentType === 'dance') ||
        (contentFilter === 'music' && p.contentType === 'music');
      const matchesEra =
        !eraFilter || (p.contentType === 'music' && p.musicEra === eraFilter);
      const matchesRegion = !regionFilter || p.region === regionFilter;
      const matchesTribe = !tribeFilter || p.tribeSlug === tribeFilter;
      const matchesCountry = !countryFilter || p.country === countryFilter;
      return (
        matchesSearch &&
        matchesType &&
        matchesEra &&
        matchesRegion &&
        matchesTribe &&
        matchesCountry
      );
    });
  }, [all, search, contentFilter, eraFilter, regionFilter, tribeFilter, countryFilter]);

  const showMusicGrouped =
    contentFilter === 'music' && !eraFilter && !search.trim() && filtered.length > 0;

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    setSearchParams(p);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'African Tribal Dances & Traditional Music',
    description:
      'Explore traditional and modern African dances and music by ethnic group.',
    url: canonical('/african-dances'),
    publisher: { '@type': 'Organization', name: SITE_NAME },
    numberOfItems: all.length,
  };

  const renderGrid = (items: CulturalPerformance[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((perf) => (
        <PerformanceCard key={perf.id} perf={perf} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>African Tribal Dances & Traditional Music by Tribe | {SITE_NAME}</title>
        <meta
          name="description"
          content="Watch traditional and modern African dances and music by tribe. Filter by traditional vs modern music, region, and country."
        />
        <link rel="canonical" href={canonical('/african-dances')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-tribal mb-2">African Tribal Dances & Music</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {dances.length} dances and {music.length} music profiles ({traditionalMusic.length}{' '}
              traditional · {modernMusic.length} modern) from ethnic groups across Africa.
            </p>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <Button
                variant={contentFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.delete('type');
                  p.delete('era');
                  setSearchParams(p);
                }}
              >
                All ({all.length})
              </Button>
              <Button
                variant={contentFilter === 'dance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.set('type', 'dance');
                  p.delete('era');
                  setSearchParams(p);
                }}
              >
                <Footprints className="w-3 h-3 mr-1" />
                Dances ({dances.length})
              </Button>
              <Button
                variant={contentFilter === 'music' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.set('type', 'music');
                  setSearchParams(p);
                }}
              >
                <Music2 className="w-3 h-3 mr-1" />
                Music ({music.length})
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/video-gallery?category=music">Music in gallery →</Link>
              </Button>
            </div>

            {contentFilter === 'music' && (
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                <Button
                  variant={!eraFilter ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setParam('era', '')}
                >
                  All music
                </Button>
                <Button
                  variant={eraFilter === 'traditional' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setParam('era', 'traditional')}
                >
                  Traditional ({traditionalMusic.length})
                </Button>
                <Button
                  variant={eraFilter === 'modern' ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setParam('era', 'modern')}
                >
                  Modern ({modernMusic.length})
                </Button>
              </div>
            )}
          </header>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dances, music genres, tribes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={regionFilter}
              onChange={(e) => setParam('region', e.target.value)}
            >
              <option value="">All regions</option>
              {danceRegions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.emoji} {r.name}
                </option>
              ))}
            </select>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm max-w-[180px]"
              value={tribeFilter}
              onChange={(e) => setParam('tribe', e.target.value)}
            >
              <option value="">All tribes</option>
              {tribeOptions.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            {(regionFilter || tribeFilter || countryFilter || contentFilter !== 'all' || eraFilter) && (
              <Button variant="ghost" size="sm" onClick={() => setSearchParams({})}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {all.length} performances
          </p>

          {showMusicGrouped ? (
            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-bold mb-3 text-amber-800 dark:text-amber-200">
                  Traditional music
                </h2>
                {renderGrid(filtered.filter((p) => p.musicEra === 'traditional'))}
              </section>
              <section>
                <h2 className="text-lg font-bold mb-3 text-violet-800 dark:text-violet-200">
                  Modern music
                </h2>
                {renderGrid(filtered.filter((p) => p.musicEra === 'modern'))}
              </section>
            </div>
          ) : (
            renderGrid(filtered)
          )}

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No dances or music match your filters.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
