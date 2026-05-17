import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Music2, Footprints, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getAllPerformances,
  getDancesOnly,
  getMusicOnly,
  danceRegions,
  type CulturalPerformance,
  type DanceStyle,
} from '@/data/dances';
import { canonical, SITE_NAME } from '@/lib/seoConstants';
import { getYoutubeThumbnail } from '@/lib/videoAggregation';

const styleLabels: Record<DanceStyle, string> = {
  traditional: 'Traditional',
  modern: 'Modern',
  ceremonial: 'Ceremonial',
  folk: 'Folk',
  social: 'Social',
};

function PerformanceCard({ perf }: { perf: CulturalPerformance }) {
  return (
    <Link
      to={`/dance/${perf.id}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
    >
      <div className="aspect-video relative bg-muted overflow-hidden">
        <img
          src={getYoutubeThumbnail(perf.youtubeVideoId)}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
          {perf.contentType === 'dance' ? '💃 Dance' : '🎵 Music'}
        </Badge>
      </div>
      <div className="p-3">
        <h2 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {perf.name}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">{perf.tribeName}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="outline" className="text-[10px]">
            {styleLabels[perf.style]}
          </Badge>
          {perf.musicEra && (
            <Badge variant="outline" className="text-[10px]">
              {perf.musicEra === 'traditional' ? 'Traditional music' : 'Modern music'}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function AfricanDances() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const contentFilter = searchParams.get('type') || 'all';
  const regionFilter = searchParams.get('region') || '';
  const tribeFilter = searchParams.get('tribe') || '';
  const countryFilter = searchParams.get('country') || '';

  const all = getAllPerformances();
  const dances = getDancesOnly();
  const music = getMusicOnly();

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
        p.description.toLowerCase().includes(q);
      const matchesType =
        contentFilter === 'all' ||
        (contentFilter === 'dance' && p.contentType === 'dance') ||
        (contentFilter === 'music' && p.contentType === 'music');
      const matchesRegion = !regionFilter || p.region === regionFilter;
      const matchesTribe = !tribeFilter || p.tribeSlug === tribeFilter;
      const matchesCountry = !countryFilter || p.country === countryFilter;
      return matchesSearch && matchesType && matchesRegion && matchesTribe && matchesCountry;
    });
  }, [all, search, contentFilter, regionFilter, tribeFilter, countryFilter]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'African Tribal Dances & Traditional Music',
    description:
      'Explore traditional and modern African dances and music by ethnic group — from Eskista and Indlamu to Dhaanto, Bata, and Gerewol.',
    url: canonical('/african-dances'),
    publisher: { '@type': 'Organization', name: SITE_NAME },
    numberOfItems: all.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>African Tribal Dances & Traditional Music by Tribe | {SITE_NAME}</title>
        <meta
          name="description"
          content="Watch traditional and modern African dances and music by tribe: Kamba Kilumi, Zulu Indlamu, Oromo, Yoruba Bata, Somali Dhaanto, Amhara Eskista, Wodaabe Gerewol, and more."
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
              Discover {dances.length} traditional and ceremonial dances and {music.length} music
              performances linked to ethnic groups across Africa — traditional, modern, and special
              occasion forms.
            </p>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              <Button
                variant={contentFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.delete('type');
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
                <Link to="/video-gallery?category=dance">Video gallery →</Link>
              </Button>
            </div>
          </header>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dances, tribes, music..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={regionFilter}
              onChange={(e) => {
                const p = new URLSearchParams(searchParams);
                if (e.target.value) p.set('region', e.target.value);
                else p.delete('region');
                setSearchParams(p);
              }}
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
              onChange={(e) => {
                const p = new URLSearchParams(searchParams);
                if (e.target.value) p.set('tribe', e.target.value);
                else p.delete('tribe');
                setSearchParams(p);
              }}
            >
              <option value="">All tribes</option>
              {tribeOptions.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
            {(regionFilter || tribeFilter || contentFilter !== 'all') && (
              <Button variant="ghost" size="sm" onClick={() => setSearchParams({})}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {all.length} performances
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((perf) => (
              <PerformanceCard key={perf.id} perf={perf} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No dances or music match your filters.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
