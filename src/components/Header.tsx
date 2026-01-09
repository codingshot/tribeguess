import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shuffle, Search, BookOpen, FileText, Flame } from 'lucide-react';
import logo from '@/assets/logo.png';
import { getAllTribes } from '@/lib/tribeDetection';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleRandomTribe = () => {
    const tribes = getAllTribes();
    if (tribes.length > 0) {
      const randomIndex = Math.floor(Math.random() * tribes.length);
      const randomTribe = tribes[randomIndex];
      navigate(`/learn/${randomTribe.slug}`);
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <style>{`
        @keyframes fireFlicker {
          0%, 100% { 
            text-shadow: 0 0 4px #ff6b00, 0 0 8px #ff4500, 0 0 12px #ff0000;
            transform: scale(1);
          }
          25% { 
            text-shadow: 0 0 6px #ff8c00, 0 0 12px #ff6b00, 0 0 18px #ff4500;
            transform: scale(1.02);
          }
          50% { 
            text-shadow: 0 0 8px #ffa500, 0 0 16px #ff8c00, 0 0 24px #ff6b00;
            transform: scale(1.04);
          }
          75% { 
            text-shadow: 0 0 6px #ff8c00, 0 0 12px #ff6b00, 0 0 18px #ff4500;
            transform: scale(1.02);
          }
        }
        .fire-text {
          animation: fireFlicker 1.5s ease-in-out infinite;
          background: linear-gradient(180deg, #fff5e6 0%, #ffd700 25%, #ff8c00 50%, #ff4500 75%, #ff0000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
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
              className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                isActive('/') && !location.pathname.startsWith('/learn') && !location.pathname.startsWith('/blog')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              aria-current={isActive('/') && !location.pathname.startsWith('/learn') && !location.pathname.startsWith('/blog') ? 'page' : undefined}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Guess</span>
            </Link>
            <Link
              to="/learn"
              className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                isActive('/learn') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              aria-current={isActive('/learn') ? 'page' : undefined}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
            </Link>
            <Link
              to="/blog"
              className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                isActive('/blog') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              aria-current={isActive('/blog') ? 'page' : undefined}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <button
              onClick={handleRandomTribe}
              className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg"
              aria-label="Discover a random tribe"
              title="Discover a random tribe"
            >
              <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Random</span>
              <span className="fire-text font-bold">Tribe</span>
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-200 animate-pulse" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
