import { Link } from 'react-router-dom';
import { getAllTribes } from '@/lib/tribeDetection';
import { ChevronRight, Users, MapPin } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Tribe {
  id: string;
  slug: string;
  name: string;
  region: string;
  population: string;
  countries?: string[];
}

export function TopTribesCarousel() {
  const allTribes = getAllTribes() as Tribe[];
  
  // Get top tribes by sorting by population (parse the ~ number)
  const parsePopulation = (pop: string): number => {
    const match = pop.match(/~?([\d.]+)\s*(million|M)?/i);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    if (match[2]?.toLowerCase().startsWith('m')) return num * 1000000;
    return num;
  };
  
  const topTribes = [...allTribes]
    .sort((a, b) => parsePopulation(b.population) - parsePopulation(a.population))
    .slice(0, 12);

  const countryFlags: Record<string, string> = {
    KE: '🇰🇪', NG: '🇳🇬', GH: '🇬🇭', ZA: '🇿🇦', ET: '🇪🇹', TZ: '🇹🇿', 
    UG: '🇺🇬', CD: '🇨🇩', SN: '🇸🇳', ER: '🇪🇷', RW: '🇷🇼', CM: '🇨🇲',
    ZW: '🇿🇼', ZM: '🇿🇲', MW: '🇲🇼', AO: '🇦🇴', MZ: '🇲🇿', BW: '🇧🇼',
    NA: '🇳🇦', SS: '🇸🇸', SD: '🇸🇩', ML: '🇲🇱', BF: '🇧🇫', CI: '🇨🇮',
    SO: '🇸🇴', BI: '🇧🇮', CG: '🇨🇬', TG: '🇹🇬', BJ: '🇧🇯', LS: '🇱🇸'
  };

  return (
    <section className="mt-10 sm:mt-14">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
          Top African Tribes
        </h2>
        <Link 
          to="/learn" 
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
        >
          View All
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {topTribes.map((tribe) => (
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
                    <span className="line-clamp-1">{tribe.region}</span>
                  </div>
                  
                  {/* Population */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span>{tribe.population}</span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </section>
  );
}
