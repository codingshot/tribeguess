import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCrossSectionFallback, type UnifiedSearchHit } from '@/lib/globalUnifiedSearch';
import { UnifiedSearchHitLeading } from '@/components/UnifiedSearchHitLeading';
import { cn } from '@/lib/utils';

function kindLabel(kind: UnifiedSearchHit['kind']): string {
  switch (kind) {
    case 'recipe':
      return 'Recipe';
    case 'blog':
      return 'Blog';
    case 'tribe':
      return 'Tribe';
    case 'name':
      return 'Name';
    default:
      return 'Result';
  }
}

interface CrossSectionSearchHintsProps {
  /** Raw search text (trimmed inside when length ≥ 2) */
  query: string;
  className?: string;
}

/**
 * Shown when the current page has no matches but other areas of the site might.
 */
export function CrossSectionSearchHints({ query, className }: CrossSectionSearchHintsProps) {
  const trimmed = query.trim();
  const hits = useMemo(
    () => (trimmed.length >= 2 ? getCrossSectionFallback(trimmed, 10) : []),
    [trimmed]
  );

  if (hits.length === 0) return null;

  return (
    <div
      className={cn(
        'mt-6 text-left rounded-xl border border-border bg-card/80 p-4 sm:p-5 shadow-sm max-w-lg mx-auto',
        className
      )}
    >
      <p className="text-sm font-medium text-foreground mb-3">
        Nothing matched here — you may be looking for:
      </p>
      <ul className="space-y-2" role="list">
        {hits.map(hit => {
          return (
            <li key={hit.id}>
              <Link
                to={hit.href}
                className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted/80 transition-colors touch-manipulation"
              >
                <UnifiedSearchHitLeading hit={hit} />
                <span className="min-w-0 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {kindLabel(hit.kind)}
                  </span>
                  <span className="block font-medium text-foreground truncate">{hit.title}</span>
                  {hit.subtitle && (
                    <span className="block text-xs text-muted-foreground line-clamp-2">{hit.subtitle}</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
