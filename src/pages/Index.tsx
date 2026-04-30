import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuessForm } from '@/components/GuessForm';
import { TribeResultCard } from '@/components/TribeResultCard';
import { TopTribesCarousel } from '@/components/TopTribesCarousel';
import { FeaturedBlogsCarousel } from '@/components/FeaturedBlogsCarousel';
import { FeaturedRecipesCarousel } from '@/components/FeaturedRecipesCarousel';
import { GlobalOriginCard } from '@/components/GlobalOriginCard';
import { NameAnalysisCard } from '@/components/NameAnalysisCard';
import { ResultQuickActions } from '@/components/ResultQuickActions';
import { ResultSummaryBanner } from '@/components/ResultSummaryBanner';
import { RecentSearches } from '@/components/RecentSearches';
import { detectTribe, getCountries, getTribesByCountry, getCountrySuggestions, getAllTribes } from '@/lib/tribeDetection';
import { analyzeNameBreakdown, findSimilarNames, getGlobalMatches } from '@/lib/nameAnalysis';
import { ArrowRight, Lightbulb, Brain, BookOpen, Shuffle, Search, Languages } from 'lucide-react';
import { CountryFlag } from '@/components/CountryFlag';
import { sanitizeTextInput, isValidCountryCode } from '@/lib/dataValidation';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useFavoriteNames } from '@/hooks/useFavoriteNames';
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

  const selectedCountry = countryQuery;
  const { searches, addSearch, clearSearches } = useRecentSearches();
  const { isFavorite, toggleFavorite } = useFavoriteNames();

  const handleCountryChange = (newCountry: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('country', newCountry);
    setSearchParams(newParams);
  };

  const activeCountry = selectedCountry;
  const countries = getCountries();
  const activeCountryInfo =
    countries.find(c => c.code === activeCountry) ||
    countries.find(c => c.code === 'KE');

  const countryAdjectives: Record<string, string> = {
    ALL: 'African', KE: 'Kenyan', NG: 'Nigerian', GH: 'Ghanaian', ZA: 'South African',
    ET: 'Ethiopian', TZ: 'Tanzanian', UG: 'Ugandan', CD: 'Congolese', SN: 'Senegalese',
    ER: 'Eritrean', RW: 'Rwandan', BI: 'Burundian', SO: 'Somali', CM: 'Cameroonian',
    ZW: 'Zimbabwean', ZM: 'Zambian', MW: 'Malawian', AO: 'Angolan', MZ: 'Mozambican',
    BW: 'Botswanan', NA: 'Namibian', SS: 'South Sudanese', SD: 'Sudanese', ML: 'Malian',
    BF: 'Burkinabè', CI: 'Ivorian', GN: 'Guinean',
  };

  const countryLabel = countryAdjectives[activeCountry] || activeCountryInfo?.name || 'African';
  const countryCode = activeCountry === 'ALL' ? 'ALL' : activeCountry;

  const popularNames = (() => {
    const tribes = getTribesByCountry(activeCountry);
    const all: string[] = [];
    for (const t of tribes) all.push(...(t.commonNames?.female || []));
    for (const t of tribes) all.push(...(t.commonNames?.male || []));
    const unique = Array.from(new Set(all.map(n => String(n).trim()).filter(Boolean)));
    return (unique.length ? unique : ['Wanjiku', 'Odhiambo', 'Cheruiyot', 'Nafula', 'Mutua', 'Moraa', 'Kipchoge', 'Fatuma']).slice(0, 8);
  })();

  const { results, countrySuggestions } = useMemo(() => {
    let res: ReturnType<typeof detectTribe> | null = null;
    let suggestions: ReturnType<typeof getCountrySuggestions> = [];
    if (!nameQuery) {
      return { results: res, countrySuggestions: suggestions };
    }
    try {
      res = detectTribe(nameQuery, {
        timeOfBirth: timeQuery || undefined,
        region: regionQuery || undefined,
        build: buildQuery || undefined,
        personality: personalityQuery || undefined,
        country: countryQuery || undefined,
      });
      if (res) {
        const topConfidence = res.predictions[0]?.confidence || 0;
        if (topConfidence < 70) {
          suggestions = getCountrySuggestions(nameQuery, countryQuery);
        }
      }
    } catch (e) {
      console.error('Detection error:', e);
    }
    return { results: res, countrySuggestions: suggestions };
  }, [nameQuery, timeQuery, regionQuery, buildQuery, personalityQuery, countryQuery]);

  // Track recent searches
  useEffect(() => {
    if (nameQuery && results) {
      addSearch({
        name: results.inputName,
        country: countryQuery,
        topTribe: results.predictions[0]?.tribe?.name,
        confidence: results.predictions[0]?.confidence,
      });
    }
  }, [nameQuery, results, countryQuery, addSearch]);

  // Compute name analysis data
  const nameAnalysis = useMemo(() => {
    if (!nameQuery) return null;
    const breakdown = analyzeNameBreakdown(nameQuery);
    const similarNames = findSimilarNames(nameQuery);
    const globalMatches = getGlobalMatches(nameQuery);
    const topConfidence = results?.predictions[0]?.confidence || 0;
    const hasResults = results?.predictions && results.predictions.length > 0;
    return { breakdown, similarNames, globalMatches, hasResults, topConfidence };
  }, [nameQuery, results]);

  // Related names from top matched tribe for quick actions
  const relatedNames = useMemo(() => {
    if (!results?.predictions?.[0]) return [];
    const topTribe = results.predictions[0].tribe;
    const names = [
      ...(topTribe.commonNames?.female || []),
      ...(topTribe.commonNames?.male || []),
    ].filter(n => typeof n === 'string' && n.toLowerCase() !== nameQuery.toLowerCase());
    return Array.from(new Set(names)).slice(0, 8);
  }, [results, nameQuery]);

  // Full name detection: if input has space, analyze parts
  const fullNameParts = useMemo(() => {
    if (!nameQuery || !nameQuery.includes(' ')) return null;
    const parts = nameQuery.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2 || parts.length > 4) return null;
    return parts;
  }, [nameQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-4 py-6 sm:py-8">
        {!results ? (
          // Landing view
          <section className="max-w-2xl mx-auto text-center py-8 sm:py-12 animate-fade-in sm:max-w-3xl">
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
              .glow-tribe { animation: glowPulse 2s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) {
                .glow-tribe { animation: none; text-shadow: 0 0 12px hsl(38 92% 50% / 0.35); filter: none; }
                .orbit-flags > span { animation: none !important; opacity: 0.2; }
              }
            `}</style>
            <div className="mb-6 sm:mb-8">
              <div className="relative inline-block">
                <div className="orbit-flags absolute inset-0 flex items-center justify-center pointer-events-none">
                  <style>{`
                    @keyframes orbit {
                      from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
                      to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
                    }
                  `}</style>
                  {['KE', 'NG', 'GH', 'ZA', 'ET', 'TZ', 'UG', 'CD', 'SN', 'ER'].map((code, i) => (
                    <span key={code} className="absolute opacity-35" style={{
                      animation: `orbit 15s linear infinite`,
                      animationDelay: `${-i * 1.5}s`
                    }}>
                      <CountryFlag code={code} size={20} />
                    </span>
                  ))}
                </div>
                <img src={logo} alt="TribeGuess - Tribe Guesser Logo" className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 animate-bounce-subtle" width={128} height={128} loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Guess the <span className="gradient-gold-text glow-tribe">Tribe</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2 text-balance leading-relaxed">
                Enter a first name and country to explore likely tribal roots, naming patterns, and cultural context—built for curiosity, not stereotypes about any one person.
              </p>
            </div>
            
            <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} initialCountry={countryQuery} onCountryChange={handleCountryChange} />
            
            {/* Recent Searches */}
            <RecentSearches searches={searches} onClear={clearSearches} />
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4 flex items-center justify-center gap-1.5">
                Try some popular <CountryFlag code={countryCode} size={16} /> {countryLabel} names:
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
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <Link
                to="/learn"
                className="card-landing-tile flex flex-col items-center justify-center gap-2 min-h-[92px] sm:min-h-[100px] p-4 sm:p-5 text-center group touch-manipulation"
              >
                <Search className="w-6 h-6 text-primary shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  Browse tribes
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">{getAllTribes().length}+ groups</span>
              </Link>
              <Link
                to="/quiz"
                className="card-landing-tile flex flex-col items-center justify-center gap-2 min-h-[92px] sm:min-h-[100px] p-4 sm:p-5 text-center group touch-manipulation"
              >
                <Brain className="w-6 h-6 text-primary shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  Culture quiz
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">Test your knowledge</span>
              </Link>
              <Link
                to="/random"
                className="card-landing-tile flex flex-col items-center justify-center gap-2 min-h-[92px] sm:min-h-[100px] p-4 sm:p-5 text-center group touch-manipulation"
              >
                <Shuffle className="w-6 h-6 text-primary shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  Random tribe
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">Surprise me</span>
              </Link>
              <Link
                to="/languages"
                className="card-landing-tile flex flex-col items-center justify-center gap-2 min-h-[92px] sm:min-h-[100px] p-4 sm:p-5 text-center group touch-manipulation"
              >
                <Languages className="w-6 h-6 text-primary shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  Languages
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">Families & maps</span>
              </Link>
            </div>
            
            <div className="content-auto-lg">
              <TopTribesCarousel />
            </div>
            <div className="content-auto">
              <FeaturedBlogsCarousel />
            </div>
            <div className="content-auto">
              <FeaturedRecipesCarousel />
            </div>
            
            <aside className="mt-8 sm:mt-10 p-4 sm:p-5 bg-secondary/50 rounded-2xl max-w-lg mx-auto border border-border/60">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-balance">
                <strong className="text-foreground">Disclaimer:</strong> This tool is for entertainment and educational purposes only.
                Stereotypes are common perceptions and may not apply to individuals.
              </p>
            </aside>
          </section>
        ) : (
          // Results view
          <section className="max-w-2xl mx-auto animate-fade-in" aria-label="Tribe prediction results">
            <header className="text-center mb-4 sm:mb-5">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">
                Results for "<span className="text-primary">{results.inputName}</span>"
              </h1>
              {results.timeOfBirth && (
                <p className="text-muted-foreground text-xs sm:text-sm">Born in the {results.timeOfBirth}</p>
              )}
            </header>
            
            <div className="mb-4 sm:mb-5">
              <GuessForm initialName={nameQuery} initialTime={timeQuery} initialRegion={regionQuery} initialBuild={buildQuery} initialPersonality={personalityQuery} initialCountry={countryQuery} />
            </div>

            {/* Full Name Analysis hint */}
            {fullNameParts && fullNameParts.length >= 2 && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl animate-fade-in">
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span className="font-medium">Full name detected — try each part separately:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {fullNameParts.map(part => (
                    <a
                      key={part}
                      href={`/?name=${encodeURIComponent(part)}&country=${countryQuery}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-blue-900/40 rounded-lg border border-blue-200 dark:border-blue-700 text-sm font-medium text-foreground hover:border-primary transition-colors touch-manipulation"
                    >
                      {part}
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Country suggestions */}
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
                      <CountryFlag code={suggestion.country.code} size={20} label={suggestion.country.name} />
                      <div className="text-left">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          Try {suggestion.country.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{suggestion.reason}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Result Summary Banner */}
            {results.predictions.length > 0 && (
              <ResultSummaryBanner
                inputName={results.inputName}
                topTribeName={results.predictions[0].tribe.name}
                confidence={results.predictions[0].confidence}
                totalMatches={results.predictions.length}
              />
            )}
            
            {/* Name Analysis Card */}
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
            
            {/* Global Origin Card */}
            {results.globalOrigin && (results.globalOrigin.isNonAfrican || results.globalOrigin.religion || results.globalOrigin.westernMapping?.found) && (
              <GlobalOriginCard
                origins={results.globalOrigin.origins}
                inputName={results.inputName}
                religion={results.globalOrigin.religion}
                religiousNote={results.globalOrigin.religiousNote}
                religiousTribes={results.globalOrigin.religiousTribes}
                confidence={results.globalOrigin.confidence}
                westernMapping={results.globalOrigin.westernMapping}
              />
            )}
            
            {/* Tribe Result Cards */}
            {results.predictions.length > 0 ? (
              <div className="space-y-2.5 sm:space-y-3">
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
                  <span className="text-muted-foreground">•</span>
                  <Link to="/names" className="text-sm text-primary hover:underline font-medium">Names Gallery</Link>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {results.predictions.length > 0 && (
              <div className="mt-4 p-4 bg-card border border-border rounded-xl">
                <ResultQuickActions
                  inputName={results.inputName}
                  topTribeName={results.predictions[0].tribe.name}
                  topTribeSlug={results.predictions[0].tribe.slug || results.predictions[0].tribe.id}
                  country={countryQuery}
                  isFavorite={isFavorite(results.inputName)}
                  onToggleFavorite={() => toggleFavorite(results.inputName, { tribe: results.predictions[0].tribe.name })}
                  relatedNames={relatedNames}
                  muslimEquivalents={
                    results.globalOrigin?.westernMapping?.isReverseLookup 
                      ? undefined 
                      : results.globalOrigin?.westernMapping?.muslimEquivalents
                  }
                  westernEquivalents={
                    results.globalOrigin?.westernMapping?.isReverseLookup 
                      ? results.globalOrigin?.westernMapping?.westernEquivalents 
                      : undefined
                  }
                />
              </div>
            )}
            
            <aside className="mt-6 sm:mt-8 p-4 sm:p-5 bg-secondary/50 rounded-2xl border border-border/60 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed text-balance">
                <strong className="text-foreground">Disclaimer:</strong> For entertainment and educational use only.
                Predictions use common naming patterns and may not be accurate for every name.
              </p>
            </aside>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};
export default Index;
