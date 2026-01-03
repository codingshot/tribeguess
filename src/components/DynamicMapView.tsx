import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Compass, Info, ExternalLink, Globe } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';

interface Tribe {
  id: string;
  name: string;
  slug: string;
  region: string;
  population: string;
  populationPercent: string;
  mapCoordinates: { lat: number; lng: number };
  counties: string[];
  countries?: string[];
}

interface DynamicMapViewProps {
  tribes: Tribe[];
  selectedTribe?: string;
  onTribeSelect?: (slug: string) => void;
  countryFilter?: string;
}

// Country center coordinates and zoom levels
const countryConfigs: Record<string, { lat: number; lng: number; zoom: number; name: string }> = {
  'KE': { lat: 0.5, lng: 37.5, zoom: 1.5, name: 'Kenya' },
  'TZ': { lat: -6.0, lng: 35.0, zoom: 2.0, name: 'Tanzania' },
  'UG': { lat: 1.5, lng: 32.5, zoom: 1.2, name: 'Uganda' },
  'RW': { lat: -2.0, lng: 29.8, zoom: 0.8, name: 'Rwanda' },
  'BI': { lat: -3.3, lng: 29.9, zoom: 0.8, name: 'Burundi' },
  'SS': { lat: 7.0, lng: 30.0, zoom: 2.5, name: 'South Sudan' },
  'ET': { lat: 9.0, lng: 39.0, zoom: 3.0, name: 'Ethiopia' },
  'SO': { lat: 5.0, lng: 46.0, zoom: 3.0, name: 'Somalia' },
  'CD': { lat: -4.0, lng: 22.0, zoom: 4.0, name: 'DR Congo' },
  'NG': { lat: 9.0, lng: 8.0, zoom: 3.0, name: 'Nigeria' },
  'GH': { lat: 7.5, lng: -1.5, zoom: 1.5, name: 'Ghana' },
  'SN': { lat: 14.5, lng: -14.5, zoom: 1.5, name: 'Senegal' },
  'GM': { lat: 13.5, lng: -15.5, zoom: 0.8, name: 'Gambia' },
  'ZA': { lat: -29.0, lng: 25.0, zoom: 3.5, name: 'South Africa' },
  'ZW': { lat: -19.0, lng: 29.5, zoom: 2.0, name: 'Zimbabwe' },
  'ZM': { lat: -15.0, lng: 28.0, zoom: 2.5, name: 'Zambia' },
  'BW': { lat: -22.0, lng: 24.0, zoom: 2.0, name: 'Botswana' },
  'NA': { lat: -22.0, lng: 17.0, zoom: 2.5, name: 'Namibia' },
  'MW': { lat: -13.5, lng: 34.0, zoom: 1.5, name: 'Malawi' },
  'CM': { lat: 6.0, lng: 12.5, zoom: 2.5, name: 'Cameroon' },
  'BF': { lat: 12.5, lng: -1.5, zoom: 1.5, name: 'Burkina Faso' },
  'ALL': { lat: 0, lng: 20.0, zoom: 15, name: 'Africa' },
};

// Region colors for visual distinction
const regionColors: Record<string, string> = {
  'Central Kenya': 'hsl(120 40% 50%)',
  'Western Kenya': 'hsl(45 70% 55%)',
  'Western Kenya (Lake Victoria)': 'hsl(200 60% 50%)',
  'Rift Valley': 'hsl(30 60% 55%)',
  'Eastern Kenya': 'hsl(280 40% 55%)',
  'Coast': 'hsl(180 50% 50%)',
  'Northern Kenya': 'hsl(15 60% 55%)',
  'Nationwide': 'hsl(340 50% 55%)',
  'Southern Nigeria': 'hsl(160 50% 45%)',
  'Northern Nigeria': 'hsl(40 60% 50%)',
  'Southern Ghana': 'hsl(50 55% 50%)',
  'Southern Africa': 'hsl(200 50% 45%)',
  'Central Africa': 'hsl(100 45% 50%)',
  'East Africa': 'hsl(25 60% 50%)',
  'West Africa': 'hsl(320 45% 50%)',
};

const getRegionColor = (region: string) => {
  // Check for exact match first
  if (regionColors[region]) return regionColors[region];
  // Check for partial matches
  for (const [key, color] of Object.entries(regionColors)) {
    if (region.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return color;
    }
  }
  return 'hsl(var(--primary))';
};

