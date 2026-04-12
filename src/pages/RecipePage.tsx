import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRecipeById, getRecipesByTribe, getAllRecipes, type Recipe } from '@/data/recipes';
import { ArrowLeft, Clock, Users, ChefHat, Flame, Search, BookOpen, Play, History, UtensilsCrossed, Languages, ListPlus, Leaf, Heart, Utensils, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { ViralCTAs } from '@/components/ViralCTAs';
import { getAllTribes } from '@/lib/tribeDetection';
import languageFamiliesData from '@/data/languageFamilies.json';
import { InlineVideoPlayer } from '@/components/InlineVideoPlayer';

const categoryEmoji: Record<string, string> = {
  staple: '🍚',
  beverage: '🥤',
  special: '🍖',
  snack: '🥜'
};

const difficultyColor: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;
  const allRecipes = getAllRecipes();

  // Get similar recipes from other tribes (same category)
  const similarRecipes = useMemo(() => {
    if (!recipe) return [];
    return allRecipes
      .filter(r => r.id !== recipe.id && r.tribeSlug !== recipe.tribeSlug && r.category === recipe.category)
      .slice(0, 4);
  }, [recipe, allRecipes]);

  // Find the language family for this tribe's recipe
  const tribeLanguageFamily = useMemo(() => {
    if (!recipe) return null;
    const allTribes = getAllTribes();
    const tribe = allTribes.find(t => t.slug === recipe.tribeSlug);
    if (!tribe) return null;
    
    const tribeFamily = (tribe as any).language?.family?.toLowerCase() || '';
    
    // Find matching language family
    return languageFamiliesData.languageFamilies.find(family => {
      const familyId = family.id.toLowerCase();
      const familyName = family.name.toLowerCase();
      if (tribeFamily.includes(familyId) || tribeFamily.includes(familyName)) return true;
      return family.subFamilies.some((sf: any) => 
        tribeFamily.includes(sf.slug.toLowerCase()) || tribeFamily.includes(sf.name.toLowerCase())
      );
    });
  }, [recipe]);

  if (!recipe) {
    // Show recipe not found with suggestions
    const sampleRecipes = allRecipes.slice(0, 9);

    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Recipe Not Found | TribeGuess</title>
          <meta name="description" content="Recipe not found. Discover other traditional African recipes from various tribes." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="text-6xl mb-4">🍲</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The recipe you're looking for doesn't exist. But don't worry — we have many delicious traditional recipes to explore!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/recipes" className="gap-2">
                  <Search className="w-4 h-4" />
                  Browse All Recipes
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/learn">
                  Explore Tribes
                </Link>
              </Button>
            </div>
          </div>

          {/* Show sample recipes */}
          <section>
            <h2 className="text-xl font-semibold text-center mb-6">Discover Traditional Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleRecipes.map(r => (
                <Link
                  key={r.id}
                  to={`/recipe/${r.id}`}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span>{categoryEmoji[r.category]}</span>
                    <span className="font-medium">{r.name}</span>
                  </div>
                  <Link
                    to={`/learn/${r.tribeSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary hover:underline"
                  >
                    {r.tribeName} Tribe
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  const relatedRecipes = getRecipesByTribe(recipe.tribeSlug).filter(r => r.id !== recipe.id);

  // Generate JSON-LD structured data for SEO
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "author": {
      "@type": "Organization",
      "name": "TribeGuess",
      "url": "https://tribeguess.com"
    },
    "datePublished": "2025-01-01",
    "prepTime": `PT${parseInt(recipe.prepTime) || 15}M`,
    "cookTime": `PT${parseInt(recipe.cookTime) || 30}M`,
    "totalTime": `PT${(parseInt(recipe.prepTime) || 15) + (parseInt(recipe.cookTime) || 30)}M`,
    "recipeYield": `${recipe.servings} servings`,
    "recipeCategory": recipe.category === 'staple' ? 'Main Course' : recipe.category === 'beverage' ? 'Beverage' : recipe.category === 'snack' ? 'Snack' : 'Main Course',
    "recipeCuisine": `${recipe.tribeName} African`,
    "recipeIngredient": recipe.ingredients.map(i => `${i.amount} ${i.item}${i.notes ? ` (${i.notes})` : ''}`),
    "recipeInstructions": recipe.instructions.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "text": step
    })),
    "keywords": `${recipe.name}, ${recipe.localName || ''}, ${recipe.tribeName} food, African recipe, traditional African cuisine, ${recipe.category}`.replace(', ,', ','),
    ...(recipe.nutritionalInfo && {
      "nutrition": {
        "@type": "NutritionInformation",
        ...(recipe.nutritionalInfo.calories && { "calories": recipe.nutritionalInfo.calories }),
        ...(recipe.nutritionalInfo.protein && { "proteinContent": recipe.nutritionalInfo.protein }),
        ...(recipe.nutritionalInfo.carbs && { "carbohydrateContent": recipe.nutritionalInfo.carbs }),
        ...(recipe.nutritionalInfo.fat && { "fatContent": recipe.nutritionalInfo.fat }),
        ...(recipe.nutritionalInfo.fiber && { "fiberContent": recipe.nutritionalInfo.fiber })
      }
    }),
    ...(recipe.dietaryInfo && {
      "suitableForDiet": recipe.dietaryInfo.map(d => 
        d.toLowerCase().includes('vegan') ? 'https://schema.org/VeganDiet' :
        d.toLowerCase().includes('vegetarian') ? 'https://schema.org/VegetarianDiet' :
        d.toLowerCase().includes('gluten') ? 'https://schema.org/GlutenFreeDiet' : undefined
      ).filter(Boolean)
    }),
    ...(recipe.youtubeVideoId && {
      "video": {
        "@type": "VideoObject",
        "name": `How to make ${recipe.name}`,
        "description": `Video tutorial: ${recipe.description}`,
        "thumbnailUrl": `https://img.youtube.com/vi/${recipe.youtubeVideoId}/hqdefault.jpg`,
        "embedUrl": `https://www.youtube.com/embed/${recipe.youtubeVideoId}`,
        "uploadDate": "2025-01-01"
      }
    })
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Recipes", "item": "https://tribeguess.com/recipes" },
      { "@type": "ListItem", "position": 2, "name": recipe.tribeName, "item": `https://tribeguess.com/learn/${recipe.tribeSlug}` },
      { "@type": "ListItem", "position": 3, "name": recipe.name, "item": `https://tribeguess.com/recipe/${recipe.id}` }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{recipe.name} ({recipe.tribeName} Recipe): Ingredients, History & How to Cook | TribeGuess</title>
        <meta name="description" content={`Learn how to make ${recipe.name}${recipe.localName ? ` (${recipe.localName})` : ''}, a traditional ${recipe.tribeName} dish from Africa. ${recipe.description.slice(0, 120)} Prep: ${recipe.prepTime}, Serves: ${recipe.servings}.`} />
        <meta name="keywords" content={`${recipe.name}, ${recipe.localName || ''}, ${recipe.tribeName} recipe, African food, traditional cuisine, ${recipe.category}, how to cook ${recipe.name}, ${recipe.dietaryInfo?.join(', ') || ''}`} />
        <link rel="canonical" href={`https://tribeguess.com/recipe/${recipe.id}`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${recipe.name} - ${recipe.tribeName} Traditional Recipe`} />
        <meta property="og:description" content={`Authentic ${recipe.tribeName} recipe: ${recipe.description.slice(0, 200)}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tribeguess.com/recipe/${recipe.id}`} />
        {recipe.youtubeVideoId && (
          <meta property="og:image" content={`https://img.youtube.com/vi/${recipe.youtubeVideoId}/hqdefault.jpg`} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${recipe.name} - ${recipe.tribeName} Recipe`} />
        <meta name="twitter:description" content={recipe.description.slice(0, 200)} />
        {recipe.youtubeVideoId && (
          <meta name="twitter:image" content={`https://img.youtube.com/vi/${recipe.youtubeVideoId}/hqdefault.jpg`} />
        )}
        
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(recipeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <Link
            to={`/learn/${recipe.tribeSlug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {recipe.tribeName}
          </Link>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <BookOpen className="w-4 h-4" />
            View All Recipes
          </Link>
        </div>

        {/* Recipe Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-2xl">{categoryEmoji[recipe.category]}</span>
            <Badge variant="outline" className="capitalize">{recipe.category}</Badge>
            <Badge className={difficultyColor[recipe.difficulty]}>{recipe.difficulty}</Badge>
            {recipe.dietaryInfo?.map((info, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                <Leaf className="w-3 h-3 mr-1" />{info}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-1">
            {recipe.name}
          </h1>
          {recipe.localName && (
            <p className="text-sm text-muted-foreground italic mb-3">
              Local name: <span className="font-medium text-foreground">{recipe.localName}</span>
            </p>
          )}
          
          <p className="text-lg text-muted-foreground mb-4">{recipe.description}</p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-primary" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
        </header>

        {/* YouTube Video Tutorial */}
        {recipe.youtubeVideoId && (
          <section className="mb-8">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-600" /> Video Tutorial
            </h2>
            <InlineVideoPlayer
              youtubeId={recipe.youtubeVideoId}
              title={`How to Cook ${recipe.name}`}
              sourceType="RECIPE"
              tribeId={recipe.tribeSlug}
              tribeName={recipe.tribeName}
              originUrl={`/recipe/${recipe.id}`}
              originLabel={`${recipe.name} Recipe`}
              category="recipe"
            />
            <p className="text-xs text-muted-foreground mt-2 italic">
              📺 Scroll away to continue watching in the global player.
            </p>
          </section>
        )}

        {/* Cultural Significance */}
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <span>🌍</span> Cultural Significance
          </h2>
          <p className="text-sm text-muted-foreground">{recipe.culturalSignificance}</p>
        </section>

        {/* Historical Context */}
        {recipe.historicalContext && (
          <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Historical Background
            </h2>
            <p className="text-sm text-amber-700 dark:text-amber-300">{recipe.historicalContext}</p>
          </section>
        )}

        {/* Language Family Cross-Link */}
        {tribeLanguageFamily && (
          <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" /> Language & Culture
            </h2>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              The {recipe.tribeName} people speak a language from the {tribeLanguageFamily.name} family, 
              with {tribeLanguageFamily.totalSpeakers} speakers across {tribeLanguageFamily.geographicSpread.split(' - ')[0]}.
            </p>
            <Link 
              to={`/languages/${tribeLanguageFamily.slug}`}
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <Languages className="w-4 h-4" />
              Explore {tribeLanguageFamily.name} Language Family →
            </Link>
          </section>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-4 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <ChefHat className="w-5 h-5" /> Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-medium">{ing.amount}</span>{' '}
                      <span>{ing.item}</span>
                      {ing.notes && (
                        <span className="text-muted-foreground text-xs block">({ing.notes})</span>
                      )}
                      {ing.substitution && (
                        <span className="text-xs text-green-600 dark:text-green-400 block mt-0.5">↳ Sub: {ing.substitution}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Nutritional Info */}
              {recipe.nutritionalInfo && (
                <div className="pt-3 border-t border-border">
                  <h3 className="font-medium text-sm mb-2 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-500" /> Nutrition (per serving)
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {recipe.nutritionalInfo.calories && (
                      <div className="bg-secondary/50 rounded px-2 py-1">
                        <span className="font-medium">Calories:</span> {recipe.nutritionalInfo.calories}
                      </div>
                    )}
                    {recipe.nutritionalInfo.protein && (
                      <div className="bg-secondary/50 rounded px-2 py-1">
                        <span className="font-medium">Protein:</span> {recipe.nutritionalInfo.protein}
                      </div>
                    )}
                    {recipe.nutritionalInfo.carbs && (
                      <div className="bg-secondary/50 rounded px-2 py-1">
                        <span className="font-medium">Carbs:</span> {recipe.nutritionalInfo.carbs}
                      </div>
                    )}
                    {recipe.nutritionalInfo.fat && (
                      <div className="bg-secondary/50 rounded px-2 py-1">
                        <span className="font-medium">Fat:</span> {recipe.nutritionalInfo.fat}
                      </div>
                    )}
                    {recipe.nutritionalInfo.fiber && (
                      <div className="bg-secondary/50 rounded px-2 py-1 col-span-2">
                        <span className="font-medium">Fiber:</span> {recipe.nutritionalInfo.fiber}
                      </div>
                    )}
                  </div>
                  {recipe.nutritionalInfo.notes && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic">{recipe.nutritionalInfo.notes}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <h2 className="font-semibold text-lg mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-muted-foreground pt-1">{step}</p>
                </li>
              ))}
            </ol>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Chef's Tips</h3>
                <ul className="space-y-1">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300 flex items-start gap-2">
                      <span>•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variations */}
            {recipe.variations && recipe.variations.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">🔄 Variations</h3>
                <ul className="space-y-1">
                  {recipe.variations.map((variation, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">•</span> {variation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Serving Suggestions */}
            {recipe.servingSuggestions && recipe.servingSuggestions.length > 0 && (
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Serving Suggestions
                </h3>
                <ul className="space-y-1">
                  {recipe.servingSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                      <span>→</span> {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Recipes from Same Tribe */}
        {relatedRecipes.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="font-semibold text-lg mb-4">More {recipe.tribeName} Recipes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedRecipes.slice(0, 3).map(related => (
                <Link
                  key={related.id}
                  to={`/recipe/${related.id}`}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span>{categoryEmoji[related.category]}</span>
                    <span className="font-medium">{related.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Similar Recipes from Other Tribes */}
        {similarRecipes.length > 0 && (
          <section className="mt-8 pt-8 border-t border-border">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" /> Similar Dishes from Other Tribes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarRecipes.map(similar => (
                <Link
                  key={similar.id}
                  to={`/recipe/${similar.id}`}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{categoryEmoji[similar.category]}</span>
                    <span className="font-medium text-sm">{similar.name}</span>
                  </div>
                  <Link
                    to={`/learn/${similar.tribeSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary hover:underline"
                  >
                    {similar.tribeName}
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{similar.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse More Link */}
        <div className="mt-10 text-center py-6 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">Discover more traditional African cuisine</p>
          <Button asChild>
            <Link to="/recipes" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Browse All Recipes
            </Link>
          </Button>
        </div>

        <ViralCTAs tribeName={recipe.tribeName} tribeSlug={recipe.tribeSlug} className="mt-8" />
      </main>

      <Footer />
    </div>
  );
}
