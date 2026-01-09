import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { globalOrigins, GlobalOrigin } from "@/lib/globalOrigins";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Users, Heart, Search, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const continentColors: Record<string, string> = {
  'Europe': 'bg-blue-500/20 text-blue-700 border-blue-300',
  'Asia': 'bg-amber-500/20 text-amber-700 border-amber-300',
  'North America': 'bg-green-500/20 text-green-700 border-green-300',
  'South America': 'bg-emerald-500/20 text-emerald-700 border-emerald-300',
  'Oceania': 'bg-cyan-500/20 text-cyan-700 border-cyan-300',
  'Asia/Africa': 'bg-orange-500/20 text-orange-700 border-orange-300',
};

const religionIcons: Record<string, string> = {
  'muslim': '☪️',
  'christian': '✝️',
  'hindu': '🕉️',
  'buddhist': '☸️',
  'jewish': '✡️',
  'sikh': '🪯',
};

const diasporaConnections: Record<string, { description: string; tribes: string[]; history: string }> = {
  'african-american': {
    description: 'African Americans carry ancestral connections to West and Central African tribes through the transatlantic slave trade.',
    tribes: ['yoruba', 'igbo', 'akan', 'fon', 'ewe', 'mandinka', 'wolof', 'fulani', 'kongo', 'bakongo'],
    history: 'Between 1500-1900, millions of Africans were forcibly transported to the Americas. Many naming traditions, spiritual practices, and cultural elements survived through generations.'
  },
  'caribbean': {
    description: 'Caribbean cultures preserve rich African heritage through music, religion (Vodou, Santería), and naming traditions.',
    tribes: ['yoruba', 'igbo', 'fon', 'akan', 'kongo', 'mandinka'],
    history: 'Caribbean islands became centers of African diaspora culture, blending African traditions with indigenous and European influences.'
  },
  'latino': {
    description: 'Latin America has significant Afro-Latino populations, especially in Brazil, Colombia, and Cuba.',
    tribes: ['yoruba', 'kongo', 'fon', 'ewe', 'mandinka'],
    history: 'Brazil received more enslaved Africans than any other country. Afro-Brazilian traditions like Candomblé preserve Yoruba religious practices.'
  },
  'arab-muslim': {
    description: 'Islamic names connect millions of Africans to the broader Muslim world through shared faith and naming traditions.',
    tribes: ['somali', 'hausa', 'fulani', 'wolof', 'tuareg', 'swahili', 'mandinka'],
    history: 'Islam spread to Africa through trade routes and scholarly exchanges, becoming integral to many African cultures for over 1,000 years.'
  },
  'indian-hindu': {
    description: 'Indian communities in East Africa (Kenya, Tanzania, Uganda) have lived alongside African tribes for generations.',
    tribes: ['swahili', 'kikuyu', 'luo', 'baganda'],
    history: 'Indian traders arrived on the East African coast centuries ago. Later, British colonialism brought indentured workers, creating vibrant Indo-African communities.'
  },
  'portuguese': {
    description: 'Portuguese colonialism created lasting cultural connections between Lusophone Africa and the broader Portuguese world.',
    tribes: ['kongo', 'bakongo', 'ovimbundu', 'makonde', 'shangaan'],
    history: 'Portuguese was the first European colonial power in Africa, leaving linguistic and cultural imprints in Angola, Mozambique, Cape Verde, and Guinea-Bissau.'
  },
  'french': {
    description: 'French colonialism connected West and Central African cultures to the Francophone world.',
    tribes: ['wolof', 'mandinka', 'bambara', 'fulani', 'fon', 'ewe', 'bamileke'],
    history: 'France colonized much of West and Central Africa, and French remains an official language in many African nations today.'
  },
  'polynesian': {
    description: 'Polynesian seafaring brought cultural exchanges with Madagascar and the East African coast.',
    tribes: ['merina', 'betsileo', 'sakalava', 'swahili'],
    history: 'Madagascar was settled by Austronesian peoples from Southeast Asia around 2,000 years ago, creating unique Malagasy culture.'
  }
};

