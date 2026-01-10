import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, User } from 'lucide-react';

interface Person {
  name: string;
  role: string;
  wikipedia?: string | null;
  image?: string;
  birth?: number;
  death?: number;
}

interface PersonCardProps {
  person: Person;
  tribeSlug?: string;
}

// Generate URL-friendly slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function PersonCard({ person, tribeSlug }: PersonCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = person.image && !imageError;
  const personSlug = generateSlug(person.name);
  
  // Format lifespan
  const lifespan = person.birth 
    ? person.death 
      ? `${person.birth}–${person.death}`
      : `b. ${person.birth}`
    : null;

  return (
    <Link 
      to={`/person/${personSlug}`}
      className="p-3 bg-secondary rounded-lg flex gap-3 hover:bg-secondary/80 transition-colors group"
    >
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
        <p className="font-medium text-foreground text-sm sm:text-base truncate group-hover:text-primary transition-colors">
          {person.name}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">{person.role}</p>
        {lifespan && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{lifespan}</p>
        )}
      </div>
      
      {/* External link indicator */}
      {person.wikipedia && (
        <a
          href={person.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="self-center p-1 hover:bg-primary/10 rounded transition-colors"
          title="View on Wikipedia"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </a>
      )}
    </Link>
  );
}
