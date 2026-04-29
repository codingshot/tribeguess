import { CountryFlag } from '@/components/CountryFlag';
import { cn } from '@/lib/utils';
import type { UnifiedSearchHit } from '@/lib/globalUnifiedSearch';

type Props = {
  hit: UnifiedSearchHit;
  className?: string;
};

/**
 * Leading visual for unified search rows: real tribe/recipe image, else country flag.
 * Renders nothing when the hit has no affiliated asset (no generic category icons).
 */
export function UnifiedSearchHitLeading({ hit, className }: Props) {
  const thumb = hit.thumbnailUrl?.trim();
  const code = hit.flagCountryCode?.trim().toUpperCase();

  if (thumb) {
    return (
      <span
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted',
          className
        )}
      >
        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      </span>
    );
  }

  if (code && /^[A-Z]{2}$/.test(code)) {
    return (
      <span
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-secondary',
          className
        )}
      >
        <CountryFlag code={code} size={26} />
      </span>
    );
  }

  return null;
}
