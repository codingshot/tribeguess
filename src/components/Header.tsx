import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="TribeGuess" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
            />
            <span className="font-serif text-xl font-bold text-foreground">
              Tribe<span className="text-primary">Guess</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Guess
            </Link>
            <Link
              to="/learn"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/learn') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Learn
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
