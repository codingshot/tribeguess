import { memo } from 'react';
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

export const FeaturedRecipesCarousel = memo(function FeaturedRecipesCarousel() {
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
            <CarouselItem key={recipe.id} className="pl-2 sm:pl-4 basis-[88%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <Link
                to={`/recipe/${recipe.id}`}
                className="block group h-full"
              >
                <div className="card-landing-tile p-4 sm:p-5 h-full flex flex-col min-h-[200px] sm:min-h-[210px]">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-3xl leading-none" aria-hidden>{categoryEmojis[recipe.category] || '🍽️'}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base leading-snug line-clamp-2 pr-1">
                    {recipe.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mt-2 leading-snug">
                    {recipe.tribeName}
                    <span className="text-xs text-muted-foreground/80"> · traditional dish</span>
                  </p>
                  
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed flex-1">
                    {recipe.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/80">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 shrink-0" aria-hidden />
                      <span>{recipe.servings} servings</span>
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
});