import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChefHat, Clock, Users, Filter, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllRecipes, getRecipeTribeNames, type Recipe } from '@/data/recipes';

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

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const selectedTribe = searchParams.get('tribe') || '';
  
  const allRecipes = getAllRecipes();
  const tribeNames = getRecipeTribeNames();

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesSearch = !search || 
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase()) ||
        recipe.tribeName.toLowerCase().includes(search.toLowerCase());
      
      const matchesTribe = !selectedTribe || recipe.tribeSlug === selectedTribe;
      
      return matchesSearch && matchesTribe;
    });
  }, [allRecipes, search, selectedTribe]);

  const handleTribeFilter = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === selectedTribe) {
      newParams.delete('tribe');
    } else {
      newParams.set('tribe', slug);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearch('');
    setSearchParams({});
  };

  const hasFilters = search || selectedTribe;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Traditional African Recipes | TribeGuess</title>
        <meta name="description" content="Discover authentic traditional recipes from African tribes. Browse dishes from Kikuyu, Yoruba, Maasai, Zulu and more." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
              <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              Traditional African Recipes
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore authentic dishes and beverages from tribes across Africa
            </p>
          </header>

          {/* Search & Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recipes by name, tribe, or description..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Tribe Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter by tribe:</span>
              </div>
              {tribeNames.map(tribe => (
                <button
                  key={tribe.slug}
                  onClick={() => handleTribeFilter(tribe.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    selectedTribe === tribe.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  {tribe.name}
                </button>
              ))}
            </div>

            {/* Active Filters & Clear */}
            {hasFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
                </span>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs gap-1">
                  <X className="w-3 h-3" />
                  Clear filters
                </Button>
              </div>
            )}
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No recipes found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="bg-card border border-border rounded-xl p-4 hover:border-primary hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{categoryEmoji[recipe.category]}</span>
        <Badge variant="outline" className="capitalize text-xs">{recipe.category}</Badge>
        <Badge className={`text-xs ${difficultyColor[recipe.difficulty]}`}>{recipe.difficulty}</Badge>
      </div>

      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
        {recipe.name}
      </h3>

      <Link
        to={`/learn/${recipe.tribeSlug}`}
        onClick={(e) => e.stopPropagation()}
        className="text-xs text-primary hover:underline mb-2 inline-block"
      >
        {recipe.tribeName} Tribe
      </Link>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {recipe.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}