import { TribeResult } from '@/lib/tribeDetection';
import { MapPin, Users, Star, Lightbulb, User, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TribeResultCardProps {
  result: TribeResult;
  rank: number;
  inputName: string;
}

export function TribeResultCard({ result, rank, inputName }: TribeResultCardProps) {
  const { tribe, confidence, matchReason, nameMeaning } = result;
  const isPrimary = rank === 1;
  
  const confidenceLabel = confidence >= 80 ? 'High confidence' : confidence >= 50 ? 'Medium confidence' : 'Low confidence';
  
  return (
    <article 
      className={`card-tribe p-4 sm:p-6 ${isPrimary ? 'ring-2 ring-primary animate-scale-in' : 'animate-fade-in'}`}
      style={{ animationDelay: `${rank * 100}ms` }}
      aria-label={`${tribe.name} tribe prediction with ${confidence}% confidence`}
    >
      <header className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {isPrimary && (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" aria-hidden="true" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground truncate">
              {tribe.name}
            </h2>
            <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{tribe.region}</span>
            </div>
          </div>
        </div>
        <div 
          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex-shrink-0 ${
            confidence >= 80 
              ? 'bg-green-100 text-green-700' 
              : confidence >= 50 
                ? 'bg-primary/10 text-primary' 
                : 'bg-secondary text-secondary-foreground'
          }`}
          role="status"
          aria-label={`${confidenceLabel}: ${confidence}% match`}
        >
          {confidence}%
        </div>
      </header>
      
      {nameMeaning && (
        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-1">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span>Name meaning</span>
          </div>
          <p className="text-foreground font-medium text-sm sm:text-base">
            "{inputName}" means: {nameMeaning}
          </p>
        </div>
      )}
      
      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{tribe.description}</p>
      
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-2">
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
          <span>Common Stereotypes</span>
        </div>
        <ul className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Common stereotypes">
          {tribe.stereotypes.slice(0, 4).map((stereotype, i) => (
            <li key={i} className="badge-tribe text-xs">
              {stereotype}
            </li>
          ))}
        </ul>
      </div>
      
      {isPrimary && tribe.famousPeople && (
        <div className="pt-3 sm:pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-2">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
            <span>Famous {tribe.name} people</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {tribe.famousPeople.join(', ')}
          </p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-3 sm:mt-4 italic">
        {matchReason}
      </p>
    </article>
  );
}
