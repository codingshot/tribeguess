import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRecipeById, getRecipesByTribe } from '@/data/recipes';
import { ArrowLeft, Clock, Users, ChefHat, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist.</p>
          <Link to="/learn" className="text-primary hover:underline">
            ← Back to tribes
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedRecipes = getRecipesByTribe(recipe.tribeSlug).filter(r => r.id !== recipe.id);

  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const categoryEmoji = {
    staple: '🍚',
    beverage: '🥤',
    special: '🍖',
    snack: '🥜'
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{recipe.name} - Traditional {recipe.tribeName} Recipe | African Tribes</title>
        <meta name="description" content={`Learn how to make ${recipe.name}, a traditional ${recipe.tribeName} dish. ${recipe.description}`} />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <Link
          to={`/learn/${recipe.tribeSlug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {recipe.tribeName}
        </Link>

        {/* Recipe Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
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

        {/* Cultural Significance */}
        <section className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <span>🌍</span> Cultural Significance
          </h2>
          <p className="text-sm text-muted-foreground">{recipe.culturalSignificance}</p>
        </section>

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

        {/* Related Recipes */}
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
      </main>

      <Footer />
    </div>
  );
}
