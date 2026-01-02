import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Filter, Users, MapPin, LayoutGrid, Map as MapIcon, Globe, TrendingUp, Languages } from 'lucide-react';
import { Header } from '@/components/Header';
import { TribeCard } from '@/components/TribeCard';
import { KenyaMapView } from '@/components/KenyaMapView';
import { getAllTribes } from '@/lib/tribeDetection';

const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const regionFilter = searchParams.get('region') || '';
  const viewMode = searchParams.get('view') || 'grid';
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const tribes = getAllTribes();
  
  const totalPopulation = useMemo(() => {
    return tribes.reduce((acc, t) => {
      const pop = parseFloat(t.population.replace(/[^0-9.]/g, ''));
      return acc + pop;
    }, 0);
  }, [tribes]);
  
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(tribes.map(t => t.region))];
    return uniqueRegions.sort();
  }, [tribes]);
  
  const filteredTribes = useMemo(() => {
    return tribes.filter(tribe => {
      const matchesSearch = !searchQuery || 
        tribe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tribe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tribe.stereotypes.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tribe.commonNames.female.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tribe.commonNames.male.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRegion = !regionFilter || tribe.region === regionFilter;
      
      return matchesSearch && matchesRegion;
    });
  }, [tribes, searchQuery, regionFilter]);
  
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
  
  const toggleViewMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', mode);
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setLocalSearch('');
    setSearchParams({});
  };
  
  const hasFilters = searchQuery || regionFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="animate-fade-in">
          <header className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              Learn About <span className="gradient-gold-text">Kenyan Tribes</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base px-2">
              Explore the rich cultural diversity of Kenya's ethnic groups, their naming traditions, and cultural characteristics.
            </p>
          </header>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">{tribes.length}</p>
              <p className="text-xs text-muted-foreground">Major Tribes</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">~{totalPopulation.toFixed(0)}M</p>
              <p className="text-xs text-muted-foreground">Total Population</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">{regions.length}</p>
              <p className="text-xs text-muted-foreground">Regions</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <Languages className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg sm:text-2xl font-bold text-primary">68+</p>
              <p className="text-xs text-muted-foreground">Languages</p>
            </div>
          </div>
          
          {/* Fun Facts Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-4 mb-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Did You Know?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Kenya is home to over 40 ethnic groups, each with unique languages, traditions, and naming customs. 
                  The largest 8 tribes make up about 82% of the population. Many Kenyan names reveal not just tribal 
                  identity but also birth circumstances, like time of day, weather, or birth order!
                </p>
              </div>
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
          
          {/* Search and Filters */}
          <section className="max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3 sm:space-y-4" aria-label="Search and filters">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="tribe-search" className="sr-only">Search tribes, names, or characteristics</label>
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <input
                id="tribe-search"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search tribes, names, or characteristics..."
                className="input-tribal pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base"
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
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 touch-manipulation"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Region:</span>
              </div>
              <nav className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Filter by region">
                <button
                  onClick={() => handleRegionChange('')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                    !regionFilter 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All
                </button>
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                      regionFilter === region 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </nav>
            </div>
            
            {hasFilters && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <p className="text-muted-foreground">
                  Showing {filteredTribes.length} of {tribes.length} tribes
                </p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline touch-manipulation p-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
          
          {/* Map View */}
          {viewMode === 'map' && (
            <section className="mb-8 animate-fade-in" aria-label="Kenya tribes map">
              <KenyaMapView tribes={filteredTribes} />
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
