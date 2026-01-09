import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllTribes } from "@/lib/tribeDetection";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Sparkles, Sun, Moon, Mountain, Droplets, Wind, Flame, TreePine, Users, BookOpen, ExternalLink, ChevronRight, Search, Filter, X } from "lucide-react";
import { getAllReligions, TraditionalReligionData } from "@/data/traditionalReligions";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TraditionalReligion {
  name: string;
  supremeDeity: string;
  spirits?: string[];
  practices?: string[];
  beliefs?: string;
}

interface TribeWithReligion {
  id: string;
  name: string;
  slug: string;
  region: string;
  countries: string[];
  traditionalReligion?: TraditionalReligion;
}

// Map regions to icons
const regionIcons: Record<string, React.ReactNode> = {
  "East Africa": <Sun className="h-4 w-4" />,
  "West Africa": <Flame className="h-4 w-4" />,
  "Southern Africa": <Mountain className="h-4 w-4" />,
  "Central Africa": <TreePine className="h-4 w-4" />,
  "Horn of Africa": <Wind className="h-4 w-4" />,
  "North Africa": <Moon className="h-4 w-4" />,
};

const PIE_COLORS = ['#F59E0B', '#3B82F6', '#22C55E', '#EC4899', '#8B5CF6', '#06B6D4'];

// Featured religions from our detailed database
const featuredReligions = getAllReligions();