export function DynamicMapView({ tribes, selectedTribe, onTribeSelect, countryFilter = 'KE' }: DynamicMapViewProps) {
  const [hoveredTribe, setHoveredTribe] = useState<string | null>(null);

  const allCountries = getCountries();
  const config = countryConfigs[countryFilter] || countryConfigs['KE'];
  const countryInfo = allCountries.find(c => c.code === countryFilter);

  const osmBounds = useMemo(() => {
    // When a specific country is selected, keep the map framed on that country.
    // (Some tribes span multiple countries but only have one coordinate; framing to tribes
    // can accidentally zoom out to Kenya even when Tanzania is selected.)
    if (countryFilter && countryFilter !== 'ALL') {
      const bbox = config.zoom * 0.9;
      return {
        minLat: Math.max(-85, config.lat - bbox),
        maxLat: Math.min(85, config.lat + bbox),
        minLng: Math.max(-180, config.lng - bbox),
        maxLng: Math.min(180, config.lng + bbox),
      };
    }

    // For ALL (or no country), zoom to visible tribes so filter changes reframe the map.
    if (tribes.length > 0) {
      const lats = tribes.map(t => t.mapCoordinates.lat);
      const lngs = tribes.map(t => t.mapCoordinates.lng);

      let minLat = Math.min(...lats);
      let maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs);
      let maxLng = Math.max(...lngs);

      const latRange = Math.max(0.25, maxLat - minLat);
      const lngRange = Math.max(0.25, maxLng - minLng);

      const padLat = latRange * 0.35;
      const padLng = lngRange * 0.35;

      minLat = Math.max(-85, minLat - padLat);
      maxLat = Math.min(85, maxLat + padLat);
      minLng = Math.max(-180, minLng - padLng);
      maxLng = Math.min(180, maxLng + padLng);

      return { minLat, maxLat, minLng, maxLng };
    }

    const bbox = config.zoom;
    return {
      minLat: Math.max(-85, config.lat - bbox),
      maxLat: Math.min(85, config.lat + bbox),
      minLng: Math.max(-180, config.lng - bbox),
      maxLng: Math.min(180, config.lng + bbox),
    };
  }, [tribes, config, countryFilter]);

  // OpenStreetMap embed URL framed by bounds
  const osmEmbedUrl = useMemo(() => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${osmBounds.minLng}%2C${osmBounds.minLat}%2C${osmBounds.maxLng}%2C${osmBounds.maxLat}&layer=mapnik`;
  }, [osmBounds]);

  const osmFullUrl = `https://www.openstreetmap.org/?bbox=${osmBounds.minLng}%2C${osmBounds.minLat}%2C${osmBounds.maxLng}%2C${osmBounds.maxLat}&layer=mapnik`;

  const activeId = hoveredTribe || selectedTribe;
  const activeTribe = tribes.find(t => t.slug === activeId);

  const toWorldX = (lng: number) => (lng + 180) / 360;
  const toWorldY = (lat: number) => {
    const rad = (lat * Math.PI) / 180;
    return (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2;
  };

  // Convert coordinates to percentage position on the embedded map (Web Mercator like OSM)
  const coordToPercent = (lat: number, lng: number) => {
    const xMin = toWorldX(osmBounds.minLng);
    const xMax = toWorldX(osmBounds.maxLng);
    const yTop = toWorldY(osmBounds.maxLat);
    const yBottom = toWorldY(osmBounds.minLat);

    const left = ((toWorldX(lng) - xMin) / (xMax - xMin)) * 100;
    const top = ((toWorldY(lat) - yTop) / (yBottom - yTop)) * 100;

    return { left, top };
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              {countryInfo?.flag} {config.name} Tribal Map
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{tribes.length} tribes shown</span>
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <span>Full Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Map Area with OSM */}
      <div className="relative" style={{ paddingBottom: '70%' }}>
        {/* OpenStreetMap Background */}
        <iframe
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          title={`Map of ${config.name} showing tribal distribution`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
        
        {/* Tribe Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {tribes.map((tribe, index) => {
            const { left, top } = coordToPercent(tribe.mapCoordinates.lat, tribe.mapCoordinates.lng);
            const isActive = tribe.slug === activeId;
            const popPercent = parseInt(tribe.populationPercent) || 5;
            const size = Math.max(24, Math.min(48, popPercent * 2));
            const color = getRegionColor(tribe.region);
            
            // Skip if outside visible bounds
            if (left < 0 || left > 100 || top < 0 || top > 100) return null;
            
            return (
              <Link
                key={`${tribe.id}-${index}`}
                to={`/learn/${tribe.slug}`}
                className="pointer-events-auto absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                style={{ left: `${left}%`, top: `${top}%` }}
                onMouseEnter={() => setHoveredTribe(tribe.slug)}
                onMouseLeave={() => setHoveredTribe(null)}
                onClick={() => onTribeSelect?.(tribe.slug)}
              >
                {/* Outer pulse ring when active */}
                {isActive && (
                  <div 
                    className="absolute rounded-full bg-primary/30 animate-ping"
                    style={{ 
                      width: size + 16, 
                      height: size + 16,
                      left: -8,
                      top: -8,
                    }}
                  />
                )}
                
                {/* Outer glow */}
                <div 
                  className="absolute rounded-full transition-all duration-200"
                  style={{ 
                    width: size + 8, 
                    height: size + 8,
                    left: -4,
                    top: -4,
                    background: color,
                    opacity: isActive ? 0.4 : 0.2,
                  }}
                />
                
                {/* Main marker */}
                <div 
                  className="rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white transition-all duration-200 group-hover:scale-110"
                  style={{ 
                    width: size, 
                    height: size,
                    background: color,
                    fontSize: size > 32 ? 11 : 9,
                  }}
                >
                  {tribe.populationPercent}
                </div>
                
                {/* Name label */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold shadow-md transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card/95 text-foreground border border-border'
                  }`}
                  style={{ top: size + 4 }}
                >
                  {tribe.name.length > 12 ? tribe.name.substring(0, 10) + '…' : tribe.name}
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Country Label */}
        <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border z-20">
          <div className="flex items-center gap-2">
            {countryInfo && <span className="text-xl">{countryInfo.flag}</span>}
            <div>
              <p className="text-sm font-bold text-foreground">{config.name}</p>
              <p className="text-[10px] text-muted-foreground">Ethnic Distribution</p>
            </div>
          </div>
        </div>
        
        {/* Compass */}
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-border z-20">
          <Compass className="w-5 h-5 text-primary" />
        </div>
        
        {/* Hover Info Card */}
        {activeTribe && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-72 bg-card/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-lg animate-fade-in z-20">
            <div className="flex items-start gap-2">
              <div 
                className="p-1.5 rounded-lg flex-shrink-0"
                style={{ background: getRegionColor(activeTribe.region) + '33' }}
              >
                <MapPin className="w-4 h-4" style={{ color: getRegionColor(activeTribe.region) }} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm truncate">{activeTribe.name}</h4>
                <p className="text-xs text-muted-foreground">{activeTribe.region}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-xs text-foreground">{activeTribe.population}</span>
                  </div>
                  <span 
                    className="text-xs font-medium px-1.5 py-0.5 rounded"
                    style={{ 
                      background: getRegionColor(activeTribe.region) + '22',
                      color: getRegionColor(activeTribe.region)
                    }}
                  >
                    {activeTribe.populationPercent}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  📍 {activeTribe.counties.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend & Quick Links */}
      <div className="p-4 bg-secondary/30 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Tribes in {config.name}</span>
        </div>
        
        {/* Tribe Quick Links */}
        <div className="flex flex-wrap gap-1.5">
          {tribes.map((tribe, index) => (
            <Link
              key={`link-${tribe.id}-${index}`}
              to={`/learn/${tribe.slug}`}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] transition-all ${
                tribe.slug === activeId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-primary/20 text-foreground border border-border'
              }`}
              onMouseEnter={() => setHoveredTribe(tribe.slug)}
              onMouseLeave={() => setHoveredTribe(null)}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ background: getRegionColor(tribe.region) }} 
              />
              {tribe.name.length > 12 ? tribe.name.substring(0, 10) + '…' : tribe.name}
            </Link>
          ))}
        </div>
        
        {tribes.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No tribes found for this region. Try selecting a different country or clearing filters.
          </p>
        )}
      </div>
    </div>
  );
}
