import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { Search, X, Plus, ArrowLeftRight, MapPin, Users, Globe, Languages, Church, ChefHat, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MAX_COMPARE = 4;

const TribeCompare = () => {
  const allTribes = useMemo(() => getAllTribes(), []);
  const countries = useMemo(() => getCountries(), []);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const selectedTribes = useMemo(
    () => selectedSlugs.map(slug => allTribes.find(t => t.slug === slug)).filter(Boolean) as any[],
    [selectedSlugs, allTribes]
  );

  const filteredTribes = useMemo(() => {
    if (!searchQuery.trim()) return allTribes.slice(0, 20);
    const q = searchQuery.toLowerCase();
    return allTribes.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.region.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [searchQuery, allTribes]);

  const addTribe = (slug: string) => {
    if (activeSlot !== null && activeSlot < MAX_COMPARE) {
      setSelectedSlugs(prev => {
        const next = [...prev];
        next[activeSlot] = slug;
        return next;
      });
    } else if (selectedSlugs.length < MAX_COMPARE && !selectedSlugs.includes(slug)) {
      setSelectedSlugs(prev => [...prev, slug]);
    }
    setActiveSlot(null);
    setSearchQuery('');
  };

  const removeTribe = (index: number) => {
    setSelectedSlugs(prev => prev.filter((_, i) => i !== index));
  };

  const getFlag = (code: string) => countries.find(c => c.code === code)?.flag || '';

  const CompareRow = ({ label, icon: Icon, getValue }: { label: string; icon: any; getValue: (t: any) => React.ReactNode }) => (
    <tr className="border-b border-border">
      <td className="py-3 px-3 font-medium text-sm text-muted-foreground whitespace-nowrap sticky left-0 bg-background z-10">
        <span className="flex items-center gap-1.5"><Icon className="w-4 h-4" />{label}</span>
      </td>
      {selectedTribes.map((tribe, i) => (
        <td key={i} className="py-3 px-3 text-sm min-w-[180px] max-w-[250px]">
          {getValue(tribe)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Compare African Tribes Side by Side | TribeGuess</title>
        <meta name="description" content="Compare African tribes side by side — population, language, culture, food, and history." />
      </Helmet>
      <Header />

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
            <ArrowLeftRight className="inline w-6 h-6 mr-2 text-primary" />
            Compare Tribes
          </h1>
          <p className="text-muted-foreground text-sm">Select up to {MAX_COMPARE} tribes to compare side by side</p>
        </div>

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
                onClick={() => !tribe && setActiveSlot(i)}
              >
                {tribe ? (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); removeTribe(i); }} className="absolute top-1 right-1 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex gap-0.5 mb-1">
                      {(tribe.countries || []).slice(0, 3).map((c: string) => <span key={c} className="text-sm">{getFlag(c)}</span>)}
                    </div>
                    <Link to={`/learn/${tribe.slug}`} className="font-serif font-bold text-sm text-primary hover:underline">{tribe.name}</Link>
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

        {/* Search to add */}
        {(selectedSlugs.length < MAX_COMPARE || activeSlot !== null) && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tribes to add..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none"
                autoFocus={activeSlot !== null}
              />
            </div>
            {searchQuery && (
              <div className="mt-1 max-h-48 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
                {filteredTribes.filter(t => !selectedSlugs.includes(t.slug)).map(tribe => (
                  <button
                    key={tribe.slug}
                    onClick={() => addTribe(tribe.slug)}
                    className="w-full text-left px-3 py-2 hover:bg-secondary/50 text-sm flex items-center gap-2 transition-colors"
                  >
                    {(tribe as any).countries?.slice(0, 2).map((c: string) => <span key={c}>{getFlag(c)}</span>)}
                    <span className="font-medium">{tribe.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{tribe.region}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        {selectedTribes.length >= 2 && (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="py-3 px-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky left-0 bg-secondary/30 z-10">Attribute</th>
                  {selectedTribes.map((tribe, i) => (
                    <th key={i} className="py-3 px-3 text-left min-w-[180px]">
                      <Link to={`/learn/${tribe.slug}`} className="font-serif font-bold text-primary hover:underline">{tribe.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="Population" icon={Users} getValue={t => <span className="font-semibold">{t.population}</span>} />
                <CompareRow label="Region" icon={MapPin} getValue={t => t.region} />
                <CompareRow label="Countries" icon={Globe} getValue={t => (
                  <div className="flex flex-wrap gap-1">
                    {(t.countries || []).map((c: string) => {
                      const country = countries.find(ct => ct.code === c);
                      return country ? <span key={c} className="inline-flex items-center gap-1 text-xs bg-secondary px-1.5 py-0.5 rounded">{country.flag} {country.name}</span> : null;
                    })}
                  </div>
                )} />
                <CompareRow label="Language" icon={Languages} getValue={t => (
                  <div>
                    <span className="font-medium">{t.language?.name || 'N/A'}</span>
                    {t.language?.family && <p className="text-xs text-muted-foreground">{t.language.family}</p>}
                    {t.language?.speakers && <p className="text-xs text-muted-foreground">{t.language.speakers} speakers</p>}
                  </div>
                )} />
                <CompareRow label="Greeting" icon={Globe} getValue={t => (
                  <div>
                    <span className="font-medium text-primary">{t.language?.greeting || t.greeting || 'N/A'}</span>
                    {(t.language?.greetingMeaning || t.greetingMeaning) && (
                      <p className="text-xs text-muted-foreground italic">"{t.language?.greetingMeaning || t.greetingMeaning}"</p>
                    )}
                  </div>
                )} />
                <CompareRow label="Religion" icon={Church} getValue={t => (
                  <div className="text-xs space-y-0.5">
                    {t.religiousHistory?.traditional && <p><strong>Traditional:</strong> {t.religiousHistory.traditional.substring(0, 80)}...</p>}
                    {t.religiousHistory?.current && <p><strong>Current:</strong> {t.religiousHistory.current.substring(0, 80)}...</p>}
                    {!t.religiousHistory && <span className="text-muted-foreground">N/A</span>}
                  </div>
                )} />
                <CompareRow label="Meal Traditions" icon={Utensils} getValue={t => (
                  <div className="text-xs space-y-0.5">
                    {t.eatingCustoms?.mealsPerDay && <p><strong>Meals:</strong> {t.eatingCustoms.mealsPerDay}</p>}
                    {t.eatingCustoms?.mainFoods && <p><strong>Foods:</strong> {t.eatingCustoms.mainFoods.substring(0, 80)}...</p>}
                    {!t.eatingCustoms && <span className="text-muted-foreground">N/A</span>}
                  </div>
                )} />
                <CompareRow label="Cultural Traits" icon={Users} getValue={t => (
                  <div className="flex flex-wrap gap-1">
                    {t.stereotypes?.slice(0, 3).map((s: string, i: number) => (
                      <span key={i} className="badge-tribe text-xs">{s}</span>
                    ))}
                  </div>
                )} />
                <CompareRow label="Description" icon={Globe} getValue={t => (
                  <p className="text-xs leading-relaxed">{t.description?.substring(0, 150)}...</p>
                )} />
              </tbody>
            </table>
          </div>
        )}

        {selectedTribes.length < 2 && (
          <div className="text-center py-12 text-muted-foreground">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Select at least 2 tribes to start comparing</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TribeCompare;
