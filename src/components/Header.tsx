import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shuffle, Sparkles, BookOpen, FileText, Menu, X, ChefHat, Globe, Users, HelpCircle, Video, BookMarked, Church, Languages, ArrowLeftRight } from 'lucide-react';
import logo from '@/assets/logo.png';
import { getAllTribes } from '@/lib/tribeDetection';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    setMobileMenuOpen(false);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Guess', icon: Sparkles, mobileOnly: false },
    { path: '/learn', label: 'Learn', icon: BookOpen, mobileOnly: false },
    { path: '/blog', label: 'Blog', icon: FileText, mobileOnly: false },
    { path: '/recipes', label: 'Recipes', icon: ChefHat, mobileOnly: true },
    { path: '/religions', label: 'Religions', icon: Church, mobileOnly: true },
    { path: '/languages', label: 'Languages', icon: Languages, mobileOnly: true },
    { path: '/people', label: 'Famous People', icon: Users, mobileOnly: true },
    { path: '/names', label: 'Names Gallery', icon: BookMarked, mobileOnly: true },
    { path: '/quiz', label: 'Culture Quiz', icon: HelpCircle, mobileOnly: true },
    { path: '/video-gallery', label: 'Video Gallery', icon: Video, mobileOnly: true },
    { path: '/global-origins', label: 'Global Origins', icon: Globe, mobileOnly: true },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <nav className="flex items-center justify-between gap-2" aria-label="Main navigation">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" aria-label="TribeGuess home">
            <img 
              src={logo} 
              alt="TribeGuess" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              width={40}
              height={40}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-foreground font-tribal tracking-wide">
              Tribe<span className="text-primary">Guess</span>
            </span>
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            {navLinks.filter(l => !l.mobileOnly).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) && !(link.path === '/' && (location.pathname.startsWith('/learn') || location.pathname.startsWith('/blog')))
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleRandomTribe}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg"
              aria-label="Discover a random tribe"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden md:inline">Random Tribe</span>
              <span className="md:hidden">Random</span>
            </button>
          </div>

          {/* Mobile nav row */}
          <div className="flex sm:hidden items-center gap-1">
            {navLinks.filter(l => !l.mobileOnly).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 touch-manipulation ${
                  isActive(link.path) && !(link.path === '/' && (location.pathname.startsWith('/learn') || location.pathname.startsWith('/blog')))
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <link.icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors touch-manipulation"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-3 py-3">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.filter(l => l.mobileOnly).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobile}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <link.icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <button
                onClick={handleRandomTribe}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white touch-manipulation"
              >
                <Shuffle className="w-4 h-4" />
                Discover a Random Tribe
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}