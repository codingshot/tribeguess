import { useState, useMemo, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, TrendingUp, TrendingDown, Minus, Users, Globe, Calendar,
  Filter, ChevronDown, ArrowRight, Sparkles, BarChart3, LineChart,
  MapPin, Heart, Clock, X, Plus, ArrowUpDown, Wand2, Trophy, Star
} from 'lucide-react';
import {
  AreaChart, Area, LineChart as RechartsLineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  calculatePopularityTrends, 
  analyzeGender, 
  getNameHistory,
  PopularityTrends,
  DecadePopularity,
  RegionalPopularity,
  GenderAnalysis,
  NameHistoryData
} from '@/lib/genderNameAnalysis';
import { NameGenerator } from '@/components/NameGenerator';
import { NameOfTheDay } from '@/components/NameOfTheDay';
import { TopNamesLeaderboard } from '@/components/TopNamesLeaderboard';
import { NameExportButton } from '@/components/NameExportButton';
import { FavoriteNamesList } from '@/components/FavoriteNamesList';
import { SocialShareCard } from '@/components/SocialShareCard';
import { useFavoriteNames } from '@/hooks/useFavoriteNames';

// Extended name database for gallery browsing
const GALLERY_NAMES = {
  'East Africa': [
    'Wanjiku', 'Achieng', 'Nafula', 'Otieno', 'Kipkoech', 'Amani', 'Neema', 'Baraka',
    'Zawadi', 'Furaha', 'Imani', 'Juma', 'Rehema', 'Tumaini', 'Upendo', 'Nakato',
    'Mugisha', 'Uwimana', 'Amahoro', 'Ingabire', 'Kaluki', 'Mwende', 'Mutiso'
  ],
  'West Africa': [
    'Adaeze', 'Chiamaka', 'Ngozi', 'Chukwuemeka', 'Okonkwo', 'Adebayo', 'Oluwaseun',
    'Kofi', 'Kwame', 'Akosua', 'Abena', 'Yaa', 'Amadou', 'Mamadou', 'Ousmane',
    'Fatou', 'Aminata', 'Mariama', 'Sekou', 'Fanta', 'Modibo', 'Djénéba'
  ],
  'North Africa': [
    'Mohamed', 'Fatima', 'Ahmed', 'Aisha', 'Omar', 'Khadija', 'Yusuf', 'Maryam',
    'Ibrahim', 'Zahra', 'Hassan', 'Salma', 'Tariq', 'Leila', 'Khalid', 'Samira'
  ],
  'Southern Africa': [
    'Thandiwe', 'Nomvula', 'Lindiwe', 'Sipho', 'Themba', 'Bongani', 'Mpho',
    'Lerato', 'Thabo', 'Sibongile', 'Nkosi', 'Zodwa', 'Mandla', 'Siyanda', 'Zinhle'
  ],
  'Central Africa': [
    'Kabila', 'Mutombo', 'Lukaku', 'Nzinga', 'Lumumba', 'Ngono', 'Mbarga',
    'Fofana', 'Ilunga', 'Kazadi', 'Kalala', 'Ngalula', 'Kasongo', 'Wemba'
  ],
  'Horn of Africa': [
    'Tigist', 'Meron', 'Haile', 'Abebe', 'Tsehay', 'Biruk', 'Mahlet', 'Abdi',
    'Farah', 'Asha', 'Hussein', 'Sahra', 'Ayan', 'Hodan', 'Yohannes', 'Selam'
  ]
};

const DECADES = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
const REGIONS = Object.keys(GALLERY_NAMES);

interface NameData {
  name: string;
  region: string;
  gender: GenderAnalysis;
  history: NameHistoryData;
  trends: PopularityTrends;
}

// Memoized name data generator
function generateNameData(name: string, region: string): NameData {
  const gender = analyzeGender(name);
  const history = getNameHistory(name);
  const trends = history.popularityTrends || {
    byDecade: [],
    byRegion: [],
    overallRank: 0,
    peakDecade: '',
    currentPopularity: 'moderate' as const,
    trendDirection: 'stable' as const,
    percentageChange: 0
  };
  
  return { name, region, gender, history, trends };
}

