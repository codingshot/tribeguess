import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getIngredientById, getAllIngredients } from "@/data/ingredients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Leaf, Globe, Heart, ChefHat, Users, ExternalLink } from "lucide-react";

export default function IngredientPage() {
  const { id } = useParams<{ id: string }>();
  const ingredient = id ? getIngredientById(id) : null;
  const allIngredients = getAllIngredients();

  if (!ingredient) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">Ingredient not found</p>
          <Link to="/ingredients" className="text-primary hover:underline">← View all ingredients</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate JSON-LD structured data for SEO
  const ingredientSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${ingredient.name} - Traditional African Ingredient`,
    "description": ingredient.description,
    "author": {
      "@type": "Organization",
      "name": "TribeGuess"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TribeGuess"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tribeguess.com/ingredient/${ingredient.id}`
    },
    "keywords": `${ingredient.name}, African ingredients, ${ingredient.category}, traditional food, ${ingredient.localNames.map(ln => ln.name).join(', ')}`
  };

  const tribesUsingIngredient = ingredient.localNames.map(ln => ln.tribe).join(', ');

  return (
    <>
      <Helmet>
        <title>{ingredient.name} - Traditional African Ingredient | Health Benefits & Uses | TribeGuess</title>
        <meta name="description" content={`${ingredient.description} Used by ${tribesUsingIngredient}. Learn about varieties, health benefits, and culinary uses of ${ingredient.name} in African cuisine.`} />
        <meta name="keywords" content={`${ingredient.name}, African ingredient, ${ingredient.category}, traditional food, health benefits, ${ingredient.localNames.map(ln => ln.name).join(', ')}`} />
        <link rel="canonical" href={`https://tribeguess.com/ingredient/${ingredient.id}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${ingredient.name} - African Ingredient Guide`} />
        <meta property="og:description" content={ingredient.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tribeguess.com/ingredient/${ingredient.id}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${ingredient.name} - African Ingredient`} />
        <meta name="twitter:description" content={ingredient.description} />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(ingredientSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <Link to="/recipes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to recipes
          </Link>

          <header className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-6 h-6" />
              <h1 className="text-2xl md:text-3xl font-bold">{ingredient.name}</h1>
            </div>
            <Badge variant="secondary" className="mb-3">{ingredient.category}</Badge>
            <p className="opacity-90">{ingredient.description}</p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Local Names</CardTitle></CardHeader>
              <CardContent>
                {ingredient.localNames.map((ln, i) => (
                  <Link key={i} to={`/learn/${ln.tribeSlug}`} className="flex justify-between py-2 border-b border-border last:border-0 hover:text-primary">
                    <span>{ln.tribe}</span><span className="font-medium">{ln.name}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Heart className="w-5 h-5 text-primary" />Health Benefits</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ingredient.healthBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />{b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader><CardTitle>Varieties</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {ingredient.varieties.map((v, i) => (
                  <div key={i} className="p-3 bg-secondary rounded-lg">
                    <h4 className="font-medium text-primary">{v.name}</h4>
                    <p className="text-sm text-muted-foreground">{v.description}</p>
                    {v.regions && <p className="text-xs mt-1">📍 {v.regions.join(", ")}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ChefHat className="w-5 h-5 text-primary" />Culinary Uses</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {ingredient.culinaryUses.map((u, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {u}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" />Tribes Using</CardTitle></CardHeader>
              <CardContent>
                {ingredient.tribesUsing.map((t, i) => (
                  <Link key={i} to={`/learn/${t.tribeSlug}`} className="block py-2 border-b border-border last:border-0 hover:text-primary">
                    <span className="font-medium">{t.tribeName}</span>
                    <p className="text-xs text-muted-foreground">{t.usage}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Explore More Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {allIngredients.filter(i => i.id !== ingredient.id).map(i => (
                <Link key={i.id} to={`/ingredient/${i.id}`}>
                  <Badge variant="outline" className="hover:bg-primary/10">{i.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
