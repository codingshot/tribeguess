import { Clock, X, ArrowRight } from 'lucide-react';
import type { RecentSearch } from '@/hooks/useRecentSearches';
import { CountryFlag } from './CountryFlag';

interface RecentSearchesProps {
  searches: RecentSearch[];
  onClear: () => void;
}

export function RecentSearches({ searches, onClear }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t border-border">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Recent searches
        </p>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 touch-manipulation"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.slice(0, 6).map((search) => (
          <a
            key={`${search.name}-${search.timestamp}`}
            href={`/?name=${encodeURIComponent(search.name)}&country=${search.country}`}
            className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all group touch-manipulation"
          >
            <CountryFlag code={search.country || 'ALL'} size={14} />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {search.name}
            </span>
            {search.topTribe && (
              <span className="text-xs text-muted-foreground">
                → {search.topTribe}
                {search.confidence ? ` ${search.confidence}%` : ''}
              </span>
            )}
            <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}
