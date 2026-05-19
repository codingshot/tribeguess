import type { KeyboardEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TribeInlineLinkProps {
  tribeSlug: string;
  tribeName: string;
  /** Shown after tribe name, e.g. " Tribe" */
  suffix?: string;
  className?: string;
}

/**
 * Tribe link safe inside an outer &lt;Link&gt; (recipe cards, etc.).
 * Uses a span + navigate to avoid nested anchor elements.
 */
export function TribeInlineLink({
  tribeSlug,
  tribeName,
  suffix = ' Tribe',
  className,
}: TribeInlineLinkProps) {
  const navigate = useNavigate();

  const goToTribe = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/learn/${tribeSlug}`);
  };

  return (
    <span
      role="link"
      tabIndex={0}
      onClick={goToTribe}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          goToTribe(e);
        }
      }}
      className={cn(
        'text-primary hover:underline cursor-pointer inline-block',
        className
      )}
    >
      {tribeName}
      {suffix}
    </span>
  );
}
