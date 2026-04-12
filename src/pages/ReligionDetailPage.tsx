import { Helmet } from "react-helmet-async";
import { ViralCTAs } from '@/components/ViralCTAs';
import { CountryFlag, getCodeFromName } from '@/components/CountryFlag';
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getReligionById, getAllReligions } from "@/data/traditionalReligions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, Sparkles, BookOpen, Users, ExternalLink, 
  Globe, Church, Star, Heart, Scroll, TreePine, Mountain,
  ChevronRight, Play, Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { findReligionByName } from "@/data/traditionalReligions";

const PIE_COLORS = ['#F59E0B', '#3B82F6', '#22C55E', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444', '#14B8A6'];

export default function ReligionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const religion = id ? getReligionById(id) : null;
  const allReligions = getAllReligions();

  if (!religion) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">Religion not found</p>
          <Link to="/religions" className="text-primary hover:underline">
            ← Back to all religions
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const seoTitle = `${religion.name}: Beliefs, Rituals & Spiritual Practices | TribeGuess`;
  const seoDescription = `Explore ${religion.name} - ${religion.estimatedFollowers} followers. Learn about supreme deity ${religion.supremeDeity.name}, core beliefs, rituals, ceremonies, and how to join this ${religion.region} tradition.`;

  // Prepare chart data
  const countryChartData = religion.countryBreakdown.map(item => ({
    name: `${item.country}`,
    value: item.percentage,
    country: item.country
  }));

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://tribeguess.com/religion/${religion.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": religion.name,
            "description": seoDescription,
            "author": { "@type": "Organization", "name": "TribeGuess" },
            "publisher": { "@type": "Organization", "name": "TribeGuess" },
            "about": {
              "@type": "Thing",
              "name": religion.name,
              "description": religion.supremeDeity.description
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link 
              to="/religions"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all religions
            </Link>
          </nav>

          {/* Hero Section */}
          <header className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-primary-foreground mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <h1 className="text-2xl md:text-3xl font-bold">{religion.name}</h1>
            </div>
            {religion.alternateNames && religion.alternateNames.length > 0 && (
              <p className="text-sm opacity-80 mb-3">
                Also known as: {religion.alternateNames.join(", ")}
              </p>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{religion.region}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{religion.estimatedFollowers}</span>
              </div>
            </div>
            <Link to={`/religion-compare?ids=${religion.id}`} className="mt-4 inline-block">
              <Button variant="secondary" size="sm" className="gap-2">
                <Scale className="w-4 h-4" />
                Compare with others
              </Button>
            </Link>
          </header>

          {/* Video Section */}
          {religion.youtubeVideoId && (
            <section className="mb-8 bg-gradient-to-r from-red-500/10 to-red-600/5 dark:from-red-900/20 dark:to-red-950/10 rounded-xl p-4 sm:p-6 border border-red-200 dark:border-red-800">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                <Play className="w-5 h-5 text-red-600" />
                Documentary / Educational Video
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Learn more about {religion.name} through this documentary.
              </p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${religion.youtubeVideoId}?rel=0`}
                  title={`${religion.name} Documentary`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                📺 Video content is sourced from YouTube for educational purposes.
              </p>
            </section>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Supreme Deity */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Supreme Deity: {religion.supremeDeity.name}
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">{religion.supremeDeity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {religion.supremeDeity.attributes.map((attr, i) => (
                        <Badge key={i} variant="secondary">{attr}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Core Tenets */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Core Tenets & Beliefs
                </h2>
                <div className="space-y-4">
                  {religion.tenets.map((tenet, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary">{tenet.belief}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tenet.description}</p>
                        {tenet.source && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            📚 Source: {tenet.source}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Rituals & Ceremonies */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Church className="w-5 h-5 text-primary" />
                  Rituals & Ceremonies
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {religion.rituals.map((ritual, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-primary mb-1">{ritual.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{ritual.description}</p>
                        <Badge variant="outline" className="text-xs">{ritual.occasion}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Practices */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Spiritual Practices
                </h2>
                <div className="space-y-3">
                  {religion.practices.map((practice, i) => (
                    <div key={i} className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-foreground">{practice.name}</h3>
                        {practice.frequency && (
                          <Badge variant="outline" className="text-xs ml-2">{practice.frequency}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{practice.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sacred Texts */}
              {religion.sacredTexts && religion.sacredTexts.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-primary" />
                    Sacred Texts & Traditions
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {religion.sacredTexts.map((text, i) => (
                      <Card key={i}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{text.name}</h3>
                            <Badge variant={text.status === 'oral' ? 'secondary' : 'default'} className="text-xs">
                              {text.status === 'oral' ? '🗣️ Oral' : '📜 Written'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{text.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* How to Join */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-primary" />
                  How to Join / Conversion
                </h2>
                <Card className="border-primary/30">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4">{religion.joining.process}</p>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-2 mb-4">
                      {religion.joining.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    {religion.joining.notes && (
                      <p className="text-xs text-muted-foreground italic bg-secondary p-3 rounded-lg">
                        ℹ️ {religion.joining.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Influence */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-primary" />
                  Cultural & Modern Influence
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cultural Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{religion.influence.cultural}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Modern Presence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{religion.influence.modern}</p>
                    </CardContent>
                  </Card>
                  {religion.influence.diaspora && (
                    <Card className="sm:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Diaspora Influence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{religion.influence.diaspora}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Country Breakdown Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={countryChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={40}
                          label={({ name, value }) => `${value}%`}
                          labelLine={false}
                        >
                          {countryChartData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {religion.countryBreakdown.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                          />
                          <CountryFlag code={getCodeFromName(item.country)} size={14} label={item.country} /> {item.country}
                        </span>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tribes Following */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Tribes Following
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {religion.tribesFollowing.map((tribe, i) => (
                      <Link 
                        key={i} 
                        to={`/learn/${tribe.tribeSlug}`}
                        className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary">{tribe.tribeName}</span>
                          <Badge variant="outline">{tribe.percentage}%</Badge>
                        </div>
                        {tribe.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{tribe.notes}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-primary" />
                    Sources & References
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {religion.sources.map((source, i) => (
                      <li key={i}>
                        <a 
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {source.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Religions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Explore More Religions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {allReligions
                      .filter(r => r.id !== religion.id)
                      .slice(0, 4)
                      .map((r) => (
                        <div key={r.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg text-sm">
                          <Link 
                            to={`/religion/${r.id}`}
                            className="hover:text-primary transition-colors flex-1"
                          >
                            {r.name}
                          </Link>
                          <Link
                            to={`/religion-compare?ids=${religion.id},${r.id}`}
                            className="text-muted-foreground hover:text-primary p-1"
                            title={`Compare with ${r.name}`}
                          >
                            <Scale className="w-4 h-4" />
                          </Link>
                        </div>
                      ))}
                  </div>
                  <Link 
                    to="/religions" 
                    className="block text-center text-sm text-primary hover:underline mt-4"
                  >
                    View all religions →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          <ViralCTAs className="mt-8" />
        </main>

        <Footer />
      </div>
    </>
  );
}
