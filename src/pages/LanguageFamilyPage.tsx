import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Languages, Users, Clock, MapPin, BookOpen, Volume2, GitBranch,
  ArrowRight, ChevronRight, Globe, Scroll, PenTool, MessageCircle,
  History, Link2, Sparkles, ArrowLeft, UtensilsCrossed
} from 'lucide-react';
import { getAllTribes } from '@/lib/tribeDetection';
import languageFamiliesData from '@/data/languageFamilies.json';
import { AudioGreeting } from '@/components/AudioGreeting';
import { recipes } from '@/data/recipes';

interface SubFamily {
  name: string;
  slug: string;
  speakers: string;
  languages: string;
  description: string;
  notableLanguages: string[];
}

interface TimelineEvent {
  year: number;
  event: string;
  significance: string;
}

interface Phrase {
  phrase: string;
  language: string;
  meaning: string;
  pronunciation: string;
}

export default function LanguageFamilyPage() {
  const { familySlug } = useParams<{ familySlug: string }>();
  
  // Sanitize slug: lowercase, trim, strip non-URL chars, limit length
  const sanitizedSlug = (familySlug || '')
    .toLowerCase()
    .trim()
    .slice(0, 100)
    .replace(/[^a-z0-9\-_]/g, '');
  
  const family = languageFamiliesData.languageFamilies.find(
    f => f.slug === sanitizedSlug || f.id === sanitizedSlug
  );
  
  const allTribes = getAllTribes();
  
  if (!family) {
    // Fuzzy suggestions: check if slug partially matches any family name/slug/alternateNames
    const suggestions = sanitizedSlug ? languageFamiliesData.languageFamilies.filter(f => {
      const s = sanitizedSlug;
      return f.slug.includes(s) || s.includes(f.slug) ||
        f.name.toLowerCase().includes(s) || s.includes(f.name.toLowerCase()) ||
        (Array.isArray(f.alternateNames) && f.alternateNames.some(
          (alt: string) => alt.toLowerCase().includes(s) || s.includes(alt.toLowerCase())
        ));
    }).slice(0, 3) : [];

    return (
      <>
        <Header />
        <Helmet>
          <title>Language Family Not Found | TribeGuess</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main className="min-h-screen bg-background pt-20 pb-12">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <div className="text-5xl mb-4">🗣️</div>
            <h1 className="text-xl font-bold mb-2">Language Family Not Found</h1>
            <p className="text-muted-foreground text-sm mb-6">
              {sanitizedSlug
                ? `We couldn't find a language family matching "${sanitizedSlug.slice(0, 40)}${sanitizedSlug.length > 40 ? '…' : ''}".`
                : 'No language family was specified.'}
            </p>
            
            {suggestions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Did you mean one of these?</p>
                <div className="flex flex-col gap-2">
                  {suggestions.map(f => (
                    <Link
                      key={f.id}
                      to={`/languages/${f.slug}`}
                      className="p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors text-left flex items-center justify-between"
                    >
                      <div>
                        <span className="font-medium text-foreground">{f.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{f.totalSpeakers} speakers</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/languages">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Language Families
                </Button>
              </Link>
              <Link to="/learn" className="text-primary hover:underline text-sm">
                Browse All Tribes
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Find tribes that belong to this language family - precise matching with deduplication
  const seen = new Set<string>();
  const familyNameLower = family.name.toLowerCase();
  const familyIdLower = family.id.toLowerCase();
  const subFamilyNames = new Set(
    (family.subFamilies || []).flatMap((sf: SubFamily) => [
      sf.slug.toLowerCase(),
      sf.name.toLowerCase(),
      ...sf.notableLanguages.map(l => l.toLowerCase().split('/')[0].split('(')[0].trim())
    ])
  );

  const relatedTribes = allTribes.filter(tribe => {
    if (seen.has(tribe.id)) return false;
    const tribeFamily = (tribe as any).language?.family?.toLowerCase() || '';
    if (!tribeFamily) return false;
    
    // Exact or substring match on family id/name
    const matchesFamily = tribeFamily === familyIdLower || tribeFamily === familyNameLower ||
      tribeFamily.includes(familyIdLower) || tribeFamily.includes(familyNameLower);
    
    // Match on sub-families
    const matchesSub = !matchesFamily && Array.from(subFamilyNames).some(name => 
      name.length > 2 && tribeFamily.includes(name)
    );
    
    if (matchesFamily || matchesSub) {
      seen.add(tribe.id);
      return true;
    }
    return false;
  });

  // Find related recipes from tribes that speak this language family
  const relatedRecipes = recipes.filter(recipe => 
    relatedTribes.some(tribe => tribe.slug === recipe.tribeSlug)
  ).slice(0, 8);

  // Format year for timeline
  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
  };

  // Get timeline progress for visualization
  const getTimelineProgress = (year: number) => {
    const minYear = Math.min(...family.timeline.map((t: TimelineEvent) => t.year));
    const maxYear = Math.max(...family.timeline.map((t: TimelineEvent) => t.year));
    return ((year - minYear) / (maxYear - minYear)) * 100;
  };

  return (
    <>
      <Helmet>
        <title>{family.name} Language Family | African Languages | TribeGuess</title>
        <meta 
          name="description" 
          content={`Explore the ${family.name} language family with ${family.totalSpeakers} speakers across ${family.numberOfLanguages} languages. Learn common phrases, history, and related African tribes.`} 
        />
        <meta name="keywords" content={`${family.name}, African languages, ${family.subFamilies.map((s: SubFamily) => s.name).join(', ')}, language family, African linguistics`} />
        <link rel="canonical" href={`https://tribeguess.com/languages/${family.slug}`} />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learn" className="hover:text-primary transition-colors">Tribes</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/languages" className="hover:text-primary transition-colors">Languages</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{family.name}</span>
          </nav>

          {/* Hero Section */}
          {/* Hero Section */}
          <section className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${family.color} p-6 md:p-10 mb-8`}>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/25" />
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                <Languages className="w-3 h-3 mr-1" />
                Language Family
              </Badge>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
                {family.name}
              </h1>
              {family.alternateNames.length > 0 && (
                <p className="text-white/80 mb-4 text-sm">
                  Also known as: {family.alternateNames.join(', ')}
                </p>
              )}
              <p className="text-white/90 max-w-2xl text-lg mb-6">
                {family.description}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-white" />
                  <p className="text-xl font-bold text-white">{family.totalSpeakers}</p>
                  <p className="text-xs text-white/70">Speakers</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <MessageCircle className="w-5 h-5 mx-auto mb-1 text-white" />
                  <p className="text-xl font-bold text-white">{family.numberOfLanguages}</p>
                  <p className="text-xs text-white/70">Languages</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <GitBranch className="w-5 h-5 mx-auto mb-1 text-white" />
                  <p className="text-xl font-bold text-white">{family.subFamilies.length}</p>
                  <p className="text-xs text-white/70">Sub-families</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-white" />
                  <p className="text-sm font-medium text-white leading-tight">{family.geographicSpread.split(' - ')[0]}</p>
                  <p className="text-xs text-white/70">Region</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="phrases">Phrases</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="subfamilies">Sub-families</TabsTrigger>
              <TabsTrigger value="tribes">Tribes</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Overview Text */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      About {family.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{family.overview}</p>
                  </CardContent>
                </Card>

                {/* Characteristics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Language Characteristics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {family.characteristics.map((char, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-3">
                        <h4 className="font-semibold text-sm">{char.name}</h4>
                        <p className="text-sm text-muted-foreground">{char.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Writing System */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-primary" />
                    Writing Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Historical Scripts</h4>
                      <p className="text-muted-foreground text-sm">{family.writingSystem.historical}</p>
                      <h4 className="font-semibold text-sm mt-4 mb-2">Modern Writing</h4>
                      <p className="text-muted-foreground text-sm">{family.writingSystem.modern}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3">Script Examples</h4>
                      <div className="space-y-3">
                        {family.writingSystem.examples.map((ex, i) => (
                          <div key={i} className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">{ex.script}</p>
                            <p className="text-xl font-medium">{ex.text}</p>
                            <p className="text-sm text-muted-foreground">
                              {ex.meaning} · <span className="italic">{ex.pronunciation}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Unique Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-primary" />
                    What Makes {family.name} Unique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {family.uniqueFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">✦</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Historical Influence */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Historical Influence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Major Empires & Kingdoms</h4>
                      <div className="flex flex-wrap gap-1">
                        {family.historicalInfluence.empires.map((empire, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{empire}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Cultural Exports</h4>
                      <div className="flex flex-wrap gap-1">
                        {family.historicalInfluence.culturalExports.map((exp, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{exp}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Diaspora Influence</h4>
                      <p className="text-sm text-muted-foreground">{family.historicalInfluence.diasporaInfluence}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Distant Cousins */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-primary" />
                    Linguistic Relatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {family.distantCousins.map((cousin, i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{cousin.family}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{cousin.relationship}</p>
                        <p className="text-xs text-primary">{cousin.sharedFeatures}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Phrases Tab */}
            <TabsContent value="phrases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-primary" />
                    Common Phrases Across {family.name}
                  </CardTitle>
                  <CardDescription>
                    Learn greetings and phrases from different {family.name} languages. Click the play button to hear pronunciation with African accents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {family.commonPhrases.map((phrase: Phrase, i: number) => (
                      <div 
                        key={i} 
                        className="p-4 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <Badge variant="secondary" className="text-xs mb-3">{phrase.language}</Badge>
                        <AudioGreeting 
                          phrase={phrase.phrase}
                          meaning={phrase.meaning}
                          phonetic={phrase.pronunciation}
                          languageName={phrase.language}
                          languageFamily={family.name}
                          size="md"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    {family.name} Language History
                  </CardTitle>
                  <CardDescription>
                    Key events in the development and spread of {family.name} languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
                    
                    <div className="space-y-6">
                      {family.timeline.map((event: TimelineEvent, i: number) => (
                        <div key={i} className="relative flex gap-4 pl-10">
                          {/* Timeline dot */}
                          <div className="absolute left-2.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                          
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="font-mono">
                                {formatYear(event.year)}
                              </Badge>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">{event.event}</h4>
                            <p className="text-sm text-muted-foreground">{event.significance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sub-families Tab */}
            <TabsContent value="subfamilies" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {family.subFamilies.map((sub: SubFamily, i: number) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-primary" />
                        {sub.name}
                      </CardTitle>
                      <CardDescription>{sub.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Speakers:</span>
                          <span className="font-medium">{sub.speakers}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Languages:</span>
                          <span className="font-medium">{sub.languages}</span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Notable languages:</p>
                          <div className="flex flex-wrap gap-1">
                            {sub.notableLanguages.slice(0, 5).map((lang, j) => (
                              <Badge key={j} variant="secondary" className="text-xs">{lang}</Badge>
                            ))}
                            {sub.notableLanguages.length > 5 && (
                              <Badge variant="outline" className="text-xs">+{sub.notableLanguages.length - 5}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Related Tribes Tab */}
            <TabsContent value="tribes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Tribes Speaking {family.name} Languages
                  </CardTitle>
                  <CardDescription>
                    {relatedTribes.length} tribes in our database speak languages from the {family.name} family
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {relatedTribes.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {relatedTribes.map((tribe) => (
                        <Link
                          key={tribe.id}
                          to={`/learn/${tribe.slug}`}
                          className="flex items-center gap-2 p-3 bg-muted/30 hover:bg-muted/60 rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{tribe.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(tribe as any).language?.name || 'Language data pending'}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tribes with this language family found in our database yet.</p>
                      <p className="text-sm mt-2">We're continuously adding more tribes!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recipes Tab */}
            <TabsContent value="recipes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    Traditional Cuisine of {family.name} Speakers
                  </CardTitle>
                  <CardDescription>
                    Explore traditional recipes from tribes speaking {family.name} languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {relatedRecipes.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {relatedRecipes.map((recipe) => (
                        <Link
                          key={recipe.id}
                          to={`/recipe/${recipe.id}`}
                          className="group p-4 bg-muted/30 hover:bg-muted/60 rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <Badge variant="secondary" className="text-xs mb-2">{recipe.tribeName}</Badge>
                          <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{recipe.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{recipe.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{recipe.category}</Badge>
                            <span>{recipe.prepTime}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No recipes from {family.name}-speaking tribes in our database yet.</p>
                      <Link to="/recipes" className="text-primary hover:underline text-sm mt-2 inline-block">
                        Browse all African recipes →
                      </Link>
                    </div>
                  )}
                  
                  {relatedRecipes.length > 0 && (
                    <div className="mt-6 text-center">
                      <Link to="/recipes">
                        <Button variant="outline" size="sm">
                          View All Recipes
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation to other language families */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Explore Other Language Families</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {languageFamiliesData.languageFamilies
                .filter(f => f.id !== family.id)
                .slice(0, 3)
                .map((otherFamily) => (
                  <Link
                    key={otherFamily.id}
                    to={`/languages/${otherFamily.slug}`}
                    className={`p-4 rounded-xl bg-gradient-to-br ${otherFamily.color} text-white hover:opacity-90 transition-opacity`}
                  >
                    <h3 className="font-semibold mb-1">{otherFamily.name}</h3>
                    <p className="text-sm text-white/80">{otherFamily.totalSpeakers} speakers</p>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