export default function ReligionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all');
  const [selectedTribe, setSelectedTribe] = useState(searchParams.get('tribe') || 'all');
  
  const allTribes = getAllTribes() as TribeWithReligion[];
  
  // Filter tribes with traditional religion data
  const tribesWithReligion = allTribes.filter(t => t.traditionalReligion);
  
  // Get unique regions and tribe names for filter dropdowns
  const uniqueRegions = ['West Africa', 'East Africa', 'Southern Africa', 'Central Africa', 'Horn of Africa', 'North Africa'];
  const tribesWithReligionNames = [...new Set(featuredReligions.flatMap(r => r.tribesFollowing.map(t => t.tribeName)))].sort();

  // Filter religions based on search and filters
  const filteredReligions = useMemo(() => {
    return featuredReligions.filter(religion => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          religion.name.toLowerCase().includes(query) ||
          religion.supremeDeity.name.toLowerCase().includes(query) ||
          religion.alternateNames?.some(n => n.toLowerCase().includes(query)) ||
          religion.tenets.some(t => t.belief.toLowerCase().includes(query)) ||
          religion.tribesFollowing.some(t => t.tribeName.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      
      // Region filter
      if (selectedRegion !== 'all' && religion.region !== selectedRegion) return false;
      
      // Tribe filter
      if (selectedTribe !== 'all') {
        const hasTribe = religion.tribesFollowing.some(t => t.tribeName === selectedTribe);
        if (!hasTribe) return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedRegion, selectedTribe]);

  // Update URL params when filters change
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedTribe('all');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedRegion !== 'all' || selectedTribe !== 'all';

  // Group by region
  const regionGroups = tribesWithReligion.reduce((acc, tribe) => {
    // Determine the broad region
    let broadRegion = "Other";
    const region = tribe.region.toLowerCase();
    if (region.includes("kenya") || region.includes("tanzania") || region.includes("uganda") || region.includes("rwanda") || region.includes("east")) {
      broadRegion = "East Africa";
    } else if (region.includes("nigeria") || region.includes("ghana") || region.includes("senegal") || region.includes("west") || region.includes("benin") || region.includes("togo")) {
      broadRegion = "West Africa";
    } else if (region.includes("south africa") || region.includes("zimbabwe") || region.includes("namibia") || region.includes("botswana") || region.includes("southern") || region.includes("zambia") || region.includes("malawi")) {
      broadRegion = "Southern Africa";
    } else if (region.includes("congo") || region.includes("cameroon") || region.includes("central") || region.includes("gabon")) {
      broadRegion = "Central Africa";
    } else if (region.includes("ethiopia") || region.includes("somalia") || region.includes("eritrea") || region.includes("horn") || region.includes("djibouti")) {
      broadRegion = "Horn of Africa";
    } else if (region.includes("morocco") || region.includes("egypt") || region.includes("tunisia") || region.includes("algeria") || region.includes("north")) {
      broadRegion = "North Africa";
    }
    
    if (!acc[broadRegion]) acc[broadRegion] = [];
    acc[broadRegion].push(tribe);
    return acc;
  }, {} as Record<string, TribeWithReligion[]>);

  // Extract unique supreme deities for comparison
  const supremeDeities = tribesWithReligion
    .filter(t => t.traditionalReligion?.supremeDeity)
    .map(t => ({
      tribe: t.name,
      slug: t.slug,
      deity: t.traditionalReligion!.supremeDeity,
      region: t.region,
    }));

  // Common spiritual elements across religions
  const commonElements = [
    { 
      element: "Supreme Creator", 
      description: "Most African traditional religions believe in a supreme creator god who is often distant but all-powerful.",
      examples: ["Ngai (Kikuyu/Maasai)", "Olodumare (Yoruba)", "Nyame (Ashanti)", "Mulungu (Bantu groups)"]
    },
    { 
      element: "Ancestor Veneration", 
      description: "Ancestors serve as intermediaries between the living and the divine, receiving offerings and prayers.",
      examples: ["Mizimu (Baganda)", "Amadlozi (Zulu)", "Egungun (Yoruba)", "Ngoma (Kikuyu)"]
    },
    { 
      element: "Nature Spirits", 
      description: "Sacred trees, mountains, rivers, and animals house spirits that must be respected.",
      examples: ["Mũgumo tree (Kikuyu)", "Osun River (Yoruba)", "Mt. Kenya (Kikuyu)", "Baobab trees (many groups)"]
    },
    { 
      element: "Divination & Healers", 
      description: "Spiritual specialists communicate with the spirit world for guidance and healing.",
      examples: ["Babalawo (Yoruba)", "Sangoma (Zulu)", "Laibon (Maasai)", "N'anga (Shona)"]
    },
    { 
      element: "Initiation Rites", 
      description: "Passage ceremonies mark transitions between life stages with spiritual significance.",
      examples: ["Irũa (Kikuyu)", "Ulwaluko (Xhosa)", "Eunoto (Maasai)", "Dipo (Krobo)"]
    },
    { 
      element: "Sacred Kingship", 
      description: "Rulers often have divine or semi-divine status, mediating between people and gods.",
      examples: ["Kabaka (Baganda)", "Oba (Yoruba)", "Omukama (Bunyoro)", "Asantehene (Ashanti)"]
    },
  ];

  return (
    <>
      <Helmet>
        <title>African Traditional Religions Comparison | Belief Systems Across the Continent</title>
        <meta name="description" content="Explore and compare traditional African religions, supreme deities, spiritual practices, and common elements across East, West, Central, and Southern Africa." />
        <meta property="og:title" content="African Traditional Religions Comparison" />
        <meta property="og:description" content="Discover the rich tapestry of traditional African spiritual systems, from Yoruba Orisha to Zulu ancestors." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                African Traditional Religions
              </h1>
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the diverse spiritual traditions of Africa's ethnic groups. 
              Compare supreme deities, ancestral beliefs, and sacred practices across regions.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This content is for educational and entertainment purposes only.
            </p>
          </div>

          {/* Search and Filters */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search religions, deities, tenets..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateFilters('q', e.target.value);
                  }}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    updateFilters('region', e.target.value);
                  }}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Regions</option>
                  {uniqueRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select
                  value={selectedTribe}
                  onChange={(e) => {
                    setSelectedTribe(e.target.value);
                    updateFilters('tribe', e.target.value);
                  }}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Tribes</option>
                  {tribesWithReligionNames.map(tribe => (
                    <option key={tribe} value={tribe}>{tribe}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => {
                      setSearchQuery('');
                      updateFilters('q', '');
                    }} />
                  </Badge>
                )}
                {selectedRegion !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Region: {selectedRegion}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => {
                      setSelectedRegion('all');
                      updateFilters('region', 'all');
                    }} />
                  </Badge>
                )}
                {selectedTribe !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Tribe: {selectedTribe}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => {
                      setSelectedTribe('all');
                      updateFilters('tribe', 'all');
                    }} />
                  </Badge>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}
          </section>

          {/* Featured Religions with Full Details */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              {hasActiveFilters ? `${filteredReligions.length} Matching Religions` : 'Detailed Religion Profiles'}
            </h2>
            
            {filteredReligions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No religions found matching your filters.</p>
                <button onClick={clearFilters} className="text-primary hover:underline mt-2">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReligions.map((religion) => (
                <Link key={religion.id} to={`/religion/${religion.id}`} className="block">
                  <Card className="hover:shadow-lg transition-shadow border-primary/20 h-full hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-primary">{religion.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{religion.region} • {religion.estimatedFollowers}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Supreme Deity</p>
                        <p className="text-sm font-medium">{religion.supremeDeity.name}</p>
                      </div>
                      
                      <div className="h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={religion.countryBreakdown.slice(0, 5)}
                              dataKey="percentage"
                              nameKey="country"
                              cx="50%"
                              cy="50%"
                              outerRadius={35}
                              innerRadius={20}
                            >
                              {religion.countryBreakdown.slice(0, 5).map((_, i) => (
                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Tribes Following</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {religion.tribesFollowing.slice(0, 3).map((tribe) => (
                            <Badge key={tribe.tribeSlug} variant="secondary" className="text-xs">
                              {tribe.tribeName} ({tribe.percentage}%)
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Core Tenets</p>
                        <ul className="text-xs text-muted-foreground list-disc list-inside mt-1">
                          {religion.tenets.slice(0, 2).map((tenet, i) => (
                            <li key={i}>{tenet.belief}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ExternalLink className="w-3 h-3" />
                          {religion.sources.length} sources
                        </div>
                        <span className="text-xs text-primary flex items-center gap-1">
                          View details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            )}
          </section>

          {/* Common Elements Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Common Spiritual Elements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonElements.map((item) => (
                <Card key={item.element} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{item.element}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.examples.map((ex) => (
                        <Badge key={ex} variant="secondary" className="text-xs">
                          {ex}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Regional Tabs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              Religions by Region
            </h2>
            
            <Tabs defaultValue="East Africa" className="w-full">
              <TabsList className="flex flex-wrap justify-start gap-2 h-auto bg-transparent mb-6">
                {Object.keys(regionGroups).sort().map((region) => (
                  <TabsTrigger 
                    key={region} 
                    value={region}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-full border"
                  >
                    <span className="flex items-center gap-2">
                      {regionIcons[region] || <Sparkles className="h-4 w-4" />}
                      {region}
                      <Badge variant="outline" className="ml-1 text-xs">
                        {regionGroups[region].length}
                      </Badge>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(regionGroups).map(([region, tribes]) => (
                <TabsContent key={region} value={region} className="mt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    {tribes.map((tribe) => (
                      <Card key={tribe.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Link 
                              to={`/learn/${tribe.slug}`}
                              className="text-lg font-semibold text-primary hover:underline"
                            >
                              {tribe.name}
                            </Link>
                            <Badge variant="outline" className="text-xs">
                              {tribe.region}
                            </Badge>
                          </div>
                          {tribe.traditionalReligion?.name && (
                            <p className="text-sm text-muted-foreground italic">
                              {tribe.traditionalReligion.name}
                            </p>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {/* Supreme Deity */}
                          {tribe.traditionalReligion?.supremeDeity && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Supreme Deity</p>
                              <p className="text-sm">{tribe.traditionalReligion.supremeDeity}</p>
                            </div>
                          )}
                          
                          {/* Spirits */}
                          {tribe.traditionalReligion?.spirits && tribe.traditionalReligion.spirits.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Spirits & Entities</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tribe.traditionalReligion.spirits.slice(0, 3).map((spirit, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {spirit.length > 40 ? spirit.substring(0, 40) + '...' : spirit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Key Practices */}
                          {tribe.traditionalReligion?.practices && tribe.traditionalReligion.practices.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Key Practices</p>
                              <ul className="text-xs text-muted-foreground list-disc list-inside">
                                {tribe.traditionalReligion.practices.slice(0, 3).map((practice, i) => (
                                  <li key={i}>{practice}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <Link 
                            to={`/learn/${tribe.slug}`}
                            className="text-xs text-primary hover:underline inline-block mt-2"
                          >
                            Learn more about {tribe.name} →
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Supreme Deities Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sun className="h-6 w-6 text-primary" />
              Supreme Deities Across Africa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 text-sm font-semibold">Tribe</th>
                    <th className="text-left p-3 text-sm font-semibold">Supreme Deity</th>
                    <th className="text-left p-3 text-sm font-semibold hidden md:table-cell">Region</th>
                  </tr>
                </thead>
                <tbody>
                  {supremeDeities.slice(0, 30).map((item, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3">
                        <Link to={`/learn/${item.slug}`} className="text-primary hover:underline text-sm">
                          {item.tribe}
                        </Link>
                      </td>
                      <td className="p-3 text-sm">{item.deity}</td>
                      <td className="p-3 text-sm text-muted-foreground hidden md:table-cell">{item.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {supremeDeities.length > 30 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Showing 30 of {supremeDeities.length} documented traditions
              </p>
            )}
          </section>

          {/* Stats */}
          <section className="text-center py-8 bg-muted/30 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">{tribesWithReligion.length}</p>
                <p className="text-sm text-muted-foreground">Documented Traditions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{Object.keys(regionGroups).length}</p>
                <p className="text-sm text-muted-foreground">African Regions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">{supremeDeities.length}</p>
                <p className="text-sm text-muted-foreground">Supreme Deities</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Common Elements</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