export default function NamesGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDecade, setSelectedDecade] = useState(searchParams.get('decade') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
  const [selectedTrend, setSelectedTrend] = useState(searchParams.get('trend') || '');
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'trend'>('popularity');
  
  // Comparison feature
  const [compareName1, setCompareName1] = useState(searchParams.get('compare1') || '');
  const [compareName2, setCompareName2] = useState(searchParams.get('compare2') || '');
  const [showComparison, setShowComparison] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'browse' | 'compare' | 'trends' | 'generator' | 'leaderboard'>('browse');
  const comparisonRef = useRef<HTMLDivElement>(null);
  const { toggleFavorite, isFavorite } = useFavoriteNames();

  // Handler for favorites quick compare
  const handleFavoritesCompare = (name1: string, name2: string) => {
    setCompareName1(name1);
    setCompareName2(name2);
    setActiveTab('compare');
  };

  // Generate all name data
  const allNames = useMemo(() => {
    const names: NameData[] = [];
    Object.entries(GALLERY_NAMES).forEach(([region, regionNames]) => {
      regionNames.forEach(name => {
        names.push(generateNameData(name, region));
      });
    });
    return names;
  }, []);

  // Filter and sort names
  const filteredNames = useMemo(() => {
    let result = [...allNames];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(n => n.name.toLowerCase().includes(query));
    }
    
    // Region filter
    if (selectedRegion) {
      result = result.filter(n => n.region === selectedRegion);
    }
    
    // Gender filter
    if (selectedGender) {
      result = result.filter(n => n.gender.detectedGender === selectedGender);
    }
    
    // Decade filter - filter by peak decade
    if (selectedDecade) {
      result = result.filter(n => n.trends.peakDecade === selectedDecade);
    }
    
    // Trend filter
    if (selectedTrend) {
      result = result.filter(n => n.trends.trendDirection === selectedTrend);
    }
    
    // Sort
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.trends.overallRank - a.trends.overallRank);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'trend') {
      result.sort((a, b) => b.trends.percentageChange - a.trends.percentageChange);
    }
    
    return result;
  }, [allNames, searchQuery, selectedRegion, selectedGender, selectedDecade, selectedTrend, sortBy]);

  // Comparison data
  const comparisonData = useMemo(() => {
    if (!compareName1 && !compareName2) return null;
    
    const data1 = compareName1 ? generateNameData(compareName1, 'Custom') : null;
    const data2 = compareName2 ? generateNameData(compareName2, 'Custom') : null;
    
    // Merge decade data for chart
    const chartData = DECADES.map(decade => {
      const entry: Record<string, string | number> = { decade };
      if (data1?.trends.byDecade) {
        const d1 = data1.trends.byDecade.find(d => d.decade === decade);
        entry[compareName1] = d1?.popularity || 0;
      }
      if (data2?.trends.byDecade) {
        const d2 = data2.trends.byDecade.find(d => d.decade === decade);
        entry[compareName2] = d2?.popularity || 0;
      }
      return entry;
    });
    
    return { data1, data2, chartData };
  }, [compareName1, compareName2]);

  // Update URL params
  const updateParams = useCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDecade('');
    setSelectedRegion('');
    setSelectedGender('');
    setSelectedTrend('');
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = searchQuery || selectedDecade || selectedRegion || selectedGender || selectedTrend;

  // Trend icon helper
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  // Aggregate trends for overview
  const trendOverview = useMemo(() => {
    const decadeData = DECADES.map(decade => {
      const avgPopularity = allNames.reduce((sum, n) => {
        const decadeInfo = n.trends.byDecade.find(d => d.decade === decade);
        return sum + (decadeInfo?.popularity || 0);
      }, 0) / allNames.length;
      
      return { decade, popularity: Math.round(avgPopularity) };
    });
    
    return decadeData;
  }, [allNames]);

  return (
    <>
      <Helmet>
        <title>African Names Gallery - Browse by Popularity, Decade & Region | TribeGuess</title>
        <meta name="description" content="Explore African names with interactive charts showing popularity trends across decades and regions. Compare names side-by-side and discover the perfect name." />
        <meta property="og:title" content="African Names Gallery - Popularity Trends & Comparison" />
        <meta property="og:description" content="Interactive gallery of African names with decade-by-decade popularity trends, regional distribution, and name comparison tools." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/names" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "African Names Gallery",
            "description": "Browse and compare African names by popularity, decade, and region",
            "mainEntity": {
              "@type": "ItemList",
              "name": "African Names Collection",
              "numberOfItems": allNames.length,
              "itemListElement": allNames.slice(0, 10).map((n, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": n.name
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-8 sm:py-12">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  African Names <span className="text-primary">Gallery</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Explore {allNames.length}+ African names with interactive popularity trends, 
                  decade analysis, and side-by-side comparison tools.
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Badge variant="secondary" className="text-sm py-1.5 px-3">
                    <Globe className="w-4 h-4 mr-1" />
                    {REGIONS.length} Regions
                  </Badge>
                  <Badge variant="secondary" className="text-sm py-1.5 px-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    {DECADES.length} Decades
                  </Badge>
                  <Badge variant="secondary" className="text-sm py-1.5 px-3">
                    <Users className="w-4 h-4 mr-1" />
                    {allNames.length}+ Names
                  </Badge>
                </div>
              </div>
              
              {/* Name of the Day */}
              <div className="max-w-2xl mx-auto">
                <NameOfTheDay />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-6">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
                  <TabsTrigger value="browse" className="flex items-center gap-1">
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Browse</span>
                  </TabsTrigger>
                  <TabsTrigger value="generator" className="flex items-center gap-1">
                    <Wand2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Generate</span>
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Compare</span>
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:inline">Top 10</span>
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="flex items-center gap-1">
                    <LineChart className="w-4 h-4" />
                    <span className="hidden sm:inline">Trends</span>
                  </TabsTrigger>
                </TabsList>

                {/* Browse Tab */}
                <TabsContent value="browse" className="space-y-6">
                  {/* Filters */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Filter className="w-5 h-5" />
                          Filters
                        </CardTitle>
                        {hasActiveFilters && (
                          <Button variant="ghost" size="sm" onClick={clearFilters}>
                            <X className="w-4 h-4 mr-1" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        {/* Search */}
                        <div className="relative sm:col-span-2 lg:col-span-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search names..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              updateParams('q', e.target.value);
                            }}
                            className="pl-9"
                          />
                        </div>
                        
                        {/* Region Filter */}
                        <div className="relative">
                          <select
                            value={selectedRegion}
                            onChange={(e) => {
                              setSelectedRegion(e.target.value);
                              updateParams('region', e.target.value);
                            }}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">All Regions</option>
                            {REGIONS.map(r => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Decade Filter */}
                        <div className="relative">
                          <select
                            value={selectedDecade}
                            onChange={(e) => {
                              setSelectedDecade(e.target.value);
                              updateParams('decade', e.target.value);
                            }}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">All Decades</option>
                            {DECADES.map(d => (
                              <option key={d} value={d}>Peak: {d}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Gender Filter */}
                        <div className="relative">
                          <select
                            value={selectedGender}
                            onChange={(e) => {
                              setSelectedGender(e.target.value);
                              updateParams('gender', e.target.value);
                            }}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">All Genders</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unisex">Unisex</option>
                          </select>
                        </div>
                        
                        {/* Trend Filter */}
                        <div className="relative">
                          <select
                            value={selectedTrend}
                            onChange={(e) => {
                              setSelectedTrend(e.target.value);
                              updateParams('trend', e.target.value);
                            }}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="">All Trends</option>
                            <option value="rising">📈 Rising</option>
                            <option value="stable">➡️ Stable</option>
                            <option value="declining">📉 Declining</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Sort Options */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <div className="flex gap-1">
                          {[
                            { key: 'popularity', label: 'Popularity' },
                            { key: 'name', label: 'A-Z' },
                            { key: 'trend', label: 'Trending' }
                          ].map(opt => (
                            <Button
                              key={opt.key}
                              variant={sortBy === opt.key ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSortBy(opt.key as typeof sortBy)}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                        <span className="ml-auto text-sm text-muted-foreground">
                          {filteredNames.length} names
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Names Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredNames.map((nameData) => (
                      <NameCard 
                        key={nameData.name} 
                        data={nameData}
                        onCompare={() => {
                          if (!compareName1) {
                            setCompareName1(nameData.name);
                          } else if (!compareName2 && nameData.name !== compareName1) {
                            setCompareName2(nameData.name);
                            setActiveTab('compare');
                          }
                        }}
                      />
                    ))}
                  </div>

                  {filteredNames.length === 0 && (
                    <div className="text-center py-12">
                      <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No names found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search query
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  )}
                </TabsContent>

                {/* Generator Tab */}
                <TabsContent value="generator" className="space-y-6">
                  <NameGenerator />
                </TabsContent>

                {/* Compare Tab */}
                <TabsContent value="compare" className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Compare Names Side-by-Side
                      </CardTitle>
                      {(compareName1 || compareName2) && (
                        <NameExportButton 
                          elementRef={comparisonRef} 
                          fileName={`${compareName1}-vs-${compareName2}`}
                          title={`${compareName1} vs ${compareName2} Comparison`}
                        />
                      )
                      }
                    </CardHeader>
                    <CardContent ref={comparisonRef}>
                      <div className="grid gap-4 sm:grid-cols-2 mb-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block">First Name</label>
                          <div className="relative">
                            <Input
                              placeholder="Enter first name..."
                              value={compareName1}
                              onChange={(e) => {
                                setCompareName1(e.target.value);
                                updateParams('compare1', e.target.value);
                              }}
                              className="pr-8"
                            />
                            {compareName1 && (
                              <button
                                onClick={() => {
                                  setCompareName1('');
                                  updateParams('compare1', '');
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Second Name</label>
                          <div className="relative">
                            <Input
                              placeholder="Enter second name..."
                              value={compareName2}
                              onChange={(e) => {
                                setCompareName2(e.target.value);
                                updateParams('compare2', e.target.value);
                              }}
                              className="pr-8"
                            />
                            {compareName2 && (
                              <button
                                onClick={() => {
                                  setCompareName2('');
                                  updateParams('compare2', '');
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Comparison Chart */}
                      {comparisonData && (compareName1 || compareName2) && (
                        <div className="space-y-6">
                          {/* Animated Line Chart */}
                          <div className="h-80">
                            <h3 className="text-sm font-medium mb-4">Popularity Over Decades</h3>
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={comparisonData.chartData}>
                                <defs>
                                  <linearGradient id="colorName1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                  </linearGradient>
                                  <linearGradient id="colorName2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="decade" className="text-xs" />
                                <YAxis domain={[0, 100]} className="text-xs" />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: 'hsl(var(--popover))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                  }}
                                />
                                <Legend />
                                {compareName1 && (
                                  <Area
                                    type="monotone"
                                    dataKey={compareName1}
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorName1)"
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                  />
                                )}
                                {compareName2 && (
                                  <Area
                                    type="monotone"
                                    dataKey={compareName2}
                                    stroke="hsl(var(--accent))"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorName2)"
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                  />
                                )}
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Side by Side Stats */}
                          <div className="grid gap-4 sm:grid-cols-2">
                            {comparisonData.data1 && (
                              <ComparisonCard data={comparisonData.data1} color="primary" />
                            )}
                            {comparisonData.data2 && (
                              <ComparisonCard data={comparisonData.data2} color="accent" />
                            )}
                          </div>
                        </div>
                      )}

                      {!compareName1 && !compareName2 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <ArrowUpDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Enter two names above to compare their popularity trends</p>
                          <p className="text-sm mt-2">Or click "Compare" on any name card in the Browse tab</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Leaderboard Tab */}
                <TabsContent value="leaderboard" className="space-y-6">
                  <TopNamesLeaderboard />
                </TabsContent>

                {/* Trends Tab */}
                <TabsContent value="trends" className="space-y-6">
                  {/* Overall Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="w-5 h-5" />
                        African Naming Trends Over Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={trendOverview}>
                            <defs>
                              <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="decade" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--popover))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                              formatter={(value: number) => [`${value}%`, 'Avg Popularity']}
                            />
                            <Area
                              type="monotone"
                              dataKey="popularity"
                              stroke="hsl(var(--primary))"
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorTrend)"
                              animationDuration={2000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Regional Breakdown */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Names by Region
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={REGIONS.map(r => ({
                              region: r.replace(' Africa', ''),
                              count: GALLERY_NAMES[r as keyof typeof GALLERY_NAMES].length
                            }))} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis type="number" />
                              <YAxis dataKey="region" type="category" width={80} className="text-xs" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--popover))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Bar 
                                dataKey="count" 
                                fill="hsl(var(--primary))" 
                                radius={[0, 4, 4, 0]}
                                animationDuration={1500}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Gender Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={[
                              { gender: 'Male', count: allNames.filter(n => n.gender.detectedGender === 'male').length },
                              { gender: 'Female', count: allNames.filter(n => n.gender.detectedGender === 'female').length },
                              { gender: 'Unisex', count: allNames.filter(n => n.gender.detectedGender === 'unisex').length },
                              { gender: 'Unknown', count: allNames.filter(n => n.gender.detectedGender === 'unknown').length }
                            ]}>
                              <PolarGrid className="stroke-muted" />
                              <PolarAngleAxis dataKey="gender" className="text-xs" />
                              <PolarRadiusAxis />
                              <Radar
                                name="Names"
                                dataKey="count"
                                stroke="hsl(var(--primary))"
                                fill="hsl(var(--primary))"
                                fillOpacity={0.5}
                                animationDuration={1500}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Trending Names */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Currently Trending Names
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {allNames
                          .filter(n => n.trends.trendDirection === 'rising')
                          .slice(0, 8)
                          .map(n => (
                            <div key={n.name} className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                              <span className="font-medium">{n.name}</span>
                              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +{n.trends.percentageChange}%
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

// Name Card Component
function NameCard({ data, onCompare }: { data: NameData; onCompare: () => void }) {
  const [showChart, setShowChart] = useState(false);
  
  const genderColor = data.gender.detectedGender === 'male' 
    ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/30' 
    : data.gender.detectedGender === 'female'
    ? 'text-pink-600 bg-pink-50 dark:bg-pink-950/30'
    : 'text-purple-600 bg-purple-50 dark:bg-purple-950/30';

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold">{data.name}</h3>
            <p className="text-sm text-muted-foreground">{data.region}</p>
          </div>
          <Badge className={genderColor}>
            {data.gender.detectedGender === 'male' ? '♂' : data.gender.detectedGender === 'female' ? '♀' : '⚥'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          {data.trends.trendDirection === 'rising' && (
            <Badge variant="secondary" className="text-xs bg-green-50 dark:bg-green-950/30 text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              Rising
            </Badge>
          )}
          {data.trends.trendDirection === 'declining' && (
            <Badge variant="secondary" className="text-xs bg-red-50 dark:bg-red-950/30 text-red-600">
              <TrendingDown className="w-3 h-3 mr-1" />
              Declining
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            Peak: {data.trends.peakDecade}
          </Badge>
        </div>

        {/* Mini Chart */}
        <div 
          className="h-16 mb-3 cursor-pointer"
          onClick={() => setShowChart(!showChart)}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trends.byDecade}>
              <defs>
                <linearGradient id={`gradient-${data.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="popularity"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill={`url(#gradient-${data.name})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onCompare}
          >
            <Plus className="w-3 h-3 mr-1" />
            Compare
          </Button>
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link to={`/?name=${data.name}`}>
              Analyze
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Comparison Card Component
function ComparisonCard({ data, color }: { data: NameData; color: 'primary' | 'accent' }) {
  return (
    <Card className={`border-2 ${color === 'primary' ? 'border-primary/30' : 'border-accent/30'}`}>
      <CardContent className="p-4">
        <h3 className={`text-2xl font-bold mb-2 ${color === 'primary' ? 'text-primary' : 'text-accent'}`}>
          {data.name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Gender</span>
            <span className="font-medium capitalize">{data.gender.detectedGender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Peak Decade</span>
            <span className="font-medium">{data.trends.peakDecade}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Trend</span>
            <span className="font-medium flex items-center gap-1 capitalize">
              {data.trends.trendDirection === 'rising' && <TrendingUp className="w-4 h-4 text-green-500" />}
              {data.trends.trendDirection === 'declining' && <TrendingDown className="w-4 h-4 text-red-500" />}
              {data.trends.trendDirection === 'stable' && <Minus className="w-4 h-4" />}
              {data.trends.trendDirection}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Change</span>
            <span className={`font-medium ${data.trends.percentageChange > 0 ? 'text-green-600' : data.trends.percentageChange < 0 ? 'text-red-600' : ''}`}>
              {data.trends.percentageChange > 0 ? '+' : ''}{data.trends.percentageChange}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className="font-medium">{data.gender.genderConfidence}%</span>
          </div>
        </div>

        {/* Top Regions */}
        <div className="mt-4 pt-3 border-t">
          <span className="text-xs text-muted-foreground block mb-2">Top Regions</span>
          <div className="flex flex-wrap gap-1">
            {data.trends.byRegion.slice(0, 3).map(r => (
              <Badge key={r.region} variant="secondary" className="text-xs">
                {r.region.replace(' Africa', '')}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
