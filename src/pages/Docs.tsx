import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, BookOpen, Users, Utensils, Globe, MessageCircle, Sparkles, Map, Trophy, Languages } from "lucide-react";

interface GuideSection {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  icon: React.ReactNode;
  steps: string[];
  tips: string[];
  route: string;
}

const guides: GuideSection[] = [
  {
    id: "home",
    title: "Name Search & Tribal Detection",
    description: "Discover your tribal heritage by searching African names. Our AI-powered detection analyzes prefixes, suffixes, and linguistic patterns across 85+ tribes.",
    screenshot: "/docs/screenshot-home.png",
    icon: <Search className="w-5 h-5" />,
    steps: [
      "Enter any African name in the search bar",
      "Select a specific country or search across all of Africa",
      "View detailed match results with confidence percentages",
      "Explore tribe profiles directly from search results"
    ],
    tips: [
      "Try both first and last names for comprehensive results",
      "The system recognizes 2,500+ common names across all regions",
      "Religious name patterns (Islamic, Christian) are also detected"
    ],
    route: "/"
  },
  {
    id: "learn",
    title: "Browse & Filter Tribes",
    description: "Explore our comprehensive database of 300+ African tribes with advanced filtering by region, country, population, and language family.",
    screenshot: "/docs/screenshot-learn.png",
    icon: <BookOpen className="w-5 h-5" />,
    steps: [
      "Use the macro-region filter to focus on specific areas",
      "Select countries using the flag-based dropdown",
      "Filter by population size or language family",
      "Click any tribe card to view full details"
    ],
    tips: [
      "The interactive map highlights tribe territories",
      "Statistics dashboard updates based on your filters",
      "Trans-border tribes show presence across multiple countries"
    ],
    route: "/learn"
  },
  {
    id: "tribe",
    title: "Tribe Detail Pages",
    description: "Deep dive into comprehensive tribe profiles featuring history, cultural practices, naming conventions, famous people, and multimedia content.",
    screenshot: "/docs/screenshot-tribe.png",
    icon: <Users className="w-5 h-5" />,
    steps: [
      "View quick stats: population, religion, language family",
      "Explore the linguistic family tree with migration history",
      "Watch cultural documentaries in the multimedia section",
      "Check famous people and meal traditions"
    ],
    tips: [
      "Click on country counts to see regional distribution",
      "Religion and language links navigate to related content",
      "Food items link directly to recipes when available"
    ],
    route: "/learn/kikuyu"
  },
  {
    id: "recipes",
    title: "Traditional Recipes",
    description: "Browse 200+ authentic African recipes with regional cuisines, ingredients, and step-by-step cooking tutorials from YouTube.",
    screenshot: "/docs/screenshot-recipes.png",
    icon: <Utensils className="w-5 h-5" />,
    steps: [
      "Toggle 'Regional Cuisines' to browse by geography",
      "Filter by tribe or country using the sidebar",
      "Click any recipe for full instructions and video",
      "Explore linked ingredients for cultural context"
    ],
    tips: [
      "Each recipe includes historical background",
      "YouTube tutorials are hand-picked for quality",
      "Ingredient pages explain cultural significance"
    ],
    route: "/recipes"
  },
  {
    id: "languages",
    title: "Language Families",
    description: "Explore African language families including Bantu, Afroasiatic, Nilo-Saharan, and more. Learn common phrases with audio pronunciation.",
    screenshot: "/docs/screenshot-languages.png",
    icon: <Languages className="w-5 h-5" />,
    steps: [
      "Browse the main language families overview",
      "Click into any family for detailed characteristics",
      "Listen to common phrases with native pronunciation",
      "See which tribes belong to each language group"
    ],
    tips: [
      "The writing systems section shows different scripts",
      "Phonetic guides use stress-based capitalization",
      "Links connect to related recipes and tribes"
    ],
    route: "/languages"
  },
  {
    id: "religions",
    title: "Religions & Traditions",
    description: "Discover traditional African religions, major faiths, and their historical spread across the continent with interactive timeline maps.",
    screenshot: "/docs/screenshot-religions.png",
    icon: <Globe className="w-5 h-5" />,
    steps: [
      "Browse indigenous beliefs and major religions",
      "Use the statistics dashboard for demographic insights",
      "Compare up to 4 religions side-by-side",
      "Explore the animated timeline of religious spread"
    ],
    tips: [
      "The timeline shows trade routes and migration patterns",
      "Each religion links to associated tribes",
      "The compare tool highlights key differences"
    ],
    route: "/religions"
  },
  {
    id: "quiz",
    title: "Cultural Quizzes",
    description: "Test your knowledge with 15+ quiz categories, daily challenges, achievement system, and flashcard learning mode.",
    screenshot: "/docs/screenshot-quiz.png",
    icon: <Trophy className="w-5 h-5" />,
    steps: [
      "Choose from categories like Famous Africans, Colonial History",
      "Take the daily challenge for streak rewards",
      "Unlock 20+ achievements as you progress",
      "Use flashcard mode for focused learning"
    ],
    tips: [
      "Daily challenges include 5 random questions with timer",
      "Streaks track your consecutive days playing",
      "Results are saved locally for progress tracking"
    ],
    route: "/quiz"
  },
  {
    id: "blog",
    title: "Cultural Blog",
    description: "Read in-depth articles about African history, traditions, and contemporary culture with audio narration and smart tribe linking.",
    screenshot: "/docs/screenshot-blog.png",
    icon: <MessageCircle className="w-5 h-5" />,
    steps: [
      "Browse by region or topic using filter pills",
      "Click into articles for full content",
      "Use the audio player for text-to-speech narration",
      "Tribe names automatically link to their profiles"
    ],
    tips: [
      "Articles include footnotes with sources",
      "Choose from multiple African accent voices",
      "Share articles via social media buttons"
    ],
    route: "/blog"
  }
];

