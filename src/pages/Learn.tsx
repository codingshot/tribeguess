import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Filter, Users, MapPin, LayoutGrid, Map as MapIcon, Globe, TrendingUp, Languages, Flag, Layers, Info, SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { TribeCard } from '@/components/TribeCard';
import { DynamicMapView } from '@/components/DynamicMapView';
import { getAllTribes, getCountries, getCountryFacts } from '@/lib/tribeDetection';
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

const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const regionFilter = searchParams.get('region') || '';
  const macroRegionFilter = searchParams.get('macroRegion') || '';
  const countryFilter = searchParams.get('country') || 'ALL'; // Default to all countries
  const viewMode = searchParams.get('view') || 'grid';
  const languageFamilyFilter = searchParams.get('languageFamily') || '';
  
  const sortOrder = searchParams.get('sort') || '';
  const selectedCountries = searchParams.get('countries')?.split(',').filter(Boolean) || [];
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [tempSort, setTempSort] = useState(sortOrder);
  const [tempCountries, setTempCountries] = useState<string[]>(selectedCountries);
  
  // Sync localSearch with URL when searchQuery changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Sync temp states when dialog opens
  useEffect(() => {
    if (advancedFiltersOpen) {
      setTempSort(sortOrder);
      setTempCountries(selectedCountries.length > 0 ? selectedCountries : []);
    }
  }, [advancedFiltersOpen]);
  
  const tribes = getAllTribes();
  const countries = getCountries();
  const macroRegions = tribesData.regions || [];

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
      const tribeCountries = (t as any).countries || ['KE'];
      return !countryFilter || countryFilter === 'ALL' || tribeCountries.includes(countryFilter);
    });
    const uniqueRegions = [...new Set(countryTribes.map(t => t.region))];
    return uniqueRegions.sort();
  }, [tribes, countryFilter]);

  // Country-specific stats
  const countryStats = useMemo(() => {
    const countryTribes = tribes.filter(t => {
      const tribeCountries = (t as any).countries || ['KE'];
      return !countryFilter || countryFilter === 'ALL' || tribeCountries.includes(countryFilter);
    });
    
    const population = countryTribes.reduce((acc, t) => {
      const numMatch = t.population.match(/[\d.]+/);
      if (!numMatch) return acc;
      const num = parseFloat(numMatch[0]);
      if (t.population.toLowerCase().includes('million')) {
        return acc + num * 1000000;
      } else if (t.population.toLowerCase().includes('thousand') || t.population.toLowerCase().includes(',000')) {
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
    let result = tribes.filter(tribe => {
      const searchLower = searchQuery.toLowerCase();
      
      // Enhanced search - check more fields
      const matchesSearch = !searchQuery || 
        tribe.name.toLowerCase().includes(searchLower) ||
        tribe.description.toLowerCase().includes(searchLower) ||
        tribe.region.toLowerCase().includes(searchLower) ||
        tribe.stereotypes.some(s => s.toLowerCase().includes(searchLower)) ||
        tribe.commonNames.female.some(n => n.toLowerCase().includes(searchLower)) ||
        tribe.commonNames.male.some(n => n.toLowerCase().includes(searchLower)) ||
        (tribe.language?.name?.toLowerCase().includes(searchLower)) ||
        (tribe.funFacts?.some(f => f.toLowerCase().includes(searchLower))) ||
        (tribe.culturalTraits?.some(t => t.toLowerCase().includes(searchLower))) ||
        (tribe.famousPeople?.some(p => p.name.toLowerCase().includes(searchLower)));
      
      const matchesRegion = !regionFilter || tribe.region === regionFilter;
      
      // Filter by language family
      const matchesLanguageFamily = !languageFamilyFilter || 
        (tribe.language?.family?.toLowerCase().includes(languageFamilyFilter.toLowerCase()));
      
      // Filter by country - check if tribe has countries array and includes selected country
      const tribeCountries = (tribe as any).countries || ['KE']; // Default to Kenya if not specified
      
      // Multi-select countries from advanced filter
      let matchesCountry = true;
      if (selectedCountries.length > 0) {
        matchesCountry = tribeCountries.some((code: string) => selectedCountries.includes(code));
      } else if (countryFilter && countryFilter !== 'ALL') {
        matchesCountry = tribeCountries.includes(countryFilter);
      } else if (macroRegionFilter) {
        // When macro region is set, show tribes from any country in that region
        const regionCountryCodes = countries.filter(c => c.region === macroRegionFilter).map(c => c.code);
        matchesCountry = tribeCountries.some((code: string) => regionCountryCodes.includes(code));
      }
      
      return matchesSearch && matchesRegion && matchesCountry && matchesLanguageFamily;
    });

    // Apply sorting
    if (sortOrder === 'pop-asc') {
      result = [...result].sort((a, b) => parsePopulation(a.population) - parsePopulation(b.population));
    } else if (sortOrder === 'pop-desc') {
      result = [...result].sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population));
    } else if (sortOrder === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [tribes, searchQuery, regionFilter, countryFilter, macroRegionFilter, countries, selectedCountries, sortOrder, languageFamilyFilter]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (localSearch) {
      params.set('search', localSearch);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };
  
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
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
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
          <section className="max-w-3xl mx-auto mb-4" aria-label="Search and filters">
            {/* Search Bar + View Toggle + Info - All inline */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative flex-1">
                <label htmlFor="tribe-search" className="sr-only">Search tribes, names, or characteristics</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="tribe-search"
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search tribes, names..."
                  className="input-tribal pl-9 pr-9 text-sm h-9 w-full"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 touch-manipulation"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
              
              {/* View Toggle - Inline with search */}
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => toggleViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'map'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>

              {/* Advanced Filters Button */}
              <Dialog open={advancedFiltersOpen} onOpenChange={setAdvancedFiltersOpen}>
                <DialogTrigger asChild>
                  <button className={`flex items-center justify-center gap-1.5 px-3 h-9 rounded-lg transition-colors flex-shrink-0 ${
                    hasAdvancedFilters 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}>
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-xs font-medium hidden sm:inline">Advanced</span>
                    {hasAdvancedFilters && (
                      <span className="w-2 h-2 rounded-full bg-primary-foreground" />
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
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: '', label: 'Default' },
                          { value: 'pop-desc', label: '👥 Population ↓' },
                          { value: 'pop-asc', label: '👥 Population ↑' },
                          { value: 'name-asc', label: '🔤 Name A-Z' },
                          { value: 'name-desc', label: '🔤 Name Z-A' },
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setTempSort(option.value)}
                            className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                              tempSort === option.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-secondary/50 text-foreground hover:bg-secondary'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Multi-Select Countries */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Flag className="w-4 h-4 text-muted-foreground" />
                        Filter by Countries
                        {tempCountries.length > 0 && (
                          <span className="text-xs text-primary">({tempCountries.length} selected)</span>
                        )}
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                        {countries.map(c => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => toggleTempCountry(c.code)}
                            className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all text-left ${
                              tempCountries.includes(c.code)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-secondary/50 text-foreground hover:bg-secondary'
                            }`}
                          >
                            <span className="text-base">{c.flag}</span>
                            <span className="truncate flex-1">{c.name}</span>
                            {tempCountries.includes(c.code) && (
                              <Check className="w-3 h-3 text-primary flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="flex gap-2 sm:gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearAdvancedFilters}
                      className="flex-1"
                    >
                      Clear
                    </Button>
                    <Button
                      type="button"
                      onClick={applyAdvancedFilters}
                      className="flex-1"
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
                      <button className="flex items-center justify-center gap-1.5 px-2 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0">
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
            
            {/* Country Flags + Macro Region + Region Filter - Under search */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {/* Macro Region Dropdown */}
              <Select value={macroRegionFilter || 'all'} onValueChange={(value) => handleMacroRegionChange(value === 'all' ? '' : value)}>
                <SelectTrigger className="w-32 h-7 text-xs bg-primary/10 border-primary/20 hover:bg-primary/20">
                  <Globe className="w-3 h-3 mr-1 text-primary" />
                  <SelectValue placeholder="All Africa" />
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
                <SelectTrigger className="w-28 h-7 text-xs bg-background">
                  <Layers className="w-3 h-3 mr-1 text-muted-foreground" />
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Country Flags with Tooltips */}
              <TooltipProvider>
                <div className="flex flex-wrap gap-1 justify-center">
                  {(macroRegionFilter ? filteredCountries : countries.slice(0, 8)).map(country => (
                    <Tooltip key={country.code} delayDuration={200}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleCountryChange(country.code)}
                          className={`px-1.5 py-0.5 rounded text-sm font-medium transition-all flex items-center gap-0.5 ${
                            countryFilter === country.code
                              ? 'bg-primary text-primary-foreground ring-2 ring-primary/30' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          <span>{country.flag}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {country.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {!macroRegionFilter && (
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleCountryChange('ALL')}
                          className={`px-1.5 py-0.5 rounded text-sm font-medium transition-all ${
                            countryFilter === 'ALL'
                              ? 'bg-primary text-primary-foreground ring-2 ring-primary/30' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        All Countries
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TooltipProvider>
            </div>
            
            {/* Quick Stats - Compact inline below filters */}
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.tribeCount}</strong> tribes
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <strong className="text-foreground">~{formatPopulation(countryStats.population)}</strong>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.regionCount}</strong> regions
              </span>
              <span className="flex items-center gap-1">
                <Languages className="w-3 h-3 text-primary" />
                <strong className="text-foreground">{countryStats.languageCount || '?'}</strong> languages
              </span>
            </div>
            
            {/* Active Filters + Clear Filters Row */}
            {hasFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 p-2 bg-secondary/50 rounded-lg">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-muted-foreground mr-1">Active:</span>
                  {macroRegionFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Globe className="w-3 h-3" />
                      {macroRegions.find(r => r.id === macroRegionFilter)?.name || macroRegionFilter}
                      <button 
                        onClick={() => handleMacroRegionChange('')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {countryFilter && countryFilter !== 'ALL' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Flag className="w-3 h-3" />
                      {countries.find(c => c.code === countryFilter)?.name || countryFilter}
                      <button 
                        onClick={() => handleCountryChange('ALL')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {regionFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Layers className="w-3 h-3" />
                      {regionFilter}
                      <button 
                        onClick={() => handleRegionChange('')}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Search className="w-3 h-3" />
                      "{searchQuery}"
                      <button 
                        onClick={() => {
                          setLocalSearch('');
                          const params = new URLSearchParams(searchParams);
                          params.delete('search');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {sortOrder && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <ArrowUpDown className="w-3 h-3" />
                      {sortOrder === 'pop-asc' ? 'Pop ↑' : sortOrder === 'pop-desc' ? 'Pop ↓' : sortOrder === 'name-asc' ? 'A-Z' : 'Z-A'}
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('sort');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {selectedCountries.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Flag className="w-3 h-3" />
                      {selectedCountries.length} countries
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('countries');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  {languageFamilyFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                      <Languages className="w-3 h-3" />
                      {languageFamilyFilter}
                      <button 
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.delete('languageFamily');
                          setSearchParams(params);
                        }}
                        className="ml-0.5 hover:bg-primary/30 rounded-full p-0.5"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({filteredTribes.length} of {tribes.length})
                  </span>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline touch-manipulation py-1 flex items-center gap-1"
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
            <section aria-label="List of Kenyan tribes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredTribes.map((tribe, index) => (
                <article 
                  key={tribe.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TribeCard tribe={tribe} />
                </article>
              ))}
            </section>
          )}
          
          {filteredTribes.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-muted-foreground mb-2 text-sm sm:text-base">No tribes found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline touch-manipulation p-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-border mt-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TribeGuess. Educational entertainment about Kenyan tribes.
        </p>
      </footer>
    </div>
  );
};

export default Learn;
