import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { getAllTribes, getCountries } from '@/lib/tribeDetection';
import { ChevronRight, Users, MapPin, Globe, ArrowUpDown } from 'lucide-react';
import { CountryFlag } from '@/components/CountryFlag';
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
    
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(tribe => 
        tribe.countries?.some(code => selectedCountries.includes(code))
      );
    }
    
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
                  <span className="flex items-center gap-1">
                    {selectedCountries.slice(0, 2).map(code => (
                      <CountryFlag key={code} code={code} size={14} />
                    ))}
                    {selectedCountries.length > 2 && <span>+{selectedCountries.length - 2}</span>}
                  </span>
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
                  <span className="flex items-center gap-2">
                    <CountryFlag code={country.code} size={14} label={country.name} />
                    {country.name}
                  </span>
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
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
              >
                <CountryFlag code={code} size={12} label={country?.name} />
                {country?.name}
                <span className="ml-0.5">×</span>
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
            <CarouselItem key={tribe.id} className="pl-2 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <Link
                to={`/learn/${tribe.slug}`}
                className="block group h-full"
              >
                <div className="card-landing-tile flex flex-col min-h-[148px] sm:min-h-[156px] p-4 sm:p-5 h-full">
                  <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base leading-snug line-clamp-2 pr-1">
                    {tribe.name}
                  </h3>
                  <div className="mt-3 space-y-2 text-xs text-muted-foreground flex-1">
                    <p className="flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden />
                      <span className="line-clamp-2">{tribe.region || 'Africa'}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
                      <span className="line-clamp-1">{tribe.population || '—'}</span>
                    </p>
                  </div>
                  {tribe.countries && tribe.countries.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/80 flex flex-wrap items-center gap-1 justify-end">
                      {tribe.countries.slice(0, 4).map((code) => (
                        <CountryFlag key={code} code={code} size={14} label={code} />
                      ))}
                      {tribe.countries.length > 4 && (
                        <span className="text-[10px] text-muted-foreground">+{tribe.countries.length - 4}</span>
                      )}
                    </div>
                  )}
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
