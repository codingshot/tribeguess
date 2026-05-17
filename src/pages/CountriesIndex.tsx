import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Users, Globe, ChefHat, Footprints, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountryFlag } from '@/components/CountryFlag';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getCountriesWithStats, searchCountries } from '@/lib/countryIndex';
import { danceRegions } from '@/data/dances';
import { canonical, SITE_NAME } from '@/lib/seoConstants';

const regionNames: Record<string, string> = {
  east: 'East Africa',
  west: 'West Africa',
  southern: 'Southern Africa',
  central: 'Central Africa',
  north: 'North Africa',
  horn: 'Horn of Africa',
};

export default function CountriesIndex() {
  const [search, setSearch] = useState('');
  const allCountries = useMemo(() => getCountriesWithStats(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allCountries;
    return searchCountries(search, 80).map((r) => r.stats);
  }, [allCountries, search]);

  const byRegion = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const c of filtered) {
      const key = c.region || 'other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return [...map.entries()].sort(([a], [b]) =>
      (regionNames[a] || a).localeCompare(regionNames[b] || b)
    );
  }, [filtered]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'African Countries — Tribes, Culture & Traditions',
    description: `Browse ${allCountries.length} African countries with tribal profiles, recipes, dances, and cultural facts.`,
    url: canonical('/countries'),
    numberOfItems: allCountries.length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>African Countries — Tribes & Culture by Nation | {SITE_NAME}</title>
        <meta
          name="description"
          content={`Explore tribes and culture in ${allCountries.length} African countries. Kenya, Nigeria, Ethiopia, Ghana, South Africa, and more — with facts, recipes, and dances.`}
        />
        <link rel="canonical" href={canonical('/countries')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-tribal mb-2">African Countries</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse {allCountries.length} countries with ethnic groups, cultural facts, traditional
            recipes, dances, and video galleries.
          </p>
        </header>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search countries (e.g. Kenya, Nigeria, DRC)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {search && (
          <p className="text-sm text-muted-foreground mb-4 text-center">
            {filtered.length} {filtered.length === 1 ? 'country' : 'countries'} matching &ldquo;{search}&rdquo;
          </p>
        )}

        <div className="space-y-10">
          {byRegion.map(([regionId, countries]) => (
            <section key={regionId}>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {regionNames[regionId] || danceRegions.find((r) => r.id === regionId)?.name || regionId}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {countries.map((c) => (
                  <Link
                    key={c.code}
                    to={`/country/${c.slug}`}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                  >
                    <CountryFlag code={c.code} size={32} label={c.name} />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold group-hover:text-primary transition-colors">
                        {c.name}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.intro}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-[10px] gap-0.5">
                          <Users className="w-3 h-3" />
                          {c.tribeCount} tribes
                        </Badge>
                        {c.recipeCount > 0 && (
                          <Badge variant="outline" className="text-[10px] gap-0.5">
                            <ChefHat className="w-3 h-3" />
                            {c.recipeCount} recipes
                          </Badge>
                        )}
                        {c.danceCount > 0 && (
                          <Badge variant="outline" className="text-[10px] gap-0.5">
                            <Footprints className="w-3 h-3" />
                            {c.danceCount} dances
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No countries match your search.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
