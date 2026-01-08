import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRecipeById, getRecipesByTribe, getAllRecipes, type Recipe } from '@/data/recipes';
import { ArrowLeft, Clock, Users, ChefHat, Flame, Search, BookOpen, Play, History, UtensilsCrossed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{recipe.name} - Traditional {recipe.tribeName} Recipe | TribeGuess</title>
        <meta name="description" content={`Learn how to make ${recipe.name}, a traditional ${recipe.tribeName} dish. ${recipe.description}`} />
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
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            {recipe.name}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4">{recipe.description}</p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
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
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${recipe.youtubeVideoId}`}
                title={`How to make ${recipe.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
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
          <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Historical Background
            </h2>
            <p className="text-sm text-amber-700 dark:text-amber-300">{recipe.historicalContext}</p>
          </section>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-4">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
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
                    </div>
                  </li>
                ))}
              </ul>
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
      </main>

      <Footer />
    </div>
  );
}
