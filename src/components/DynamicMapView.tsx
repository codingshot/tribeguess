import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Compass, Info, ExternalLink, Globe, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
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

// Country bounding boxes for proper framing (minLat, maxLat, minLng, maxLng)
const countryBounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number; name: string }> = {
  'KE': { minLat: -4.7, maxLat: 4.6, minLng: 33.9, maxLng: 41.9, name: 'Kenya' },
  'TZ': { minLat: -11.7, maxLat: -1.0, minLng: 29.3, maxLng: 40.4, name: 'Tanzania' },
  'UG': { minLat: -1.5, maxLat: 4.2, minLng: 29.5, maxLng: 35.0, name: 'Uganda' },
  'RW': { minLat: -2.8, maxLat: -1.0, minLng: 28.8, maxLng: 30.9, name: 'Rwanda' },
  'BI': { minLat: -4.5, maxLat: -2.3, minLng: 29.0, maxLng: 30.8, name: 'Burundi' },
  'SS': { minLat: 3.5, maxLat: 12.2, minLng: 24.0, maxLng: 35.9, name: 'South Sudan' },
  'ET': { minLat: 3.4, maxLat: 14.9, minLng: 33.0, maxLng: 48.0, name: 'Ethiopia' },
  'SO': { minLat: -1.7, maxLat: 12.0, minLng: 40.9, maxLng: 51.4, name: 'Somalia' },
  'ER': { minLat: 12.3, maxLat: 18.0, minLng: 36.4, maxLng: 43.1, name: 'Eritrea' },
  'DJ': { minLat: 10.9, maxLat: 12.7, minLng: 41.7, maxLng: 43.4, name: 'Djibouti' },
  'CD': { minLat: -13.5, maxLat: 5.4, minLng: 12.2, maxLng: 31.3, name: 'DR Congo' },
  'NG': { minLat: 4.2, maxLat: 13.9, minLng: 2.7, maxLng: 14.7, name: 'Nigeria' },
  'GH': { minLat: 4.7, maxLat: 11.2, minLng: -3.3, maxLng: 1.2, name: 'Ghana' },
  'SN': { minLat: 12.3, maxLat: 16.7, minLng: -17.5, maxLng: -11.4, name: 'Senegal' },
  'GM': { minLat: 13.0, maxLat: 13.8, minLng: -16.8, maxLng: -13.8, name: 'Gambia' },
  'ZA': { minLat: -34.8, maxLat: -22.1, minLng: 16.5, maxLng: 32.9, name: 'South Africa' },
  'ZW': { minLat: -22.4, maxLat: -15.6, minLng: 25.2, maxLng: 33.1, name: 'Zimbabwe' },
  'ZM': { minLat: -18.1, maxLat: -8.2, minLng: 21.9, maxLng: 33.7, name: 'Zambia' },
  'BW': { minLat: -26.9, maxLat: -17.8, minLng: 19.9, maxLng: 29.4, name: 'Botswana' },
  'NA': { minLat: -28.9, maxLat: -17.0, minLng: 11.7, maxLng: 25.3, name: 'Namibia' },
  'MW': { minLat: -17.1, maxLat: -9.4, minLng: 32.7, maxLng: 35.9, name: 'Malawi' },
  'CM': { minLat: 1.6, maxLat: 13.1, minLng: 8.5, maxLng: 16.2, name: 'Cameroon' },
  'BF': { minLat: 9.4, maxLat: 15.1, minLng: -5.5, maxLng: 2.4, name: 'Burkina Faso' },
  'CI': { minLat: 4.3, maxLat: 10.7, minLng: -8.6, maxLng: -2.5, name: 'Côte d\'Ivoire' },
  'ML': { minLat: 10.1, maxLat: 25.0, minLng: -12.2, maxLng: 4.2, name: 'Mali' },
  'AO': { minLat: -18.0, maxLat: -4.4, minLng: 11.6, maxLng: 24.1, name: 'Angola' },
  'MZ': { minLat: -26.9, maxLat: -10.5, minLng: 30.2, maxLng: 40.8, name: 'Mozambique' },
  'MG': { minLat: -25.6, maxLat: -11.9, minLng: 43.2, maxLng: 50.5, name: 'Madagascar' },
  'ALL': { minLat: -35.0, maxLat: 37.0, minLng: -18.0, maxLng: 52.0, name: 'Africa' },
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
  if (regionColors[region]) return regionColors[region];
  for (const [key, color] of Object.entries(regionColors)) {
    if (region.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return color;
    }
  }
  return 'hsl(var(--primary))';
};

