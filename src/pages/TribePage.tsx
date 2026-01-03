import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Star, Book, Clock, Globe, UsersRound, Map, ExternalLink, History, Languages, UserCircle, UserCircle2 } from 'lucide-react';
import { getTribeBySlug, getAllTribes, getNameDatabase, getCountries } from '@/lib/tribeDetection';
import { Header } from '@/components/Header';
import { TribeMap } from '@/components/TribeMap';
import { ImageGallery } from '@/components/ImageGallery';
import { PersonCard } from '@/components/PersonCard';
import { NameSearch } from '@/components/NameSearch';
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

  return (
    <div className="min-h-screen bg-background">
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
              
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>{tribe.population}</span>
                </div>
              </div>
            </header>
            
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* Map Section */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                  <Map className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  Location in Kenya
                </h2>
                <TribeMap 
                  lat={tribe.mapCoordinates.lat} 
                  lng={tribe.mapCoordinates.lng} 
                  tribeName={tribe.name}
                  counties={tribe.counties}
                />
              </section>
              
              {/* Population Stats */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                  <UsersRound className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  Population Statistics
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{tribe.population}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Population</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">{tribe.populationPercent}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">of Kenya</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{tribe.genderRatio.male}%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Male</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-pink-600">{tribe.genderRatio.female}%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Female</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Main Counties:</strong> {tribe.counties.join(', ')}
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{tribe.description}</p>
              </section>
              
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
                      <p className="font-semibold text-foreground">{language.family}</p>
                    </div>
                  </div>
                  
                  {/* Additional Greetings */}
                  {language.additionalGreetings && language.additionalGreetings.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-2">More Greetings</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {language.additionalGreetings.map((g: { phrase: string; meaning: string }, i: number) => (
                          <div key={i} className="p-2 bg-background/50 rounded-lg">
                            <p className="font-medium text-primary text-sm">"{g.phrase}"</p>
                            <p className="text-xs text-muted-foreground">{g.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Common Phrases */}
                  {language.commonPhrases && language.commonPhrases.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Common Phrases</h3>
                      <div className="flex flex-wrap gap-2">
                        {language.commonPhrases.map((p: { phrase: string; meaning: string }, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-background/50 rounded-full text-xs">
                            <span className="font-medium text-primary">{p.phrase}</span>
                            <span className="text-muted-foreground"> - {p.meaning}</span>
                          </span>
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
                        {(tribe as any).traditionalFood.staples?.map((food: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">•</span> {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Beverages</h3>
                      <ul className="space-y-1">
                        {(tribe as any).traditionalFood.beverages?.map((drink: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">•</span> {drink}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-secondary rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Special Dishes</h3>
                      <ul className="space-y-1">
                        {(tribe as any).traditionalFood.specialDishes?.map((dish: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="text-primary">•</span> {dish}
                          </li>
                        ))}
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
                  
                  {/* Country Breakdown */}
                  {(tribe.diaspora as any).breakdown && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-3">Population by Country</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(tribe.diaspora as any).breakdown.map((country: { country: string; population: string; cities: string[] }, i: number) => (
                          <div key={i} className="p-3 bg-secondary rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-foreground text-sm">{country.country}</p>
                              <p className="text-xs font-semibold text-primary">{country.population}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {country.cities.join(', ')}
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
                    {relatedTribesData.map((related) => related && (
                      <Link
                        key={related.id}
                        to={`/learn/${related.slug}`}
                        className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {related.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{related.region}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-border mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TribeGuess. Educational entertainment about Kenyan tribes.
        </p>
      </footer>
    </div>
  );
};

export default TribePage;