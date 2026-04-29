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
    <div className="mt-6 pt-4 border-t border-border w-full max-w-md mx-auto text-left">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden />
          Recent searches
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 touch-manipulation shrink-0"
        >
          <X className="w-3 h-3" aria-hidden />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {searches.slice(0, 6).map((search) => (
          <a
            key={`${search.name}-${search.timestamp}`}
            href={`/?name=${encodeURIComponent(search.name)}&country=${search.country}`}
            className="flex flex-col gap-2 px-4 py-3 sm:py-3.5 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all group touch-manipulation max-w-full min-w-[10rem] sm:min-w-0 sm:max-w-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <CountryFlag code={search.country || 'ALL'} size={16} />
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate min-w-0 flex-1">
                {search.name}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden />
            </div>
            {search.topTribe && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                <span className="text-muted-foreground/70">Top match:</span>{' '}
                {search.topTribe}
                {search.confidence ? ` · ${search.confidence}%` : ''}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
