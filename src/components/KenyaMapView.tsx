import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Compass, Info, ZoomIn, ZoomOut } from 'lucide-react';

interface Tribe {
  id: string;
  name: string;
  slug: string;
  region: string;
  population: string;
  populationPercent: string;
  mapCoordinates: { lat: number; lng: number };
  counties: string[];
}

interface KenyaMapViewProps {
  tribes: Tribe[];
  selectedTribe?: string;
  onTribeSelect?: (slug: string) => void;
}

export function KenyaMapView({ tribes, selectedTribe, onTribeSelect }: KenyaMapViewProps) {
  const [hoveredTribe, setHoveredTribe] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  
  // Convert lat/lng to SVG coordinates (Kenya bounds: lat 5 to -5, lng 34 to 42)
  const coordToSvg = (lat: number, lng: number) => {
    const x = ((lng - 33.5) / 9) * 360 + 20;
    const y = ((5 - lat) / 10.5) * 450 + 10;
    return { x, y };
  };
  
  const kenyaOutline = `
    M 180,30 
    C 200,25 240,30 280,50
    C 320,70 350,100 360,150
    C 370,200 365,250 350,300
    C 335,350 300,390 260,420
    C 220,450 170,460 140,450
    C 100,440 70,420 50,380
    C 30,340 25,290 30,240
    C 35,190 50,140 80,100
    C 110,60 150,35 180,30
    Z
  `;
  
  const features = {
    lakeVictoria: { cx: 60, cy: 260, rx: 45, ry: 55 },
    lakeTurkana: { cx: 150, cy: 60, rx: 15, ry: 40 },
    mtKenya: { x: 230, y: 200 },
    indianOcean: { x: 340, y: 350, width: 80, height: 150 },
  };
  
  const activeId = hoveredTribe || selectedTribe;
  const activeTribe = tribes.find(t => t.slug === activeId);

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
  };

  const getRegionColor = (region: string) => regionColors[region] || 'hsl(var(--primary))';

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Interactive Kenya Map</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{tribes.length} tribes shown</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(z => Math.max(0.8, z - 0.2))}
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(1.5, z + 0.2))}
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Map Area */}
      <div className="relative" style={{ paddingBottom: '85%' }}>
        <svg
          viewBox="0 0 400 480"
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: 'linear-gradient(180deg, hsl(200 70% 92%) 0%, hsl(200 60% 88%) 100%)',
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease'
          }}
        >
          <defs>
            {/* Gradient for Kenya */}
            <linearGradient id="kenyaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(35 45% 75%)" />
              <stop offset="50%" stopColor="hsl(35 50% 70%)" />
              <stop offset="100%" stopColor="hsl(30 40% 65%)" />
            </linearGradient>
            
            {/* Water gradient */}
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(210 80% 70%)" />
              <stop offset="100%" stopColor="hsl(210 70% 55%)" />
            </linearGradient>
            
            {/* Drop shadow */}
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.2" />
            </filter>
            
            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Kenya country outline */}
          <path
            d={kenyaOutline}
            fill="url(#kenyaGradient)"
            stroke="hsl(35 30% 50%)"
            strokeWidth="2.5"
            filter="url(#dropShadow)"
          />
          
          {/* Country border pattern */}
          <path
            d={kenyaOutline}
            fill="none"
            stroke="hsl(35 40% 55%)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
          {/* Lake Victoria */}
          <ellipse
            cx={features.lakeVictoria.cx}
            cy={features.lakeVictoria.cy}
            rx={features.lakeVictoria.rx}
            ry={features.lakeVictoria.ry}
            fill="url(#waterGradient)"
            stroke="hsl(210 50% 50%)"
            strokeWidth="1"
          />
          <text x={features.lakeVictoria.cx} y={features.lakeVictoria.cy + 5} textAnchor="middle" fontSize="8" fill="hsl(210 30% 35%)" fontWeight="500">
            Lake Victoria
          </text>
          
          {/* Lake Turkana */}
          <ellipse
            cx={features.lakeTurkana.cx}
            cy={features.lakeTurkana.cy}
            rx={features.lakeTurkana.rx}
            ry={features.lakeTurkana.ry}
            fill="url(#waterGradient)"
            stroke="hsl(210 50% 50%)"
            strokeWidth="1"
          />
          <text x={features.lakeTurkana.cx} y={features.lakeTurkana.cy} textAnchor="middle" fontSize="7" fill="hsl(210 30% 35%)">
            L. Turkana
          </text>
          
          {/* Indian Ocean */}
          <rect
            x={features.indianOcean.x}
            y={features.indianOcean.y}
            width={features.indianOcean.width}
            height={features.indianOcean.height}
            fill="hsl(200 60% 75%)"
            opacity="0.6"
          />
          <text x={features.indianOcean.x + 10} y={features.indianOcean.y + 40} fontSize="9" fill="hsl(200 40% 40%)" fontWeight="500" writingMode="tb">
            Indian Ocean
          </text>
          
          {/* Mount Kenya */}
          <g transform={`translate(${features.mtKenya.x}, ${features.mtKenya.y})`}>
            <polygon points="0,-15 -12,8 12,8" fill="hsl(120 25% 45%)" stroke="hsl(120 20% 35%)" strokeWidth="1" />
            <polygon points="0,-15 -6,0 6,0" fill="white" opacity="0.8" />
            <text x="0" y="20" textAnchor="middle" fontSize="7" fill="hsl(120 20% 30%)" fontWeight="500">Mt. Kenya</text>
          </g>
          
          {/* Rift Valley Line */}
          <path
            d="M 150,20 Q 170,120 200,200 Q 220,280 180,400"
            fill="none"
            stroke="hsl(30 50% 60%)"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          <text x="130" y="150" fontSize="7" fill="hsl(30 40% 45%)" transform="rotate(-75, 130, 150)">
            Rift Valley
          </text>
          
          {/* Tribe Markers */}
          {tribes.map((tribe) => {
            const { x, y } = coordToSvg(tribe.mapCoordinates.lat, tribe.mapCoordinates.lng);
            const isActive = tribe.slug === activeId;
            const popPercent = parseInt(tribe.populationPercent);
            const radius = Math.max(8, Math.min(20, popPercent * 1.1));
            const color = getRegionColor(tribe.region);
            
            return (
              <Link key={tribe.id} to={`/learn/${tribe.slug}`}>
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredTribe(tribe.slug)}
                  onMouseLeave={() => setHoveredTribe(null)}
                  onClick={() => onTribeSelect?.(tribe.slug)}
                >
                  {/* Outer pulse ring when active */}
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 12}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Outer glow ring */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius + 5}
                    fill={color}
                    opacity={isActive ? 0.35 : 0.12}
                  />
                  
                  {/* Main marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    stroke="white"
                    strokeWidth={isActive ? 3 : 2}
                    filter={isActive ? 'url(#glow)' : undefined}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  
                  {/* Population percentage */}
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    fontSize={radius > 12 ? "9" : "7"}
                    fontWeight="bold"
                    fill="white"
                    className="pointer-events-none"
                  >
                    {tribe.populationPercent}
                  </text>
                  
                  {/* Tribe name label */}
                  <rect
                    x={x - 30}
                    y={y + radius + 3}
                    width="60"
                    height="15"
                    rx="4"
                    fill={isActive ? color : 'hsl(var(--card))'}
                    stroke={isActive ? 'white' : 'hsl(var(--border))'}
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={x}
                    y={y + radius + 13}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="600"
                    fill={isActive ? 'white' : 'hsl(var(--foreground))'}
                    className="pointer-events-none"
                  >
                    {tribe.name.length > 10 ? tribe.name.substring(0, 9) + '…' : tribe.name}
                  </text>
                </g>
              </Link>
            );
          })}
          
          {/* Map Title */}
          <text x="200" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="hsl(var(--foreground))">
            REPUBLIC OF KENYA
          </text>
          <text x="200" y="32" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
            Ethnic Distribution Map
          </text>
          
          {/* Compass Rose */}
          <g transform="translate(360, 50)">
            <circle r="18" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
            <text y="-5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--primary))">N</text>
            <polygon points="0,-12 -3,-4 3,-4" fill="hsl(var(--primary))" />
            <line y1="4" y2="12" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            <text y="17" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">S</text>
            <text x="-12" y="2" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">W</text>
            <text x="12" y="2" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">E</text>
          </g>
          
          {/* Scale bar */}
          <g transform="translate(30, 440)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="60" y1="-4" x2="60" y2="4" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <text x="30" y="12" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">~200 km</text>
          </g>
        </svg>
        
        {/* Hover Info Card */}
        {activeTribe && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64 bg-card/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-lg animate-fade-in">
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm truncate">{activeTribe.name}</h4>
                <p className="text-xs text-muted-foreground">{activeTribe.region}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-xs text-foreground">{activeTribe.population}</span>
                  </div>
                  <span className="text-xs text-primary font-medium">{activeTribe.populationPercent}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {activeTribe.counties.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-secondary/30 border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Map Legend</span>
        </div>
        
        {/* Geographic Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(210 80% 70%)' }} />
            <span className="text-xs text-muted-foreground">Water Body</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5" style={{ background: 'hsl(30 50% 60%)', borderStyle: 'dashed' }} />
            <span className="text-xs text-muted-foreground">Rift Valley</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent" style={{ borderBottomColor: 'hsl(120 25% 45%)' }} />
            <span className="text-xs text-muted-foreground">Mountain</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 rounded">17%</span>
            <span className="text-xs text-muted-foreground">% of Kenya</span>
          </div>
        </div>

        {/* Region Colors */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-2">Regions:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(regionColors).slice(0, 6).map(([region, color]) => (
              <div key={region} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-[10px] text-muted-foreground">{region.replace(' Kenya', '').replace(' (Lake Victoria)', '')}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tribe Quick Links */}
        <div className="flex flex-wrap gap-1.5">
          {tribes.map((tribe) => (
            <Link
              key={tribe.id}
              to={`/learn/${tribe.slug}`}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] transition-all ${
                tribe.slug === activeId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-primary/20 text-foreground border border-border'
              }`}
              onMouseEnter={() => setHoveredTribe(tribe.slug)}
              onMouseLeave={() => setHoveredTribe(null)}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: getRegionColor(tribe.region) }} />
              {tribe.name.length > 12 ? tribe.name.substring(0, 10) + '…' : tribe.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
