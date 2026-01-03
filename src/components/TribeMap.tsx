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
  
  // OpenStreetMap embed URL - shows actual geographic context
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 2}%2C${lat - 2}%2C${lng + 2}%2C${lat + 2}&layer=mapnik&marker=${lat}%2C${lng}`;
  
  // Full map link for users who want to explore
  const osmFullUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=8/${lat}/${lng}`;
  
  // Google Maps link as alternative
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=8`;
  
  return (
    <div className="bg-secondary rounded-lg overflow-hidden">
      {/* Interactive Map Embed */}
      <div className="relative aspect-video w-full">
        <iframe
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          title={`Map showing ${tribeName} homeland in ${countryName}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
        
        {/* Overlay with tribe name */}
        <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg border border-border">
          <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {tribeName} Homeland
          </p>
        </div>
        
        {/* Country flag badge */}
        {primaryCountry && (
          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg border border-border">
            <span className="text-lg">{primaryCountry.flag}</span>
          </div>
        )}
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
              {countryName} • {lat.toFixed(2)}°{lat >= 0 ? 'N' : 'S'}, {lng.toFixed(2)}°E
            </p>
          </div>
          
          {/* Map Links */}
          <div className="flex gap-2">
            <a
              href={osmFullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <span>OpenStreetMap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
