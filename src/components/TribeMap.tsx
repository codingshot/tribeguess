import { MapPin, ExternalLink } from 'lucide-react';
import { getCountries } from '@/lib/tribeDetection';

interface TribeMapProps {
  lat: number;
  lng: number;
  tribeName: string;
  counties: string[];
  countries?: string[];
}

export function TribeMap({ lat, lng, tribeName, counties, countries = ['KE'] }: TribeMapProps) {
  // Get primary country info
  const allCountries = getCountries();
  const primaryCountryCode = countries[0] || 'KE';
  const primaryCountry = allCountries.find(c => c.code === primaryCountryCode);
  const countryName = primaryCountry?.name || 'Kenya';
  
  // Zoomed in bounding box (smaller area = more zoom)
  const zoomLevel = 0.5; // Smaller = more zoomed in
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - zoomLevel}%2C${lat - zoomLevel}%2C${lng + zoomLevel}%2C${lat + zoomLevel}&layer=mapnik&marker=${lat}%2C${lng}`;
  
  // Full map link for users who want to explore
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=10/${lat}/${lng}`;
  
  // Google Maps link as alternative
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=10`;
  
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
        
        {/* Highlighted Region Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial gradient overlay to highlight center region */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 45% 40% at 50% 50%, 
                hsla(var(--primary), 0.25) 0%, 
                hsla(var(--primary), 0.15) 30%, 
                hsla(var(--primary), 0.08) 50%, 
                transparent 70%)`
            }}
          />
          
          {/* Pulsing center marker highlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Outer pulse ring */}
              <div className="absolute -inset-6 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
              {/* Middle ring */}
              <div className="absolute -inset-4 rounded-full bg-primary/30 animate-pulse" />
              {/* Inner solid */}
              <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
            </div>
          </div>
          
          {/* Border frame to show region bounds */}
          <div className="absolute inset-[15%] border-2 border-primary/40 rounded-xl border-dashed" />
        </div>
        
        {/* Overlay with tribe name */}
        <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border z-10">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {tribeName} Homeland
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
