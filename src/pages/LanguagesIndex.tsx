import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Languages, Users, MessageCircle, MapPin, ArrowRight, GitBranch } from 'lucide-react';
import languageFamiliesData from '@/data/languageFamilies.json';
import LanguageFamilyMigrationTree from '@/components/LanguageFamilyMigrationTree';

export default function LanguagesIndex() {
  return (
    <>
      <Helmet>
        <title>African Language Families | Explore Linguistic Heritage | TribeGuess</title>
        <meta 
          name="description" 
          content="Explore Africa's diverse language families including Niger-Congo, Afroasiatic, Nilo-Saharan, and Khoisan. Learn common phrases, history, and discover related tribes." 
        />
        <meta name="keywords" content="African languages, Niger-Congo, Bantu, Afroasiatic, Cushitic, Semitic, Nilo-Saharan, Khoisan, language families, African linguistics" />
        <link rel="canonical" href="https://tribeguess.com/languages" />
      </Helmet>

      <Header />
      
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">Linguistic Heritage</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              African Language Families
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Africa is home to over 2,000 languages across major language families. 
              Explore their history, common phrases, unique features, and the tribes that speak them.
            </p>
          </section>

          {/* Stats Overview */}
          <section className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <Languages className="w-6 h-6 mx-auto mb-1 text-primary" />
                <p className="text-2xl font-bold">2,000+</p>
                <p className="text-xs text-muted-foreground">Languages</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <Users className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-2xl font-bold">1.4B+</p>
                <p className="text-xs text-muted-foreground">Speakers</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <GitBranch className="w-6 h-6 mx-auto mb-1 text-amber-500" />
                <p className="text-2xl font-bold">{languageFamiliesData.languageFamilies.length}</p>
                <p className="text-xs text-muted-foreground">Language Groups</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 pb-3">
                <MapPin className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                <p className="text-2xl font-bold">54</p>
                <p className="text-xs text-muted-foreground">Countries</p>
              </CardContent>
            </Card>
          </section>

          {/* Language Families Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Explore Language Families</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {languageFamiliesData.languageFamilies.map((family) => (
                <Link 
                  key={family.id}
                  to={`/languages/${family.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    {/* Gradient Header */}
                    <div className={`h-24 bg-gradient-to-br ${family.color} relative`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">{family.name}</h3>
                        {family.alternateNames.length > 0 && (
                          <p className="text-xs text-white/70">
                            Also: {family.alternateNames.slice(0, 2).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {family.description}
                      </p>
                      
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-sm font-semibold">{family.totalSpeakers}</p>
                          <p className="text-xs text-muted-foreground">Speakers</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-sm font-semibold">{family.numberOfLanguages}</p>
                          <p className="text-xs text-muted-foreground">Languages</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-sm font-semibold">{family.subFamilies.length}</p>
                          <p className="text-xs text-muted-foreground">Branches</p>
                        </div>
                      </div>

                      {/* Sub-families Preview */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {family.subFamilies.slice(0, 4).map((sub, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {sub.name}
                          </Badge>
                        ))}
                        {family.subFamilies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{family.subFamilies.length - 4} more
                          </Badge>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {family.geographicSpread.split(' - ')[0]}
                        </span>
                        <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Did You Know Section */}
          <section className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border border-primary/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              💡 Did You Know?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-background/60 rounded-lg">
                <h3 className="font-medium mb-1">Niger-Congo is the world's largest</h3>
                <p className="text-sm text-muted-foreground">
                  With over 1,500 languages, Niger-Congo has more languages than any other family on Earth.
                </p>
              </div>
              <div className="p-4 bg-background/60 rounded-lg">
                <h3 className="font-medium mb-1">Click consonants are unique to Africa</h3>
                <p className="text-sm text-muted-foreground">
                  Khoisan languages have up to 100+ click sounds, influencing Zulu and Xhosa through contact.
                </p>
              </div>
              <div className="p-4 bg-background/60 rounded-lg">
                <h3 className="font-medium mb-1">Africa gave the world the alphabet</h3>
                <p className="text-sm text-muted-foreground">
                  Ancient Egyptian hieroglyphs evolved into Phoenician script, ancestor of Greek, Latin, and Arabic.
                </p>
              </div>
              <div className="p-4 bg-background/60 rounded-lg">
                <h3 className="font-medium mb-1">Swahili bridges two families</h3>
                <p className="text-sm text-muted-foreground">
                  Swahili is a Bantu language with significant Arabic vocabulary from centuries of Indian Ocean trade.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
