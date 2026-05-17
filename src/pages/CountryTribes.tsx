import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountryFlag } from '@/components/CountryFlag';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { getCountryStatsByCode } from '@/lib/countryIndex';
import {
  Users,
  ArrowRight,
  Globe,
  Languages,
  ChefHat,
  Footprints,
  Play,
  BookOpen,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { ViralCTAs } from '@/components/ViralCTAs';
import {
  slugToCountryCode,
  countryCodeToSlug,
  canonical,
  SITE_NAME,
  titleTemplates,
  metaTemplates,
  breadcrumbLD,
  PUBLISHER_LD,
} from '@/lib/seoConstants';
import type { TribeData } from '@/types/tribe';

export default function CountryTribes() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  const countryCode = countrySlug ? slugToCountryCode(countrySlug) : undefined;
  const country = countryCode ? countries.find((c) => c.code === countryCode) : undefined;
  const stats = countryCode ? getCountryStatsByCode(countryCode) : undefined;

  const tribes = useMemo(() => {
    if (!countryCode) return [];
    return allTribes
      .filter((t) => (t.countries ?? []).includes(countryCode))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, countryCode]);

  const regions = useMemo(() => {
    const set = new Set<string>();
    tribes.forEach((t) => {
      if (t.region) set.add(t.region);
    });
    return Array.from(set).sort();
  }, [tribes]);

  const languageFamilies = useMemo(() => {
    return stats?.languageFamilies ?? [];
  }, [stats]);

  const otherCountries = useMemo(() => {
    const codes = new Set<string>();
    allTribes.forEach((t) => (t.countries ?? []).forEach((c) => codes.add(c)));
    return countries
      .filter((c) => codes.has(c.code) && c.code !== countryCode)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, countries, countryCode]);

  if (!country || tribes.length === 0 || !stats) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Helmet>
          <title>Country Not Found | {SITE_NAME}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn&apos;t find tribes for this country.</p>
          <Button asChild>
            <Link to="/countries">Browse all countries</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const seoTitle = titleTemplates.country(country.name);
  const seoDesc = metaTemplates.country(country.name, tribes.length);
  const pageUrl = `/country/${countrySlug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `Tribes in ${country.name}`,
        description: seoDesc,
        url: canonical(pageUrl),
        numberOfItems: tribes.length,
        publisher: PUBLISHER_LD,
      },
      breadcrumbLD([
        { name: 'Home', url: '/' },
        { name: 'Countries', url: '/countries' },
        { name: country.name, url: pageUrl },
      ]),
      {
        '@type': 'ItemList',
        name: `Tribes in ${country.name}`,
        numberOfItems: tribes.length,
        itemListElement: tribes.slice(0, 50).map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          url: canonical(`/learn/${t.slug}`),
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical(pageUrl)} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(pageUrl)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <nav className="mb-6 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/countries" className="hover:text-foreground transition-colors">
            Countries
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{country.name}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CountryFlag code={country.code} size={40} label={country.name} />
            <h1 className="text-3xl sm:text-4xl font-bold">Tribes in {country.name}</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">{stats.intro}</p>
          <div className="flex flex-wrap gap-2 mt-4 text-sm">
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3.5 h-3.5" /> {stats.tribeCount} Tribes
            </Badge>
            {languageFamilies.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Languages className="w-3.5 h-3.5" /> {languageFamilies.length} Language Families
              </Badge>
            )}
            {stats.recipeCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                <ChefHat className="w-3.5 h-3.5" /> {stats.recipeCount} Recipes
              </Badge>
            )}
            {stats.danceCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Footprints className="w-3.5 h-3.5" /> {stats.danceCount} Dances & Music
              </Badge>
            )}
          </div>
        </header>

        {/* Quick explore */}
        <section className="mb-8 p-4 rounded-xl border border-border bg-card">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Explore {country.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/tribes?country=${countryCode}`}>
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                All tribes A–Z
              </Link>
            </Button>
            {stats.recipeCount > 0 && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/recipes?country=${countryCode}`}>
                  <ChefHat className="w-3.5 h-3.5 mr-1" />
                  Recipes ({stats.recipeCount})
                </Link>
              </Button>
            )}
            {stats.danceCount > 0 && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/dances?country=${countryCode}`}>
                  <Footprints className="w-3.5 h-3.5 mr-1" />
                  Dance gallery
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link to={`/video-gallery?tribe=${tribes[0]?.id || ''}`}>
                <Play className="w-3.5 h-3.5 mr-1" />
                Videos
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/?country=${countryCode}`}>
                Guess a name from {country.name}
              </Link>
            </Button>
          </div>
        </section>

        {stats.facts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3">Cultural facts about {country.name}</h2>
            <ul className="space-y-2">
              {stats.facts.map((fact, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-secondary/60"
                >
                  <span className="text-primary shrink-0">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {regions.length > 1 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Regions & territories
            </h2>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <Badge key={r} variant="outline" className="text-xs">
                  {r}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {languageFamilies.length > 1 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Languages className="w-4 h-4" /> Language families
            </h2>
            <div className="flex flex-wrap gap-2">
              {languageFamilies.map((f) => (
                <Link
                  key={f}
                  to={`/tribes?language=${encodeURIComponent(f)}&country=${countryCode}`}
                  className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
                >
                  {f}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">
            All {tribes.length} Tribes in {country.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {tribes.map((tribe) => (
              <TribeCard key={tribe.id} tribe={tribe} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Other countries
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCountries.slice(0, 24).map((c) => (
              <Link
                key={c.code}
                to={`/country/${countryCodeToSlug(c.code)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
              >
                <CountryFlag code={c.code} size={14} label={c.name} />
                {c.name}
              </Link>
            ))}
            <Link
              to="/countries"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:underline"
            >
              All countries →
            </Link>
          </div>
        </section>

        <ViralCTAs tribeName={undefined} className="mt-12" />
      </main>
      <Footer />
    </div>
  );
}

function TribeCard({ tribe }: { tribe: TribeData }) {
  return (
    <Link
      to={`/learn/${tribe.slug}`}
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
    >
      <div className="min-w-0 flex-1">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
          {tribe.name}
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
          {tribe.population && (
            <span className="flex items-center gap-0.5">
              <Users className="w-3 h-3" />
              {tribe.population}
            </span>
          )}
          {tribe.language?.name && (
            <>
              <span>•</span>
              <span>{tribe.language.name}</span>
            </>
          )}
        </div>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
    </Link>
  );
}
