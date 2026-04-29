import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChefHat, Clock, Users, Filter, X, Leaf, Globe, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllRecipes, getRecipeTribeNames, recipeRegions, type Recipe, type RecipeRegion } from '@/data/recipes';
import { getAllIngredients } from '@/data/ingredients';
import { CrossSectionSearchHints } from '@/components/CrossSectionSearchHints';

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

// Country code to name mapping
const countryNames: Record<string, string> = {
  KE: 'Kenya', NG: 'Nigeria', GH: 'Ghana', ZA: 'South Africa', ET: 'Ethiopia',
  TZ: 'Tanzania', UG: 'Uganda', CD: 'DR Congo', SN: 'Senegal', CM: 'Cameroon',
  MA: 'Morocco', DZ: 'Algeria', TN: 'Tunisia', EG: 'Egypt', SD: 'Sudan',
  RW: 'Rwanda', BI: 'Burundi', SO: 'Somalia', ER: 'Eritrea', DJ: 'Djibouti',
  MW: 'Malawi', ZM: 'Zambia', ZW: 'Zimbabwe', BW: 'Botswana', NA: 'Namibia',
  AO: 'Angola', MZ: 'Mozambique', LS: 'Lesotho', SZ: 'Eswatini', MG: 'Madagascar',
  CF: 'Central African Republic', CG: 'Congo', GA: 'Gabon', TD: 'Chad',
  ML: 'Mali', NE: 'Niger', BF: 'Burkina Faso', CI: "Côte d'Ivoire", BJ: 'Benin', TG: 'Togo',
  LY: 'Libya', MR: 'Mauritania', SS: 'South Sudan'
};

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const selectedTribe = searchParams.get('tribe') || '';
  const selectedRegion = searchParams.get('region') || '';
  const selectedCountry = searchParams.get('country') || '';
  const [showRegionalView, setShowRegionalView] = useState(!!selectedRegion);
  
  const allRecipes = getAllRecipes();
  const tribeNames = getRecipeTribeNames();
  
  // Get unique countries from recipes
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    allRecipes.forEach(recipe => {
      if (recipe.country) countries.add(recipe.country);
    });
    return Array.from(countries).sort((a, b) => 
      (countryNames[a] || a).localeCompare(countryNames[b] || b)
    );
  }, [allRecipes]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesSearch = !search || 
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase()) ||
        recipe.tribeName.toLowerCase().includes(search.toLowerCase());
      
      const matchesTribe = !selectedTribe || recipe.tribeSlug === selectedTribe;
      const matchesRegion = !selectedRegion || recipe.region === selectedRegion;
      const matchesCountry = !selectedCountry || recipe.country === selectedCountry;
      
      return matchesSearch && matchesTribe && matchesRegion && matchesCountry;
    });
  }, [allRecipes, search, selectedTribe, selectedRegion, selectedCountry]);

  const handleTribeFilter = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === selectedTribe) {
      newParams.delete('tribe');
    } else {
      newParams.set('tribe', slug);
    }
    setSearchParams(newParams);
  };

  const handleRegionFilter = (region: RecipeRegion) => {
    const newParams = new URLSearchParams(searchParams);
    if (region === selectedRegion) {
      newParams.delete('region');
    } else {
      newParams.set('region', region);
      newParams.delete('tribe'); // Clear tribe when selecting region
      newParams.delete('country');
    }
    setSearchParams(newParams);
  };

  const handleCountryFilter = (country: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (country === selectedCountry) {
      newParams.delete('country');
    } else {
      newParams.set('country', country);
      newParams.delete('tribe');
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

  const toggleRegionalView = () => {
    setShowRegionalView(!showRegionalView);
    if (showRegionalView) {
      // Switching to tribe view - clear region/country filters
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('region');
      newParams.delete('country');
      setSearchParams(newParams);
    } else {
      // Switching to regional view - clear tribe filter
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('tribe');
      setSearchParams(newParams);
    }
  };

  const hasFilters = search || selectedTribe || selectedRegion || selectedCountry;

  // Get recipe counts by region for display
  const recipeCountsByRegion = useMemo(() => {
    const counts: Record<string, number> = {};
    recipeRegions.forEach(r => counts[r.id] = 0);
    allRecipes.forEach(recipe => {
      if (recipe.region) counts[recipe.region]++;
    });
    return counts;
  }, [allRecipes]);

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

          {/* Regional Cuisines Toggle */}
          <section className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-amber-500/10 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-base">Regional Cuisines</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRegionalView}
                className="gap-2"
              >
                {showRegionalView ? (
                  <>
                    <ToggleRight className="w-4 h-4 text-primary" />
                    <span className="hidden sm:inline">Switch to</span> Tribe View
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Switch to</span> Region View
                  </>
                )}
              </Button>
            </div>
            
            {showRegionalView && (
              <div className="mt-4 space-y-4">
                {/* Region Pills */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>Filter by region:</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-hide">
                    {recipeRegions.map(region => (
                      <button
                        key={region.id}
                        onClick={() => handleRegionFilter(region.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                          selectedRegion === region.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80 text-foreground'
                        }`}
                      >
                        <span>{region.emoji}</span>
                        <span>{region.name}</span>
                        <span className="text-[10px] opacity-70">({recipeCountsByRegion[region.id]})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Pills (if region selected) */}
                {selectedRegion && availableCountries.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>🏳️</span>
                      <span>Filter by country:</span>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-hide">
                      {availableCountries.map(countryCode => (
                        <button
                          key={countryCode}
                          onClick={() => handleCountryFilter(countryCode)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                            selectedCountry === countryCode
                              ? 'bg-amber-600 text-white'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          {countryNames[countryCode] || countryCode}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Ingredients Section */}
          <section className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-primary/5 rounded-xl border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
              <h2 className="font-semibold text-sm sm:text-base">Traditional Ingredients</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
              Explore the staple foods and ingredients that define African cuisine
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {getAllIngredients().map(ingredient => (
                <Link 
                  key={ingredient.id} 
                  to={`/ingredient/${ingredient.id}`}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-background rounded-full text-xs font-medium hover:bg-primary/10 border border-border hover:border-primary/30 transition-colors"
                >
                  {ingredient.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Search & Filters */}
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm"
              />
            </div>

            {/* Tribe Filter Pills - Only show when not in regional view */}
            {!showRegionalView && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Filter by tribe:</span>
                </div>
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-hide">
                  {tribeNames.map(tribe => (
                    <button
                      key={tribe.slug}
                      onClick={() => handleTribeFilter(tribe.slug)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                        selectedTribe === tribe.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      }`}
                    >
                      {tribe.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters & Clear */}
            {hasFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
                </span>
                {selectedRegion && (
                  <Badge variant="secondary" className="text-xs">
                    {recipeRegions.find(r => r.id === selectedRegion)?.name}
                  </Badge>
                )}
                {selectedCountry && (
                  <Badge variant="secondary" className="text-xs">
                    {countryNames[selectedCountry]}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 sm:h-7 text-xs gap-1 px-2">
                  <X className="w-3 h-3" />
                  Clear
                </Button>
              </div>
            )}
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-muted-foreground mb-4">No recipes found matching your criteria.</p>
              {search.trim().length >= 2 && (
                <CrossSectionSearchHints query={search} className="max-w-xl" />
              )}
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
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
      className="bg-card border border-border rounded-xl p-3 sm:p-4 hover:border-primary hover:shadow-md transition-all group flex flex-col"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
        <span className="text-lg sm:text-xl">{categoryEmoji[recipe.category]}</span>
        <Badge variant="outline" className="capitalize text-[10px] sm:text-xs px-1.5 sm:px-2">{recipe.category}</Badge>
        <Badge className={`text-[10px] sm:text-xs px-1.5 sm:px-2 ${difficultyColor[recipe.difficulty]}`}>{recipe.difficulty}</Badge>
      </div>

      <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
        {recipe.name}
      </h3>

      <Link
        to={`/learn/${recipe.tribeSlug}`}
        onClick={(e) => e.stopPropagation()}
        className="text-[10px] sm:text-xs text-primary hover:underline mb-1.5 sm:mb-2 inline-block"
      >
        {recipe.tribeName} Tribe
      </Link>

      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mb-2 sm:mb-3 flex-grow">
        {recipe.description}
      </p>

      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground mt-auto">
        <div className="flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>Serves {recipe.servings}</span>
        </div>
      </div>
    </Link>
  );
}