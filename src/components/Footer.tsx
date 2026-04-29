import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { recipes } from '@/data/recipes';
import { CountryFlag } from '@/components/CountryFlag';
import { getCuratedCompareFooterLinks } from '@/lib/tribeCompareSuggestions';

export function Footer() {
  // Get a random recipe ID for the link
  const randomRecipeId = recipes.length > 0 ? recipes[Math.floor(Math.random() * recipes.length)]?.id : undefined;
  const compareLinks = getCuratedCompareFooterLinks();

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
              <Link to="/compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Compare Tribes
              </Link>
              <Link to="/people" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Famous People
              </Link>
              <Link to="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Traditional Recipes
              </Link>
              <Link to={`/recipe/${randomRecipeId}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Random Recipe
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
              <Link to="/quiz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🎯 Culture Quiz
              </Link>
              <Link to="/names" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                📊 Names Gallery
              </Link>
              <Link to="/video-gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                🎬 Video Gallery
              </Link>
              <div className="pt-2 mt-1 border-t border-border/60">
                <p className="text-xs font-semibold text-foreground/90 mb-2">Popular tribe comparisons</p>
                <div className="flex flex-col gap-1.5">
                  {compareLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      to={href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          
          {/* Regions */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm">By Country</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/country/kenya" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="KE" size={14} label="Kenya" /> Tribes in Kenya
              </Link>
              <Link to="/country/nigeria" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="NG" size={14} label="Nigeria" /> Tribes in Nigeria
              </Link>
              <Link to="/country/ethiopia" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="ET" size={14} label="Ethiopia" /> Tribes in Ethiopia
              </Link>
              <Link to="/country/south-africa" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="ZA" size={14} label="South Africa" /> Tribes in South Africa
              </Link>
              <Link to="/country/ghana" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="GH" size={14} label="Ghana" /> Tribes in Ghana
              </Link>
              <Link to="/country/tanzania" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                <CountryFlag code="TZ" size={14} label="Tanzania" /> Tribes in Tanzania
              </Link>
              <Link to="/region/east-africa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                → East Africa Tribes
              </Link>
              <Link to="/region/west-africa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                → West Africa Tribes
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
