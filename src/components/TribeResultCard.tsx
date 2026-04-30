import { TribeResult } from '@/lib/tribeDetection';
import { MapPin, Users, Star, Lightbulb, User, ChevronRight, Brain, CheckCircle, ChevronDown, ChevronUp, Globe, BookOpen, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ConfidenceMeter } from './ConfidenceMeter';
import { CountryFlag } from './CountryFlag';

interface TribeResultCardProps {
  result: TribeResult;
  rank: number;
  inputName: string;
}

export function TribeResultCard({ result, rank, inputName }: TribeResultCardProps) {
  const { tribe, confidence, matchReason, nameMeaning, matchDetails } = result;
  const isPrimary = rank === 1;
  const [showMore, setShowMore] = useState(false);
  
  const confidenceLabel = confidence >= 80 ? 'High confidence' : confidence >= 50 ? 'Medium confidence' : 'Low confidence';
  
  // Get related names from this tribe
  const maleNames = Array.isArray(tribe.commonNames?.male) ? tribe.commonNames.male : [];
  const femaleNames = Array.isArray(tribe.commonNames?.female) ? tribe.commonNames.female : [];
  const allTribeNames = [...femaleNames, ...maleNames]
    .filter(n => typeof n === 'string' && n.toLowerCase() !== inputName.toLowerCase())
    .slice(0, 6);

  // Quick facts
  const quickFacts: string[] = [];
  if (tribe.population) quickFacts.push(`Population: ${tribe.population}`);
  if (tribe.language?.name) quickFacts.push(`Language: ${tribe.language.name}`);
  if (tribe.language?.family) quickFacts.push(`Language family: ${tribe.language.family}`);
  if (tribe.religion) quickFacts.push(`Religion: ${tribe.religion}`);
  if (Array.isArray(tribe.countries) && tribe.countries.length > 0) {
    quickFacts.push(`Countries: ${tribe.countries.join(', ')}`);
  }

  return (
    <article 
      className={`card-tribe p-4 sm:p-5 ${isPrimary ? 'ring-2 ring-primary animate-scale-in' : 'animate-fade-in'}`}
      style={{ animationDelay: `${rank * 100}ms` }}
      aria-label={`${tribe.name} tribe prediction with ${confidence}% confidence`}
    >
      <header className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {isPrimary && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 sm:w-4 sm:h-4 text-primary-foreground" aria-hidden="true" />
            </div>
          )}
          <div className="min-w-0">
            <Link 
              to={`/learn/${tribe.slug || tribe.id}`}
              className="font-display text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors truncate block leading-tight"
            >
              {tribe.name}
            </Link>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5 leading-snug">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{tribe.region}</span>
              {Array.isArray(tribe.countries) && tribe.countries.length > 0 && (
                <span className="flex items-center gap-0.5">
                  {tribe.countries.slice(0, 2).map(c => (
                    <CountryFlag key={c} code={c} size={12} />
                  ))}
                </span>
              )}
            </div>
          </div>
        </div>
        <div role="status" aria-label={`${confidenceLabel}: ${confidence}% match`}>
          <ConfidenceMeter confidence={confidence} size={isPrimary ? 'md' : 'sm'} />
        </div>
      </header>
      
      {/* Reasoning Section */}
      <div className="mb-3 p-3 sm:p-3.5 bg-secondary/50 rounded-lg border border-border">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          <Brain className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>Why we think this</span>
        </div>
        <ul className="space-y-1.5">
          {(matchDetails || [matchReason]).map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-snug">
              <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {nameMeaning && (
        <div className="mb-3 p-3 sm:p-3.5 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1.5">
            <Lightbulb className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Name meaning</span>
          </div>
          <p className="text-foreground text-sm leading-snug">
            <strong>"{inputName}"</strong> — {nameMeaning}
          </p>
        </div>
      )}
      
      <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-3 leading-snug">{tribe.description}</p>
      
      {/* Stereotypes */}
      <div className="mb-3">
        <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground shrink-0 pt-0.5" id={`stereotypes-label-${rank}`}>
            <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            Stereotypes
          </span>
          <ul className="flex flex-wrap gap-1.5 flex-1 min-w-0 list-none p-0 m-0" aria-labelledby={`stereotypes-label-${rank}`}>
          {(tribe.stereotypes || []).slice(0, 4).map((stereotype, i) => (
            <li key={i} className="badge-tribe-compact max-w-[min(100%,14rem)] whitespace-normal text-left">
              {stereotype}
            </li>
          ))}
          </ul>
        </div>
      </div>
      
      {/* Quick Facts (expandable) */}
      {quickFacts.length > 0 && (
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation w-full py-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Quick Facts</span>
            {showMore ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
          </button>
          {showMore && (
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1 animate-fade-in">
              {quickFacts.map((fact, i) => (
                <div key={i} className="text-[11px] sm:text-xs text-muted-foreground px-2 py-1 bg-secondary/30 rounded-md leading-snug">
                  {fact}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Famous People */}
      {isPrimary && tribe.famousPeople && tribe.famousPeople.length > 0 && (
        <div className="pt-2 border-t border-border mb-2">
          <p className="text-xs text-muted-foreground leading-snug">
            <span className="inline-flex items-center gap-1 font-medium text-foreground mr-1">
              <User className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
              Notable people:
            </span>
            {tribe.famousPeople.slice(0, 3).map((p) => (typeof p === 'string' ? p : p.name)).join(' · ')}
          </p>
        </div>
      )}

      {/* Try More Names from This Tribe */}
      {allTribeNames.length > 0 && (
        <div className="pt-2 border-t border-border mb-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="text-xs text-muted-foreground shrink-0">
            More {tribe.name} names:
          </p>
          <div className="flex flex-wrap gap-1">
            {allTribeNames.map(name => (
              <a
                key={name}
                href={`/?name=${encodeURIComponent(name)}`}
                className="px-2 py-0.5 text-[11px] sm:text-xs bg-secondary/50 rounded-md hover:bg-primary/10 hover:text-primary border border-border/80 hover:border-primary/30 transition-colors touch-manipulation"
              >
                {name}
              </a>
            ))}
          </div>
          </div>
        </div>
      )}
      
      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1">
        <Link 
          to={`/learn/${tribe.slug || tribe.id}`}
          className="inline-flex items-center gap-1 text-primary hover:underline text-xs sm:text-sm font-medium touch-manipulation"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Learn more
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        {isPrimary && (
          <>
            <Link
              to={`/people?tribe=${encodeURIComponent(tribe.name)}`}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-medium touch-manipulation"
            >
              <User className="w-3 h-3" />
              People
            </Link>
            <Link
              to={`/recipes?tribe=${encodeURIComponent(tribe.name)}`}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-medium touch-manipulation"
            >
              <Utensils className="w-3 h-3" />
              Recipes
            </Link>
          </>
        )}
      </div>
    </article>
  );
}
