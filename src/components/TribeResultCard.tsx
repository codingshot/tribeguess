import { TribeResult } from '@/lib/tribeDetection';
import { MapPin, Users, Star, Lightbulb, User } from 'lucide-react';

interface TribeResultCardProps {
  result: TribeResult;
  rank: number;
  inputName: string;
}

export function TribeResultCard({ result, rank, inputName }: TribeResultCardProps) {
  const { tribe, confidence, matchReason, nameMeaning } = result;
  const isPrimary = rank === 1;
  
  return (
    <div 
      className={`card-tribe p-6 ${isPrimary ? 'ring-2 ring-primary animate-scale-in' : 'animate-fade-in'}`}
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {isPrimary && (
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">
              {tribe.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-3 h-3" />
              {tribe.region}
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
          confidence >= 80 
            ? 'bg-green-100 text-green-700' 
            : confidence >= 50 
              ? 'bg-primary/10 text-primary' 
              : 'bg-secondary text-secondary-foreground'
        }`}>
          {confidence}% match
        </div>
      </div>
      
      {nameMeaning && (
        <div className="mb-4 p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Lightbulb className="w-4 h-4" />
            Name meaning
          </div>
          <p className="text-foreground font-medium">
            "{inputName}" means: {nameMeaning}
          </p>
        </div>
      )}
      
      <p className="text-muted-foreground text-sm mb-4">{tribe.description}</p>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Users className="w-4 h-4 text-primary" />
          Common Stereotypes
        </div>
        <div className="flex flex-wrap gap-2">
          {tribe.stereotypes.slice(0, 4).map((stereotype, i) => (
            <span key={i} className="badge-tribe text-xs">
              {stereotype}
            </span>
          ))}
        </div>
      </div>
      
      {isPrimary && tribe.famousPeople && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <User className="w-4 h-4 text-primary" />
            Famous {tribe.name} people
          </div>
          <p className="text-sm text-muted-foreground">
            {tribe.famousPeople.join(', ')}
          </p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-4 italic">
        {matchReason}
      </p>
    </div>
  );
}
