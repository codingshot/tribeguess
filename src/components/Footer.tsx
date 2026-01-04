import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Footer() {
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
              <Link to="/random" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Random Tribe
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cultural Blog
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
