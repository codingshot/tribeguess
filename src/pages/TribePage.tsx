import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Star, Book, User, Clock, Globe, UsersRound, Map, ExternalLink, History, Languages } from 'lucide-react';
import { getTribeBySlug, getAllTribes } from '@/lib/tribeDetection';
import { Header } from '@/components/Header';
import { TribeMap } from '@/components/TribeMap';

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
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{tribe.name}</h1>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>{tribe.region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  <span>{tribe.population} ({tribe.populationPercent} of Kenya)</span>
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
                    Language
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Language Name</p>
                      <p className="font-semibold text-foreground">{language.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Speakers</p>
                      <p className="font-semibold text-foreground">{language.speakers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Greeting</p>
                      <p className="font-semibold text-primary text-lg">"{language.greeting}"</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Language Family</p>
                      <p className="font-semibold text-foreground">{language.family}</p>
                    </div>
                  </div>
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
              
              <section>
                <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  Common Names
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Female Names</h3>
                    <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Female names">
                      {tribe.commonNames.female.slice(0, 10).map((name, i) => (
                        <li key={i}>
                          <Link 
                            to={`/?name=${name}`}
                            className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer touch-manipulation text-xs sm:text-sm"
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Male Names</h3>
                    <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Male names">
                      {tribe.commonNames.male.slice(0, 10).map((name, i) => (
                        <li key={i}>
                          <Link 
                            to={`/?name=${name}`}
                            className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer touch-manipulation text-xs sm:text-sm"
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              
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
              
              {tribe.famousPeople && (
                <section>
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Notable People</h2>
                  <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tribe.famousPeople.map((person, i) => (
                      <li key={i} className="badge-tribe text-xs sm:text-sm">
                        {person}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              
              {/* Diaspora Section */}
              {tribe.diaspora && (
                <section className="border-t border-border pt-6">
                  <h2 className="font-display text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                    Global Diaspora
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-primary mb-1">{tribe.diaspora.globalPopulation}</p>
                      <p className="text-sm text-muted-foreground">Estimated global diaspora</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">Major Countries</p>
                      <div className="flex flex-wrap gap-1">
                        {tribe.diaspora.majorCountries.map((country, i) => (
                          <span key={i} className="px-2 py-0.5 bg-background rounded text-xs">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
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