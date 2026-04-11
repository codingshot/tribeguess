import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { ChevronRight, Users, MapPin, Globe, SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Tribe {
  id: string;
  slug: string;
  name: string;
  region: string;
  population: string;
  countries?: string[];
}

type SortOption = 'population' | 'name' | 'region';

export const TopTribesCarousel = memo(function TopTribesCarousel() {
  const allTribes = getAllTribes() as Tribe[];
  const countries = getCountries();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('population');
  
  const countryFlags: Record<string, string> = {
    KE: '🇰🇪', NG: '🇳🇬', GH: '🇬🇭', ZA: '🇿🇦', ET: '🇪🇹', TZ: '🇹🇿', 
    UG: '🇺🇬', CD: '🇨🇩', SN: '🇸🇳', ER: '🇪🇷', RW: '🇷🇼', CM: '🇨🇲',
    ZW: '🇿🇼', ZM: '🇿🇲', MW: '🇲🇼', AO: '🇦🇴', MZ: '🇲🇿', BW: '🇧🇼',
    NA: '🇳🇦', SS: '🇸🇸', SD: '🇸🇩', ML: '🇲🇱', BF: '🇧🇫', CI: '🇨🇮',
    SO: '🇸🇴', BI: '🇧🇮', CG: '🇨🇬', TG: '🇹🇬', BJ: '🇧🇯', LS: '🇱🇸'
  };

  // Parse population for sorting
  const parsePopulation = (pop: string): number => {
    const match = pop.match(/~?([\d.]+)\s*(million|M)?/i);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    if (match[2]?.toLowerCase().startsWith('m')) return num * 1000000;
    return num;
  };

  // Filter and sort tribes
  const displayedTribes = useMemo(() => {
    let filtered = [...allTribes];
    
    // Filter by selected countries
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(tribe => 
        tribe.countries?.some(code => selectedCountries.includes(code))
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'region':
          return a.region.localeCompare(b.region);
        case 'population':
        default:
          return parsePopulation(b.population) - parsePopulation(a.population);
      }
    });
    
    // Deduplicate by ID (multi-country tribes can appear twice)
    const seen = new Set<string>();
    const deduped = filtered.filter(t => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
    
    return deduped.slice(0, 20);
  }, [allTribes, selectedCountries, sortBy]);

  const toggleCountry = (code: string) => {
    setSelectedCountries(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const clearFilters = () => {
    setSelectedCountries([]);
  };

  // Get popular countries for the dropdown
  const popularCountries = countries.filter(c => 
    ['KE', 'NG', 'GH', 'ZA', 'ET', 'TZ', 'UG', 'CD', 'SN', 'CM', 'ZW', 'RW'].includes(c.code)
  );

  return (
    <section className="mt-10 sm:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
          Top African Tribes
        </h2>
        
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <ArrowUpDown className="w-3 h-3" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border border-border z-50">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={sortBy === 'population'} 
                onCheckedChange={() => setSortBy('population')}
              >
                Population (High → Low)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={sortBy === 'name'} 
                onCheckedChange={() => setSortBy('name')}
              >
                Name (A → Z)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={sortBy === 'region'} 
                onCheckedChange={() => setSortBy('region')}
              >
                Region
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Country Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                {selectedCountries.length > 0 ? (
                  <>
                    {selectedCountries.slice(0, 2).map(code => countryFlags[code] || '🌍').join('')}
                    {selectedCountries.length > 2 && <span>+{selectedCountries.length - 2}</span>}
                  </>
                ) : (
                  <>
                    <Globe className="w-3 h-3" />
                    <span className="hidden sm:inline">All Countries</span>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border border-border z-50 max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {selectedCountries.length > 0 && (
                <>
                  <button 
                    onClick={clearFilters}
                    className="w-full text-left px-2 py-1.5 text-xs text-primary hover:bg-muted rounded"
                  >
                    Clear all filters
                  </button>
                  <DropdownMenuSeparator />
                </>
              )}
              {popularCountries.map(country => (
                <DropdownMenuCheckboxItem
                  key={country.code}
                  checked={selectedCountries.includes(country.code)}
                  onCheckedChange={() => toggleCountry(country.code)}
                >
                  {country.flag} {country.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link 
            to="/learn" 
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View All
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Active filters display */}
      {selectedCountries.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCountries.map(code => {
            const country = countries.find(c => c.code === code);
            return (
              <button
                key={code}
                onClick={() => toggleCountry(code)}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
              >
                {country?.flag} {country?.name}
                <span className="ml-1">×</span>
              </button>
            );
          })}
        </div>
      )}
      
      {displayedTribes.length === 0 ? (
        <div className="text-center py-8 px-4 bg-card border border-border rounded-xl">
          <Users className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">No tribes found for the selected countries.</p>
          <button onClick={clearFilters} className="text-sm text-primary hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
      <Carousel
        opts={{
          align: "start",
          loop: displayedTribes.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {displayedTribes.map((tribe) => (
            <CarouselItem key={tribe.id} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Link
                to={`/learn/${tribe.slug}`}
                className="block group"
              >
                <div className="bg-card border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                  {/* Country Flags */}
                  <div className="flex gap-1 mb-2">
                    {tribe.countries?.slice(0, 3).map((code) => (
                      <span key={code} className="text-lg" title={code}>
                        {countryFlags[code] || '🌍'}
                      </span>
                    ))}
                  </div>
                  
                  {/* Tribe Name */}
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm sm:text-base">
                    {tribe.name}
                  </h3>
                  
                  {/* Region */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="line-clamp-1">{tribe.region || 'Africa'}</span>
                  </div>
                  
                  {/* Population */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span>{tribe.population || 'Population data unavailable'}</span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
      )}
    </section>
  );
});
