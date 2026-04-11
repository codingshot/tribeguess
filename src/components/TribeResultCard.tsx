import { TribeResult } from '@/lib/tribeDetection';
import { MapPin, Users, Star, Lightbulb, User, ChevronRight, Brain, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TribeResultCardProps {
  result: TribeResult;
  rank: number;
  inputName: string;
}

export function TribeResultCard({ result, rank, inputName }: TribeResultCardProps) {
  const { tribe, confidence, matchReason, nameMeaning, matchDetails } = result;
  const isPrimary = rank === 1;
  
  const confidenceLabel = confidence >= 80 ? 'High confidence' : confidence >= 50 ? 'Medium confidence' : 'Low confidence';
  const confidenceColor = confidence >= 80 
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
    : confidence >= 50 
      ? 'bg-primary/10 text-primary' 
      : 'bg-secondary text-secondary-foreground';
  
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
            <Link 
              to={`/learn/${tribe.slug || tribe.id}`}
              className="font-display text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors truncate block"
            >
              {tribe.name}
            </Link>
            <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{tribe.region}</span>
            </div>
          </div>
        </div>
        <div 
          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex-shrink-0 ${confidenceColor}`}
          role="status"
          aria-label={`${confidenceLabel}: ${confidence}% match`}
        >
          {confidence}%
        </div>
      </header>
      
      {/* Reasoning Section */}
      <div className="mb-3 sm:mb-4 p-3 bg-secondary/50 rounded-lg border border-border">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground mb-2">
          <Brain className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Why we think this</span>
        </div>
        <ul className="space-y-1.5">
          {(matchDetails || [matchReason]).map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {nameMeaning && (
        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary mb-1">
            <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="font-medium">Name meaning</span>
          </div>
          <p className="text-foreground text-sm sm:text-base">
            <strong>"{inputName}"</strong> means: {nameMeaning}
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
          {(tribe.stereotypes || []).slice(0, 4).map((stereotype, i) => (
            <li key={i} className="badge-tribe text-xs">
              {stereotype}
            </li>
          ))}
        </ul>
      </div>
      
      {isPrimary && tribe.famousPeople && tribe.famousPeople.length > 0 && (
        <div className="pt-3 sm:pt-4 border-t border-border mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground mb-2">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
            <span>Famous {tribe.name} people</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {tribe.famousPeople.slice(0, 3).map((p: any) => typeof p === 'string' ? p : p.name).join(' • ')}
          </p>
        </div>
      )}
      
      <Link 
        to={`/learn/${tribe.slug || tribe.id}`}
        className="inline-flex items-center gap-1 text-primary hover:underline text-xs sm:text-sm font-medium touch-manipulation"
      >
        Learn more about {tribe.name}
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </article>
  );
}
