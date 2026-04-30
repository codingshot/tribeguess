import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Filter, Users, MapPin, LayoutGrid, Map as MapIcon, Globe, TrendingUp, Languages, Flag, Layers, Info, SlidersHorizontal, ArrowUpDown, Check, List, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TribeCard } from '@/components/TribeCard';
import { DynamicMapView } from '@/components/DynamicMapView';
import { CountryFlag } from '@/components/CountryFlag';
import { getAllTribes, getCountries, getCountryFacts } from '@/lib/tribeDetection';
import { normalizeForSearch, stripAsciiControlCharacters } from '@/lib/dataValidation';
import tribesData from '@/data/tribes.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CrossSectionSearchHints } from "@/components/CrossSectionSearchHints";

// Allowed enum values for query param validation
const VALID_VIEW_MODES = ['grid', 'list', 'map'] as const;
const VALID_SORT_ORDERS = ['pop-asc', 'pop-desc', 'name-asc', 'name-desc'] as const;

/** Validate and sanitize a query param against an allow-list, returning fallback if invalid */
function safeEnumParam<T extends string>(raw: string | null, allowed: readonly T[], fallback: T): T {
  if (raw !== null && (allowed as readonly string[]).includes(raw)) return raw as T;
  return fallback;
}

/** Sanitize a free-text query param: trim, limit length, strip control chars */
function safeTextParam(raw: string | null, maxLength = 100): string {
  if (raw === null) return '';
  return stripAsciiControlCharacters(raw.trim().slice(0, maxLength)).replace(/\s+/g, ' ');
}

