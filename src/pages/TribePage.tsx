import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Users, Star, Book, Clock, Globe, UsersRound, Map, ExternalLink, History, Languages, UserCircle, UserCircle2, Church, Play, TrendingUp } from 'lucide-react';
import { getTribeBySlug, getAllTribes, getNameDatabase, getCountries, getTribeReligiousInfo, getTribeLandmarks } from '@/lib/tribeDetection';
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
const TribePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tribe = slug ? getTribeBySlug(slug) : null;
  const allTribes = getAllTribes();
  
  if (!tribe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">Tribe not found</p>
          <Link to="/learn" className="text-primary hover:underline">
            ← Back to all tribes
          </Link>
        </div>
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
  
  // SEO metadata
  const countries = (tribe as any).countries as string[] | undefined;
  const countryNames = countries?.map(code => getCountries().find(c => c.code === code)?.name).filter(Boolean).join(', ') || 'Africa';
  const seoTitle = `${tribe.name} Tribe - Culture, Names & History | TribeGuess`;
  const seoDescription = `Learn about the ${tribe.name} people of ${countryNames}. Discover traditional names, cultural practices, population (${tribe.population}), and famous ${tribe.name} personalities.`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tribeguess.com/learn/${tribe.slug}`} />
        <link rel="canonical" href={`https://tribeguess.com/learn/${tribe.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${tribe.name} Tribe - Culture, Names & History`,
            "description": seoDescription,
            "author": {
              "@type": "Organization",
              "name": "TribeGuess"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TribeGuess"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://tribeguess.com/learn/${tribe.slug}`
            },
            "about": {
              "@type": "Thing",
              "name": `${tribe.name} people`,
              "description": tribe.description
            }
          })}
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
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${(tribe as any).youtubeVideoId}?rel=0`}
                      title={`${tribe.name} Culture Documentary`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    📺 Video content is sourced from YouTube for educational purposes.
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
                  const [showCountryList, setShowCountryList] = React.useState(false);
                  
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
                      
                      <TribeMap 
                        lat={tribe.mapCoordinates.lat} 
                        lng={tribe.mapCoordinates.lng} 
                        tribeName={tribe.name}
                        counties={tribe.counties}
                        countries={countries}
                      />
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
                        <div className="p-3 bg-secondary rounded-lg text-center">
                          <p className="text-xl sm:text-2xl font-bold">
                            <span className="text-blue-600">{tribe.genderRatio.male}%</span>
                            <span className="text-muted-foreground mx-1">/</span>
                            <span className="text-pink-600">{tribe.genderRatio.female}%</span>
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Male / Female</p>
                        </div>
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
                      
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">
                          <strong>Main Regions:</strong> {tribe.counties.join(', ')}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </section>
              
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{tribe.description}</p>
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
                    <div>
                      <p className="text-sm text-muted-foreground">Language Name</p>
                      <p className="font-semibold text-foreground">{language.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Speakers</p>
                      <p className="font-semibold text-foreground">{language.speakers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Main Greeting</p>
                      <p className="font-semibold text-primary text-lg">"{language.greeting}"</p>
                      {language.greetingMeaning && (
                        <p className="text-xs text-muted-foreground">({language.greetingMeaning})</p>
                      )}
                    </div>
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
                  </div>
                  
                  {/* Language Learning Video */}
                  {(tribe as any).languageVideoId && (
                    <div className="mb-4 p-3 bg-background/50 rounded-lg border border-border">
                      <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <Play className="w-4 h-4 text-red-500" />
                        Learn {language.name} Pronunciation
                      </h3>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                        <iframe
                          src={`https://www.youtube.com/embed/${(tribe as any).languageVideoId}?rel=0`}
                          title={`Learn ${language.name} - ${tribe.name} Language Tutorial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        🎓 Educational video for learning {language.name} greetings and pronunciation.
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
                            <p className="font-semibold capitalize">
                              {religionInfo.primary === 'mixed' ? 'Mixed Religious Heritage' : `Predominantly ${religionInfo.primary.charAt(0).toUpperCase() + religionInfo.primary.slice(1)}`}
                            </p>
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
                    
                    {tribeReligion && !religionInfo && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{tribeReligion}</p>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      💡 Religious heritage often influences naming traditions. Many {tribe.name} names reflect their religious background.
                    </p>
                  </section>
                );
              })()}
              
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
              
              <NameSearch
                femaleNames={tribe.commonNames.female}
                maleNames={tribe.commonNames.male}
                tribeName={tribe.name}
                nameDatabase={getNameDatabase()}
              />
              
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
              
              {tribe.culturalTraits && (
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
                    {(tribe.famousPeople as Array<{ name: string; role: string; wikipedia?: string | null; image?: string }>).map((person, i) => (
                      <PersonCard key={i} person={person} />
                    ))}
                  </div>
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
                            <p className="text-xs text-muted-foreground">
                              📍 {country.cities.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
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