import { useState } from 'react';
import { ExternalLink, User } from 'lucide-react';

interface Person {
  name: string;
  role: string;
  wikipedia?: string | null;
  image?: string;
}

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = person.image && !imageError;

  return (
    <div className="p-3 bg-secondary rounded-lg flex gap-3">
      {/* Photo */}
      {hasImage ? (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary/50" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        {person.wikipedia ? (
          <a
            href={person.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline flex items-center gap-1 text-sm sm:text-base"
          >
            <span className="truncate">{person.name}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        ) : (
          <p className="font-medium text-foreground text-sm sm:text-base truncate">{person.name}</p>
        )}
        <p className="text-xs text-muted-foreground line-clamp-2">{person.role}</p>
      </div>
    </div>
  );
}
