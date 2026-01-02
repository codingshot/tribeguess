import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-2.5 sm:py-3">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="TribeGuess home">
            <img 
              src={logo} 
              alt="" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              width={40}
              height={40}
            />
            <span className="text-lg sm:text-xl font-bold text-foreground font-tribal tracking-wide">
              Tribe<span className="text-primary">Guess</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                isActive('/') && !location.pathname.startsWith('/learn')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              aria-current={isActive('/') && !location.pathname.startsWith('/learn') ? 'page' : undefined}
            >
              Guess
            </Link>
            <Link
              to="/learn"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                isActive('/learn') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              aria-current={isActive('/learn') ? 'page' : undefined}
            >
              Learn
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
