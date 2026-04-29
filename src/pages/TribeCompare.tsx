import { useMemo, useState, useCallback, useEffect, type ReactNode } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import {
  Search,
  X,
  Plus,
  ArrowLeftRight,
  MapPin,
  Users,
  Globe,
  Languages,
  Church,
  Utensils,
  ChevronDown,
  ChevronUp,
  Link2,
  Check,
  MessageCircle,
  ArrowDownUp,
  Trash2,
  ChefHat,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { normalizeForSearch } from '@/lib/dataValidation';
import {
  MAX_COMPARE_TRIBES,
  parseCompareTribeSlugs,
  serializeCompareTribes,
  buildCompareVsPath,
  canonicalizeCompareSegments,
} from '@/lib/tribeCompareUrl';
import { getComparePairSuggestions } from '@/lib/tribeCompareSuggestions';
import { cn } from '@/lib/utils';
import type { TribeData } from '@/types/tribe';
import type { LucideIcon } from 'lucide-react';

const MAX_COMPARE = MAX_COMPARE_TRIBES;

const LAST_COMPARE_KEY = 'tribeguess_compare_slugs';

type ReligiousHistoryShape = { traditional?: string; current?: string };

function readReligiousHistory(t: TribeData): ReligiousHistoryShape | undefined {
  const raw = (t as Record<string, unknown>)['religiousHistory'];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
  const o = raw as Record<string, unknown>;
  const traditional = typeof o.traditional === 'string' ? o.traditional : undefined;
  const current = typeof o.current === 'string' ? o.current : undefined;
  if (!traditional && !current) return undefined;
  return { traditional, current };
}

function readEatingCustoms(t: TribeData): { mealsPerDay?: number | string; mainFoods?: string } | undefined {
  const raw = t.eatingCustoms;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
  const o = raw as Record<string, unknown>;
  const mainFoods = typeof o.mainFoods === 'string' ? o.mainFoods : undefined;
  const mealsPerDay = o.mealsPerDay;
  if (mealsPerDay === undefined && !mainFoods) return undefined;
  return {
    mealsPerDay: typeof mealsPerDay === 'number' || typeof mealsPerDay === 'string' ? mealsPerDay : undefined,
    mainFoods,
  };
}

function readTraditionalFoodSummary(t: TribeData, expanded: boolean): string | null {
  const raw = t.traditionalFood;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const desc = typeof o.description === 'string' ? o.description.trim() : '';
  if (desc) {
    return expanded || desc.length <= 140 ? desc : `${desc.slice(0, 140)}…`;
  }
  const staples = o.staples;
  if (Array.isArray(staples) && staples.length > 0) {
    return staples
      .slice(0, 4)
      .map(s => String(s))
      .join(' · ');
  }
  return null;
}

const TribeCompare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { slugA, slugB } = useParams<{ slugA?: string; slugB?: string }>();
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  const compareSlugAliases = useMemo(() => {
    const m = new Map<string, string>();
    for (const t of allTribes) {
      const canon = String(t.slug || t.id || '')
        .trim()
        .toLowerCase();
      if (!canon) continue;
      const add = (raw: string) => {
        const x = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        if (x) m.set(x, canon);
      };
      add(canon);
      add(String(t.id || '').toLowerCase());
      const slugAliases = (t as { slugAliases?: string[] }).slugAliases;
      if (Array.isArray(slugAliases)) slugAliases.forEach(a => add(String(a)));
    }
    return m;
  }, [allTribes]);

  const validSlugSet = useMemo(() => new Set(compareSlugAliases.keys()), [compareSlugAliases]);

  const selectedSlugs = useMemo(() => {
    let raw: string[] = [];
    const q = searchParams.get('tribes');
    if (q) raw = parseCompareTribeSlugs(q, validSlugSet);
    else if (slugA && slugB) {
      const a = slugA.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const b = slugB.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const pair = [a, b].filter(s => validSlugSet.has(s));
      if (pair.length === 2 && pair[0] !== pair[1]) raw = pair;
      else if (pair.length === 1) raw = pair;
    }
    return canonicalizeCompareSegments(raw, compareSlugAliases);
  }, [searchParams, slugA, slugB, validSlugSet, compareSlugAliases]);

  const selectedTribes = useMemo(
    () =>
      selectedSlugs
        .map(slug =>
          allTribes.find(
            t => (t.slug || '').toLowerCase() === slug || (t.id || '').toLowerCase() === slug
          )
        )
        .filter((t): t is TribeData => Boolean(t)),
    [selectedSlugs, allTribes]
  );

  const compareSuggestions = useMemo(() => getComparePairSuggestions(allTribes, 22), [allTribes]);

  const tailoredSuggestions = useMemo(() => {
    if (selectedSlugs.length === 0) return compareSuggestions.slice(0, 10);
    if (selectedSlugs.length === 1) {
      const one = selectedSlugs[0];
      const withOne = compareSuggestions.filter(s => s.slugA === one || s.slugB === one);
      return (withOne.length > 0 ? withOne : compareSuggestions).slice(0, 10);
    }
    return [];
  }, [compareSuggestions, selectedSlugs]);

  const updateSlugs = useCallback(
    (next: string[]) => {
      const canon = parseCompareTribeSlugs(
        serializeCompareTribes(canonicalizeCompareSegments(next, compareSlugAliases)),
        validSlugSet
      );
      const s = serializeCompareTribes(canon);
      if (s) navigate(`/compare?tribes=${encodeURIComponent(s)}`, { replace: true });
      else navigate('/compare', { replace: true });
    },
    [navigate, compareSlugAliases, validSlugSet]
  );

  // Canonicalize /compare/a/vs/b → ?tribes= when user edits or for consistent sharing (optional one-time)
  useEffect(() => {
    if (!slugA || !slugB) return;
    const q = searchParams.get('tribes');
    if (q) return;
    const pair = selectedSlugs;
    if (pair.length === 2) {
      const s = serializeCompareTribes(pair);
      navigate(`/compare?tribes=${encodeURIComponent(s)}`, { replace: true });
    }
  }, [slugA, slugB, searchParams, selectedSlugs, navigate]);

  const [lastResumeHref, setLastResumeHref] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_COMPARE_KEY);
      if (!raw?.trim()) return;
      const slugs = canonicalizeCompareSegments(parseCompareTribeSlugs(raw, validSlugSet), compareSlugAliases);
      if (slugs.length >= 2) {
        setLastResumeHref(`/compare?tribes=${encodeURIComponent(serializeCompareTribes(slugs))}`);
      }
    } catch {
      /* ignore */
    }
  }, [validSlugSet, compareSlugAliases]);

  useEffect(() => {
    if (selectedSlugs.length < 2) return;
    try {
      localStorage.setItem(LAST_COMPARE_KEY, serializeCompareTribes(selectedSlugs));
    } catch {
      /* ignore */
    }
  }, [selectedSlugs]);

  const swapColumnOrder = useCallback(() => {
    if (selectedSlugs.length < 2) return;
    updateSlugs([...selectedSlugs].reverse());
  }, [selectedSlugs, updateSlugs]);

  const clearCompare = useCallback(() => {
    setActiveSlot(null);
    setSearchQuery('');
    navigate('/compare', { replace: true });
  }, [navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  /** Keep tribe lookup open by default so compare is ready without an extra click */
  const [quickLookupOpen, setQuickLookupOpen] = useState(true);

  const filteredTribes = useMemo(() => {
    const norm = normalizeForSearch(searchQuery);
    if (!norm) return allTribes.slice(0, 40);
    return allTribes
      .filter(
        t =>
          normalizeForSearch(t.name || '').includes(norm) ||
          normalizeForSearch(t.region || '').includes(norm) ||
          normalizeForSearch(t.language?.name || '').includes(norm)
      )
      .slice(0, 40);
  }, [searchQuery, allTribes]);

  const addTribe = (slug: string) => {
    const key = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!key || !validSlugSet.has(key)) return;
    const canon = compareSlugAliases.get(key) ?? key;
    if (selectedSlugs.includes(canon)) {
      setActiveSlot(null);
      setSearchQuery('');
      return;
    }

    let base = [...selectedSlugs];
    if (activeSlot !== null && activeSlot >= 0 && activeSlot < MAX_COMPARE) {
      if (activeSlot < base.length) {
        base[activeSlot] = key;
      } else if (base.length < MAX_COMPARE) {
        base.push(key);
      }
    } else if (base.length < MAX_COMPARE) {
      base.push(key);
    }

    base = parseCompareTribeSlugs(serializeCompareTribes(base), validSlugSet);
    updateSlugs(base);
    setActiveSlot(null);
    setSearchQuery('');
    setLookupHighlight(-1);
  };

  const lookupChoices = useMemo(
    () => filteredTribes.filter(t => !selectedSlugs.includes((t.slug || '').toLowerCase())),
    [filteredTribes, selectedSlugs]
  );

  const [lookupHighlight, setLookupHighlight] = useState(-1);

  useEffect(() => {
    if (lookupHighlight < 0) return;
    if (lookupHighlight >= lookupChoices.length) {
      setLookupHighlight(lookupChoices.length > 0 ? lookupChoices.length - 1 : -1);
    }
  }, [lookupChoices.length, lookupHighlight]);

  useEffect(() => {
    setLookupHighlight(-1);
  }, [searchQuery]);

  const onLookupKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchQuery.trim() || lookupChoices.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setLookupHighlight(i => (i < 0 ? 0 : Math.min(i + 1, lookupChoices.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setLookupHighlight(i => (i <= 0 ? -1 : i - 1));
    } else if (e.key === 'Enter' && lookupHighlight >= 0 && lookupHighlight < lookupChoices.length) {
      e.preventDefault();
      const slug = lookupChoices[lookupHighlight]?.slug;
      if (slug) addTribe(slug);
    } else if (e.key === 'Escape') {
      setLookupHighlight(-1);
    }
  };

  const shareOgUrl = useMemo(() => {
    if (selectedSlugs.length < 2) return '';
    if (typeof window === 'undefined') return '';
    const q = serializeCompareTribes(selectedSlugs);
    return `${window.location.origin}/compare?tribes=${encodeURIComponent(q)}`;
  }, [selectedSlugs]);

  const shareOgTitle = useMemo(
    () =>
      selectedTribes.length >= 2
        ? `${selectedTribes.map(t => t.name).join(' vs ')} | TribeGuess`
        : '',
    [selectedTribes]
  );

  const shareOgDescription = useMemo(
    () =>
      selectedTribes.length >= 2
        ? `Compare population, language, greetings, and culture for ${selectedTribes.map(t => t.name).join(', ')}.`
        : '',
    [selectedTribes]
  );

  const removeTribe = (index: number) => {
    updateSlugs(selectedSlugs.filter((_, i) => i !== index));
  };

  const copyShareLink = async () => {
    const path =
      selectedSlugs.length === 2
        ? `${window.location.origin}${buildCompareVsPath(selectedSlugs[0], selectedSlugs[1])}`
        : `${window.location.origin}/compare?tribes=${encodeURIComponent(serializeCompareTribes(selectedSlugs))}`;
    try {
      await navigator.clipboard.writeText(path);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const getFlag = (code: string) => countries.find(c => c.code === code)?.flag || '';

  const pageTitle =
    selectedTribes.length >= 2
      ? `${selectedTribes.map(t => t.name).join(' vs ')} | Compare Tribes | TribeGuess`
      : 'Compare African Tribes Side by Side | TribeGuess';

  const CompareRow = ({
    label,
    icon: Icon,
    getValue,
  }: {
    label: string;
    icon: LucideIcon;
    getValue: (t: TribeData) => ReactNode;
  }) => (
    <tr className="border-b border-border">
      <th scope="row" className="py-3 px-3 font-medium text-sm text-muted-foreground whitespace-nowrap sticky left-0 bg-background z-10 text-left align-top font-normal">
        <span className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 shrink-0" aria-hidden />
          {label}
        </span>
      </th>
      {selectedTribes.map((tribe, i) => (
        <td key={i} className="py-3 px-3 text-sm min-w-[180px] max-w-[280px]">
          {getValue(tribe)}
        </td>
      ))}
    </tr>
  );

  const descClamp = (t: TribeData) => {
    const d = typeof t.description === 'string' ? t.description : '';
    if (!d) return <span className="text-muted-foreground">N/A</span>;
    if (expandedDetails) return <p className="text-xs leading-relaxed">{d}</p>;
    return <p className="text-xs leading-relaxed line-clamp-4">{d}</p>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={
            selectedTribes.length >= 2
              ? `Compare ${selectedTribes.map(t => t.name).join(', ')} — population, language, culture, and more.`
              : 'Compare African tribes side by side — population, language, culture, food, and history.'
          }
        />
        {selectedTribes.length >= 2 && shareOgUrl && (
          <>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={shareOgTitle} />
            <meta property="og:description" content={shareOgDescription} />
            <meta property="og:url" content={shareOgUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={shareOgTitle} />
            <meta name="twitter:description" content={shareOgDescription} />
          </>
        )}
      </Helmet>
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
            <ArrowLeftRight className="inline w-6 h-6 mr-2 text-primary" />
            Compare Tribes
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Search below to add tribes (lookup stays open). URLs:{' '}
            <code className="text-xs bg-muted px-1 rounded">?tribes=slug-a,slug-b</code> or{' '}
            <code className="text-xs bg-muted px-1 rounded">/compare/yoruba/vs/igbo</code>.
          </p>
        </div>

        {selectedSlugs.length === 0 && lastResumeHref && (
          <p className="text-center text-sm text-muted-foreground mb-4">
            <Link to={lastResumeHref} className="font-medium text-primary underline-offset-2 hover:underline">
              Resume your last comparison
            </Link>
          </p>
        )}

        {selectedSlugs.length < 2 && tailoredSuggestions.length > 0 && (
          <section className="max-w-3xl mx-auto mb-8" aria-label="Suggested tribe comparisons">
            <h2 className="text-sm font-semibold text-foreground text-center mb-3">
              {selectedSlugs.length === 0 ? 'Try a common comparison' : 'Suggested next tribe'}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {tailoredSuggestions.map(s => (
                <Link
                  key={s.href}
                  to={s.href}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:bg-primary/5 transition-colors touch-manipulation"
                  title={s.hint}
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 max-w-md mx-auto">
              Pairs combine popular contrasts, related groups in our data, and tribes that share a primary country.
            </p>
          </section>
        )}

        {selectedSlugs.length >= 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {selectedSlugs.length >= 2 && (
              <Button type="button" variant="outline" size="sm" className="gap-2 touch-manipulation" onClick={copyShareLink}>
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
                {copied ? 'Copied link' : 'Copy share link'}
              </Button>
            )}
            {selectedSlugs.length >= 2 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 touch-manipulation"
                onClick={swapColumnOrder}
              >
                <ArrowDownUp className="w-4 h-4" aria-hidden />
                {selectedSlugs.length === 2 ? 'Swap columns' : 'Reverse order'}
              </Button>
            )}
            <Button type="button" variant="ghost" size="sm" className="gap-2 touch-manipulation text-muted-foreground" onClick={clearCompare}>
              <Trash2 className="w-4 h-4" aria-hidden />
              Clear all
            </Button>
          </div>
        )}

        {/* Selected tribe slots */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {Array.from({ length: MAX_COMPARE }).map((_, i) => {
            const tribe = selectedTribes[i];
            return (
              <div
                key={i}
                className={`relative rounded-xl border-2 border-dashed p-3 text-center transition-all min-h-[80px] flex flex-col items-center justify-center ${
                  tribe ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 cursor-pointer'
                } ${activeSlot === i ? 'ring-2 ring-primary' : ''}`}
                onClick={() => {
                  if (!tribe) {
                    const firstEmpty = selectedSlugs.length;
                    setActiveSlot(Math.min(i, firstEmpty, MAX_COMPARE - 1));
                  }
                }}
                onKeyDown={e => {
                  if (!tribe && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    const firstEmpty = selectedSlugs.length;
                    setActiveSlot(Math.min(i, firstEmpty, MAX_COMPARE - 1));
                  }
                }}
                role={tribe ? undefined : 'button'}
                tabIndex={tribe ? undefined : 0}
                aria-label={tribe ? undefined : `Add tribe to slot ${i + 1}`}
              >
                {tribe ? (
                  <>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        removeTribe(i);
                      }}
                      className="absolute top-1 right-1 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive touch-manipulation"
                      aria-label={`Remove ${tribe.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex gap-0.5 mb-1">
                      {(tribe.countries || []).slice(0, 3).map((c: string) => (
                        <span key={c} className="text-sm">
                          {getFlag(c)}
                        </span>
                      ))}
                    </div>
                    <Link to={`/learn/${tribe.slug}`} className="font-serif font-bold text-sm text-primary hover:underline">
                      {tribe.name}
                    </Link>
                    <span className="text-xs text-muted-foreground truncate max-w-full">{tribe.region}</span>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    <Plus className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs">Add tribe</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeSlot !== null && selectedSlugs.length < MAX_COMPARE && (
          <div
            className="max-w-lg mx-auto mb-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-center text-sm text-foreground"
            role="status"
          >
            Pick a tribe from the list below — you are filling <strong>slot {activeSlot + 1}</strong> of {MAX_COMPARE}.
          </div>
        )}

        {/* Quick lookup */}
        {(selectedSlugs.length < MAX_COMPARE || activeSlot !== null) && (
          <Collapsible open={quickLookupOpen} onOpenChange={setQuickLookupOpen} className="max-w-lg mx-auto mb-6">
            <CollapsibleTrigger
              className={cn(
                'flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted/50 touch-manipulation',
                quickLookupOpen && 'rounded-b-none'
              )}
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Quick tribe lookup
              </span>
              <ChevronDown
                className={cn('w-4 h-4 shrink-0 transition-transform duration-200', quickLookupOpen && 'rotate-180')}
                aria-hidden
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="rounded-b-xl border border-t-0 border-border bg-card p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={onLookupKeyDown}
                    placeholder="Search by name, region, or language…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none"
                    autoFocus={activeSlot !== null}
                    maxLength={80}
                    autoComplete="off"
                    spellCheck={false}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={Boolean(searchQuery.trim() && lookupChoices.length > 0)}
                    aria-controls="compare-tribe-lookup-list"
                    aria-activedescendant={
                      lookupHighlight >= 0 ? `compare-tribe-lookup-opt-${lookupHighlight}` : undefined
                    }
                  />
                </div>
                {searchQuery.trim() && (
                  <ul
                    id="compare-tribe-lookup-list"
                    className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-border divide-y divide-border"
                    role="listbox"
                    aria-label="Matching tribes"
                  >
                    {lookupChoices.length === 0 ? (
                      <li className="px-3 py-3 text-sm text-muted-foreground text-center">No matching tribes</li>
                    ) : (
                      lookupChoices.map((tribe, idx) => (
                          <li key={tribe.slug} role="presentation">
                            <button
                              type="button"
                              id={`compare-tribe-lookup-opt-${idx}`}
                              role="option"
                              aria-selected={lookupHighlight === idx}
                              onClick={() => addTribe(tribe.slug)}
                              onMouseEnter={() => setLookupHighlight(idx)}
                              className={cn(
                                'w-full text-left px-3 py-2.5 text-sm flex items-center gap-2 transition-colors touch-manipulation',
                                lookupHighlight === idx ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary/50'
                              )}
                            >
                              {(tribe.countries || []).slice(0, 2).map((c: string) => (
                                <span key={c}>{getFlag(c)}</span>
                              ))}
                              <span className="font-medium">{tribe.name}</span>
                              <span className="text-xs text-muted-foreground ml-auto truncate">{tribe.region}</span>
                            </button>
                          </li>
                        ))
                    )}
                  </ul>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Expand comparison details */}
        {selectedTribes.length >= 2 && (
          <div className="flex justify-end mb-3 max-w-5xl mx-auto">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
              onClick={() => setExpandedDetails(e => !e)}
            >
              {expandedDetails ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Shorter summaries
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Expand full descriptions
                </>
              )}
            </Button>
          </div>
        )}

        {/* Comparison table */}
        {selectedTribes.length >= 2 && (
          <section className="overflow-x-auto rounded-xl border border-border bg-card max-w-6xl mx-auto shadow-sm" aria-label="Comparison table">
            <table className="w-full min-w-[640px]">
              <caption className="sr-only">Side-by-side attributes for selected tribes</caption>
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th
                    scope="col"
                    className="py-3 px-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-secondary/30 z-10"
                  >
                    Attribute
                  </th>
                  {selectedTribes.map((tribe, i) => (
                    <th key={i} scope="col" className="py-3 px-3 text-left min-w-[180px]">
                      <Link to={`/learn/${tribe.slug}`} className="font-serif font-bold text-primary hover:underline">
                        {tribe.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Population" icon={Users} getValue={t => <span className="font-semibold">{t.population}</span>} />
                <CompareRow
                  label="National / regional share"
                  icon={Globe}
                  getValue={t => {
                    const p = typeof t.populationPercent === 'string' ? t.populationPercent.trim() : '';
                    return p ? <span className="text-sm">{p}</span> : <span className="text-muted-foreground">—</span>;
                  }}
                />
                <CompareRow label="Region" icon={MapPin} getValue={t => t.region} />
                <CompareRow
                  label="Countries"
                  icon={Globe}
                  getValue={t => (
                    <div className="flex flex-wrap gap-1">
                      {(t.countries || []).map((c: string) => {
                        const country = countries.find(ct => ct.code === c);
                        return country ? (
                          <span key={c} className="inline-flex items-center gap-1 text-xs bg-secondary px-1.5 py-0.5 rounded">
                            {country.flag} {country.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                />
                <CompareRow
                  label="Language"
                  icon={Languages}
                  getValue={t => (
                    <div>
                      <span className="font-medium">{t.language?.name || 'N/A'}</span>
                      {t.language?.family && <p className="text-xs text-muted-foreground">{t.language.family}</p>}
                      {t.language?.speakers && <p className="text-xs text-muted-foreground">{t.language.speakers} speakers</p>}
                    </div>
                  )}
                />
                <CompareRow
                  label="Greeting"
                  icon={MessageCircle}
                  getValue={t => {
                    const g = t.language?.greeting || (t as Record<string, unknown>)['greeting'];
                    const gm = t.language?.greetingMeaning || (t as Record<string, unknown>)['greetingMeaning'];
                    const greetStr = typeof g === 'string' ? g : '';
                    const meanStr = typeof gm === 'string' ? gm : '';
                    return (
                      <div>
                        <span className="font-medium text-primary">{greetStr || 'N/A'}</span>
                        {meanStr ? (
                          <p className="text-xs text-muted-foreground italic">&ldquo;{meanStr}&rdquo;</p>
                        ) : null}
                      </div>
                    );
                  }}
                />
                <CompareRow
                  label="Religion & belief"
                  icon={Church}
                  getValue={t => {
                    const rh = readReligiousHistory(t);
                    const overview = typeof t.religion === 'string' ? t.religion.trim() : '';
                    const hasHistory = Boolean(rh?.traditional || rh?.current);
                    if (!overview && !hasHistory) return <span className="text-muted-foreground">N/A</span>;
                    return (
                      <div className="text-xs space-y-1">
                        {overview && <p className="font-medium text-foreground">{overview}</p>}
                        {rh?.traditional && (
                          <p>
                            <strong>Traditional:</strong>{' '}
                            {expandedDetails
                              ? rh.traditional
                              : `${rh.traditional.substring(0, 120)}${rh.traditional.length > 120 ? '…' : ''}`}
                          </p>
                        )}
                        {rh?.current && (
                          <p>
                            <strong>Current:</strong>{' '}
                            {expandedDetails
                              ? rh.current
                              : `${rh.current.substring(0, 120)}${rh.current.length > 120 ? '…' : ''}`}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
                <CompareRow
                  label="Meal traditions"
                  icon={Utensils}
                  getValue={t => {
                    const ec = readEatingCustoms(t);
                    if (!ec) return <span className="text-muted-foreground">N/A</span>;
                    return (
                      <div className="text-xs space-y-0.5">
                        {ec.mealsPerDay !== undefined && (
                          <p>
                            <strong>Meals:</strong> {String(ec.mealsPerDay)}
                          </p>
                        )}
                        {ec.mainFoods && (
                          <p>
                            <strong>Foods:</strong>{' '}
                            {expandedDetails
                              ? ec.mainFoods
                              : `${ec.mainFoods.substring(0, 100)}${ec.mainFoods.length > 100 ? '…' : ''}`}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
                <CompareRow
                  label="Signature dishes"
                  icon={ChefHat}
                  getValue={t => {
                    const summary = readTraditionalFoodSummary(t, expandedDetails);
                    return summary ? (
                      <p className="text-xs leading-relaxed text-foreground">{summary}</p>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    );
                  }}
                />
                <CompareRow
                  label="Cultural Traits"
                  icon={Users}
                  getValue={t => (
                    <div className="flex flex-wrap gap-1">
                      {t.stereotypes?.slice(0, expandedDetails ? 8 : 3).map((s: string, idx: number) => (
                        <span key={idx} className="badge-tribe text-xs">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                />
                <CompareRow label="Description" icon={Globe} getValue={descClamp} />
              </tbody>
            </table>
          </section>
        )}

        {selectedTribes.length < 2 && (
          <div className="text-center py-8 text-muted-foreground max-w-md mx-auto">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="mb-2">
              {selectedTribes.length === 0
                ? 'Add at least two tribes using the lookup above or a suggestion.'
                : 'Add one more tribe from the lookup, or open a suggested pair.'}
            </p>
            <p className="text-xs">
              From any tribe page, use <strong>Quick compare</strong> to pre-fill this tool, or share a link like{' '}
              <code className="bg-muted px-1 rounded">/compare/yoruba/vs/igbo</code>.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TribeCompare;