export function DynamicMapView({ tribes, selectedTribe, onTribeSelect, countryFilter = 'KE' }: DynamicMapViewProps) {
  const [hoveredTribe, setHoveredTribe] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = default, higher = zoomed in

  const allCountries = getCountries();
  const baseBounds = countryBounds[countryFilter] || countryBounds['KE'];
  const countryInfo = allCountries.find(c => c.code === countryFilter);

  // Reset zoom when country changes
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  // Compute base bounds (before zoom)
  const baseBoundsComputed = useMemo(() => {
    if (countryFilter && countryFilter !== 'ALL' && countryBounds[countryFilter]) {
      const b = countryBounds[countryFilter];
      const latPad = (b.maxLat - b.minLat) * 0.1;
      const lngPad = (b.maxLng - b.minLng) * 0.1;
      return {
        minLat: Math.max(-85, b.minLat - latPad),
        maxLat: Math.min(85, b.maxLat + latPad),
        minLng: Math.max(-180, b.minLng - lngPad),
        maxLng: Math.min(180, b.maxLng + lngPad),
      };
    }

    if (tribes.length > 0) {
      const lats = tribes.map(t => t.mapCoordinates.lat);
      const lngs = tribes.map(t => t.mapCoordinates.lng);

      let minLat = Math.min(...lats);
      let maxLat = Math.max(...lats);
      let minLng = Math.min(...lngs);
      let maxLng = Math.max(...lngs);

      const latRange = Math.max(2, maxLat - minLat);
      const lngRange = Math.max(2, maxLng - minLng);

      const padLat = latRange * 0.2;
      const padLng = lngRange * 0.2;

      return {
        minLat: Math.max(-85, minLat - padLat),
        maxLat: Math.min(85, maxLat + padLat),
        minLng: Math.max(-180, minLng - padLng),
        maxLng: Math.min(180, maxLng + padLng),
      };
    }

    const africa = countryBounds['ALL'];
    return { minLat: africa.minLat, maxLat: africa.maxLat, minLng: africa.minLng, maxLng: africa.maxLng };
  }, [tribes, countryFilter]);

  // Apply zoom to bounds (zoom towards center)
  const osmBounds = useMemo(() => {
    const centerLat = (baseBoundsComputed.minLat + baseBoundsComputed.maxLat) / 2;
    const centerLng = (baseBoundsComputed.minLng + baseBoundsComputed.maxLng) / 2;
    
    const latHalf = (baseBoundsComputed.maxLat - baseBoundsComputed.minLat) / 2 / zoomLevel;
    const lngHalf = (baseBoundsComputed.maxLng - baseBoundsComputed.minLng) / 2 / zoomLevel;

    return {
      minLat: Math.max(-85, centerLat - latHalf),
      maxLat: Math.min(85, centerLat + latHalf),
      minLng: Math.max(-180, centerLng - lngHalf),
      maxLng: Math.min(180, centerLng + lngHalf),
    };
  }, [baseBoundsComputed, zoomLevel]);

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
              {countryInfo?.flag} {baseBounds.name} Tribal Map
            </h3>
            {zoomLevel !== 1 && (
              <span className="text-xs text-muted-foreground ml-2">({Math.round(zoomLevel * 100)}%)</span>
            )}
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
        {/* OpenStreetMap Background - pointer-events disabled to prevent iframe zoom */}
        <iframe
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          title={`Map of ${baseBounds.name} showing tribal distribution`}
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
              <p className="text-sm font-bold text-foreground">{baseBounds.name}</p>
              <p className="text-[10px] text-muted-foreground">Ethnic Distribution</p>
            </div>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="absolute top-3 right-14 flex flex-col gap-1 z-20">
          <button
            onClick={handleZoomIn}
            className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-foreground" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={handleResetZoom}
              className="bg-background/95 backdrop-blur-sm rounded-lg w-8 h-8 flex items-center justify-center shadow-lg border border-border hover:bg-primary/10 transition-colors"
              title="Reset zoom"
            >
              <RotateCcw className="w-4 h-4 text-foreground" />
            </button>
          )}
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
          <span className="text-xs font-medium text-foreground">Tribes in {baseBounds.name}</span>
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