const GlobalOrigins = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const continents = useMemo(() => {
    const uniqueContinents = new Set(globalOrigins.map(o => o.continent));
    return ['all', ...Array.from(uniqueContinents).sort()];
  }, []);

  const filteredOrigins = useMemo(() => {
    return globalOrigins.filter(origin => {
      const matchesSearch = searchQuery === "" || 
        origin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        origin.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        origin.countries.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesContinent = selectedContinent === "all" || origin.continent === selectedContinent;
      
      return matchesSearch && matchesContinent;
    });
  }, [searchQuery, selectedContinent]);

  const originsByContinent = useMemo(() => {
    const grouped: Record<string, GlobalOrigin[]> = {};
    filteredOrigins.forEach(origin => {
      if (!grouped[origin.continent]) {
        grouped[origin.continent] = [];
      }
      grouped[origin.continent].push(origin);
    });
    return grouped;
  }, [filteredOrigins]);

  const diasporaOrigins = globalOrigins.filter(o => diasporaConnections[o.id]);

  return (
    <>
      <Helmet>
        <title>Global Name Origins & African Diaspora Connections | TribeGuess</title>
        <meta name="description" content="Explore global name origins from Europe, Asia, Americas, Pacific Islands and discover how they connect to African tribes through diaspora, religion, and history." />
        <meta property="og:title" content="Global Name Origins & African Diaspora Connections" />
        <meta property="og:description" content="Discover how names from around the world connect to African heritage through diaspora, trade, and shared religious traditions." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-10 h-10 text-primary" />
              <h1 className="font-rye text-3xl md:text-4xl text-foreground">
                Global Name Origins
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore {globalOrigins.length}+ name traditions from around the world and discover 
              how they connect to African tribes through diaspora, trade, and shared heritage.
            </p>
          </div>

          <Tabs defaultValue="explorer" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="explorer" className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Explorer
              </TabsTrigger>
              <TabsTrigger value="diaspora" className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> Diaspora Links
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explorer">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by origin, region, or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {continents.map(continent => (
                    <Badge
                      key={continent}
                      variant={selectedContinent === continent ? "default" : "outline"}
                      className="cursor-pointer capitalize"
                      onClick={() => setSelectedContinent(continent)}
                    >
                      {continent === 'all' ? '🌍 All' : continent}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <p className="text-muted-foreground mb-6">
                Showing {filteredOrigins.length} of {globalOrigins.length} origins
              </p>

              {/* Origins Grid by Continent */}
              {Object.entries(originsByContinent).map(([continent, origins]) => (
                <div key={continent} className="mb-10">
                  <h2 className="font-rye text-xl mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {continent}
                    <Badge variant="secondary" className="ml-2">{origins.length}</Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {origins.map(origin => (
                      <OriginCard key={origin.id} origin={origin} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="diaspora">
              <div className="mb-8">
                <h2 className="font-rye text-2xl mb-4 text-center">African Diaspora Connections</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
                  Many global naming traditions connect back to Africa through the diaspora, trade routes, 
                  religious spread, and colonial history. Here's how different cultures link to African tribes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {diasporaOrigins.map(origin => {
                  const connection = diasporaConnections[origin.id];
                  if (!connection) return null;
                  
                  return (
                    <Card key={origin.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          {origin.religion && religionIcons[origin.religion]}
                          {origin.name}
                          <Badge className={continentColors[origin.continent] || 'bg-gray-500/20'}>
                            {origin.continent}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground">{connection.description}</p>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Historical Context
                          </h4>
                          <p className="text-sm text-muted-foreground">{connection.history}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Connected African Tribes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {connection.tribes.map(tribe => (
                              <Link
                                key={tribe}
                                to={`/learn/${tribe}`}
                                className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded-full transition-colors capitalize"
                              >
                                {tribe.replace('_', ' ')}
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        {origin.culturalNotes && (
                          <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                            {origin.culturalNotes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <Card className="mt-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> This database primarily focuses on African tribes and their connections to 
                    the global diaspora. While we recognize and honor all cultural naming traditions, our main expertise 
                    lies in African heritage. The connections shown represent historical and cultural links, not 
                    definitive ancestral claims.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

const OriginCard = ({ origin }: { origin: GlobalOrigin }) => {
  const [showNames, setShowNames] = useState(false);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            {origin.religion && <span>{religionIcons[origin.religion]}</span>}
            {origin.name}
          </span>
          <Badge className={continentColors[origin.continent] || 'bg-gray-500/20'} variant="outline">
            {origin.region}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{origin.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {origin.countries.slice(0, 4).map(country => (
            <Badge key={country} variant="secondary" className="text-xs">
              {country}
            </Badge>
          ))}
          {origin.countries.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{origin.countries.length - 4} more
            </Badge>
          )}
        </div>
        
        {(origin.namePrefixes || origin.nameSuffixes) && (
          <div className="text-xs text-muted-foreground">
            {origin.namePrefixes && (
              <span>Prefixes: <code className="bg-muted px-1 rounded">{origin.namePrefixes.join(', ')}</code></span>
            )}
            {origin.nameSuffixes && (
              <span className="ml-2">Suffixes: <code className="bg-muted px-1 rounded">{origin.nameSuffixes.join(', ')}</code></span>
            )}
          </div>
        )}
        
        <button
          onClick={() => setShowNames(!showNames)}
          className="text-xs text-primary hover:underline"
        >
          {showNames ? 'Hide' : 'Show'} example names
        </button>
        
        {showNames && (
          <div className="text-xs space-y-1 bg-muted/50 p-2 rounded">
            <div>
              <strong>Male:</strong> {origin.commonNames.male.slice(0, 8).join(', ')}
              {origin.commonNames.male.length > 8 && '...'}
            </div>
            <div>
              <strong>Female:</strong> {origin.commonNames.female.slice(0, 8).join(', ')}
              {origin.commonNames.female.length > 8 && '...'}
            </div>
          </div>
        )}
        
        {origin.culturalNotes && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/20 pl-2">
            {origin.culturalNotes}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GlobalOrigins;
