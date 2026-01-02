import { Link } from 'react-router-dom';
import { MapPin, Users, ChevronRight } from 'lucide-react';

interface TribeCardProps {
  tribe: {
    id: string;
    name: string;
    region: string;
    population: string;
    description: string;
    stereotypes: string[];
  };
}

export function TribeCard({ tribe }: TribeCardProps) {
  return (
    <Link
      to={`/learn?tribe=${tribe.id}`}
      className="card-tribe p-5 group cursor-pointer block"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {tribe.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            {tribe.region}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <Users className="w-3 h-3" />
        {tribe.population}
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {tribe.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {tribe.stereotypes.slice(0, 2).map((stereotype, i) => (
          <span key={i} className="badge-tribe text-xs">
            {stereotype}
          </span>
        ))}
        {tribe.stereotypes.length > 2 && (
          <span className="badge-tribe text-xs">
            +{tribe.stereotypes.length - 2} more
          </span>
        )}
      </div>
    </Link>
  );
}
