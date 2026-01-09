import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Church, Moon, Sparkles, Calendar, MapPin, BookOpen, ChevronRight } from 'lucide-react';
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
}

const religionColors = {
  christianity: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  islam: 'bg-green-500/20 text-green-400 border-green-500/30',
  traditional: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
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

export default function ReligionTimeline() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedReligion, setSelectedReligion] = useState<string>('all');

  // Extract religion timeline events from tribes data
  const timelineEvents = useMemo(() => {
    const events: ReligionEvent[] = [];

    tribesData.tribes.forEach((tribe: any) => {
      if (tribe.traditionalReligion?.religiousHistory) {
        const history = tribe.traditionalReligion.religiousHistory;
        
        // Determine region from countries
        let region = 'East Africa';
        if (tribe.countries?.includes('NG') || tribe.countries?.includes('GH') || tribe.countries?.includes('SN')) {
          region = 'West Africa';
        } else if (tribe.countries?.includes('ZA') || tribe.countries?.includes('ZW') || tribe.countries?.includes('ZM') || tribe.countries?.includes('BW')) {
          region = 'Southern Africa';
        } else if (tribe.countries?.includes('CD') || tribe.countries?.includes('CG') || tribe.countries?.includes('CM')) {
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
            source: history.sources?.[0]
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
            source: history.sources?.[0]
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
        source: 'Ethiopian Orthodox Church tradition'
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
        source: 'Wikipedia - Islamic conquest of Egypt'
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
        source: 'Britannica - Swahili culture'
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
        source: 'Trimingham - History of Islam in West Africa'
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
        source: 'Britannica - Almoravid dynasty'
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
        source: 'Wikipedia - Christianity in South Africa'
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
        source: 'Last, Murray - The Sokoto Caliphate'
      }
    ];

    return [...events, ...historicalEvents].sort((a, b) => a.year - b.year);
  }, []);

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter(event => {
      if (selectedRegion !== 'all' && event.region !== selectedRegion) return false;
      if (selectedReligion !== 'all' && event.religion !== selectedReligion) return false;
      return true;
    });
  }, [timelineEvents, selectedRegion, selectedReligion]);

  const regions = ['all', 'East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'Horn of Africa', 'North Africa'];

  // Group events by century for timeline visualization
  const eventsByCentury = useMemo(() => {
    const centuries: Record<string, ReligionEvent[]> = {};
    filteredEvents.forEach(event => {
      const century = Math.floor(event.year / 100) * 100;
      const centuryLabel = century < 100 ? '1st century' : 
                          century < 1000 ? `${Math.floor(century/100) + 1}th century` :
                          `${Math.floor(century/100) + 1}th century`;
      if (!centuries[centuryLabel]) centuries[centuryLabel] = [];
      centuries[centuryLabel].push(event);
    });
    return centuries;
  }, [filteredEvents]);

  return (
    <>
      <Helmet>
        <title>Religion Timeline in Africa | Spread of Christianity & Islam</title>
        <meta name="description" content="Interactive timeline showing when Christianity, Islam, and traditional religions spread across African regions and tribes." />
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
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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

        {/* Timeline */}
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
