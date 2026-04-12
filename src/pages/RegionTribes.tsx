import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CountryFlag } from '@/components/CountryFlag';
import { Badge } from '@/components/ui/badge';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { Users, MapPin, ArrowRight, Globe, Languages } from 'lucide-react';
import { ViralCTAs } from '@/components/ViralCTAs';
import {
  regionToSlug, canonical, SITE_NAME, countryCodeToSlug,
  titleTemplates, metaTemplates, breadcrumbLD, PUBLISHER_LD,
} from '@/lib/seoConstants';
import type { TribeData } from '@/types/tribe';

/** Normalize a region string to a broad geographic bucket for SEO pages */
function getBroadRegion(region: string): string {
  const r = region.toLowerCase();
  if (r.includes('east africa') || r.includes('kenya') || r.includes('tanzania') || r.includes('uganda') || r.includes('rwanda') || r.includes('burundi')) return 'East Africa';
  if (r.includes('west africa') || r.includes('nigeria') || r.includes('ghana') || r.includes('senegal') || r.includes('mali') || r.includes('ivory') || r.includes('côte')) return 'West Africa';
  if (r.includes('southern africa') || r.includes('south africa') || r.includes('zimbabwe') || r.includes('zambia') || r.includes('botswana') || r.includes('namibia') || r.includes('mozambique') || r.includes('lesotho') || r.includes('eswatini') || r.includes('malawi')) return 'Southern Africa';
  if (r.includes('central africa') || r.includes('congo') || r.includes('gabon') || r.includes('cameroon') || r.includes('chad') || r.includes('car') || r.includes('central african')) return 'Central Africa';
  if (r.includes('horn of africa') || r.includes('ethiopia') || r.includes('somalia') || r.includes('eritrea') || r.includes('djibouti')) return 'Horn of Africa';
  if (r.includes('north africa') || r.includes('sahara') || r.includes('morocco') || r.includes('algeria') || r.includes('tunisia') || r.includes('libya') || r.includes('egypt') || r.includes('sudan') || r.includes('mauritania')) return 'North Africa';
  if (r.includes('sahel')) return 'Sahel';
  if (r.includes('madagascar') || r.includes('comoros') || r.includes('indian ocean')) return 'Indian Ocean Islands';
  return 'Africa';
}

const BROAD_REGIONS = [
  'East Africa', 'West Africa', 'Southern Africa', 'Central Africa',
  'Horn of Africa', 'North Africa', 'Sahel', 'Indian Ocean Islands'
];

const REGION_INTROS: Record<string, string> = {
  'East Africa': 'East Africa is a cradle of human civilization, home to ancient kingdoms, vast savannas, and the Great Rift Valley. From the Maasai warriors to the Kikuyu farmers, this region\'s ethnic groups are as diverse as its landscapes.',
  'West Africa': 'West Africa boasts some of the continent\'s most culturally rich societies, from the Yoruba\'s urban kingdoms to the Ashanti\'s golden traditions. Music, art, and storytelling thrive across this vibrant region.',
  'Southern Africa': 'Southern Africa\'s peoples range from the ancient San hunter-gatherers to the powerful Zulu nation. This region\'s diverse climate zones—from the Kalahari to lush coastlines—have shaped unique cultural adaptations.',
  'Central Africa': 'The Congo Basin and surrounding forests of Central Africa harbour some of the continent\'s most diverse ethnic groups, from the Mongo farmers to the BaAka forest peoples.',
  'Horn of Africa': 'The Horn of Africa, at the crossroads of Africa and Arabia, is home to Cushitic and Semitic-speaking peoples with traditions stretching back millennia, including the Oromo, Amhara, and Somali.',
  'North Africa': 'North Africa\'s Berber, Arab, and Tuareg peoples have navigated the Sahara and Mediterranean coasts for millennia, building empires and trade networks that connected Africa to Europe and Asia.',
  'Sahel': 'The Sahel, the semi-arid belt between the Sahara and tropical Africa, is home to resilient pastoral and farming peoples including the Fulani, Tuareg, and Kanuri.',
  'Indian Ocean Islands': 'The Indian Ocean islands off Africa\'s coast—Madagascar, Comoros, and others—are home to peoples blending African, Asian, and Arab heritage into unique cultural traditions.',
};

export default function RegionTribes() {
  const { regionSlug } = useParams<{ regionSlug: string }>();
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  // Match slug to a broad region
  const matchedRegion = BROAD_REGIONS.find(r => regionToSlug(r) === regionSlug);

  const tribes = useMemo(() => {
    if (!matchedRegion) return [];
    return allTribes
      .filter(t => getBroadRegion(t.region || '') === matchedRegion)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTribes, matchedRegion]);

  // Countries represented
  const representedCountries = useMemo(() => {
    const codes = new Set<string>();
    tribes.forEach(t => ((t as any).countries || []).forEach((c: string) => codes.add(c)));
    return countries.filter(c => codes.has(c.code)).sort((a, b) => a.name.localeCompare(b.name));
  }, [tribes, countries]);

  if (!matchedRegion || tribes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Helmet>
          <title>Region Not Found | {SITE_NAME}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Region Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find tribes for this region.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {BROAD_REGIONS.map(r => (
              <Link key={r} to={`/region/${regionToSlug(r)}`} className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium hover:bg-secondary/80 transition-colors">{r}</Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const seoTitle = titleTemplates.region(matchedRegion);
  const seoDesc = metaTemplates.region(matchedRegion, tribes.length);
  const pageUrl = `/region/${regionSlug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": `${matchedRegion} Tribes`,
        "description": seoDesc,
        "url": canonical(pageUrl),
        "numberOfItems": tribes.length,
        "publisher": PUBLISHER_LD,
      },
      breadcrumbLD([
        { name: 'Home', url: '/' },
        { name: 'All Tribes', url: '/tribes' },
        { name: matchedRegion, url: pageUrl },
      ]),
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
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        <nav className="mb-6 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/tribes" className="hover:text-foreground transition-colors">All Tribes</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{matchedRegion}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {matchedRegion} Tribes
          </h1>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {REGION_INTROS[matchedRegion] || `Explore the ethnic groups of ${matchedRegion}.`}
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3.5 h-3.5" /> {tribes.length} Tribes
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Globe className="w-3.5 h-3.5" /> {representedCountries.length} Countries
            </Badge>
          </div>
        </header>

        {/* Countries in this region */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> Countries in {matchedRegion}
          </h2>
          <div className="flex flex-wrap gap-2">
            {representedCountries.map(c => (
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

        {/* Tribe listing */}
        <section>
          <h2 className="text-xl font-bold mb-4">All {tribes.length} {matchedRegion} Tribes</h2>
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
                    {tribe.population && <span>{tribe.population}</span>}
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

        {/* Other Regions */}
        <section className="mt-12">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Explore Other Regions
          </h2>
          <div className="flex flex-wrap gap-2">
            {BROAD_REGIONS.filter(r => r !== matchedRegion).map(r => (
              <Link
                key={r}
                to={`/region/${regionToSlug(r)}`}
                className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-xs font-medium transition-colors"
              >
                {r}
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
