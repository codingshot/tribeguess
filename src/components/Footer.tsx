import { Link, useNavigate } from 'react-router-dom';
import { Shuffle } from 'lucide-react';
import logo from '@/assets/logo.png';
import { recipes } from '@/data/recipes';

export function Footer() {
  const navigate = useNavigate();

  const handleRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
    navigate(`/recipe/${randomRecipe.id}`);
  };

  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logo} alt="" className="w-8 h-8" />
              <span className="text-lg font-bold font-tribal">
                Tribe<span className="text-primary">Guess</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the rich cultural diversity of African tribes through names, traditions, and history.
            </p>
          </div>
          
          {/* Explore */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Explore</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Guess a Tribe
              </Link>
              <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Tribes
              </Link>
              <Link to="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Traditional Recipes
              </Link>
              <Link to="/random" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Random Tribe
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cultural Blog
              </Link>
              <Link to="/religion-timeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Religion Timeline
              </Link>
              <Link to="/religions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Traditional Religions
              </Link>
            </nav>
          </div>
          
          {/* Popular Regions */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Regions</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/learn?country=KE" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🇰🇪 Kenya
              </Link>
              <Link to="/learn?country=NG" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🇳🇬 Nigeria
              </Link>
              <Link to="/learn?country=ET" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🇪🇹 Ethiopia
              </Link>
              <Link to="/learn?country=ZA" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🇿🇦 South Africa
              </Link>
            </nav>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Random Recipe Button */}
        <div className="mt-6 pt-6 border-t border-border">
          <button
            onClick={handleRandomRecipe}
            className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Shuffle className="w-4 h-4" />
            Discover a Random Recipe
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} TribeGuess. Educational entertainment about African tribes and ethnic groups.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for African culture
          </p>
        </div>
      </div>
    </footer>
  );
}
