import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';
import { Church, Moon, Sparkles, Calendar, MapPin, BookOpen, ChevronRight, Map, Clock, Play, Pause, FastForward, Rewind, RotateCcw } from 'lucide-react';
import tribesData from '@/data/tribes.json';

interface ReligionEvent {
  year: number;
  yearDisplay: string;
  religion: 'christianity' | 'islam' | 'traditional';
  region: string;
  tribe: string;
  tribeSlug: string;
  description: string;
  introducedBy?: string;
  source?: string;
  coordinates?: { lat: number; lng: number };
}

const religionColors = {
  christianity: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  islam: 'bg-green-500/20 text-green-400 border-green-500/30',
  traditional: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
};

const religionMarkerColors = {
  christianity: '#3B82F6',
  islam: '#22C55E',
  traditional: '#F59E0B'
};

const religionIcons = {
  christianity: Church,
  islam: Moon,
  traditional: Sparkles
};

const regionColors: Record<string, string> = {
  'East Africa': 'bg-teal-500/20 text-teal-300',
  'West Africa': 'bg-orange-500/20 text-orange-300',
  'Southern Africa': 'bg-purple-500/20 text-purple-300',
  'Central Africa': 'bg-pink-500/20 text-pink-300',
  'North Africa': 'bg-cyan-500/20 text-cyan-300',
  'Horn of Africa': 'bg-rose-500/20 text-rose-300'
};

// Region centers for map display
const regionCenters: Record<string, { lat: number; lng: number }> = {
  'East Africa': { lat: -2, lng: 35 },
  'West Africa': { lat: 10, lng: 0 },
  'Southern Africa': { lat: -25, lng: 25 },
  'Central Africa': { lat: 0, lng: 20 },
  'North Africa': { lat: 28, lng: 15 },
  'Horn of Africa': { lat: 8, lng: 42 }
};

const centuries = [
  { id: '4th-7th', label: '4th-7th Century', range: [300, 699] },
  { id: '8th-11th', label: '8th-11th Century', range: [700, 1099] },
  { id: '12th-15th', label: '12th-15th Century', range: [1100, 1499] },
  { id: '16th-18th', label: '16th-18th Century', range: [1500, 1799] },
  { id: '19th-20th', label: '19th-20th Century', range: [1800, 1999] }
];

// Convert lat/lng to pixel coordinates for the map overlay
// Using Web Mercator projection with Africa-specific bounds
const projectCoordinates = (lat: number, lng: number, bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number }) => {
  // Mercator projection
  const latRad = lat * Math.PI / 180;
  const mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  
  const minLatRad = bounds.minLat * Math.PI / 180;
  const maxLatRad = bounds.maxLat * Math.PI / 180;
  const minMercY = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2));
  const maxMercY = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2));
  
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const y = ((maxMercY - mercatorY) / (maxMercY - minMercY)) * 100;
  
  return { x, y };
};

