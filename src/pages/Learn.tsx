import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { TribeCard } from '@/components/TribeCard';
import { TribeDetail } from '@/components/TribeDetail';
import { getAllTribes } from '@/lib/tribeDetection';

const Learn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTribe = searchParams.get('tribe');
  const searchQuery = searchParams.get('search') || '';
  const regionFilter = searchParams.get('region') || '';
  
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  const tribes = getAllTribes();
  
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
    params.delete('tribe'); // Clear tribe selection when searching
    setSearchParams(params);
  };
  
  const handleRegionChange = (region: string) => {
    const params = new URLSearchParams(searchParams);
    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    params.delete('tribe'); // Clear tribe selection when filtering
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
      
      <main className="container mx-auto px-4 py-8">
        {selectedTribe ? (
          <TribeDetail tribeId={selectedTribe} />
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                Learn About <span className="gradient-gold-text">Kenyan Tribes</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Explore the rich cultural diversity of Kenya's ethnic groups, their naming traditions, and cultural characteristics.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto mb-8 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search tribes, names, or characteristics..."
                  className="input-tribal pl-12 pr-12"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  Region:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRegionChange('')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
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
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        regionFilter === region 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
              
              {hasFilters && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredTribes.length} of {tribes.length} tribes
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
            
            {/* Tribe Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTribes.map((tribe, index) => (
                <div 
                  key={tribe.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TribeCard tribe={tribe} />
                </div>
              ))}
            </div>
            
            {filteredTribes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">No tribes found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Learn;
