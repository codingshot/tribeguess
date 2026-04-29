import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchGlobalUnified } from '@/lib/globalUnifiedSearch';
import { UnifiedSearchHitLeading } from '@/components/UnifiedSearchHitLeading';
import { sanitizeSearchQuery } from '@/lib/dataValidation';
import { cn } from '@/lib/utils';

const DEBOUNCE_MS = 220;
const MIN_CHARS = 2;

export function GlobalSearchBar({ className }: { className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [raw, setRaw] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setDebounced('');
      return;
    }
    const t = window.setTimeout(() => setDebounced(raw), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [raw]);

  const hits = useMemo(
    () => searchGlobalUnified(debounced, { limit: 18 }),
    [debounced]
  );

  const showDropdown = open && debounced.trim().length >= MIN_CHARS;

  useEffect(() => {
    setActiveIndex(-1);
  }, [hits]);

  useEffect(() => {
    if (activeIndex < 0 || !showDropdown || hits.length === 0) return;
    const el = document.getElementById(`global-search-hit-${activeIndex}`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex, hits.length, showDropdown]);

  useEffect(() => {
    setOpen(false);
    setRaw('');
    setDebounced('');
  }, [location.pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const closeAndReset = useCallback(() => {
    setOpen(false);
    setRaw('');
    setDebounced('');
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (!showDropdown || hits.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % hits.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => (i <= 0 ? hits.length - 1 : i - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(hits.length - 1);
    } else if (e.key === 'Enter' && hits.length > 0) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      e.preventDefault();
      const idx = activeIndex >= 0 && activeIndex < hits.length ? activeIndex : 0;
      navigate(hits[idx].href);
      closeAndReset();
    }
  };

  return (
    <div ref={containerRef} className={cn('relative z-[60] overflow-visible', className)}>
      <label htmlFor="global-search" className="sr-only">
        Search names, tribes, blog, and recipes
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          ref={inputRef}
          id="global-search"
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={100}
          value={raw}
          onChange={e => {
            const v = sanitizeSearchQuery(e.target.value, 100);
            setRaw(v);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search names, tribes, food, blog…"
          className={cn(
            'input-tribal h-9 sm:h-10 w-full min-w-0 rounded-lg border border-border bg-background pl-9 sm:pl-10 pr-9 text-base sm:text-sm',
            'placeholder:text-muted-foreground/80 touch-manipulation'
          )}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? 'global-search-panel' : undefined}
          aria-activedescendant={
            showDropdown && hits.length > 0 && activeIndex >= 0
              ? `global-search-hit-${activeIndex}`
              : undefined
          }
        />
        {raw && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground touch-manipulation"
            aria-label="Clear search"
            onClick={() => {
              setRaw('');
              setDebounced('');
              setOpen(false);
              inputRef.current?.focus();
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && hits.length > 0 && (
        <div
          id="global-search-panel"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[70] max-h-[min(70vh,320px)] overflow-y-auto rounded-xl border border-border bg-popover shadow-lg"
        >
          {hits.map((hit, i) => {
            const active = i === activeIndex;
            return (
              <Link
                key={hit.id}
                id={`global-search-hit-${i}`}
                role="option"
                aria-selected={active}
                to={hit.href}
                onClick={closeAndReset}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  'flex items-start gap-3 border-b border-border/60 px-3 py-2.5 last:border-0 transition-colors touch-manipulation',
                  active ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/80'
                )}
              >
                <UnifiedSearchHitLeading hit={hit} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">{hit.title}</span>
                  {hit.subtitle && (
                    <span className="block truncate text-xs text-muted-foreground">{hit.subtitle}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {showDropdown && hits.length === 0 && (
        <div
          id="global-search-panel"
          role="status"
          aria-live="polite"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[70] rounded-xl border border-border bg-popover px-3 py-4 text-center text-sm text-muted-foreground shadow-lg"
        >
          No results — try another spelling or browse{' '}
          <Link to="/learn" className="text-primary underline-offset-2 hover:underline" onClick={() => setOpen(false)}>
            Learn
          </Link>
          .
        </div>
      )}
    </div>
  );
}
