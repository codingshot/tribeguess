import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Star, Book, User, Clock } from 'lucide-react';
import { getTribeById } from '@/lib/tribeDetection';

interface TribeDetailProps {
  tribeId: string;
}

export function TribeDetail({ tribeId }: TribeDetailProps) {
  const tribe = getTribeById(tribeId);
  const [searchParams] = useSearchParams();
  
  if (!tribe) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-muted-foreground text-sm sm:text-base">Tribe not found</p>
        <Link to="/learn" className="text-primary hover:underline mt-2 inline-block touch-manipulation p-2">
          ← Back to all tribes
        </Link>
      </div>
    );
  }
  
  const backParams = new URLSearchParams(searchParams);
  backParams.delete('tribe');
  const backUrl = backParams.toString() ? `/learn?${backParams.toString()}` : '/learn';
  
  return (
    <article className="animate-fade-in">
      <nav className="mb-4 sm:mb-6">
        <Link 
          to={backUrl}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation p-1 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to all tribes
        </Link>
      </nav>
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <header className="gradient-gold p-4 sm:p-6 text-primary-foreground">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">{tribe.name}</h1>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm opacity-90">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>{tribe.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              <span>{tribe.population}</span>
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <section>
            <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
              <Book className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{tribe.description}</p>
          </section>
          
          <section>
            <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
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
            <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
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
              <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3 flex items-center gap-2">
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
              <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Cultural Traits</h2>
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
              <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Notable People</h2>
              <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                {tribe.famousPeople.map((person, i) => (
                  <li key={i} className="badge-tribe text-xs sm:text-sm">
                    {person}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