const Docs = () => {
  return (
    <>
      <Helmet>
        <title>User Guide & Documentation | TribeGuess - Learn How to Explore African Heritage</title>
        <meta 
          name="description" 
          content="Complete user guide for TribeGuess. Learn how to search African names, explore 300+ tribes, discover recipes, take quizzes, and explore African cultural heritage." 
        />
        <meta name="keywords" content="TribeGuess guide, African tribes tutorial, name search help, cultural heritage documentation, African recipes guide" />
        <link rel="canonical" href="https://tribeguess.com/docs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="User Guide & Documentation | TribeGuess" />
        <meta property="og:description" content="Complete user guide for exploring African tribal heritage with TribeGuess." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tribeguess.com/docs" />
        <meta property="og:image" content="/docs/screenshot-home.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="User Guide | TribeGuess" />
        <meta name="twitter:description" content="Learn how to explore African tribal heritage with TribeGuess." />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Use TribeGuess",
            "description": "A comprehensive guide to exploring African tribal heritage using TribeGuess",
            "step": guides.map((guide, index) => ({
              "@type": "HowToStep",
              "position": index + 1,
              "name": guide.title,
              "text": guide.description,
              "image": `https://tribeguess.com${guide.screenshot}`
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-rye">
              User Guide & Documentation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to explore African tribal heritage with TribeGuess. From name detection to cultural quizzes, 
              discover everything our platform offers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {guides.slice(0, 4).map((guide) => (
              <Link key={guide.id} to={`#${guide.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
                      {guide.icon}
                    </div>
                    <p className="font-medium text-sm">{guide.title.split(' ').slice(0, 2).join(' ')}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Tabs for Different Sections */}
          <Tabs defaultValue="getting-started" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tips">Pro Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Welcome to TribeGuess</h2>
                <p className="text-muted-foreground mb-6">
                  TribeGuess is your gateway to discovering African tribal heritage. Whether you're researching 
                  your ancestry, learning about diverse cultures, or just curious about African names, we've got you covered.
                </p>
              </div>

              {/* First 3 guides */}
              {guides.slice(0, 3).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </TabsContent>

            <TabsContent value="features" className="space-y-8">
              {guides.slice(3).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    Navigation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">1</Badge>
                      <span>Use the header navigation to quickly jump between sections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">2</Badge>
                      <span>Click "Random Tribe" in the header to discover a tribe at random</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">3</Badge>
                      <span>All URLs are shareable - bookmark or share any tribe, recipe, or article</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">4</Badge>
                      <span>Filter states are saved in the URL for easy sharing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Search Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">1</Badge>
                      <span>Search works with both first names and surnames</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">2</Badge>
                      <span>Try searching with different spelling variations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">3</Badge>
                      <span>Select "All Africa" to search across the entire database</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">4</Badge>
                      <span>Religious names (Islamic, Christian) trigger additional suggestions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Quiz & Learning Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">1</Badge>
                      <span>Complete the daily challenge every day to build your streak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">2</Badge>
                      <span>Use flashcard mode to memorize facts before taking quizzes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">3</Badge>
                      <span>Achievements unlock as you complete different categories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">4</Badge>
                      <span>Progress is saved locally - return anytime to continue</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How accurate is the name detection?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our system analyzes over 10,000 prefix and suffix patterns across 85+ tribes. 
                    Accuracy varies by name complexity, with common names achieving 90%+ match rates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I contribute tribal data?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! We welcome community contributions. Visit our GitHub repository to submit 
                    new tribes, recipes, corrections, or famous people through our issue templates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is my data saved online?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No. TribeGuess runs entirely in your browser. Quiz progress and preferences 
                    are stored locally on your device. We don't collect personal information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I report errors?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use our GitHub issue templates to report spelling corrections, broken videos, 
                    incorrect information, or suggest new content. All reports are reviewed promptly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Start your journey into African tribal heritage. Search a name, explore tribes, or take a quiz!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search Names
                </Link>
                <Link 
                  to="/learn" 
                  className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Tribes
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

// Guide Card Component
const GuideCard = ({ guide }: { guide: GuideSection }) => (
  <Card id={guide.id} className="overflow-hidden scroll-mt-24">
    <div className="grid md:grid-cols-2 gap-0">
      {/* Screenshot */}
      <div className="relative bg-muted">
        <img 
          src={guide.screenshot} 
          alt={`${guide.title} screenshot`}
          className="w-full h-full object-cover min-h-[250px]"
          loading="lazy"
        />
        <Link 
          to={guide.route}
          className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Try it →
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            {guide.icon}
          </div>
          <CardTitle>{guide.title}</CardTitle>
        </div>
        
        <CardDescription className="mb-4">
          {guide.description}
        </CardDescription>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">How to use:</h4>
            <ol className="space-y-1">
              {guide.steps.map((step, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-medium">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2">💡 Tips:</h4>
            <ul className="space-y-1">
              {guide.tips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span>•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default Docs;
