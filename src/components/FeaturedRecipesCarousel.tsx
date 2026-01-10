import { Link } from 'react-router-dom';
import { ChevronRight, UtensilsCrossed, Clock, Users } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { recipes, Recipe } from '@/data/recipes';

export function FeaturedRecipesCarousel() {
  // Get featured recipes (variety of tribes)
  const featuredRecipes = recipes.slice(0, 15);

  if (featuredRecipes.length === 0) return null;

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-500/20 text-green-700 dark:text-green-300',
    medium: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
    hard: 'bg-red-500/20 text-red-700 dark:text-red-300',
  };

  const categoryEmojis: Record<string, string> = {
    staple: '🍚',
    beverage: '🥤',
    special: '🎉',
    snack: '🍪',
  };

  return (
    <section className="mt-10 sm:mt-14">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-primary" />
          Traditional Recipes
        </h2>
        
        <Link 
          to="/recipes" 
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
        >
          View All Recipes
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {featuredRecipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Link
                to={`/recipe/${recipe.id}`}
                className="block group h-full"
              >
                <div className="bg-card border border-border rounded-xl p-3 sm:p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  {/* Category Emoji & Difficulty */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{categoryEmojis[recipe.category] || '🍽️'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  
                  {/* Recipe Name */}
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm sm:text-base">
                    {recipe.name}
                  </h3>
                  
                  {/* Tribe */}
                  <p className="text-xs text-muted-foreground mt-1">
                    {recipe.tribeName} cuisine
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 flex-grow">
                    {recipe.description}
                  </p>
                  
                  {/* Time & Servings */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </section>
  );
}