export default function ReligionTimeline() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedReligion, setSelectedReligion] = useState<string>('all');
  const [selectedCentury, setSelectedCentury] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('map');
  const [timelineYear, setTimelineYear] = useState<number>(300);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(100);
  const [showSpreadLines, setShowSpreadLines] = useState(true);

  // Extract religion timeline events from tribes data
  const timelineEvents = useMemo(() => {
    const events: ReligionEvent[] = [];

    tribesData.tribes.forEach((tribe: any) => {
      if (tribe.traditionalReligion?.religiousHistory) {
        const history = tribe.traditionalReligion.religiousHistory;
        const coordinates = tribe.mapCoordinates;
        
        // Determine region from countries
        let region = 'East Africa';
        if (tribe.countries?.includes('NG') || tribe.countries?.includes('GH') || tribe.countries?.includes('SN')) {
          region = 'West Africa';
        } else if (tribe.countries?.includes('ZA') || tribe.countries?.includes('ZW') || tribe.countries?.includes('ZM') || tribe.countries?.includes('BW')) {
          region = 'Southern Africa';
        } else if (tribe.countries?.includes('CD') || tribe.countries?.includes('CG') || tribe.countries?.includes('CM') || tribe.countries?.includes('AO')) {
          region = 'Central Africa';
        } else if (tribe.countries?.includes('ET') || tribe.countries?.includes('ER') || tribe.countries?.includes('SO')) {
          region = 'Horn of Africa';
        } else if (tribe.countries?.includes('EG') || tribe.countries?.includes('MA') || tribe.countries?.includes('DZ')) {
          region = 'North Africa';
        }

        if (history.christianityIntroduced) {
          const yearMatch = history.christianityIntroduced.match(/\d{3,4}/);
          const year = yearMatch ? parseInt(yearMatch[0]) : 1900;
          events.push({
            year,
            yearDisplay: history.christianityIntroduced,
            religion: 'christianity',
            region,
            tribe: tribe.name,
            tribeSlug: tribe.slug,
            description: history.conversionProcess || 'Christianity introduced through missionary work.',
            introducedBy: history.introducedBy,
            source: history.sources?.[0],
            coordinates
          });
        }

        if (history.islamIntroduced) {
          const yearMatch = history.islamIntroduced.match(/\d{3,4}/);
          const year = yearMatch ? parseInt(yearMatch[0]) : 700;
          events.push({
            year,
            yearDisplay: history.islamIntroduced,
            religion: 'islam',
            region,
            tribe: tribe.name,
            tribeSlug: tribe.slug,
            description: history.conversionProcess || 'Islam spread through trade and scholarship.',
            introducedBy: history.introducedBy,
            source: history.sources?.[0],
            coordinates
          });
        }
      }
    });

    // Add historical events that don't come from tribe data
    const historicalEvents: ReligionEvent[] = [
      {
        year: 330,
        yearDisplay: '4th century CE',
        religion: 'christianity',
        region: 'Horn of Africa',
        tribe: 'Aksumite Empire',
        tribeSlug: 'amhara',
        description: 'King Ezana converts to Christianity, making Aksum one of the first Christian states. Ethiopian Orthodox Church established.',
        introducedBy: 'Frumentius (first Bishop of Aksum)',
        source: 'Ethiopian Orthodox Church tradition',
        coordinates: { lat: 14.12, lng: 38.72 }
      },
      {
        year: 639,
        yearDisplay: '639 CE',
        religion: 'islam',
        region: 'North Africa',
        tribe: 'Copts/Egyptians',
        tribeSlug: 'amazigh',
        description: 'Arab conquest of Egypt begins the Islamization of North Africa.',
        introducedBy: 'Amr ibn al-As',
        source: 'Wikipedia - Islamic conquest of Egypt',
        coordinates: { lat: 30.04, lng: 31.24 }
      },
      {
        year: 700,
        yearDisplay: '7th-8th century',
        religion: 'islam',
        region: 'East Africa',
        tribe: 'Swahili Coast',
        tribeSlug: 'swahili',
        description: 'Arab and Persian traders bring Islam to East African coast. Coastal city-states become Muslim.',
        introducedBy: 'Arab and Persian merchants',
        source: 'Britannica - Swahili culture',
        coordinates: { lat: -4.04, lng: 39.67 }
      },
      {
        year: 1000,
        yearDisplay: '11th century',
        religion: 'islam',
        region: 'West Africa',
        tribe: 'Kanem-Bornu Empire',
        tribeSlug: 'kanuri',
        description: 'Mai Hume accepts Islam, beginning the Islamization of the Lake Chad region.',
        introducedBy: 'Trans-Saharan traders',
        source: 'Trimingham - History of Islam in West Africa',
        coordinates: { lat: 12.0, lng: 15.0 }
      },
      {
        year: 1076,
        yearDisplay: '1076 CE',
        religion: 'islam',
        region: 'West Africa',
        tribe: 'Ghana Empire',
        tribeSlug: 'mandinka',
        description: 'Almoravid conquest spreads Islam in the Western Sahel.',
        introducedBy: 'Almoravid movement',
        source: 'Britannica - Almoravid dynasty',
        coordinates: { lat: 16.0, lng: -8.0 }
      },
      {
        year: 1491,
        yearDisplay: '1491 CE',
        religion: 'christianity',
        region: 'Central Africa',
        tribe: 'Kingdom of Kongo',
        tribeSlug: 'kongo',
        description: 'Manikongo Nzinga a Nkuwu baptized as João I, establishing one of the first Christian kingdoms in sub-Saharan Africa.',
        introducedBy: 'Portuguese Franciscan missionaries',
        source: 'Wikipedia - Kingdom of Kongo',
        coordinates: { lat: -6.27, lng: 14.24 }
      },
      {
        year: 1652,
        yearDisplay: '1652',
        religion: 'christianity',
        region: 'Southern Africa',
        tribe: 'Khoikhoi',
        tribeSlug: 'san',
        description: 'Dutch East India Company arrives at Cape Town, beginning European missionary presence in Southern Africa.',
        introducedBy: 'Dutch Reformed Church',
        source: 'Wikipedia - Christianity in South Africa',
        coordinates: { lat: -33.93, lng: 18.42 }
      },
      {
        year: 1804,
        yearDisplay: '1804',
        religion: 'islam',
        region: 'West Africa',
        tribe: 'Hausa/Fulani',
        tribeSlug: 'hausa',
        description: 'Usman dan Fodio\'s Sokoto Jihad creates the Sokoto Caliphate, fully Islamizing Hausaland.',
        introducedBy: 'Usman dan Fodio',
        source: 'Last, Murray - The Sokoto Caliphate',
        coordinates: { lat: 13.06, lng: 5.24 }
      },
      {
        year: 1877,
        yearDisplay: '1877',
        religion: 'christianity',
        region: 'East Africa',
        tribe: 'Baganda',
        tribeSlug: 'baganda',
        description: 'CMS missionaries arrive in Buganda, leading to religious competition and eventual Uganda Martyrs tragedy.',
        introducedBy: 'Church Missionary Society (Alexander Mackay)',
        source: 'Uganda Martyrs Shrine',
        coordinates: { lat: 0.35, lng: 32.58 }
      }
    ];

    return [...events, ...historicalEvents].sort((a, b) => a.year - b.year);
  }, []);

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter(event => {
      if (selectedRegion !== 'all' && event.region !== selectedRegion) return false;
      if (selectedReligion !== 'all' && event.religion !== selectedReligion) return false;
      if (selectedCentury !== 'all') {
        const century = centuries.find(c => c.id === selectedCentury);
        if (century && (event.year < century.range[0] || event.year > century.range[1])) return false;
      }
      return true;
    });
  }, [timelineEvents, selectedRegion, selectedReligion, selectedCentury]);

  const regions = ['all', 'East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'Horn of Africa', 'North Africa'];

  // Group events by century for timeline visualization
  const eventsByCentury = useMemo(() => {
    const grouped: Record<string, ReligionEvent[]> = {};
    filteredEvents.forEach(event => {
      const century = Math.floor(event.year / 100) * 100;
      const centuryLabel = century < 100 ? '1st century' : 
                          century < 1000 ? `${Math.floor(century/100) + 1}th century` :
                          `${Math.floor(century/100) + 1}th century`;
      if (!grouped[centuryLabel]) grouped[centuryLabel] = [];
      grouped[centuryLabel].push(event);
    });
    return grouped;
  }, [filteredEvents]);

  // Fixed map bounds for Africa
  const mapBounds = { minLng: -20, maxLng: 55, minLat: -35, maxLat: 38 };
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds.minLng},${mapBounds.minLat},${mapBounds.maxLng},${mapBounds.maxLat}&layer=mapnik`;

  // Filter events by timeline year for map animation
  const timelineFilteredEvents = useMemo(() => {
    return filteredEvents.filter(e => e.year <= timelineYear);
  }, [filteredEvents, timelineYear]);

  // Animation effect for timeline slider with variable speed
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating && viewMode === 'map') {
      interval = setInterval(() => {
        setTimelineYear(prev => {
          if (prev >= 2000) {
            setIsAnimating(false);
            return 2000;
          }
          return prev + 10;
        });
      }, animationSpeed);
    }
    return () => clearInterval(interval);
  }, [isAnimating, viewMode, animationSpeed]);

  // Calculate spread lines between events
  const spreadLines = useMemo(() => {
    const lines: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      religion: 'christianity' | 'islam' | 'traditional';
      year: number;
    }> = [];

    const sortedEvents = [...timelineFilteredEvents]
      .filter(e => e.coordinates)
      .sort((a, b) => a.year - b.year);

    // Group by religion
    const byReligion = {
      christianity: sortedEvents.filter(e => e.religion === 'christianity'),
      islam: sortedEvents.filter(e => e.religion === 'islam'),
      traditional: sortedEvents.filter(e => e.religion === 'traditional')
    };

    // Create spread lines connecting chronological events
    Object.entries(byReligion).forEach(([religion, events]) => {
      for (let i = 1; i < events.length; i++) {
        const prev = events[i - 1];
        const curr = events[i];
        if (prev.coordinates && curr.coordinates) {
          const fromPos = projectCoordinates(prev.coordinates.lat, prev.coordinates.lng, mapBounds);
          const toPos = projectCoordinates(curr.coordinates.lat, curr.coordinates.lng, mapBounds);
          lines.push({
            from: fromPos,
            to: toPos,
            religion: religion as 'christianity' | 'islam' | 'traditional',
            year: curr.year
          });
        }
      }
    });

    return lines;
  }, [timelineFilteredEvents, mapBounds]);

  const getCenturyLabel = (year: number) => {
    if (year < 100) return '1st Century';
    if (year < 500) return `${Math.floor(year / 100) + 1}th Century`;
    if (year < 1000) return `${Math.floor(year / 100) + 1}th Century`;
    if (year < 2000) return `${Math.floor(year / 100) + 1}th Century`;
    return '21st Century';
  };

  return (
    <>
      <Helmet>
        <title>Religion Timeline in Africa | Spread of Christianity & Islam</title>
        <meta name="description" content="Interactive timeline and map showing when Christianity, Islam, and traditional religions spread across African regions and tribes." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-br from-primary/10 via-background to-amber-500/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Religious History of <span className="gradient-gold-text">Africa</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore how Christianity, Islam, and indigenous beliefs spread across the continent over millennia
            </p>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Christianity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Islam</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-muted-foreground">Traditional Religions</span>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'timeline' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Clock className="w-4 h-4" />
                Timeline
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Map className="w-4 h-4" />
                Map View
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCentury}
                  onChange={(e) => setSelectedCentury(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Centuries</option>
                  {centuries.map(century => (
                    <option key={century.id} value={century.id}>
                      {century.label}
                    </option>
                  ))}
                </select>
              </div>

              <Tabs value={selectedReligion} onValueChange={setSelectedReligion} className="w-auto">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="christianity" className="flex items-center gap-1">
                    <Church className="w-3 h-3" /> Christian
                  </TabsTrigger>
                  <TabsTrigger value="islam" className="flex items-center gap-1">
                    <Moon className="w-3 h-3" /> Islam
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Map View */}
        {viewMode === 'map' && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              {/* Timeline Slider with Enhanced Controls */}
              <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Reset button */}
                    <button
                      onClick={() => {
                        setIsAnimating(false);
                        setTimelineYear(300);
                      }}
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      title="Reset to 300 CE"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    
                    {/* Slow down */}
                    <button
                      onClick={() => setAnimationSpeed(prev => Math.min(prev + 50, 300))}
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      title="Slow down"
                    >
                      <Rewind className="w-4 h-4" />
                    </button>
                    
                    {/* Play/Pause */}
                    <button
                      onClick={() => {
                        if (isAnimating) {
                          setIsAnimating(false);
                        } else {
                          if (timelineYear >= 2000) setTimelineYear(300);
                          setIsAnimating(true);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      {isAnimating ? (
                        <>
                          <Pause className="w-4 h-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> {timelineYear >= 2000 ? 'Restart' : 'Play'}
                        </>
                      )}
                    </button>
                    
                    {/* Speed up */}
                    <button
                      onClick={() => setAnimationSpeed(prev => Math.max(prev - 50, 50))}
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      title="Speed up"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>

                    <span className="text-sm text-muted-foreground ml-2">
                      Speed: <span className="font-medium text-foreground">{animationSpeed < 100 ? 'Fast' : animationSpeed > 150 ? 'Slow' : 'Normal'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Toggle spread lines */}
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSpreadLines}
                        onChange={(e) => setShowSpreadLines(e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="text-muted-foreground">Show spread paths</span>
                    </label>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Year: </span>
                      <span className="font-bold text-primary text-lg">{timelineYear} CE</span>
                    </div>
                  </div>
                </div>

                {/* Year display bar */}
                <div className="relative mb-2">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                      {getCenturyLabel(timelineYear)} • {timelineFilteredEvents.filter(e => e.coordinates).length} events
                    </span>
                  </div>
                </div>

                <Slider
                  value={[timelineYear]}
                  onValueChange={([val]) => {
                    setTimelineYear(val);
                    if (isAnimating) setIsAnimating(false);
                  }}
                  min={300}
                  max={2000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>300 CE</span>
                  <span>700 CE</span>
                  <span>1100 CE</span>
                  <span>1500 CE</span>
                  <span>1800 CE</span>
                  <span>2000 CE</span>
                </div>

                {/* Era indicators */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {[
                    { label: 'Early Christianity', year: 330, color: 'bg-blue-500/20 text-blue-400' },
                    { label: 'Islamic Expansion', year: 700, color: 'bg-green-500/20 text-green-400' },
                    { label: 'Medieval Period', year: 1100, color: 'bg-amber-500/20 text-amber-400' },
                    { label: 'Colonial Era', year: 1800, color: 'bg-purple-500/20 text-purple-400' }
                  ].map(era => (
                    <button
                      key={era.label}
                      onClick={() => {
                        setIsAnimating(false);
                        setTimelineYear(era.year);
                      }}
                      className={`text-xs px-2 py-1 rounded-full ${era.color} hover:opacity-80 transition-opacity`}
                    >
                      {era.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative bg-muted rounded-xl overflow-hidden border border-border">
                {/* Map */}
                <div className="relative h-[500px] sm:h-[600px]">
                  <iframe
                    src={mapUrl}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ border: 0 }}
                    title="Religion spread map"
                  />
                  
                  {/* Overlay with spread lines and markers */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Spread lines showing religion propagation */}
                      {showSpreadLines && spreadLines
                        .filter(line => line.year <= timelineYear)
                        .map((line, i) => {
                          const color = religionMarkerColors[line.religion];
                          const age = timelineYear - line.year;
                          const opacity = age < 100 ? 0.6 : age < 300 ? 0.4 : 0.2;
                          
                          return (
                            <line
                              key={`spread-${i}`}
                              x1={line.from.x}
                              y1={line.from.y}
                              x2={line.to.x}
                              y2={line.to.y}
                              stroke={color}
                              strokeWidth="0.15"
                              strokeOpacity={opacity}
                              strokeDasharray="0.5,0.3"
                              className={age < 50 ? 'animate-pulse' : ''}
                            />
                          );
                        })}

                      {/* Region influence areas */}
                      {timelineFilteredEvents.filter(e => e.coordinates).map((event, i) => {
                        const { x, y } = projectCoordinates(
                          event.coordinates!.lat, 
                          event.coordinates!.lng, 
                          mapBounds
                        );
                        const color = religionMarkerColors[event.religion];
                        const yearDiff = timelineYear - event.year;
                        
                        // Growing influence radius based on time
                        const baseRadius = 0.8;
                        const maxRadius = 3;
                        const growthTime = 200; // years to reach max
                        const radius = Math.min(baseRadius + (yearDiff / growthTime) * (maxRadius - baseRadius), maxRadius);
                        const opacity = yearDiff < 50 ? 0.3 : yearDiff < 200 ? 0.15 : 0.08;
                        
                        return yearDiff > 0 ? (
                          <circle
                            key={`influence-${event.tribe}-${event.year}-${i}`}
                            cx={x}
                            cy={y}
                            r={radius}
                            fill={color}
                            fillOpacity={opacity}
                            className={yearDiff < 100 ? 'animate-pulse' : ''}
                          />
                        ) : null;
                      })}

                      {/* Event markers */}
                      {timelineFilteredEvents.filter(e => e.coordinates).map((event, i) => {
                        const { x, y } = projectCoordinates(
                          event.coordinates!.lat, 
                          event.coordinates!.lng, 
                          mapBounds
                        );
                        const color = religionMarkerColors[event.religion];
                        
                        // Fade in based on recency
                        const yearDiff = timelineYear - event.year;
                        const opacity = yearDiff < 50 ? 1 : yearDiff < 200 ? 0.9 : 0.7;
                        const markerSize = yearDiff < 100 ? 1.5 : 1.2;
                        
                        return (
                          <g key={`marker-${event.tribe}-${event.year}-${i}`}>
                            {/* Pulse effect for recent events */}
                            {yearDiff < 100 && yearDiff >= 0 && (
                              <>
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="2.5"
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="0.15"
                                  className="animate-ping"
                                  style={{ animationDuration: '2s' }}
                                />
                                <circle
                                  cx={x}
                                  cy={y}
                                  r="1.8"
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="0.1"
                                  className="animate-ping"
                                  style={{ animationDuration: '3s', animationDelay: '0.5s' }}
                                />
                              </>
                            )}
                            {/* Main marker */}
                            <circle
                              cx={x}
                              cy={y}
                              r={markerSize}
                              fill={color}
                              stroke="white"
                              strokeWidth="0.2"
                              style={{ opacity }}
                            />
                            {/* Inner dot for emphasis */}
                            <circle
                              cx={x}
                              cy={y}
                              r="0.4"
                              fill="white"
                              style={{ opacity: opacity * 0.8 }}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Event list overlay */}
                <div className="absolute bottom-0 left-0 right-0 max-h-48 overflow-y-auto bg-background/95 backdrop-blur-sm border-t border-border p-4">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {timelineFilteredEvents.length} Religious Events (by {timelineYear} CE)
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {timelineFilteredEvents.slice(-12).reverse().map((event, i) => {
                      const Icon = religionIcons[event.religion];
                      return (
                        <Link
                          key={`${event.tribe}-${event.year}-${i}`}
                          to={`/learn/${event.tribeSlug}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm pointer-events-auto"
                        >
                          <div className={`p-1 rounded ${religionColors[event.religion]}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-medium truncate">{event.tribe}</p>
                            <p className="text-xs text-muted-foreground">{event.yearDisplay}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {timelineFilteredEvents.length > 12 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Showing most recent 12 events. Use timeline to explore earlier events.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {Object.entries(eventsByCentury).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events found for the selected filters.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-amber-500/50 to-primary/50" />

                {Object.entries(eventsByCentury).map(([century, events], centuryIndex) => (
                  <div key={century} className="mb-12">
                    {/* Century marker */}
                    <div className="relative flex items-center justify-center mb-8">
                      <div className="absolute left-4 sm:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary shadow-lg shadow-primary/30" />
                      <h2 className="ml-12 sm:ml-0 bg-background px-4 font-serif text-xl font-bold text-foreground">
                        {century}
                      </h2>
                    </div>

                    {/* Events */}
                    <div className="space-y-6">
                      {events.map((event, eventIndex) => {
                        const Icon = religionIcons[event.religion];
                        const isEven = eventIndex % 2 === 0;

                        return (
                          <div
                            key={`${event.tribe}-${event.year}`}
                            className={`relative flex ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                          >
                            {/* Timeline dot */}
                            <div className="absolute left-4 sm:left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-background border-2 border-primary z-10" />

                            {/* Content */}
                            <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
                              <Card className="border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                                <CardHeader className="pb-2">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <div className={`p-1.5 rounded-lg ${religionColors[event.religion]}`}>
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <CardTitle className="text-base font-semibold">
                                          <Link 
                                            to={`/learn/${event.tribeSlug}`}
                                            className="hover:text-primary transition-colors"
                                          >
                                            {event.tribe}
                                          </Link>
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {event.yearDisplay}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge variant="outline" className={regionColors[event.region] || 'bg-muted text-muted-foreground'}>
                                      {event.region}
                                    </Badge>
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {event.description}
                                  </p>
                                  {event.introducedBy && (
                                    <p className="text-xs text-muted-foreground/80 italic">
                                      Introduced by: {event.introducedBy}
                                    </p>
                                  )}
                                  {event.source && (
                                    <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      Source: {event.source}
                                    </p>
                                  )}
                                  <Link 
                                    to={`/learn/${event.tribeSlug}`}
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                                  >
                                    Learn more <ChevronRight className="w-3 h-3" />
                                  </Link>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        )}

        {/* Statistics */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-center mb-8">Religious Spread Overview</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="text-center border-blue-500/20">
                <CardContent className="pt-6">
                  <Church className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {timelineEvents.filter(e => e.religion === 'christianity').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Christianity Events</p>
                  <p className="text-xs text-muted-foreground mt-1">Spread from 4th century</p>
                </CardContent>
              </Card>
              <Card className="text-center border-green-500/20">
                <CardContent className="pt-6">
                  <Moon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {timelineEvents.filter(e => e.religion === 'islam').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Islam Events</p>
                  <p className="text-xs text-muted-foreground mt-1">Spread from 7th century</p>
                </CardContent>
              </Card>
              <Card className="text-center border-amber-500/20">
                <CardContent className="pt-6">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                  <p className="text-2xl font-bold text-foreground">
                    {new Set(timelineEvents.map(e => e.region)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Regions Covered</p>
                  <p className="text-xs text-muted-foreground mt-1">Across the continent</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4">
              Explore detailed religious traditions for each tribe
            </p>
            <Link
              to="/religions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Compare Traditional Religions
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