const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Pre-load stable data references
  const tribes = getAllTribes();
  const allCountries = getCountries();
  const macroRegions = useMemo(() => tribesData.regions || [], []);
  
  // Build valid code sets once for validation
  const validCountryCodes = useMemo(() => new Set(allCountries.map(c => c.code)), [allCountries]);
  const validMacroRegionIds = useMemo(() => new Set(macroRegions.map(r => r.id)), [macroRegions]);

  // ============= VALIDATED QUERY PARAMS =============
  const searchQuery = safeTextParam(searchParams.get('search'), 100);
  
  const rawRegion = safeTextParam(searchParams.get('region'), 80);
  // Region is validated against dynamic list in filteredTribes below
  const regionFilter = rawRegion;
  
  const rawMacroRegion = searchParams.get('macroRegion') || '';
  const macroRegionFilter = validMacroRegionIds.has(rawMacroRegion) ? rawMacroRegion : '';
  
  const rawCountry = searchParams.get('country') || 'ALL';
  const countryFilter = rawCountry === 'ALL' || validCountryCodes.has(rawCountry) ? rawCountry : 'ALL';
  
  const viewMode = safeEnumParam(searchParams.get('view'), VALID_VIEW_MODES, 'grid');
  const sortParam = searchParams.get('sort') ?? '';
  const sortOrder = useMemo((): '' | (typeof VALID_SORT_ORDERS)[number] => {
    if ((VALID_SORT_ORDERS as readonly string[]).includes(sortParam)) {
      return sortParam as (typeof VALID_SORT_ORDERS)[number];
    }
    return '';
  }, [sortParam]);
  
  const rawLanguageFamily = safeTextParam(searchParams.get('languageFamily'), 100);
  const languageFamilyFilter = rawLanguageFamily;
  
  // Validate multi-country selection: reject unknown codes
  const selectedCountries = useMemo(() => {
    const raw = searchParams.get('countries')?.split(',').filter(Boolean) || [];
    return raw.filter(code => validCountryCodes.has(code));
  }, [searchParams, validCountryCodes]);
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [tempSort, setTempSort] = useState(sortOrder);
  const [tempCountries, setTempCountries] = useState<string[]>(selectedCountries);
  
  // Alias for backward compat in template
  const countries = allCountries;
  
  // Sync localSearch with URL when searchQuery changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // When the advanced dialog is closed, keep draft filters aligned with the URL (cancel, browser back/forward)
  useEffect(() => {
    if (!advancedFiltersOpen) {
      setTempSort(sortOrder);
      setTempCountries(selectedCountries.length > 0 ? selectedCountries : []);
    }
  }, [advancedFiltersOpen, sortOrder, selectedCountries]);

  // Parse population string to number
  const parsePopulation = (pop: string): number => {
    const numMatch = pop.match(/[\d.]+/);
    if (!numMatch) return 0;
    const num = parseFloat(numMatch[0]);
    if (pop.toLowerCase().includes('million')) {
      return num * 1000000;
    } else if (pop.toLowerCase().includes('thousand') || pop.toLowerCase().includes(',000')) {
      return num * 1000;
    }
    return num;
  };

  const formatPopulation = (pop: number) => {
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)}M`;
    } else if (pop >= 1000) {
      return `${(pop / 1000).toFixed(0)}K`;
    }
    return pop.toString();
  };
  
  // Get countries filtered by macro region
  const filteredCountries = useMemo(() => {
    if (!macroRegionFilter) return countries;
    return countries.filter(c => c.region === macroRegionFilter);
  }, [countries, macroRegionFilter]);

  // Filter regions based on selected country's tribes
  const regions = useMemo(() => {
    const countryTribes = tribes.filter(t => {
      const tribeCountries = t.countries || ['KE'];
      return !countryFilter || countryFilter === 'ALL' || tribeCountries.includes(countryFilter);
    });
    const uniqueRegions = [...new Set(countryTribes.map(t => t.region))];
    return uniqueRegions.sort();
  }, [tribes, countryFilter]);

  // Country-specific stats
  const countryStats = useMemo(() => {
    const countryTribes = tribes.filter(t => {
      const tribeCountries = t.countries || ['KE'];
      return !countryFilter || countryFilter === 'ALL' || tribeCountries.includes(countryFilter);
    });
    
    const population = countryTribes.reduce((acc, t) => {
      const pop = t.population || '';
      const numMatch = pop.match(/[\d.]+/);
      if (!numMatch) return acc;
      const num = parseFloat(numMatch[0]);
      if (pop.toLowerCase().includes('million')) {
        return acc + num * 1000000;
      } else if (pop.toLowerCase().includes('thousand') || pop.toLowerCase().includes(',000')) {
        return acc + num * 1000;
      }
      return acc + num;
    }, 0);

    const uniqueLanguages = new Set(countryTribes.map(t => t.language?.name).filter(Boolean));
    
    return {
      tribeCount: countryTribes.length,
      population,
      regionCount: [...new Set(countryTribes.map(t => t.region))].length,
      languageCount: uniqueLanguages.size
    };
  }, [tribes, countryFilter]);

  // Get country-specific facts
  const countryFacts = useMemo(() => {
    return getCountryFacts(countryFilter || 'KE');
  }, [countryFilter]);
  
  const filteredTribes = useMemo(() => {
    // Validate regionFilter against actual available regions
    const validRegions = new Set(regions);
    const effectiveRegion = validRegions.has(regionFilter) ? regionFilter : '';
    
    const seen = new Set<string>();
    let result = tribes.filter(tribe => {
      // Deduplicate by tribe id
      if (seen.has(tribe.id)) return false;
      seen.add(tribe.id);
      
      const searchNorm = normalizeForSearch((searchQuery || '').slice(0, 100));
      
      // Enhanced search with diacritic-normalized matching
      const matchesSearch = !searchQuery || 
        normalizeForSearch(tribe.name || '').includes(searchNorm) ||
        normalizeForSearch(tribe.description || '').includes(searchNorm) ||
        normalizeForSearch(tribe.region || '').includes(searchNorm) ||
        (Array.isArray(tribe.stereotypes) && tribe.stereotypes.some(s => typeof s === 'string' && normalizeForSearch(s).includes(searchNorm))) ||
        (Array.isArray(tribe.commonNames?.female) && tribe.commonNames.female.some(n => typeof n === 'string' && normalizeForSearch(n).includes(searchNorm))) ||
        (Array.isArray(tribe.commonNames?.male) && tribe.commonNames.male.some(n => typeof n === 'string' && normalizeForSearch(n).includes(searchNorm))) ||
        (tribe.language?.name && normalizeForSearch(tribe.language.name).includes(searchNorm)) ||
        (Array.isArray(tribe.funFacts) && tribe.funFacts.some(f => typeof f === 'string' && normalizeForSearch(f).includes(searchNorm))) ||
        (Array.isArray(tribe.culturalTraits) && tribe.culturalTraits.some(t => typeof t === 'string' && normalizeForSearch(t).includes(searchNorm))) ||
        (Array.isArray(tribe.famousPeople) && tribe.famousPeople.some(p => p && typeof p.name === 'string' && normalizeForSearch(p.name).includes(searchNorm)));
      
      const matchesRegion = !effectiveRegion || tribe.region === effectiveRegion;
      
      // Filter by language family - case-insensitive
      const matchesLanguageFamily = !languageFamilyFilter || 
        (tribe.language?.family?.toLowerCase().includes(languageFamilyFilter.toLowerCase()));
      
      // Filter by country
      const tribeCountries = tribe.countries || ['KE'];
      
      let matchesCountry = true;
      if (selectedCountries.length > 0) {
        matchesCountry = tribeCountries.some((code: string) => selectedCountries.includes(code));
      } else if (countryFilter && countryFilter !== 'ALL') {
        matchesCountry = tribeCountries.includes(countryFilter);
      } else if (macroRegionFilter) {
        const regionCountryCodes = countries.filter(c => c.region === macroRegionFilter).map(c => c.code);
        matchesCountry = tribeCountries.some((code: string) => regionCountryCodes.includes(code));
      }
      
      return matchesSearch && matchesRegion && matchesCountry && matchesLanguageFamily;
    });

    // Apply sorting
    const isDefaultAllAfrica =
      countryFilter === 'ALL' &&
      !macroRegionFilter &&
      selectedCountries.length === 0 &&
      !effectiveRegion &&
      !languageFamilyFilter &&
      !searchQuery &&
      !sortOrder;

    if (sortOrder === 'pop-asc') {
      result = [...result].sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
    } else if (sortOrder === 'pop-desc' || isDefaultAllAfrica) {
      result = [...result].sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
    } else if (sortOrder === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [tribes, searchQuery, regionFilter, regions, countryFilter, macroRegionFilter, countries, selectedCountries, sortOrder, languageFamilyFilter]);
  // handleSearch removed - now using live search
  
  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams);
    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    setSearchParams(params);
  };

  const handleCountryChange = (country: string) => {
    const params = new URLSearchParams(searchParams);
    if (country && country !== 'ALL') {
      params.set('country', country);
    } else {
      params.delete('country');
    }
    // Clear region filter when changing country
    params.delete('region');
    setSearchParams(params);
  };

  const handleMacroRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams);
    if (region) {
      params.set('macroRegion', region);
      // When selecting a macro region, clear country filter to show all countries in that region
      params.delete('country');
      params.delete('region');
    } else {
      params.delete('macroRegion');
    }
    setSearchParams(params);
  };
  
  const toggleViewMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', mode);
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setLocalSearch('');
    setSearchParams({});
  };
  
  const hasFilters = searchQuery || regionFilter || macroRegionFilter || sortOrder || selectedCountries.length > 0 || languageFamilyFilter || (countryFilter && countryFilter !== 'ALL');

  const hasAdvancedFilters = sortOrder || selectedCountries.length > 0 || languageFamilyFilter;

  const applyAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    if (tempSort) {
      params.set('sort', tempSort);
    } else {
      params.delete('sort');
    }
    
    if (tempCountries.length > 0) {
      params.set('countries', tempCountries.join(','));
      // Clear single country filter when using multi-select
      params.delete('country');
    } else {
      params.delete('countries');
    }
    
    setSearchParams(params);
    setAdvancedFiltersOpen(false);
  };

  const clearAdvancedFilters = () => {
    setTempSort('');
    setTempCountries([]);
  };

  const toggleTempCountry = (code: string) => {
    setTempCountries(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const selectedCountry = countries.find(c => c.code === countryFilter) || countries.find(c => c.code === 'KE');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <div className="animate-fade-in">
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              Learn About <span className="gradient-gold-text">African Tribes</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base px-2">
              Explore the rich cultural diversity of African ethnic groups, their naming traditions, and cultural characteristics.
            </p>
          </header>
          
          {/* Search and Filters - Inline Layout */}
          <section className="max-w-4xl mx-auto mb-3 sm:mb-4" aria-label="Search and filters">
            {/* Mobile: one horizontal strip (scroll) = search + tools; desktop: search left, tools right */}
            <div className="flex flex-nowrap items-center gap-2 min-w-0 overflow-x-auto overflow-y-visible pb-1 -mx-1 px-1 scrollbar-hide touch-pan-x sm:flex-wrap sm:overflow-x-visible sm:pb-0 sm:mx-0 sm:px-0 sm:touch-auto lg:gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[min(100%,11rem)] sm:min-w-0 lg:max-w-none shrink sm:shrink-0 sm:w-full lg:w-auto lg:flex-1">
                <label htmlFor="tribe-search" className="sr-only">Search tribes, names, or characteristics</label>
                <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  id="tribe-search"
                  type="text"
                  value={localSearch}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 100);
                    setLocalSearch(value);
                    // Live search - update URL as user types
                    const params = new URLSearchParams(searchParams);
                    if (value) {
                      params.set('search', value);
                    } else {
                      params.delete('search');
                    }
                    setSearchParams(params, { replace: true });
                  }}
                  placeholder="Search tribes…"
                  className="input-tribal pl-8 sm:pl-9 pr-8 sm:pr-9 text-sm h-9 w-full min-h-[44px] sm:min-h-0"
                  maxLength={100}
                  autoComplete="off"
                  spellCheck="false"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch('');
                      const params = new URLSearchParams(searchParams);
                      params.delete('search');
                      setSearchParams(params);
                    }}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1.5 touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* View Toggle + Advanced Filters + Info */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Compact View Toggle with Active State */}
              <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5 flex-shrink-0" role="group" aria-label="View mode">
                <button
                  onClick={() => toggleViewMode('grid')}
                  className={`p-2.5 sm:p-2 rounded-md transition-all touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleViewMode('list')}
                  className={`p-2.5 sm:p-2 rounded-md transition-all touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${
                    viewMode === 'list' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleViewMode('map')}
                  className={`p-2.5 sm:p-2 rounded-md transition-all touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${
                    viewMode === 'map' 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  aria-label="Map view"
                  aria-pressed={viewMode === 'map'}
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Advanced Filters Button */}
              <Dialog open={advancedFiltersOpen} onOpenChange={setAdvancedFiltersOpen}>
                <DialogTrigger asChild>
                  <button className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-3 h-9 min-h-[44px] sm:min-h-[36px] rounded-lg transition-colors flex-shrink-0 touch-manipulation ${
                    hasAdvancedFilters 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}>
                    <SlidersHorizontal className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium hidden min-[400px]:inline">Advanced</span>
                    {hasAdvancedFilters && (
                      <span className="w-2 h-2 rounded-full bg-primary-foreground shrink-0" />
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background border border-border">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-primary" />
                      Advanced Filters
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Sort Order */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                        Sort By
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 'pop-desc', label: 'Population (High)' },
                          { value: 'pop-asc', label: 'Population (Low)' },
                          { value: 'name-asc', label: 'Name (A-Z)' },
                          { value: 'name-desc', label: 'Name (Z-A)' },
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setTempSort(option.value)}
                            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                              tempSort === option.value
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Multi-Country Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Flag className="w-4 h-4 text-muted-foreground" />
                        Filter by Countries
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto touch-pan-y">
                        {countries.map(country => (
                          <label
                            key={country.code}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                              tempCountries.includes(country.code)
                                ? 'bg-primary/10 border border-primary/30'
                                : 'bg-muted/50 hover:bg-muted'
                            }`}
                          >
                            <Checkbox
                              checked={tempCountries.includes(country.code)}
                              onCheckedChange={() => toggleTempCountry(country.code)}
                            />
                            <span className="text-sm">{country.flag}</span>
                            <span className="text-xs truncate">{country.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={clearAdvancedFilters} className="w-full sm:w-auto">
                      Clear Filters
                    </Button>
                    <Button 
                      onClick={() => {
                        applyAdvancedFilters();
                        setAdvancedFiltersOpen(false);
                      }} 
                      className="w-full sm:w-auto"
                    >
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Did You Know - Info Tooltip */}
              {countryFacts.length > 0 && (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <button className="flex items-center justify-center gap-1.5 px-2.5 h-9 min-h-[44px] sm:min-h-[36px] min-w-[44px] sm:min-w-0 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0 touch-manipulation">
                        <Info className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="end" className="max-w-xs sm:max-w-sm p-4">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          {selectedCountry && `${selectedCountry.flag} ${selectedCountry.name}`}
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1.5">
                          {countryFacts.slice(0, 3).map((fact, index) => (
                            <li key={index}>• {fact}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            </div>
            
            {/* Geo filters: single scroll row on mobile (no wrap) */}
            <div className="flex flex-nowrap items-center gap-2 mt-2 min-w-0 overflow-x-auto overflow-y-visible pb-1 -mx-1 px-1 scrollbar-hide touch-pan-x sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0 sm:mx-0 sm:px-0 sm:touch-auto">
              {/* Macro Region Dropdown */}
              <Select value={macroRegionFilter || 'all'} onValueChange={(value) => handleMacroRegionChange(value === 'all' ? '' : value)}>
                <SelectTrigger className="h-9 min-h-[44px] sm:min-h-7 w-[7.75rem] sm:w-auto sm:min-w-[90px] shrink-0 text-xs bg-primary/10 border-primary/20 hover:bg-primary/20 px-2 [&>span]:max-w-[4.5rem] sm:[&>span]:max-w-none">
                  <Globe className="w-3 h-3 mr-1 text-primary shrink-0" />
                  <SelectValue placeholder="Africa" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">🌍 All Africa</SelectItem>
                  {macroRegions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Region Filter Dropdown */}
              <Select value={regionFilter || 'all'} onValueChange={(value) => handleRegionChange(value === 'all' ? '' : value)}>
                <SelectTrigger className="h-9 min-h-[44px] sm:min-h-7 w-[7.25rem] sm:w-auto sm:min-w-[80px] shrink-0 text-xs bg-background px-2 [&>span]:max-w-[4rem] sm:[&>span]:max-w-none">
                  <Layers className="w-3 h-3 mr-1 text-muted-foreground shrink-0" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50 max-h-60">
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Country Flags - Horizontal scroll on mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 flex-1 sm:flex-initial sm:max-w-none scrollbar-hide">
                <TooltipProvider>
                  {(macroRegionFilter ? filteredCountries.slice(0, 6) : countries.slice(0, 6)).map(country => (
                    <Tooltip key={country.code} delayDuration={300}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleCountryChange(country.code)}
                          className={`flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-lg text-sm transition-all shrink-0 touch-manipulation ${
                            countryFilter === country.code
                              ? 'bg-primary text-primary-foreground ring-2 ring-primary/50' 
                              : 'bg-secondary/80 hover:bg-secondary'
                          }`}
                          aria-label={`Filter by ${country.name}`}
                          aria-pressed={countryFilter === country.code}
                        >
                          {country.flag}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {country.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {!macroRegionFilter && (
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleCountryChange('ALL')}
                          className={`flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-lg transition-all shrink-0 touch-manipulation ${
                            countryFilter === 'ALL'
                              ? 'bg-primary text-primary-foreground ring-2 ring-primary/50' 
                              : 'bg-secondary/80 hover:bg-secondary'
                          }`}
                          aria-label="Show all countries"
                          aria-pressed={countryFilter === 'ALL'}
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        All Countries
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            </div>
            
            {/* Quick Stats - Ultra compact */}
            <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground overflow-x-auto scrollbar-hide px-1">
              <span className="flex items-center gap-0.5 shrink-0">
                <Users className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.tribeCount}</strong>
                <span className="hidden sm:inline">tribes</span>
              </span>
              <span className="flex items-center gap-0.5 shrink-0">
                <TrendingUp className="w-3 h-3 text-primary" />
                <strong className="text-foreground">~{formatPopulation(countryStats.population)}</strong>
              </span>
              <span className="flex items-center gap-0.5 shrink-0 hidden min-[380px]:flex">
                <MapPin className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.regionCount}</strong>
              </span>
              <span className="flex items-center gap-0.5 shrink-0 hidden sm:flex">
                <Languages className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.languageCount || '?'}</strong>
              </span>
            </div>
            
            {/* Active Filters + Clear Filters Row */}
            {hasFilters && (
              <div className="flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between mt-2 sm:mt-3 p-2 sm:p-2.5 bg-secondary/50 rounded-lg" role="region" aria-label="Active filters">
                <div className="flex flex-nowrap items-center gap-1.5 min-w-0 overflow-x-auto pb-0.5 -mx-0.5 px-0.5 scrollbar-hide min-[480px]:flex-wrap min-[480px]:overflow-x-visible min-[480px]:pb-0">
                  <span className="text-xs text-muted-foreground shrink-0">Active:</span>
                  {macroRegionFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <Globe className="w-3 h-3" aria-hidden="true" />
                      {macroRegions.find(r => r.id === macroRegionFilter)?.name || macroRegionFilter}
                      <button 
                        onClick={() => handleMacroRegionChange('')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label={`Remove ${macroRegions.find(r => r.id === macroRegionFilter)?.name || 'region'} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {countryFilter && countryFilter !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <span className="text-sm">{countries.find(c => c.code === countryFilter)?.flag}</span>
                      {countries.find(c => c.code === countryFilter)?.name || countryFilter}
                      <button 
                        onClick={() => handleCountryChange('ALL')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label={`Remove ${countries.find(c => c.code === countryFilter)?.name || 'country'} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {regionFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <Layers className="w-3 h-3" aria-hidden="true" />
                      {regionFilter}
                      <button 
                        onClick={() => handleRegionChange('')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label={`Remove ${regionFilter} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <Search className="w-3 h-3" aria-hidden="true" />
                      "{searchQuery}"
                      <button 
                        onClick={() => {
                          setLocalSearch('');
                          const params = new URLSearchParams(searchParams);
                          params.delete('search');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label="Remove search filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {sortOrder && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <ArrowUpDown className="w-3 h-3" aria-hidden="true" />
                      {sortOrder === 'pop-asc' ? 'Pop ↑' : sortOrder === 'pop-desc' ? 'Pop ↓' : sortOrder === 'name-asc' ? 'A-Z' : 'Z-A'}
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('sort');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label="Remove sort filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCountries.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <span className="flex items-center gap-0.5">
                        {selectedCountries.slice(0, 3).map(code => (
                          <span key={code} className="text-sm">{countries.find(c => c.code === code)?.flag}</span>
                        ))}
                        {selectedCountries.length > 3 && <span className="text-xs">+{selectedCountries.length - 3}</span>}
                      </span>
                      {selectedCountries.length} countries
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('countries');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label="Remove countries filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {languageFamilyFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      <Languages className="w-3 h-3" aria-hidden="true" />
                      <span className="max-w-[120px] truncate">{languageFamilyFilter}</span>
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('languageFamily');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-1 touch-manipulation"
                        aria-label={`Remove ${languageFamilyFilter} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap" aria-live="polite">
                    ({filteredTribes.length}/{tribes.length})
                  </span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline touch-manipulation py-2 px-2 min-h-[44px] min-[480px]:min-h-0 flex items-center justify-center gap-1 shrink-0 self-end min-[480px]:self-auto rounded-md hover:bg-primary/10 w-full min-[480px]:w-auto"
                  aria-label="Clear all filters"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              </div>
            )}
          </section>
          
          {/* Map View */}
          {viewMode === 'map' && (
            <section className="mb-8 animate-fade-in" aria-label="Tribes map">
              <DynamicMapView 
                tribes={filteredTribes} 
                countryFilter={countryFilter || 'KE'}
              />
            </section>
          )}
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <section aria-label="List of African tribes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredTribes.map((tribe, index) => (
                <article 
                  key={tribe.id}
                  className="animate-fade-in content-auto-sm"
                  style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
                >
                  <TribeCard tribe={tribe} />
                </article>
              ))}
            </section>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <section aria-label="List of African tribes" className="space-y-2">
              {filteredTribes.map((tribe, index) => {
                const tribeCountries = tribe.countries || ['KE'];
                return (
                  <Link
                    key={tribe.id}
                    to={`/learn/${tribe.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group content-auto-sm"
                  >
                    {/* Flags */}
                    <div className="flex -space-x-1 w-10 flex-shrink-0">
                      {tribeCountries.slice(0, 2).map((code: string) => {
                        const country = countries.find(c => c.code === code);
                        return country ? (
                          <CountryFlag key={code} code={code} size={20} label={country.name} />
                        ) : null;
                      })}
                      {tribeCountries.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{tribeCountries.length - 2}</span>
                      )}
                    </div>

                    {/* Name & Region */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {tribe.name}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {tribe.region}
                      </p>
                    </div>

                    {/* Population */}
                    {tribe.population && (
                    <div className="text-right hidden sm:block">
                      <span className="text-sm font-medium text-foreground">{tribe.population}</span>
                      <p className="text-xs text-muted-foreground">population</p>
                    </div>
                    )}

                    {/* Badges */}
                    <div className="hidden md:flex gap-1">
                      {(tribe.stereotypes || []).slice(0, 1).map((s, i) => (
                        <span key={i} className="badge-tribe text-xs">{s}</span>
                      ))}
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                );
              })}
            </section>
          )}
          
          {filteredTribes.length === 0 && (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="max-w-md mx-auto">
                <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">No tribes match your filters</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No results for "${searchQuery.slice(0, 40)}${searchQuery.length > 40 ? '…' : ''}". Try a different spelling or broader search.`
                    : 'The current combination of filters returned no results. Try removing some filters or broadening your search.'}
                </p>
                {searchQuery.trim().length >= 2 && (
                  <CrossSectionSearchHints query={searchQuery} className="max-w-xl" />
                )}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Clear all filters
                  </button>
                  <Link 
                    to="/random"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                  >
                    Try a random tribe
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
