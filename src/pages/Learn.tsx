import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, Filter, Users, MapPin, LayoutGrid, Map as MapIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { TribeCard } from '@/components/TribeCard';
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
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6 sm:mb-8">
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-primary">{tribes.length}</p>
              <p className="text-xs text-muted-foreground">Tribes</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-primary">~{totalPopulation.toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground">People</p>
            </div>
            <div className="text-center p-3 bg-secondary rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-primary">{regions.length}</p>
              <p className="text-xs text-muted-foreground">Regions</p>
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
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                  {/* SVG Map of Kenya */}
                  <svg
                    viewBox="0 0 400 450"
                    className="absolute inset-0 w-full h-full"
                    style={{ background: 'linear-gradient(180deg, hsl(200, 60%, 95%) 0%, hsl(200, 50%, 90%) 100%)' }}
                  >
                    {/* Kenya country shape (simplified) */}
                    <path
                      d="M200 30 L320 80 L350 150 L380 200 L360 280 L320 350 L280 400 L200 420 L120 400 L80 350 L60 280 L50 200 L70 120 L120 60 Z"
                      fill="hsl(35, 60%, 85%)"
                      stroke="hsl(35, 40%, 60%)"
                      strokeWidth="2"
                    />
                    
                    {/* Lake Victoria */}
                    <ellipse cx="80" cy="260" rx="40" ry="50" fill="hsl(200, 60%, 70%)" opacity="0.8" />
                    
                    {/* Mt. Kenya */}
                    <polygon points="230,160 250,130 270,160" fill="hsl(120, 30%, 50%)" />
                    <polygon points="240,145 250,130 260,145" fill="white" />
                    
                    {/* Indian Ocean */}
                    <rect x="340" y="250" width="60" height="200" fill="hsl(200, 60%, 70%)" opacity="0.5" />
                    
                    {/* Tribe markers */}
                    {filteredTribes.map((tribe) => {
                      // Convert lat/lng to SVG coordinates
                      const x = ((tribe.mapCoordinates.lng - 34) / 8) * 300 + 50;
                      const y = ((-tribe.mapCoordinates.lat + 4) / 9) * 400 + 30;
                      
                      return (
                        <Link key={tribe.id} to={`/learn/${tribe.slug}`}>
                          <g className="cursor-pointer group">
                            <circle
                              cx={x}
                              cy={y}
                              r="18"
                              fill="hsl(var(--primary))"
                              opacity="0.3"
                              className="group-hover:opacity-50 transition-opacity"
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r="10"
                              fill="hsl(var(--primary))"
                              stroke="white"
                              strokeWidth="2"
                              className="group-hover:r-12 transition-all"
                            />
                            <text
                              x={x}
                              y={y + 28}
                              textAnchor="middle"
                              fontSize="11"
                              fontWeight="600"
                              fill="hsl(var(--foreground))"
                              className="pointer-events-none"
                            >
                              {tribe.name.split(' ')[0]}
                            </text>
                            <text
                              x={x}
                              y={y + 40}
                              textAnchor="middle"
                              fontSize="9"
                              fill="hsl(var(--muted-foreground))"
                              className="pointer-events-none"
                            >
                              {tribe.populationPercent}
                            </text>
                          </g>
                        </Link>
                      );
                    })}
                    
                    {/* Legend */}
                    <text x="20" y="30" fontSize="14" fontWeight="bold" fill="hsl(var(--foreground))">
                      Kenya Tribes Map
                    </text>
                    <text x="20" y="45" fontSize="10" fill="hsl(var(--muted-foreground))">
                      Click on a tribe to learn more
                    </text>
                  </svg>
                </div>
                
                {/* Map Legend */}
                <div className="p-4 bg-secondary/50 border-t border-border">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {filteredTribes.map((tribe) => (
                      <Link
                        key={tribe.id}
                        to={`/learn/${tribe.slug}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {tribe.name.split(' ')[0]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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
