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
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tribe not found</p>
        <Link to="/learn" className="text-primary hover:underline mt-2 inline-block">
          ← Back to all tribes
        </Link>
      </div>
    );
  }
  
  // Preserve other search params when going back
  const backParams = new URLSearchParams(searchParams);
  backParams.delete('tribe');
  const backUrl = backParams.toString() ? `/learn?${backParams.toString()}` : '/learn';
  
  return (
    <div className="animate-fade-in">
      <Link 
        to={backUrl}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all tribes
      </Link>
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="gradient-gold p-6 text-primary-foreground">
          <h1 className="font-serif text-3xl font-bold mb-2">{tribe.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {tribe.region}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {tribe.population}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h2 className="font-serif text-xl font-semibold mb-2 flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed">{tribe.description}</p>
          </div>
          
          <div>
            <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Common Stereotypes
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {tribe.stereotypes.map((stereotype, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-secondary-foreground">{stereotype}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Common Names
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Female Names</h3>
                <div className="flex flex-wrap gap-2">
                  {tribe.commonNames.female.map((name, i) => (
                    <Link 
                      key={i} 
                      to={`/?name=${name}`}
                      className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Male Names</h3>
                <div className="flex flex-wrap gap-2">
                  {tribe.commonNames.male.map((name, i) => (
                    <Link 
                      key={i} 
                      to={`/?name=${name}`}
                      className="badge-tribe hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {tribe.timeBasedNames && Object.keys(tribe.timeBasedNames).length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Time-Based Names
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(tribe.timeBasedNames).map(([time, names]) => (
                  <div key={time} className="p-3 bg-secondary rounded-lg">
                    <span className="text-sm font-medium text-foreground capitalize">{time}:</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {(names as string[]).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {tribe.culturalTraits && (
            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">Cultural Traits</h2>
              <ul className="space-y-2">
                {tribe.culturalTraits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {tribe.famousPeople && (
            <div>
              <h2 className="font-serif text-xl font-semibold mb-3">Famous People</h2>
              <div className="flex flex-wrap gap-2">
                {tribe.famousPeople.map((person, i) => (
                  <span key={i} className="badge-tribe">
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
