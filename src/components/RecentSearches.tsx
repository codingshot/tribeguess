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
    <div className="mt-5 pt-3 border-t border-border w-full max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden />
          Recent
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 touch-manipulation shrink-0 py-1 px-1 rounded-md hover:bg-muted/60"
        >
          <X className="w-3 h-3" aria-hidden />
          Clear
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide snap-x snap-mandatory">
        {searches.slice(0, 8).map((search) => (
          <a
            key={`${search.name}-${search.timestamp}`}
            href={`/?name=${encodeURIComponent(search.name)}&country=${search.country}`}
            className="snap-start shrink-0 flex flex-col gap-0.5 min-w-[9.5rem] max-w-[11rem] px-3 py-2 bg-card border border-border rounded-lg hover:border-primary/40 hover:bg-primary/[0.03] transition-all group touch-manipulation"
          >
            <div className="flex items-center gap-2 min-w-0">
              <CountryFlag code={search.country || 'ALL'} size={14} />
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate min-w-0 flex-1 leading-tight">
                {search.name}
              </span>
              <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" aria-hidden />
            </div>
            {search.topTribe && (
              <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 w-full truncate">
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
