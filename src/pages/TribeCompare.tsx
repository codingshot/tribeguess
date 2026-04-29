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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { normalizeForSearch } from '@/lib/dataValidation';
import {
  MAX_COMPARE_TRIBES,
  parseCompareTribeSlugs,
  serializeCompareTribes,
  buildCompareVsPath,
} from '@/lib/tribeCompareUrl';

const MAX_COMPARE = MAX_COMPARE_TRIBES;

const TribeCompare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { slugA, slugB } = useParams<{ slugA?: string; slugB?: string }>();
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);

  const validSlugSet = useMemo(
    () => new Set(allTribes.map(t => (t.slug || '').toLowerCase()).filter(Boolean)),
    [allTribes]
  );

  const selectedSlugs = useMemo(() => {
    const q = searchParams.get('tribes');
    if (q) return parseCompareTribeSlugs(q, validSlugSet);
    if (slugA && slugB) {
      const a = slugA.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const b = slugB.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const pair = [a, b].filter(s => validSlugSet.has(s));
      if (pair.length === 2 && pair[0] !== pair[1]) return pair;
      if (pair.length === 1) return pair;
    }
    return [];
  }, [searchParams, slugA, slugB, validSlugSet]);

  const selectedTribes = useMemo(
    () => selectedSlugs.map(slug => allTribes.find(t => (t.slug || '').toLowerCase() === slug)).filter(Boolean) as any[],
    [selectedSlugs, allTribes]
  );

  const updateSlugs = useCallback(
    (next: string[]) => {
      const s = serializeCompareTribes(next);
      if (s) navigate(`/compare?tribes=${encodeURIComponent(s)}`, { replace: true });
      else navigate('/compare', { replace: true });
    },
    [navigate]
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

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredTribes = useMemo(() => {
    const norm = normalizeForSearch(searchQuery);
    if (!norm) return allTribes.slice(0, 40);
    return allTribes
      .filter(
        t =>
          normalizeForSearch(t.name || '').includes(norm) ||
          normalizeForSearch(t.region || '').includes(norm) ||
          normalizeForSearch((t as any).language?.name || '').includes(norm)
      )
      .slice(0, 40);
  }, [searchQuery, allTribes]);

  const addTribe = (slug: string) => {
    const key = slug.toLowerCase();
    if (selectedSlugs.includes(key)) {
      setActiveSlot(null);
      setSearchQuery('');
      return;
    }

    let base = [...selectedSlugs];
    if (activeSlot !== null && activeSlot < MAX_COMPARE) {
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
  };

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
      ? `${selectedTribes.map((t: any) => t.name).join(' vs ')} | Compare Tribes | TribeGuess`
      : 'Compare African Tribes Side by Side | TribeGuess';

  const CompareRow = ({
    label,
    icon: Icon,
    getValue,
  }: {
    label: string;
    icon: typeof Users;
    getValue: (t: any) => ReactNode;
  }) => (
    <tr className="border-b border-border">
      <td className="py-3 px-3 font-medium text-sm text-muted-foreground whitespace-nowrap sticky left-0 bg-background z-10">
        <span className="flex items-center gap-1.5">
          <Icon className="w-4 h-4" />
          {label}
        </span>
      </td>
      {selectedTribes.map((tribe, i) => (
        <td key={i} className="py-3 px-3 text-sm min-w-[180px] max-w-[280px]">
          {getValue(tribe)}
        </td>
      ))}
    </tr>
  );

  const descClamp = (t: any) => {
    const d = t.description || '';
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
              ? `Compare ${selectedTribes.map((t: any) => t.name).join(', ')} — population, language, culture, and more.`
              : 'Compare African tribes side by side — population, language, culture, food, and history.'
          }
        />
      </Helmet>
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
            <ArrowLeftRight className="inline w-6 h-6 mr-2 text-primary" />
            Compare Tribes
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Quick lookup: search below to add tribes. URLs support{' '}
            <code className="text-xs bg-muted px-1 rounded">?tribes=slug-a,slug-b</code> or{' '}
            <code className="text-xs bg-muted px-1 rounded">/compare/yoruba/vs/igbo</code> for two tribes (shareable).
          </p>
        </div>

        {selectedSlugs.length >= 2 && (
          <div className="flex justify-center mb-4">
            <Button type="button" variant="outline" size="sm" className="gap-2 touch-manipulation" onClick={copyShareLink}>
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
              {copied ? 'Copied link' : 'Copy share link'}
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
                  if (!tribe) setActiveSlot(i);
                }}
                onKeyDown={e => {
                  if (!tribe && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setActiveSlot(i);
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

        {/* Quick lookup */}
        {(selectedSlugs.length < MAX_COMPARE || activeSlot !== null) && (
          <Collapsible defaultOpen className="max-w-lg mx-auto mb-6">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted/50 touch-manipulation">
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Quick tribe lookup
              </span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="rounded-b-xl border border-t-0 border-border bg-card p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name, region, or language…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none"
                    autoFocus={activeSlot !== null}
                    maxLength={80}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                {searchQuery.trim() && (
                  <ul
                    className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-border divide-y divide-border"
                    role="listbox"
                  >
                    {filteredTribes.filter(t => !selectedSlugs.includes((t.slug || '').toLowerCase())).length === 0 ? (
                      <li className="px-3 py-3 text-sm text-muted-foreground text-center">No matching tribes</li>
                    ) : (
                      filteredTribes
                        .filter(t => !selectedSlugs.includes((t.slug || '').toLowerCase()))
                        .map(tribe => (
                          <li key={tribe.slug} role="none">
                            <button
                              type="button"
                              onClick={() => addTribe(tribe.slug)}
                              className="w-full text-left px-3 py-2.5 hover:bg-secondary/50 text-sm flex items-center gap-2 transition-colors touch-manipulation"
                            >
                              {(tribe as any).countries?.slice(0, 2).map((c: string) => (
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
          <div className="overflow-x-auto rounded-xl border border-border bg-card max-w-6xl mx-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-3 px-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-secondary/30 z-10">
                    Attribute
                  </th>
                  {selectedTribes.map((tribe, i) => (
                    <th key={i} className="py-3 px-3 text-left min-w-[180px]">
                      <Link to={`/learn/${tribe.slug}`} className="font-serif font-bold text-primary hover:underline">
                        {tribe.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Population" icon={Users} getValue={t => <span className="font-semibold">{t.population}</span>} />
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
                  icon={Globe}
                  getValue={t => (
                    <div>
                      <span className="font-medium text-primary">{t.language?.greeting || t.greeting || 'N/A'}</span>
                      {(t.language?.greetingMeaning || t.greetingMeaning) && (
                        <p className="text-xs text-muted-foreground italic">&ldquo;{t.language?.greetingMeaning || t.greetingMeaning}&rdquo;</p>
                      )}
                    </div>
                  )}
                />
                <CompareRow
                  label="Religion"
                  icon={Church}
                  getValue={t => (
                    <div className="text-xs space-y-0.5">
                      {t.religiousHistory?.traditional && (
                        <p>
                          <strong>Traditional:</strong>{' '}
                          {expandedDetails
                            ? t.religiousHistory.traditional
                            : `${t.religiousHistory.traditional.substring(0, 120)}${t.religiousHistory.traditional.length > 120 ? '…' : ''}`}
                        </p>
                      )}
                      {t.religiousHistory?.current && (
                        <p>
                          <strong>Current:</strong>{' '}
                          {expandedDetails
                            ? t.religiousHistory.current
                            : `${t.religiousHistory.current.substring(0, 120)}${t.religiousHistory.current.length > 120 ? '…' : ''}`}
                        </p>
                      )}
                      {!t.religiousHistory && <span className="text-muted-foreground">N/A</span>}
                    </div>
                  )}
                />
                <CompareRow
                  label="Meal Traditions"
                  icon={Utensils}
                  getValue={t => (
                    <div className="text-xs space-y-0.5">
                      {t.eatingCustoms?.mealsPerDay && (
                        <p>
                          <strong>Meals:</strong> {t.eatingCustoms.mealsPerDay}
                        </p>
                      )}
                      {t.eatingCustoms?.mainFoods && (
                        <p>
                          <strong>Foods:</strong>{' '}
                          {expandedDetails
                            ? t.eatingCustoms.mainFoods
                            : `${t.eatingCustoms.mainFoods.substring(0, 100)}${t.eatingCustoms.mainFoods.length > 100 ? '…' : ''}`}
                        </p>
                      )}
                      {!t.eatingCustoms && <span className="text-muted-foreground">N/A</span>}
                    </div>
                  )}
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
          </div>
        )}

        {selectedTribes.length < 2 && (
          <div className="text-center py-12 text-muted-foreground max-w-md mx-auto">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="mb-2">Select at least 2 tribes to compare.</p>
            <p className="text-xs">
              Open a tribe page and use <strong>Compare</strong>, or paste a link like{' '}
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
