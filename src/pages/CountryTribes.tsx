import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountryFlag } from '@/components/CountryFlag';
import { Badge } from '@/components/ui/badge';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { Users, MapPin, ArrowRight, ArrowLeft, Globe, Languages } from 'lucide-react';
import { ViralCTAs } from '@/components/ViralCTAs';
import {
  slugToCountryCode, countryCodeToSlug, canonical, SITE_NAME,
  titleTemplates, metaTemplates, breadcrumbLD, getCountryIntro, PUBLISHER_LD,
} from '@/lib/seoConstants';
import type { TribeData } from '@/types/tribe';

export default function CountryTribes() {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  const countryCode = countrySlug ? slugToCountryCode(countrySlug) : undefined;
  const country = countryCode ? countries.find(c => c.code === countryCode) : undefined;

  const tribes = useMemo(() => {
    if (!countryCode) return [];
    return allTribes
      .filter(t => ((t as any).countries || []).includes(countryCode))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, countryCode]);

  // Derive unique regions and language families for this country
  const regions = useMemo(() => {
    const set = new Set<string>();
    tribes.forEach(t => { if (t.region) set.add(t.region); });
    return Array.from(set).sort();
  }, [tribes]);

  const languageFamilies = useMemo(() => {
    const set = new Set<string>();
    tribes.forEach(t => {
      const f = (t as any).language?.family;
      if (f) set.add(f);
    });
    return Array.from(set).sort();
  }, [tribes]);

  // Other countries for cross-linking
  const otherCountries = useMemo(() => {
    const codes = new Set<string>();
    allTribes.forEach(t => ((t as any).countries || []).forEach((c: string) => codes.add(c)));
    return countries
      .filter(c => codes.has(c.code) && c.code !== countryCode)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, countries, countryCode]);

  if (!country || tribes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Helmet>
          <title>Country Not Found | {SITE_NAME}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find tribes for this country.</p>
          <Link to="/tribes" className="text-primary hover:underline">Browse all tribes →</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const seoTitle = titleTemplates.country(country.name);
  const seoDesc = metaTemplates.country(country.name, tribes.length);
  const pageUrl = `/country/${countrySlug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": `Tribes in ${country.name}`,
        "description": seoDesc,
        "url": canonical(pageUrl),
        "numberOfItems": tribes.length,
        "publisher": PUBLISHER_LD,
      },
      breadcrumbLD([
        { name: 'Home', url: '/' },
        { name: 'All Tribes', url: '/tribes' },
        { name: country.name, url: pageUrl },
      ]),
      {
        "@type": "ItemList",
        "name": `Tribes in ${country.name}`,
        "numberOfItems": tribes.length,
        "itemListElement": tribes.slice(0, 50).map((t, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": t.name,
          "url": canonical(`/learn/${t.slug}`),
        })),
      }
    ]
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
        {/* Breadcrumb nav */}
        <nav className="mb-6 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/tribes" className="hover:text-foreground transition-colors">All Tribes</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{country.name}</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CountryFlag code={country.code} size={40} label={country.name} />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Tribes in {country.name}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {getCountryIntro(country.code, country.name, tribes.length)}
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3.5 h-3.5" /> {tribes.length} Tribes
            </Badge>
            {languageFamilies.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Languages className="w-3.5 h-3.5" /> {languageFamilies.length} Language Families
              </Badge>
            )}
          </div>
        </header>

        {/* Language Family Quick Filters */}
        {languageFamilies.length > 1 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Languages className="w-4 h-4" /> Language Families in {country.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {languageFamilies.map(f => (
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

        {/* Tribe Listing */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            All {tribes.length} Tribes in {country.name}
          </h2>
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
                    {tribe.population && (
                      <span className="flex items-center gap-0.5">
                        <Users className="w-3 h-3" />{tribe.population}
                      </span>
                    )}
                    {(tribe as any).language?.name && (
                      <>
                        <span>•</span>
                        <span>{(tribe as any).language.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-link: Other Countries */}
        <section className="mt-12">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Explore Tribes in Other Countries
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCountries.slice(0, 20).map(c => (
              <Link
                key={c.code}
                to={`/country/${countryCodeToSlug(c.code)}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
              >
                <CountryFlag code={c.code} size={14} label={c.name} />
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        <ViralCTAs tribeName={undefined} className="mt-12" />
      </main>
      <Footer />
    </div>
  );
}
