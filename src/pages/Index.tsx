import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuessForm } from '@/components/GuessForm';
import { TribeResultCard } from '@/components/TribeResultCard';
import { TopTribesCarousel } from '@/components/TopTribesCarousel';
import { FeaturedBlogsCarousel } from '@/components/FeaturedBlogsCarousel';
import { FeaturedRecipesCarousel } from '@/components/FeaturedRecipesCarousel';
import { GlobalOriginCard } from '@/components/GlobalOriginCard';
import { NameAnalysisCard } from '@/components/NameAnalysisCard';
import { detectTribe, getCountries, getTribesByCountry, getCountrySuggestions, getAllTribes } from '@/lib/tribeDetection';
import { analyzeNameBreakdown, findSimilarNames, getGlobalMatches } from '@/lib/nameAnalysis';
import { ArrowRight, Lightbulb, Brain, BookOpen, Shuffle, Search, Languages } from 'lucide-react';
import { sanitizeTextInput, isValidCountryCode } from '@/lib/dataValidation';
import logo from '@/assets/logo.png';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameQuery = sanitizeTextInput(searchParams.get('name') || '', 50);
  const timeQuery = sanitizeTextInput(searchParams.get('time') || '', 20);
  const regionQuery = sanitizeTextInput(searchParams.get('region') || '', 30);
  const buildQuery = sanitizeTextInput(searchParams.get('build') || '', 30);
  const personalityQuery = sanitizeTextInput(searchParams.get('personality') || '', 30);
  const rawCountry = searchParams.get('country') || 'KE';
  const countryQuery = isValidCountryCode(rawCountry) ? rawCountry : 'KE';

  // Use country from URL directly - no local state needed
  const selectedCountry = countryQuery;

  // Handler to update country in URL
  const handleCountryChange = (newCountry: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('country', newCountry);
    setSearchParams(newParams);
  };

  // Use selectedCountry directly - it's always synced with form
  const activeCountry = selectedCountry;

  const countries = getCountries();
  const activeCountryInfo =
    countries.find(c => c.code === activeCountry) ||
    countries.find(c => c.code === 'KE');

  // Best-effort adjective; fallback to country name (prevents "Kenyan" always showing)
  const countryAdjectives: Record<string, string> = {
    ALL: 'African',
    KE: 'Kenyan',
    NG: 'Nigerian',
    GH: 'Ghanaian',
    ZA: 'South African',
    ET: 'Ethiopian',
    TZ: 'Tanzanian',
    UG: 'Ugandan',
    CD: 'Congolese',
    SN: 'Senegalese',
    ER: 'Eritrean',
    RW: 'Rwandan',
    BI: 'Burundian',
    SO: 'Somali',
    CM: 'Cameroonian',
    ZW: 'Zimbabwean',
    ZM: 'Zambian',
    MW: 'Malawian',
    AO: 'Angolan',
    MZ: 'Mozambican',
    BW: 'Botswanan',
    NA: 'Namibian',
    SS: 'South Sudanese',
    SD: 'Sudanese',
    ML: 'Malian',
    BF: 'Burkinabè',
    CI: 'Ivorian',
    GN: 'Guinean',
  };

  const countryLabel =
    countryAdjectives[activeCountry] || activeCountryInfo?.name || 'African';
  const countryFlag = activeCountry === 'ALL' ? '🌍' : (activeCountryInfo?.flag || '🇰🇪');

  const popularNames = (() => {
    const tribes = getTribesByCountry(activeCountry);
    const all: string[] = [];

    // Prefer female names first (app copy is "Guess Her") then add male names
    for (const t of tribes) {
      all.push(...(t as any)?.commonNames?.female || []);
    }
    for (const t of tribes) {
      all.push(...(t as any)?.commonNames?.male || []);
    }

    const unique = Array.from(new Set(all.map(n => String(n).trim()).filter(Boolean)));

    // Safety fallback if a country's tribes are missing names
    return (unique.length ? unique : ['Wanjiku', 'Odhiambo', 'Cheruiyot', 'Nafula', 'Mutua', 'Moraa', 'Kipchoge', 'Fatuma']).slice(0, 8);
  })();
  let results = null;
  let countrySuggestions: ReturnType<typeof getCountrySuggestions> = [];
  
  try {
    results = nameQuery ? detectTribe(nameQuery, {
      timeOfBirth: timeQuery || undefined,
      region: regionQuery || undefined,
      build: buildQuery || undefined,
      personality: personalityQuery || undefined,
      country: countryQuery || undefined
    }) : null;
    
    // Check for better matches in other countries
    if (nameQuery && results) {
      const topConfidence = results.predictions[0]?.confidence || 0;
      // Only suggest if current results are weak
      if (topConfidence < 70) {
        countrySuggestions = getCountrySuggestions(nameQuery, countryQuery);
      }
    }
  } catch (e) {
    console.error('Detection error:', e);
  }

  // Compute name analysis data
  const nameAnalysis = useMemo(() => {
    if (!nameQuery) return null;
    
    const breakdown = analyzeNameBreakdown(nameQuery);
    const similarNames = findSimilarNames(nameQuery);
    const globalMatches = getGlobalMatches(nameQuery);
    const topConfidence = results?.predictions[0]?.confidence || 0;
    const hasResults = results?.predictions && results.predictions.length > 0;
    
    return {
      breakdown,
      similarNames,
      globalMatches,
      hasResults,
      topConfidence
    };
  }, [nameQuery, results]);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8">
        {!results ?
      // Landing view
      <section className="max-w-2xl mx-auto text-center py-8 sm:py-12 animate-fade-in">
            {/* Glowing Tribe animation styles */}
            <style>{`
              @keyframes glowPulse {
                0%, 100% { 
                  text-shadow: 0 0 10px hsl(38 92% 50% / 0.5), 0 0 20px hsl(38 92% 50% / 0.3), 0 0 30px hsl(38 92% 50% / 0.2);
                  filter: brightness(1);
                }
                50% { 
                  text-shadow: 0 0 20px hsl(38 92% 50% / 0.8), 0 0 40px hsl(38 92% 50% / 0.5), 0 0 60px hsl(38 92% 50% / 0.3);
                  filter: brightness(1.2);
                }
              }
              .glow-tribe {
                animation: glowPulse 2s ease-in-out infinite;
              }
            `}</style>
            <div className="mb-6 sm:mb-8">
              {/* Hero with orbiting flags - all supported countries */}
              <div className="relative inline-block">
                {/* Orbiting flags behind logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <style>{`
                    @keyframes orbit {
                      from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
                      to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
                    }
                  `}</style>
                  {['🇰🇪', '🇳🇬', '🇬🇭', '🇿🇦', '🇪🇹', '🇹🇿', '🇺🇬', '🇨🇩', '🇸🇳', '🇪🇷'].map((flag, i) => <span key={flag} className="absolute text-xl sm:text-2xl opacity-35" style={{
                animation: `orbit 15s linear infinite`,
                animationDelay: `${-i * 1.5}s`
              }}>
                      {flag}
                    </span>)}
                </div>
                <img src={logo} alt="TribeGuess - Tribe Guesser Logo" className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 animate-bounce-subtle" width={128} height={128} loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Guess Her <span className="gradient-gold-text glow-tribe">Tribe</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-2">
                Enter a name to discover the tribe it likely belongs to, along with cultural insights and stereotypes.
              </p>
            </div>
            
            <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} initialCountry={countryQuery} onCountryChange={handleCountryChange} />
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                Try some popular {countryFlag} {countryLabel} names:
              </p>
              <nav aria-label="Example names" className="flex flex-wrap justify-center gap-2">
                {popularNames.map((name) => (
                  <a
                    key={name}
                    href={`/?name=${encodeURIComponent(name)}&country=${activeCountry}`}
                    className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 touch-manipulation"
                  >
                    {name}
                  </a>
                ))}
              </nav>
            </div>
            
            {/* Quick Discovery CTAs */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto">
              <Link to="/learn" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{getAllTribes().length}+ Tribes</span>
              </Link>
              <Link to="/quiz" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">Quiz</span>
              </Link>
              <Link to="/random" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                <Shuffle className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">Random</span>
              </Link>
              <Link to="/languages" className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                <Languages className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">Languages</span>
              </Link>
            </div>
            
            {/* Top Tribes Carousel */}
            <div className="content-auto-lg">
              <TopTribesCarousel />
            </div>
            
            {/* Featured Blogs Carousel */}
            <div className="content-auto">
              <FeaturedBlogsCarousel />
            </div>
            
            {/* Featured Recipes Carousel */}
            <div className="content-auto">
              <FeaturedRecipesCarousel />
            </div>
            
            <aside className="mt-8 sm:mt-10 p-3 sm:p-4 bg-secondary/50 rounded-xl max-w-md mx-auto">
              <p className="text-xs text-muted-foreground">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Stereotypes presented are common perceptions and may not apply to individuals.
              </p>
            </aside>
          </section> :
      // Results view
      <section className="max-w-2xl mx-auto animate-fade-in" aria-label="Tribe prediction results">
            <header className="text-center mb-6 sm:mb-8">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Results for "<span className="text-primary">{results.inputName}</span>"
              </h1>
              {results.timeOfBirth && <p className="text-muted-foreground text-sm">
                  Born in the {results.timeOfBirth}
                </p>}
            </header>
            
            <div className="mb-6 sm:mb-8">
              <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} initialCountry={countryQuery} />
            </div>
            
            {/* Country suggestions - "Did you mean?" */}
            {countrySuggestions.length > 0 && (
              <div className="mb-4 p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl animate-fade-in">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm font-medium">Did you mean to search in another country?</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {countrySuggestions.map((suggestion) => (
                    <a
                      key={suggestion.country.code}
                      href={`/?name=${encodeURIComponent(nameQuery)}&country=${suggestion.country.code}`}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-amber-900/50 rounded-lg border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-500 transition-colors group"
                    >
                      <span className="text-lg">{suggestion.country.flag}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          Try {suggestion.country.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {suggestion.reason}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Name Analysis Card - breakdown, global matches, and similar names */}
            {nameAnalysis && (
              <NameAnalysisCard
                inputName={results.inputName}
                breakdown={nameAnalysis.breakdown}
                similarNames={nameAnalysis.similarNames}
                globalMatches={nameAnalysis.globalMatches}
                hasResults={nameAnalysis.hasResults}
                topConfidence={nameAnalysis.topConfidence}
              />
            )}
            
            {/* Global Origin Card - show when non-African origin detected */}
            {results.globalOrigin && (results.globalOrigin.isNonAfrican || results.globalOrigin.religion) && (
              <GlobalOriginCard
                origins={results.globalOrigin.origins}
                inputName={results.inputName}
                religion={results.globalOrigin.religion}
                religiousNote={results.globalOrigin.religiousNote}
                religiousTribes={results.globalOrigin.religiousTribes}
                confidence={results.globalOrigin.confidence}
              />
            )}
            
            {/* Tribe Result Cards */}
            {results.predictions.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {results.predictions.map((prediction, index) => (
                  <TribeResultCard key={prediction.tribe.id} result={prediction} rank={index + 1} inputName={results.inputName} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4 bg-card border border-border rounded-xl">
                <Search className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-foreground font-medium mb-1">No tribal matches found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn't find a strong match for "{results.inputName}" in our database.
                  Try a different spelling, or explore tribes directly.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link to="/learn" className="text-sm text-primary hover:underline font-medium">Browse All Tribes</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/random" className="text-sm text-primary hover:underline font-medium">Try Random Tribe</Link>
                </div>
              </div>
            )}
            
            <aside className="mt-6 sm:mt-8 p-3 sm:p-4 bg-secondary/50 rounded-xl">
              <p className="text-xs text-muted-foreground text-center">
                ⚠️ <strong>Disclaimer:</strong> This tool is for entertainment and educational purposes only. 
                Predictions are based on common naming patterns and may not be accurate for all names.
              </p>
            </aside>
          </section>}
      </main>
      
      <Footer />
    </div>;
};
export default Index;