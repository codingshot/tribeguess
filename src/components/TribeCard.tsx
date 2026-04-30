import { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';
import { CountryFlag } from '@/components/CountryFlag';

// Cache countries list outside component to avoid re-calling on every render
let cachedCountries: ReturnType<typeof getCountries> | null = null;
function getCachedCountries() {
  if (!cachedCountries) cachedCountries = getCountries();
  return cachedCountries;
}

interface TribeCardProps {
  tribe: {
    id: string;
    slug: string;
    name: string;
    region: string;
    population?: string;
    description?: string;
    stereotypes?: string[];
    countries?: string[];
  };
}

export const TribeCard = memo(function TribeCard({ tribe }: TribeCardProps) {
  const countries = getCachedCountries();
  return (
    <Link
      to={`/learn/${tribe.slug}`}
      className="card-tribe p-4 sm:p-5 group cursor-pointer block touch-manipulation"
      aria-label={`Learn about the ${tribe.name} tribe from ${tribe.region}`}
    >
      <header className="flex items-start justify-between mb-2 sm:mb-3 gap-2 sm:gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {/* Country Flags */}
            {tribe.countries && tribe.countries.length > 0 && (
              <div className="flex items-center gap-0.5">
                {tribe.countries.slice(0, 3).map(code => {
                  const country = countries.find(c => c.code === code);
                  return (
                    <CountryFlag key={code} code={code} size={14} label={country?.name} />
                  );
                })}
                {tribe.countries.length > 3 && (
                  <span className="text-xs text-muted-foreground ml-0.5">+{tribe.countries.length - 3}</span>
                )}
              </div>
            )}
            <h2 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate leading-snug">
              {tribe.name}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm leading-relaxed">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{tribe.region}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden="true" />
      </header>
      
      {tribe.population && (
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-snug">
        <Users className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span>{tribe.population}</span>
      </div>
      )}
      
      {tribe.description && (
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3 leading-snug">
        {tribe.description}
      </p>
      )}
      
      {tribe.stereotypes && tribe.stereotypes.length > 0 && (
      <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Top stereotypes">
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
      )}
    </Link>
  );
});
