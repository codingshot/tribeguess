import { Link } from 'react-router-dom';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';

interface TribeCardProps {
  tribe: {
    id: string;
    slug: string;
    name: string;
    region: string;
    population: string;
    description: string;
    stereotypes: string[];
    countries?: string[];
  };
}

export function TribeCard({ tribe }: TribeCardProps) {
  return (
    <Link
      to={`/learn/${tribe.slug}`}
      className="card-tribe p-4 sm:p-5 group cursor-pointer block touch-manipulation"
      aria-label={`Learn about the ${tribe.name} tribe from ${tribe.region}`}
    >
      <header className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {/* Country Flags */}
            {tribe.countries && tribe.countries.length > 0 && (
              <div className="flex -space-x-1">
                {tribe.countries.slice(0, 3).map(code => {
                  const country = getCountries().find(c => c.code === code);
                  return country ? (
                    <span key={code} className="text-sm" title={country.name}>{country.flag}</span>
                  ) : null;
                })}
                {tribe.countries.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{tribe.countries.length - 3}</span>
                )}
              </div>
            )}
            <h2 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {tribe.name}
            </h2>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{tribe.region}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden="true" />
      </header>
      
      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
        <Users className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
        <span>{tribe.population}</span>
      </div>
      
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
        {tribe.description}
      </p>
      
      <ul className="flex flex-wrap gap-1 sm:gap-1.5" aria-label="Top stereotypes">
        {tribe.stereotypes.slice(0, 2).map((stereotype, i) => (
          <li key={i} className="badge-tribe text-xs">
            {stereotype}
          </li>
        ))}
        {tribe.stereotypes.length > 2 && (
          <li className="badge-tribe text-xs">
            +{tribe.stereotypes.length - 2} more
          </li>
        )}
      </ul>
    </Link>
  );
}
