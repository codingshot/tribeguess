import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountryFlag } from '@/components/CountryFlag';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { Search, Users, MapPin, Languages, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { ViralCTAs } from '@/components/ViralCTAs';
import type { TribeData } from '@/types/tribe';

export default function TribesIndex() {
  const [searchParams] = useSearchParams();
  const filterCountry = searchParams.get('country') || '';
  const filterRegion = searchParams.get('region') || '';
  const filterLanguage = searchParams.get('language') || '';
  const [search, setSearch] = useState('');

  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  // Derive unique regions, countries, language families
  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    allTribes.forEach(t => { if (t.region) regions.add(t.region); });
    return Array.from(regions).sort();
  }, [allTribes]);

  const uniqueLanguageFamilies = useMemo(() => {
    const families = new Set<string>();
    allTribes.forEach(t => {
      const family = (t as any).language?.family;
      if (family) families.add(family);
    });
    return Array.from(families).sort();
  }, [allTribes]);

  // Unique countries from tribes
  const tribeCountries = useMemo(() => {
    const codes = new Set<string>();
    allTribes.forEach(t => {
      ((t as any).countries || []).forEach((c: string) => codes.add(c));
    });
    return countries.filter(c => codes.has(c.code)).sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, countries]);

  // Filter
  const filteredTribes = useMemo(() => {
    let result = allTribes.filter(t => t.name && t.slug);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.region?.toLowerCase().includes(q));
    }
    if (filterCountry) {
      result = result.filter(t => ((t as any).countries || []).includes(filterCountry));
    }
    if (filterRegion) {
      result = result.filter(t => t.region === filterRegion);
    }
    if (filterLanguage) {
      result = result.filter(t => (t as any).language?.family === filterLanguage);
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, search, filterCountry, filterRegion, filterLanguage]);

  // Group A-Z
  const grouped = useMemo(() => {
    const groups: Record<string, TribeData[]> = {};
    filteredTribes.forEach(t => {
      const letter = t.name[0]?.toUpperCase() || '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTribes]);

  const activeFilter = filterCountry || filterRegion || filterLanguage;
  const filterLabel = filterCountry 
    ? countries.find(c => c.code === filterCountry)?.name 
    : filterRegion || filterLanguage || '';

  const seoTitle = activeFilter
    ? `${filterLabel} Tribes: Complete A–Z Directory | TribeGuess`
    : 'All African Tribes A–Z: Complete Directory of 350+ Ethnic Groups | TribeGuess';
  const seoDesc = activeFilter
    ? `Explore all tribes ${filterCountry ? 'in ' : 'from '}${filterLabel}. Discover culture, names, history and traditions.`
    : 'Complete directory of 350+ African tribes listed A–Z. Discover each tribe\'s culture, language, names, history, and traditions. The most comprehensive African ethnic group database.';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": seoTitle.replace(' | TribeGuess', ''),
    "description": seoDesc,
    "url": "https://tribeguess.com/tribes",
    "numberOfItems": filteredTribes.length,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tribeguess.com" },
        { "@type": "ListItem", "position": 2, "name": "All Tribes", "item": "https://tribeguess.com/tribes" },
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={`https://tribeguess.com/tribes${activeFilter ? `?${searchParams.toString()}` : ''}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Hero */}
        <section className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {activeFilter ? `${filterLabel} Tribes` : 'All African Tribes A–Z'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {activeFilter
              ? `Browse all tribes ${filterCountry ? 'in ' : 'from '}${filterLabel}. Click any tribe to explore its culture, names, and history.`
              : `The most comprehensive directory of ${allTribes.length}+ African ethnic groups. Explore each tribe's culture, language, naming traditions, and history.`}
          </p>
        </section>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tribes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Quick Links */}
        {!activeFilter && (
          <div className="mb-8 space-y-4">
            {/* By Country */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Browse by Country
              </h2>
              <div className="flex flex-wrap gap-2">
                {tribeCountries.slice(0, 20).map(c => (
                  <Link
                    key={c.code}
                    to={`/tribes?country=${c.code}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
                  >
                    <CountryFlag code={c.code} size={14} label={c.name} />
                    {c.name}
                  </Link>
                ))}
                {tribeCountries.length > 20 && (
                  <span className="text-xs text-muted-foreground self-center">+{tribeCountries.length - 20} more</span>
                )}
              </div>
            </div>

            {/* By Region */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Browse by Region
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueRegions.map(r => (
                  <Link
                    key={r}
                    to={`/tribes?region=${encodeURIComponent(r)}`}
                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
                  >
                    {r}
                  </Link>
                ))}
              </div>
            </div>

            {/* By Language Family */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Languages className="w-4 h-4" /> Browse by Language Family
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueLanguageFamilies.map(f => (
                  <Link
                    key={f}
                    to={`/tribes?language=${encodeURIComponent(f)}`}
                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
                  >
                    {f}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeFilter && (
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="secondary">{filterLabel}</Badge>
            <Link to="/tribes" className="text-xs text-primary hover:underline">Clear filter</Link>
            <span className="text-xs text-muted-foreground ml-auto">{filteredTribes.length} tribes</span>
          </div>
        )}

        {/* Letter Quick Jump */}
        <nav className="mb-6 flex flex-wrap gap-1" aria-label="Jump to letter">
          {grouped.map(([letter]) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center rounded bg-secondary hover:bg-primary hover:text-primary-foreground text-xs font-bold transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* A-Z Listing */}
        <div className="space-y-6">
          {grouped.map(([letter, tribes]) => (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="text-2xl font-bold text-primary mb-3 border-b border-border pb-1">{letter}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {tribes.map(tribe => (
                  <Link
                    key={tribe.id}
                    to={`/learn/${tribe.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                        {tribe.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        {tribe.region && <span>{tribe.region}</span>}
                        {tribe.population && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{tribe.population}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {((tribe as any).countries || []).slice(0, 2).map((code: string) => (
                        <CountryFlag key={code} code={code} size={14} />
                      ))}
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {filteredTribes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No tribes found matching your criteria.</p>
            <Link to="/tribes" className="text-primary hover:underline">View all tribes</Link>
          </div>
        )}

        <ViralCTAs tribeName={undefined} className="mt-12" />
      </main>

      <Footer />
    </div>
  );
}
