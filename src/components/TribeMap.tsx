import { MapPin } from 'lucide-react';

interface TribeMapProps {
  lat: number;
  lng: number;
  tribeName: string;
  counties: string[];
}

export function TribeMap({ lat, lng, tribeName, counties }: TribeMapProps) {
  // Kenya approximate bounds for positioning
  const kenyaBounds = {
    north: 5.0,
    south: -5.0,
    west: 33.5,
    east: 42.0,
  };
  
  // Calculate position as percentage
  const leftPercent = ((lng - kenyaBounds.west) / (kenyaBounds.east - kenyaBounds.west)) * 100;
  const topPercent = ((kenyaBounds.north - lat) / (kenyaBounds.north - kenyaBounds.south)) * 100;
  
  return (
    <div className="bg-secondary rounded-lg p-4">
      <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-sm mx-auto">
        {/* Kenya outline SVG - simplified */}
        <svg 
          viewBox="0 0 200 240" 
          className="w-full h-full"
          aria-label={`Map of Kenya showing ${tribeName} location`}
        >
          {/* Kenya outline */}
          <path
            d="M100 10 L140 20 L160 40 L180 60 L190 100 L185 140 L170 180 L140 210 L100 230 L60 220 L30 190 L20 150 L25 110 L40 70 L60 40 L80 20 Z"
            fill="hsl(var(--earth-light))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          
          {/* Lake Victoria */}
          <ellipse
            cx="45"
            cy="140"
            rx="20"
            ry="25"
            fill="hsl(210 100% 75%)"
            opacity="0.6"
          />
          
          {/* Mount Kenya */}
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          <text x="100" y="85" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
            Mt. Kenya
          </text>
          
          {/* Tribe location marker */}
          <g transform={`translate(${leftPercent * 2}, ${topPercent * 2.4})`}>
            <circle
              r="12"
              fill="hsl(var(--primary))"
              opacity="0.3"
              className="animate-pulse"
            />
            <circle
              r="6"
              fill="hsl(var(--primary))"
            />
          </g>
          
          {/* Label */}
          <text 
            x={leftPercent * 2} 
            y={topPercent * 2.4 + 20} 
            textAnchor="middle" 
            fontSize="10" 
            fontWeight="bold"
            fill="hsl(var(--foreground))"
          >
            {tribeName}
          </text>
          
          {/* Compass */}
          <g transform="translate(170, 30)">
            <text textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--muted-foreground))">N</text>
            <line x1="0" y1="12" x2="0" y2="25" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <polygon points="0,12 -4,18 4,18" fill="hsl(var(--muted-foreground))" />
          </g>
          
          {/* Legend */}
          <g transform="translate(15, 200)">
            <rect width="8" height="8" fill="hsl(var(--primary))" rx="4" />
            <text x="12" y="8" fontSize="8" fill="hsl(var(--muted-foreground))">
              {tribeName} Homeland
            </text>
          </g>
        </svg>
      </div>
      
      <div className="mt-3 text-center">
        <div className="flex items-center justify-center gap-1 text-sm text-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">{tribeName} Region</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Approximate coordinates: {lat.toFixed(2)}°{lat >= 0 ? 'N' : 'S'}, {lng.toFixed(2)}°E
        </p>
      </div>
    </div>
  );
}