import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Filter, Users, MapPin, LayoutGrid, Map as MapIcon, Globe, TrendingUp, Languages, Flag, Layers, Info } from 'lucide-react';
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

const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const regionFilter = searchParams.get('region') || '';
  const macroRegionFilter = searchParams.get('macroRegion') || '';
  const countryFilter = searchParams.get('country') || (macroRegionFilter ? 'ALL' : 'KE'); // Default to Kenya unless viewing a macro-region
  const viewMode = searchParams.get('view') || 'grid';
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  // Sync localSearch with URL when searchQuery changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);
  
  const tribes = getAllTribes();
  const countries = getCountries();
  const macroRegions = tribesData.regions || [];

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
    return tribes.filter(tribe => {
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
      
      // Filter by country - check if tribe has countries array and includes selected country
      const tribeCountries = (tribe as any).countries || ['KE']; // Default to Kenya if not specified
      
      // If macro region is set but no country, filter by any country in that macro region
      let matchesCountry = true;
      if (countryFilter && countryFilter !== 'ALL') {
        matchesCountry = tribeCountries.includes(countryFilter);
      } else if (macroRegionFilter) {
        // When macro region is set, show tribes from any country in that region
        const regionCountryCodes = countries.filter(c => c.region === macroRegionFilter).map(c => c.code);
        matchesCountry = tribeCountries.some((code: string) => regionCountryCodes.includes(code));
      }
      
      return matchesSearch && matchesRegion && matchesCountry;
    });
  }, [tribes, searchQuery, regionFilter, countryFilter, macroRegionFilter, countries]);
  
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
  
  const hasFilters = searchQuery || regionFilter || macroRegionFilter || (countryFilter && countryFilter !== 'KE');

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
            {/* Macro Region Selector - Dropdown */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Layers className="w-4 h-4" />
              </span>
              <Select value={macroRegionFilter || 'all'} onValueChange={(value) => handleMacroRegionChange(value === 'all' ? '' : value)}>
                <SelectTrigger className="w-48 h-9 text-sm bg-primary/10 border-primary/20 hover:bg-primary/20">
                  <Globe className="w-4 h-4 mr-2 text-primary" />
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
            </div>

            {/* Country Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Flag className="w-4 h-4" />
                Country:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {(macroRegionFilter ? filteredCountries : countries.slice(0, 12)).map(country => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
                      countryFilter === country.code || (!countryFilter && !macroRegionFilter && country.code === 'KE')
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="hidden sm:inline">{country.name}</span>
                  </button>
                ))}
                {!macroRegionFilter && (
                  <button
                    onClick={() => handleCountryChange('ALL')}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      countryFilter === 'ALL'
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    🌍 All
                  </button>
                )}
              </div>
            </div>
          </header>
          
          {/* Quick Stats - Dynamic based on country */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">{countryStats.tribeCount}</p>
              <p className="text-xs text-muted-foreground">Major Tribes</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">~{formatPopulation(countryStats.population)}</p>
              <p className="text-xs text-muted-foreground">Total Population</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">{countryStats.regionCount}</p>
              <p className="text-xs text-muted-foreground">Regions</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <Languages className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">{countryStats.languageCount || '?'}</p>
              <p className="text-xs text-muted-foreground">Languages</p>
            </div>
          </div>
          
          
          {/* View Toggle */}
          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            <button
              onClick={() => toggleViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid View
            </button>
            <button
              onClick={() => toggleViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              Map View
            </button>
          </div>
          
          {/* Search and Filters - Inline Layout */}
          <section className="max-w-3xl mx-auto mb-6 sm:mb-8" aria-label="Search and filters">
            {/* Search + Region + Info Tooltip - All inline */}
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
                  className="input-tribal pl-9 pr-9 text-sm h-10 w-full"
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
              
              {/* Region Filter - Compact */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
                <Select value={regionFilter || 'all'} onValueChange={(value) => handleRegionChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className="w-full sm:w-40 h-10 text-xs sm:text-sm bg-background">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Did You Know - Info Tooltip */}
              {countryFacts.length > 0 && (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <button className="flex items-center justify-center gap-1.5 px-3 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-medium hidden sm:inline">Did you know?</span>
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
            
            {/* Active Filters Summary */}
            {hasFilters && (
              <div className="flex items-center justify-between text-xs mt-2">
                <p className="text-muted-foreground">
                  {filteredTribes.length} of {tribes.length} tribes
                </p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline touch-manipulation py-1"
                >
                  Clear filters
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
