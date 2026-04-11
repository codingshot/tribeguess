import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Users, Star, Book, Clock, Globe, UsersRound, Map, ExternalLink, History, Languages, UserCircle, UserCircle2, Church, Play, TrendingUp, ListPlus } from 'lucide-react';
import { getTribeBySlug, getAllTribes, getNameDatabase, getCountries, getTribeReligiousInfo, getTribeLandmarks } from '@/lib/tribeDetection';
import { findReligionByName } from '@/data/traditionalReligions';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TribeMap } from '@/components/TribeMap';
import { ImageGallery } from '@/components/ImageGallery';
import { PersonCard } from '@/components/PersonCard';
import { NameSearch } from '@/components/NameSearch';
import { AudioGreeting, MainGreeting } from '@/components/AudioGreeting';
import { PopulationPieChart } from '@/components/PopulationPieChart';
import { TribeFamilyTree } from '@/components/TribeFamilyTree';
import { CulturalLandmarks } from '@/components/CulturalLandmarks';
import { findRecipeByName } from '@/data/recipes';
import { InlineVideoPlayer } from '@/components/InlineVideoPlayer';
import { Button } from '@/components/ui/button';
const TribePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const allTribes = getAllTribes();

  // Sanitize slug: lowercase, trim, remove control chars, limit length
  const sanitizedSlug = (slug || '')
    .toLowerCase()
    .trim()
    .slice(0, 100)
    .replace(/[^a-z0-9\-_]/g, '');
  
  const tribe = sanitizedSlug ? getTribeBySlug(sanitizedSlug) : null;
  const [showCountryList, setShowCountryList] = React.useState(false);

  // Reset country list when tribe changes
  React.useEffect(() => {
    setShowCountryList(false);
  }, [sanitizedSlug]);
  
  if (!tribe) {
    // Try to find close matches for the slug
    const suggestions = sanitizedSlug ? allTribes
      .filter(t => {
        const s = t.slug?.toLowerCase() || '';
        const n = t.name?.toLowerCase() || '';
        return s.includes(sanitizedSlug) || sanitizedSlug.includes(s) ||
               n.includes(sanitizedSlug) || sanitizedSlug.includes(n) ||
               // Check slug aliases
               ((t as any).slugAliases || []).some((alias: string) => 
                 alias.toLowerCase().includes(sanitizedSlug) || sanitizedSlug.includes(alias.toLowerCase())
               );
      })
      .slice(0, 4) : [];

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Helmet>
          <title>Tribe Not Found | TribeGuess</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center max-w-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-foreground mb-2">Tribe Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {sanitizedSlug 
              ? `We couldn't find a tribe matching "${sanitizedSlug.slice(0, 40)}${sanitizedSlug.length > 40 ? '…' : ''}".`
              : 'No tribe was specified.'}
          </p>
          
          {suggestions.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Did you mean one of these?</p>
              <div className="flex flex-col gap-2">
                {suggestions.map(t => (
                  <Link
                    key={t.id}
                    to={`/learn/${t.slug}`}
                    className="p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors text-left flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-foreground">{t.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{t.region || 'Africa'}</span>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/learn" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
              Browse all tribes
            </Link>
            <Link to="/random" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm">
              Try a random tribe
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const relatedTribesData = tribe.relatedTribes?.map(id => 
    allTribes.find(t => t.id === id)
  ).filter(Boolean) || [];
  
  // Type assertion for history and language
  const history = (tribe as any).history;
  const language = (tribe as any).language;
  const tradeHistory = (tribe as any).tradeHistory;
  const independenceHistory = (tribe as any).independenceHistory;
  
  // SEO metadata - safe fallbacks for missing data
  const countries = (tribe as any).countries as string[] | undefined;
  const countryNames = countries?.map(code => getCountries().find(c => c.code === code)?.name).filter(Boolean).join(', ') || 'Africa';
  const safeDescription = (tribe.description || `Learn about the ${tribe.name} people`).slice(0, 300);
  const safePopulation = tribe.population || 'data unavailable';
  const seoTitle = `${tribe.name} Tribe - Culture, Names & History | TribeGuess`;
  const seoDescription = `Learn about the ${tribe.name} people of ${countryNames}. Discover traditional names, cultural practices, population (${safePopulation}), and famous ${tribe.name} personalities.`.slice(0, 160);
  const seoKeywords = [tribe.name, `${tribe.name} tribe`, `${tribe.name} culture`, `${tribe.name} names`, `${tribe.name} history`, countryNames, 'African tribe'].join(', ');

  // Rich structured data for AI engines
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": `${tribe.name} Tribe - Culture, Names & History`,
        "description": seoDescription,
        "author": { "@type": "Organization", "name": "TribeGuess", "url": "https://tribeguess.com" },
        "publisher": { "@type": "Organization", "name": "TribeGuess", "logo": { "@type": "ImageObject", "url": "https://tribeguess.com/favicon.png" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://tribeguess.com/learn/${tribe.slug}` },
        "about": { "@type": "Thing", "name": `${tribe.name} people`, "description": tribe.description },
        "keywords": seoKeywords,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tribeguess.com" },
          { "@type": "ListItem", "position": 2, "name": "Tribes", "item": "https://tribeguess.com/learn" },
          { "@type": "ListItem", "position": 3, "name": tribe.name, "item": `https://tribeguess.com/learn/${tribe.slug}` },
        ]
      },
      ...(Array.isArray(tribe.funFacts) && tribe.funFacts.length ? [{
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": `What are the ${tribe.name} people known for?`, "acceptedAnswer": { "@type": "Answer", "text": tribe.description || tribe.funFacts?.[0] } },
          { "@type": "Question", "name": `Where do the ${tribe.name} live?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${tribe.name} people are found in ${countryNames}, primarily in ${tribe.region || 'their traditional homeland'}.` } },
          ...(language ? [{ "@type": "Question", "name": `What language do the ${tribe.name} speak?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${tribe.name} speak ${language.name || 'their own language'} with approximately ${language.speakers || 'many'} speakers.` } }] : []),
          { "@type": "Question", "name": `What is the population of the ${tribe.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${tribe.name} have a population of approximately ${tribe.population || 'several million'}.` } },
        ]
      }] : [])
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tribeguess.com/learn/${tribe.slug}`} />
        <meta property="og:site_name" content="TribeGuess" />
        <link rel="canonical" href={`https://tribeguess.com/learn/${tribe.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <article className="animate-fade-in max-w-4xl mx-auto">
          <nav className="mb-4 sm:mb-6">
            <Link 
              to="/learn"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation p-1 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to all tribes
            </Link>
          </nav>
          
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <header className="gradient-gold p-4 sm:p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{tribe.name}</h1>
              </div>
              
              {/* Clickable Country & Region Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(tribe as any).countries && (tribe as any).countries.length > 0 && (
                  (tribe as any).countries.map((code: string) => {
                    const country = getCountries().find(c => c.code === code);
                    return country ? (
                      <Link 
                        key={code} 
                        to={`/learn?country=${code}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-xs sm:text-sm font-medium"
                      >
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </Link>
                    ) : null;
                  })
                )}
                <Link 
                  to={`/learn?region=${encodeURIComponent(tribe.region)}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-xs sm:text-sm font-medium"
                >
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>{tribe.region}</span>
                </Link>
              </div>
              
              {/* Quick Stats Bar */}
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>{tribe.population}</span>
                </div>
                {language && (
                  <div className="flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>{language.name}</span>
                  </div>
                )}
                {(tribe as any).religion && (
                  <div className="flex items-center gap-1">
                    <Church className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span className="truncate max-w-[120px]">{(tribe as any).religion.split(',')[0]}</span>
                  </div>
                )}
                {tradeHistory && (
                  <div className="flex items-center gap-1" title="Has documented trade history">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>Trade History</span>
                  </div>
                )}
              </div>
            </header>
            
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* YouTube Culture Video Section */}
              {(tribe as any).youtubeVideoId && (
                <section className="bg-gradient-to-r from-red-500/10 to-red-600/5 dark:from-red-900/20 dark:to-red-950/10 rounded-xl p-4 border border-red-200 dark:border-red-800">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" aria-hidden="true" />
                    Culture Documentary
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Discover the rich cultural heritage of the {tribe.name} people through this documentary video.
                  </p>
                  <InlineVideoPlayer
                    youtubeId={(tribe as any).youtubeVideoId}
                    title={`${tribe.name} Culture & Traditions`}
                    sourceType="TRIBE_PAGE"
                    tribeId={tribe.id}
                    tribeName={tribe.name}
                    originUrl={`/learn/${tribe.slug}`}
                    originLabel={`${tribe.name} Tribe Page`}
                    category="documentary"
                    className="shadow-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    📺 Click play to watch. Scroll away to continue in the global player.
                  </p>
                </section>
              )}

              {/* Map Section */}
              <section>
              {(() => {
                  const countries = (tribe as any).countries as string[] | undefined;
                  const isMultiCountry = countries && countries.length > 1;
                  const primaryCountry = countries?.[0] || 'KE';
                  const countryObj = getCountries().find(c => c.code === primaryCountry);
                  const countryName = countryObj?.name || 'Kenya';
                  
                  const countryObjects = countries?.map(code => getCountries().find(c => c.code === code)).filter(Boolean) || [];
                  
                  return (
                    <>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 flex-wrap">
                        <Map className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                        {isMultiCountry ? (
                          <span className="flex items-center gap-2 flex-wrap">
                            <span>Territory Across</span>
                            <span className="inline-flex items-center gap-1">
                              {countryObjects.slice(0, 3).map((c: any) => (
                                <span 
                                  key={c.code} 
                                  className="text-lg cursor-help" 
                                  title={c.name}
                                  aria-label={c.name}
                                >
                                  {c.flag}
                                </span>
                              ))}
                              {countryObjects.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{countryObjects.length - 3}</span>
                              )}
                            </span>
                            <button
                              onClick={() => setShowCountryList(!showCountryList)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary font-bold cursor-pointer border border-primary/30"
                              aria-expanded={showCountryList}
                              aria-label={`Show ${countries.length} countries`}
                            >
                              {countries.length}
                              <span className="text-xs font-normal">Countries</span>
                            </button>
                          </span>
                        ) : (
                          <span>Location in {countryName}</span>
                        )}
                      </h2>
                      
                      {/* Expandable country list */}
                      {isMultiCountry && showCountryList && (
                        <div className="mb-4 p-3 bg-secondary/50 rounded-lg border border-border animate-fade-in">
                          <p className="text-sm text-muted-foreground mb-2">Countries where the {tribe.name} people live:</p>
                          <div className="flex flex-wrap gap-2">
                            {countryObjects.map((c: any) => (
                              <Link
                                key={c.code}
                                to={`/learn?country=${c.code}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background hover:bg-primary/10 transition-colors text-sm border border-border hover:border-primary/30"
                              >
                                <span className="text-lg">{c.flag}</span>
                                <span className="font-medium">{c.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {tribe.mapCoordinates?.lat != null && tribe.mapCoordinates?.lng != null ? (
                        <TribeMap 
                          lat={tribe.mapCoordinates.lat} 
                          lng={tribe.mapCoordinates.lng} 
                          tribeName={tribe.name}
                          counties={tribe.counties}
                          countries={countries}
                        />
                      ) : (
                        <div className="p-3 bg-secondary/50 rounded-lg border border-border text-sm text-muted-foreground">
                          Map coordinates are unavailable for this tribe.
                        </div>
                      )}
                    </>
                  );
                })()}
              </section>
              
              {/* Population Stats */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                  <UsersRound className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  Population Statistics
                </h2>
                {(() => {
                  const countries = (tribe as any).countries as string[] | undefined;
                  const populationByCountry = (tribe as any).populationByCountry as { country: string; population: string; percent: string }[] | undefined;
                  const isMultiCountry = countries && countries.length > 1;
                  
                  return (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-secondary rounded-lg text-center">
                          <p className="text-2xl sm:text-3xl font-bold text-primary">{tribe.population}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Total Population</p>
                        </div>
                        {!isMultiCountry && (
                          <div className="p-3 bg-secondary rounded-lg text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-primary">{tribe.populationPercent}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              of {(() => {
                                const primaryCountry = countries?.[0] || 'KE';
                                const countryObj = getCountries().find(c => c.code === primaryCountry);
                                return countryObj?.name || 'Kenya';
                              })()}
                            </p>
                          </div>
                        )}
                        {isMultiCountry && (
                          <div className="p-3 bg-secondary rounded-lg text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-primary">{countries.length}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Countries</p>
                          </div>
                        )}
                        {tribe.genderRatio && (
                        <div className="p-3 bg-secondary rounded-lg text-center">
                          <p className="text-xl sm:text-2xl font-bold">
                            <span className="text-blue-600">{tribe.genderRatio.male}%</span>
                            <span className="text-muted-foreground mx-1">/</span>
                            <span className="text-pink-600">{tribe.genderRatio.female}%</span>
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Male / Female</p>
                        </div>
                        )}
                      </div>
                      
                      {/* Multi-country population breakdown with pie chart */}
                      {isMultiCountry && populationByCountry && populationByCountry.length > 0 && (
                        <>
                          <PopulationPieChart 
                            populationByCountry={populationByCountry}
                            tribeName={tribe.name}
                          />
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {populationByCountry.map((item) => {
                              const countryObj = getCountries().find(c => c.code === item.country);
                              return (
                                <div key={item.country} className="p-2 bg-background/60 rounded-lg text-center border border-border hover:border-primary/30 transition-colors">
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <span className="text-lg">{countryObj?.flag || '🌍'}</span>
                                    <span className="text-xs font-medium">{countryObj?.name || item.country}</span>
                                  </div>
                                  <p className="text-sm font-bold text-primary">{item.population}</p>
                                  <p className="text-xs text-muted-foreground">{item.percent} of country</p>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                      
                      {tribe.counties && tribe.counties.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Main Regions:</strong> {tribe.counties.join(', ')}
                        </p>
                      </div>
                      )}
                    </>
                  );
                })()}
              </section>
              
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {tribe.description || `Information about the ${tribe.name} people is being compiled. Check back soon for a detailed cultural profile.`}
                </p>
              </section>
              
              {/* Cultural Landmarks Section */}
              {(() => {
                const landmarks = getTribeLandmarks(tribe.id);
                if (landmarks.length === 0) return null;
                return (
                  <CulturalLandmarks 
                    landmarks={landmarks}
                    tribeName={tribe.name}
                  />
                );
              })()}
              
              {/* Tribe Family Tree / Ethnic Components - for tribes like Banyarwanda */}
              {(language || (tribe as any).ethnicComponents) && (
                <TribeFamilyTree 
                  currentTribe={{
                    id: tribe.id,
                    name: tribe.name,
                    slug: tribe.slug,
                    language: language
                  }}
                  ethnicComponents={(tribe as any).ethnicComponents}
                />
              )}
              
              {/* Language Section */}
              {language && (
                <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    Language & Greetings
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {language.name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Language Name</p>
                      <p className="font-semibold text-foreground">{language.name}</p>
                    </div>
                    )}
                    {language.speakers && (
                    <div>
                      <p className="text-sm text-muted-foreground">Speakers</p>
                      <p className="font-semibold text-foreground">{language.speakers}</p>
                    </div>
                    )}
                    {language.greeting && (
                    <div>
                      <p className="text-sm text-muted-foreground">Main Greeting</p>
                      <p className="font-semibold text-primary text-lg">"{language.greeting}"</p>
                      {language.greetingMeaning && (
                        <p className="text-xs text-muted-foreground">({language.greetingMeaning})</p>
                      )}
                    </div>
                    )}
                    {language.family && (
                    <div>
                      <p className="text-sm text-muted-foreground">Language Family</p>
                      <Link 
                        to={`/learn?languageFamily=${encodeURIComponent(language.family)}`}
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        {language.family}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                    )}
                  </div>
                  
                  {/* Language Learning Video */}
                  {(tribe as any).languageVideoId && (
                    <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border">
                      <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Play className="w-4 h-4 text-red-500" />
                        Learn {language.name} Pronunciation
                      </h3>
                      <InlineVideoPlayer
                        youtubeId={(tribe as any).languageVideoId}
                        title={`Learn ${language.name} - ${tribe.name} Language Tutorial`}
                        sourceType="TRIBE_LANGUAGE"
                        tribeId={tribe.id}
                        tribeName={tribe.name}
                        originUrl={`/learn/${tribe.slug}`}
                        originLabel={`${tribe.name} Language`}
                        category="language"
                        className="shadow-md"
                      />
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        🎓 Scroll away to continue watching in the global player.
                      </p>
                    </div>
                  )}
                  
                  {/* Main Greeting with Audio & Phonetics */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Main Greeting</p>
                    <MainGreeting 
                      phrase={language.greeting}
                      meaning={language.greetingMeaning || "Hello / Greeting"}
                      languageName={language.name}
                      languageFamily={language.family}
                    />
                  </div>
                  
                  {/* Additional Greetings with Audio & Phonetics */}
                  {language.additionalGreetings && language.additionalGreetings.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-2">More Greetings</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {language.additionalGreetings.map((g: { phrase: string; meaning: string }, i: number) => (
                          <AudioGreeting 
                            key={i}
                            phrase={g.phrase}
                            meaning={g.meaning}
                            languageName={language.name}
                            languageFamily={language.family}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Common Phrases with Phonetics */}
                  {language.commonPhrases && language.commonPhrases.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Common Phrases</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {language.commonPhrases.map((p: { phrase: string; meaning: string }, i: number) => (
                          <AudioGreeting 
                            key={i}
                            phrase={p.phrase}
                            meaning={p.meaning}
                            languageName={language.name}
                            languageFamily={language.family}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
              
              {/* History Section */}
              {history && (
                <section className="border-t border-border pt-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                    <History className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    History & Origins
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Origins</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{history.origin}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Colonial Era</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{history.colonialEra}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Independence & Modern Era</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{history.independence}</p>
                    </div>
                    {history.keyEvents && history.keyEvents.length > 0 && (
                      <div>
                        <h3 className="font-medium text-foreground mb-2">Key Historical Events</h3>
                        <div className="flex flex-wrap gap-2">
                          {history.keyEvents.map((event: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
              
              {/* Religion Section */}
              {(() => {
                const religionInfo = getTribeReligiousInfo(tribe.id);
                const tribeReligion = (tribe as any).religion as string | undefined;
                
                if (!religionInfo && !tribeReligion) return null;
                
                const getReligionEmoji = (religion: string) => {
                  switch (religion.toLowerCase()) {
                    case 'christian': return '✝️';
                    case 'muslim': return '☪️';
                    case 'traditional': return '🌍';
                    case 'mixed': return '🕊️';
                    case 'jewish': return '✡️';
                    default: return '🙏';
                  }
                };
                
                const getReligionColor = (religion: string) => {
                  switch (religion.toLowerCase()) {
                    case 'christian': return 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
                    case 'muslim': return 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200';
                    case 'traditional': return 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200';
                    case 'mixed': return 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200';
                    default: return 'bg-secondary border-border text-foreground';
                  }
                };
                
                return (
                  <section className="border-t border-border pt-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                      <Church className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                      Religious Influence
                    </h2>
                    
                    {religionInfo && (
                      <div className={`p-4 rounded-xl border mb-3 ${getReligionColor(religionInfo.primary)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getReligionEmoji(religionInfo.primary)}</span>
                          <div>
                            {(() => {
                              // Try to find a linked religion page
                              const linkedReligion = findReligionByName(religionInfo.primary);
                              const displayText = religionInfo.primary === 'mixed' 
                                ? 'Mixed Religious Heritage' 
                                : `Predominantly ${religionInfo.primary.charAt(0).toUpperCase() + religionInfo.primary.slice(1)}`;
                              
                              return linkedReligion ? (
                                <Link 
                                  to={`/religion/${linkedReligion.id}`}
                                  className="font-semibold capitalize hover:text-primary hover:underline transition-colors"
                                >
                                  {displayText} →
                                </Link>
                              ) : (
                                <p className="font-semibold capitalize">{displayText}</p>
                              );
                            })()}
                            {religionInfo.percentage && (
                              <p className="text-xs opacity-75">~{religionInfo.percentage}% of population</p>
                            )}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed">{religionInfo.notes}</p>
                        {religionInfo.secondary && (
                          <p className="text-xs mt-2 opacity-75">
                            Secondary influence: {getReligionEmoji(religionInfo.secondary)} {religionInfo.secondary.charAt(0).toUpperCase() + religionInfo.secondary.slice(1)}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {/* Traditional Religion Link if available */}
                    {(tribe as any).traditionalReligion && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🌍</span>
                          <div>
                            {(() => {
                              const tradReligion = (tribe as any).traditionalReligion;
                              const linkedReligion = findReligionByName(tradReligion.name || tribe.name);
                              
                              return linkedReligion ? (
                                <Link 
                                  to={`/religion/${linkedReligion.id}`}
                                  className="font-semibold text-amber-900 dark:text-amber-100 hover:underline transition-colors"
                                >
                                  {tradReligion.name || `${tribe.name} Traditional Religion`} →
                                </Link>
                              ) : (
                                <p className="font-semibold text-amber-900 dark:text-amber-100">
                                  {tradReligion.name || `${tribe.name} Traditional Religion`}
                                </p>
                              );
                            })()}
                          </div>
                        </div>
                        {(tribe as any).traditionalReligion.supremeDeity && (
                          <p className="text-sm text-amber-800 dark:text-amber-200 mb-1">
                            <strong>Supreme Deity:</strong> {(tribe as any).traditionalReligion.supremeDeity}
                          </p>
                        )}
                        {(tribe as any).traditionalReligion.beliefs && (
                          <p className="text-xs text-amber-700 dark:text-amber-300">
                            {(tribe as any).traditionalReligion.beliefs}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {tribeReligion && !religionInfo && !(tribe as any).traditionalReligion && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{tribeReligion}</p>
                    )}
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link 
                        to="/religions"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        Explore all African religions →
                      </Link>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      💡 Religious heritage often influences naming traditions. Many {tribe.name} names reflect their religious background.
                    </p>
                  </section>
                );
              })()}
              
              {tribe.stereotypes && tribe.stereotypes.length > 0 && (
              <section>
                <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  Common Stereotypes
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {tribe.stereotypes.map((stereotype, i) => (
                    <li key={i} className="flex items-center gap-2 p-2.5 sm:p-3 bg-secondary rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs sm:text-sm text-secondary-foreground">{stereotype}</span>
                    </li>
                  ))}
                </ul>
              </section>
              )}
              
              {/* Gender Stereotypes & Roles Section */}
              {((tribe as any).genderStereotypes || (tribe as any).genderRoles) && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                    <UsersRound className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    Gender Perspectives
                  </h2>
                  
                  {/* Gender Stereotypes */}
                  {(tribe as any).genderStereotypes && (
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-3">
                          <UserCircle className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Male Stereotypes</h3>
                        </div>
                        <ul className="space-y-2">
                          {(tribe as any).genderStereotypes.male?.map((stereotype: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                              {stereotype}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
                        <div className="flex items-center gap-2 mb-3">
                          <UserCircle2 className="w-5 h-5 text-pink-600" />
                          <h3 className="font-semibold text-pink-900 dark:text-pink-100">Female Stereotypes</h3>
                        </div>
                        <ul className="space-y-2">
                          {(tribe as any).genderStereotypes.female?.map((stereotype: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-pink-800 dark:text-pink-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                              {stereotype}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Gender Roles */}
                  {(tribe as any).genderRoles && (
                    <div className="space-y-4">
                      {(tribe as any).genderRoles.traditional && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Traditional Roles</h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">👨 Men</p>
                              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">{(tribe as any).genderRoles.traditional.male}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">👩 Women</p>
                              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">{(tribe as any).genderRoles.traditional.female}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(tribe as any).genderRoles.modern && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Modern Roles</h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">👨 Men</p>
                              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">{(tribe as any).genderRoles.modern.male}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">👩 Women</p>
                              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200">{(tribe as any).genderRoles.modern.female}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}
              
              {tribe.commonNames && (
              <NameSearch
                femaleNames={tribe.commonNames.female || []}
                maleNames={tribe.commonNames.male || []}
                tribeName={tribe.name}
                nameDatabase={getNameDatabase()}
              />
              )}
              
              {tribe.timeBasedNames && Object.keys(tribe.timeBasedNames).length > 0 && (
                <section>
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    Time-Based Names
                  </h2>
                  <dl className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                    {Object.entries(tribe.timeBasedNames).map(([time, names]) => (
                      <div key={time} className="p-2.5 sm:p-3 bg-secondary rounded-lg">
                        <dt className="text-xs sm:text-sm font-medium text-foreground capitalize inline">{time}:</dt>
                        <dd className="text-xs sm:text-sm text-muted-foreground ml-1.5 sm:ml-2 inline">
                          {(names as string[]).join(', ')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              
              {Array.isArray(tribe.culturalTraits) && tribe.culturalTraits.length > 0 && (
                <section>
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Cultural Traits</h2>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {tribe.culturalTraits.map((trait, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {tribe.famousPeople && tribe.famousPeople.length > 0 && (
                <section>
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    👤 Notable People
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {(tribe.famousPeople as Array<{ name: string; role: string; wikipedia?: string | null; image?: string; birth?: number; death?: number }>).map((person, i) => (
                      <PersonCard key={i} person={person} tribeSlug={tribe.slug} />
                    ))}
                  </div>
                  <Link 
                    to={`/people?tribe=${tribe.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View all {tribe.name} people →
                  </Link>
                </section>
              )}

              {/* Tribe Gallery - only show if images exist */}
              {(tribe as any).gallery && (tribe as any).gallery.length > 0 && (
                <ImageGallery 
                  images={(tribe as any).gallery} 
                  title={`${tribe.name} Culture & Heritage`}
                />
              )}
              
              {/* Traditional Food Section */}
              {(tribe as any).traditionalFood && typeof (tribe as any).traditionalFood === 'object' && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    🍲 Traditional Cuisine
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">{(tribe as any).traditionalFood.description}</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Staple Foods</h3>
                      <ul className="space-y-1">
                        {(tribe as any).traditionalFood.staples?.map((food: string, i: number) => {
                          const foodName = food.split('(')[0].split('-')[0].trim();
                          const recipe = findRecipeByName(foodName, tribe.slug);
                          return (
                            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="text-primary">•</span>
                              {recipe ? (
                                <Link to={`/recipe/${recipe.id}`} className="hover:text-primary hover:underline cursor-pointer" title="View recipe">
                                  {food} 📖
                                </Link>
                              ) : food}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Beverages</h3>
                      <ul className="space-y-1">
                        {(tribe as any).traditionalFood.beverages?.map((drink: string, i: number) => {
                          const drinkName = drink.split('(')[0].split('-')[0].trim();
                          const recipe = findRecipeByName(drinkName, tribe.slug);
                          return (
                            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="text-primary">•</span>
                              {recipe ? (
                                <Link to={`/recipe/${recipe.id}`} className="hover:text-primary hover:underline cursor-pointer" title="View recipe">
                                  {drink} 📖
                                </Link>
                              ) : drink}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Special Dishes</h3>
                      <ul className="space-y-1">
                        {(tribe as any).traditionalFood.specialDishes?.map((dish: string, i: number) => {
                          const dishName = dish.split('(')[0].split('-')[0].trim();
                          const recipe = findRecipeByName(dishName, tribe.slug);
                          return (
                            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                              <span className="text-primary">•</span>
                              {recipe ? (
                                <Link to={`/recipe/${recipe.id}`} className="hover:text-primary hover:underline cursor-pointer" title="View recipe">
                                  {dish} 📖
                                </Link>
                              ) : dish}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </section>
              )}
              
              {/* Meal Traditions Section */}
              {(tribe as any).eatingCustoms && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    🍽️ Meal Traditions
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover how the {tribe.name} people gather, eat, and honor food traditions.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Meals Per Day */}
                    {(tribe as any).eatingCustoms.mealsPerDay && (
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{(tribe as any).eatingCustoms.mealsPerDay}</p>
                        <p className="text-xs text-muted-foreground">Meals per Day</p>
                      </div>
                    )}
                    
                    {/* Main Meal Time */}
                    {(tribe as any).eatingCustoms.mainMealTime && (
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <p className="text-sm font-semibold text-foreground">{(tribe as any).eatingCustoms.mainMealTime}</p>
                        <p className="text-xs text-muted-foreground">Main Meal Time</p>
                      </div>
                    )}
                    
                    {/* Eating Style */}
                    {(tribe as any).eatingCustoms.eatingStyle && (
                      <div className="p-3 bg-secondary rounded-lg text-center">
                        <p className="text-sm font-semibold text-foreground truncate" title={(tribe as any).eatingCustoms.eatingStyle}>
                          {(tribe as any).eatingCustoms.eatingStyle.length > 50 
                            ? (tribe as any).eatingCustoms.eatingStyle.substring(0, 50) + '...' 
                            : (tribe as any).eatingCustoms.eatingStyle}
                        </p>
                        <p className="text-xs text-muted-foreground">Eating Style</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {/* Meal Pattern */}
                    {(tribe as any).eatingCustoms.mealPattern && (
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span>⏰</span> Daily Meal Pattern
                        </h3>
                        <p className="text-sm text-muted-foreground">{(tribe as any).eatingCustoms.mealPattern}</p>
                      </div>
                    )}
                    
                    {/* Gender & Age Rules */}
                    {(tribe as any).eatingCustoms.genderRules && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span>👥</span> Gender & Age Customs
                        </h3>
                        <p className="text-sm text-muted-foreground">{(tribe as any).eatingCustoms.genderRules}</p>
                      </div>
                    )}
                    
                    {/* Food Taboos */}
                    {Array.isArray((tribe as any).eatingCustoms.taboos) && (tribe as any).eatingCustoms.taboos.length > 0 && (
                      <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-lg border border-red-200 dark:border-red-800">
                        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span>🚫</span> Food Taboos & Restrictions
                        </h3>
                        <ul className="space-y-1">
                          {(tribe as any).eatingCustoms.taboos.map((taboo: string, i: number) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">•</span>
                              {taboo}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Special Occasions */}
                    {(tribe as any).eatingCustoms.specialOccasions && (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span>🎉</span> Celebratory Foods
                        </h3>
                        <p className="text-sm text-muted-foreground">{(tribe as any).eatingCustoms.specialOccasions}</p>
                      </div>
                    )}
                    
                    {/* Hospitality */}
                    {(tribe as any).eatingCustoms.hospitality && (
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span>🤝</span> Hospitality Traditions
                        </h3>
                        <p className="text-sm text-muted-foreground italic">"{(tribe as any).eatingCustoms.hospitality}"</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
              
              {/* Diaspora Section */}
              {tribe.diaspora && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    Global Diaspora
                  </h2>
                  <div className="p-4 bg-secondary rounded-lg mb-4">
                    <p className="text-2xl font-bold text-primary mb-1">{tribe.diaspora.globalPopulation}</p>
                    <p className="text-sm text-muted-foreground">Estimated global diaspora population</p>
                  </div>
                  
                  {/* Diaspora Pie Chart */}
                  {(tribe.diaspora as any).breakdown && (tribe.diaspora as any).breakdown.length >= 2 && (
                    <PopulationPieChart 
                      diaspora={(tribe.diaspora as any).breakdown}
                      tribeName={tribe.name}
                      type="diaspora"
                    />
                  )}
                  
                  {/* Country Breakdown Cards */}
                  {(tribe.diaspora as any).breakdown && (
                    <div className="mb-4 mt-4">
                      <h3 className="text-sm font-medium text-foreground mb-3">Population by Country</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(tribe.diaspora as any).breakdown.map((country: { country: string; population: string; cities: string[] }, i: number) => (
                          <div key={i} className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-foreground text-sm">{country.country}</p>
                              <p className="text-xs font-semibold text-primary">{country.population}</p>
                            </div>
                            {country.cities && country.cities.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              📍 {country.cities.join(', ')}
                            </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {tribe.diaspora.communities && tribe.diaspora.communities.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Notable Communities</h3>
                      <ul className="space-y-1">
                        {tribe.diaspora.communities.map((community, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {community}
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}
                    {tribe.diaspora.associations && tribe.diaspora.associations.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Diaspora Organizations</h3>
                      <ul className="flex flex-wrap gap-2">
                        {tribe.diaspora.associations.map((assoc, i) => (
                          <li key={i} className="badge-tribe text-xs">
                            {assoc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}
                  </div>
                </section>
              )}
              
              {/* Related Tribes */}
              {relatedTribesData.length > 0 && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-3">Related Tribes</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedTribesData.map((related) => {
                      if (!related) return null;
                      
                      // Calculate similarities between current tribe and related tribe
                      const similarities: string[] = [];
                      
                      // Check same country
                      const currentCountries = (tribe as any).countries || [];
                      const relatedCountries = (related as any).countries || [];
                      const sharedCountries = currentCountries.filter((c: string) => relatedCountries.includes(c));
                      if (sharedCountries.length > 0) {
                        similarities.push('Same Region');
                      }
                      
                      // Check language family
                      const currentLang = (tribe as any).language?.family;
                      const relatedLang = (related as any).language?.family;
                      if (currentLang && relatedLang && currentLang === relatedLang) {
                        similarities.push('Same Language Family');
                      }
                      
                      // Check religion
                      const currentReligion = (tribe as any).religion;
                      const relatedReligion = (related as any).religion;
                      if (currentReligion && relatedReligion) {
                        const getReligionType = (r: string) => {
                          if (r.toLowerCase().includes('islam') || r.toLowerCase().includes('muslim')) return 'islam';
                          if (r.toLowerCase().includes('christian') || r.toLowerCase().includes('orthodox')) return 'christian';
                          if (r.toLowerCase().includes('traditional')) return 'traditional';
                          return null;
                        };
                        const currType = getReligionType(currentReligion);
                        const relType = getReligionType(relatedReligion);
                        if (currType && relType && currType === relType) {
                          similarities.push('Similar Religion');
                        }
                      }
                      
                      // Check for shared stereotypes
                      const currentStereotypes = tribe.stereotypes || [];
                      const relatedStereotypes = related.stereotypes || [];
                      const sharedStereotypes = currentStereotypes.filter((s: string) => 
                        relatedStereotypes.some((rs: string) => 
                          s.toLowerCase().includes(rs.toLowerCase().split(' ')[0]) ||
                          rs.toLowerCase().includes(s.toLowerCase().split(' ')[0])
                        )
                      );
                      if (sharedStereotypes.length > 0) {
                        similarities.push('Cultural Ties');
                      }
                      
                      // Check neighboring regions
                      if (tribe.region && related.region) {
                        const tribeRegionWords = tribe.region.toLowerCase().split(/[\s,()]+/);
                        const relatedRegionWords = related.region.toLowerCase().split(/[\s,()]+/);
                        const hasRegionOverlap = tribeRegionWords.some((w: string) => 
                          w.length > 3 && relatedRegionWords.includes(w)
                        );
                        if (hasRegionOverlap && !similarities.includes('Same Region')) {
                          similarities.push('Neighboring Peoples');
                        }
                      }
                      
                      return (
                        <Link
                          key={related.id}
                          to={`/learn/${related.slug}`}
                          className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {related.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{related.region}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          </div>
                          {similarities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {similarities.slice(0, 3).map((sim, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full font-medium"
                                >
                                  {sim}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
              
              {/* Sources & References Section */}
              <section className="border-t border-border pt-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                  📚 Sources & References
                </h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Information compiled from academic sources, ethnographic research, and verified references.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(tribe.name)}_people`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-xs text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Wikipedia: {tribe.name} people
                  </a>
                  <a 
                    href={`https://www.ethnologue.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-xs text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ethnologue (Languages)
                  </a>
                  <a 
                    href={`https://joshuaproject.net/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-xs text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Joshua Project (Demographics)
                  </a>
                  {(tribe as any).youtubeVideoId && (
                    <a 
                      href={`https://www.youtube.com/watch?v=${(tribe as any).youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      YouTube Documentary
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  ⚠️ Disclaimer: This content is for educational and entertainment purposes. Cultural representations are generalized and may not reflect individual experiences.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default TribePage;