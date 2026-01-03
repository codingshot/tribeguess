import { MapPin, ExternalLink } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';

interface TribeMapProps {
  lat: number;
  lng: number;
  tribeName: string;
  counties: string[];
  countries?: string[];
}

// Approximate territory sizes based on population and region type (in degrees)
const getTerritorySizeForTribe = (tribeName: string, counties: string[]): { latSpan: number; lngSpan: number } => {
  // Larger tribes with wide distribution
  const largeTerritories: Record<string, { latSpan: number; lngSpan: number }> = {
    'Kikuyu': { latSpan: 1.8, lngSpan: 1.5 },
    'Luhya': { latSpan: 1.5, lngSpan: 1.2 },
    'Kalenjin': { latSpan: 2.5, lngSpan: 2.0 },
    'Luo': { latSpan: 1.8, lngSpan: 1.5 },
    'Kamba': { latSpan: 2.0, lngSpan: 1.8 },
    'Maasai': { latSpan: 3.0, lngSpan: 2.5 },
    'Yoruba': { latSpan: 3.5, lngSpan: 4.0 },
    'Igbo': { latSpan: 2.5, lngSpan: 2.5 },
    'Hausa': { latSpan: 5.0, lngSpan: 6.0 },
    'Zulu': { latSpan: 3.0, lngSpan: 2.5 },
    'Xhosa': { latSpan: 2.5, lngSpan: 2.0 },
    'Ashanti': { latSpan: 2.0, lngSpan: 2.0 },
    'Oromo': { latSpan: 4.0, lngSpan: 4.0 },
    'Amhara': { latSpan: 3.5, lngSpan: 3.0 },
    'Somali': { latSpan: 4.0, lngSpan: 5.0 },
    'Tigrinya': { latSpan: 2.0, lngSpan: 1.5 },
    'Baganda': { latSpan: 2.0, lngSpan: 2.0 },
    'Sukuma': { latSpan: 2.5, lngSpan: 2.5 },
    'Chagga': { latSpan: 1.0, lngSpan: 1.0 },
  };
  
  if (largeTerritories[tribeName]) {
    return largeTerritories[tribeName];
  }
  
  // Default size based on number of counties/regions
  const countyCount = counties.length;
  if (countyCount >= 5) return { latSpan: 2.0, lngSpan: 1.8 };
  if (countyCount >= 3) return { latSpan: 1.5, lngSpan: 1.3 };
  return { latSpan: 1.0, lngSpan: 1.0 };
};

export function TribeMap({ lat, lng, tribeName, counties, countries = ['KE'] }: TribeMapProps) {
  // Get primary country info
  const allCountries = getCountries();
  const primaryCountryCode = countries[0] || 'KE';
  const primaryCountry = allCountries.find(c => c.code === primaryCountryCode);
  const countryName = primaryCountry?.name || 'Kenya';
  
  // Get territory size for this tribe
  const territorySize = getTerritorySizeForTribe(tribeName, counties);
  
  // Calculate bounding box that shows the full territory
  const padding = 0.3; // Extra padding around territory
  const minLat = lat - territorySize.latSpan / 2 - padding;
  const maxLat = lat + territorySize.latSpan / 2 + padding;
  const minLng = lng - territorySize.lngSpan / 2 - padding;
  const maxLng = lng + territorySize.lngSpan / 2 + padding;
  
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik`;
  
  // Full map link for users who want to explore
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=9/${lat}/${lng}`;
  
  // Google Maps link as alternative
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=9`;
  
  return (
    <div className="bg-secondary rounded-lg overflow-hidden">
      {/* Interactive Map with Overlay */}
      <div className="relative aspect-[16/10] sm:aspect-video w-full">
        <iframe
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          title={`Map showing ${tribeName} homeland in ${countryName}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
        
        {/* Territory Region Overlay - covers actual area */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large elliptical territory overlay */}
          <div 
            className="absolute"
            style={{
              top: '15%',
              left: '15%',
              right: '15%',
              bottom: '15%',
              background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
                hsla(var(--primary), 0.35) 0%, 
                hsla(var(--primary), 0.25) 25%, 
                hsla(var(--primary), 0.15) 50%, 
                hsla(var(--primary), 0.08) 70%,
                transparent 100%)`,
              borderRadius: '40%',
            }}
          />
          
          {/* Territory boundary indicator */}
          <div 
            className="absolute border-2 border-primary/50 rounded-[40%]"
            style={{
              top: '18%',
              left: '18%',
              right: '18%',
              bottom: '18%',
              borderStyle: 'dashed',
            }}
          />
          
          {/* Secondary inner territory core */}
          <div 
            className="absolute"
            style={{
              top: '30%',
              left: '30%',
              right: '30%',
              bottom: '30%',
              background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
                hsla(var(--primary), 0.4) 0%, 
                hsla(var(--primary), 0.2) 50%, 
                transparent 100%)`,
              borderRadius: '50%',
            }}
          />
          
          {/* Pulsing center marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/25 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-2 rounded-full bg-primary/35 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 border-2 border-white" />
            </div>
          </div>
        </div>
        
        {/* Overlay with tribe name */}
        <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border z-10">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {tribeName} Territory
          </p>
          <p className="text-[10px] text-muted-foreground">
            ~{Math.round(territorySize.latSpan * territorySize.lngSpan * 111 * 111 * 0.7)} km² region
          </p>
        </div>
        
        {/* Country flag badge */}
        {primaryCountry && (
          <div className="absolute top-2 right-2 bg-background/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-lg border border-border z-10">
            <span className="text-lg">{primaryCountry.flag}</span>
          </div>
        )}
        
        {/* Region label at bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
          {tribeName} Traditional Territory
        </div>
      </div>
      
      {/* Map Info & Links */}
      <div className="p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{tribeName} Region</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {countryName} • {Math.abs(lat).toFixed(2)}°{lat >= 0 ? 'N' : 'S'}, {Math.abs(lng).toFixed(2)}°E
            </p>
          </div>
          
          {/* Map Links */}
          <div className="flex gap-2">
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
            >
              <span>OpenStreetMap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        
        {/* Counties/Regions list */}
        {counties && counties.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1.5">
              Main {primaryCountryCode === 'KE' ? 'Counties' : 'Regions'}:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {counties.slice(0, 6).map((county, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground"
                >
                  {county}
                </span>
              ))}
              {counties.length > 6 && (
                <span className="text-xs text-muted-foreground">
                  +{counties.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Multi-country indicator */}
        {countries && countries.length > 1 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1.5">Also found in:</p>
            <div className="flex flex-wrap gap-1.5">
              {countries.slice(1).map((code) => {
                const country = allCountries.find(c => c.code === code);
                return country ? (
                  <span 
                    key={code} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground"
                  >
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
