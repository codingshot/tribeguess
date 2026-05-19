import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shuffle, Sparkles, BookOpen, FileText, Menu, X, ChefHat, Globe, Users, HelpCircle, Video, BookMarked, Church, Languages, ArrowLeftRight } from 'lucide-react';
import logo from '@/assets/logo.png';
import { getAllTribes } from '@/lib/tribeDetection';
import { GlobalSearchBar } from '@/components/GlobalSearchBar';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isNavLinkActive = (path: string) =>
    isActive(path) &&
    !(path === '/' && (location.pathname.startsWith('/learn') || location.pathname.startsWith('/blog')));

  const handleRandomTribe = () => {
    const tribes = getAllTribes().filter(
      (t) => t.slug && t.name && t.region && t.description && t.description.length > 10
    );
    if (tribes.length > 0) {
      const randomIndex = Math.floor(Math.random() * tribes.length);
      const randomTribe = tribes[randomIndex];
      navigate(`/learn/${randomTribe.slug}`);
    } else {
      navigate('/learn');
    }
    setMobileMenuOpen(false);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
    }`;

  const navLinks = [
    { path: '/', label: 'Guess', icon: Sparkles, mobileOnly: false },
    { path: '/learn', label: 'Learn', icon: BookOpen, mobileOnly: false },
    { path: '/blog', label: 'Blog', icon: FileText, mobileOnly: false },
    { path: '/tribes', label: 'All Tribes', icon: Globe, mobileOnly: true },
    { path: '/recipes', label: 'Recipes', icon: ChefHat, mobileOnly: true },
    { path: '/religions', label: 'Religions', icon: Church, mobileOnly: true },
    { path: '/languages', label: 'Languages', icon: Languages, mobileOnly: true },
    { path: '/people', label: 'Famous People', icon: Users, mobileOnly: true },
    { path: '/names', label: 'Names Gallery', icon: BookMarked, mobileOnly: true },
    { path: '/quiz', label: 'Culture Quiz', icon: HelpCircle, mobileOnly: true },
    { path: '/video-gallery', label: 'Video Gallery', icon: Video, mobileOnly: true },
    { path: '/global-origins', label: 'Global Origins', icon: Globe, mobileOnly: true },
    { path: '/compare', label: 'Compare', icon: ArrowLeftRight, mobileOnly: false },
  ];

  const primaryNavLinks = navLinks.filter((l) => !l.mobileOnly);

  return (
    <header className="sticky top-0 z-50 overflow-visible bg-background/80 backdrop-blur-md border-b border-border">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {/* Logo + search (desktop) + nav — one row */}
          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 min-w-0">
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2 sm:gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="TribeGuess home"
            >
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
              <span className="hidden sm:inline text-lg sm:text-xl font-bold text-foreground font-tribal tracking-wide whitespace-nowrap">
                Tribe<span className="text-primary">Guess</span>
              </span>
            </Link>

            <GlobalSearchBar className="hidden sm:flex flex-1 min-w-0 max-w-md lg:max-w-xl mx-1 sm:mx-2" />

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-1 shrink-0 flex-nowrap ml-auto">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${navLinkClass(isNavLinkActive(link.path))} px-3 py-2 text-sm whitespace-nowrap`}
                >
                  <link.icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleRandomTribe}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Discover a random tribe"
              >
                <Shuffle className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">Random Tribe</span>
                <span className="md:hidden">Random</span>
              </button>
            </div>

            {/* Mobile nav — icons only + Random CTA */}
            <div className="flex sm:hidden items-center gap-0.5 ml-auto shrink-0 flex-nowrap">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-label={link.label}
                  title={link.label}
                  className={`${navLinkClass(isNavLinkActive(link.path))} justify-center p-2 min-h-[44px] min-w-[44px] shrink-0`}
                >
                  <link.icon className="w-4 h-4 shrink-0" aria-hidden />
                </Link>
              ))}
              <button
                type="button"
                onClick={handleRandomTribe}
                className="flex items-center gap-1 px-2.5 py-2 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Random Tribe"
              >
                <Shuffle className="w-4 h-4 shrink-0" aria-hidden />
                <span className="text-[11px] leading-none">Random Tribe</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors touch-manipulation shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-panel"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <GlobalSearchBar className="sm:hidden w-full min-w-0" />
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-label="More navigation"
          className="sm:hidden border-t border-border bg-background/95 backdrop-blur-md animate-fade-in shadow-[inset_0_1px_0_0_hsl(var(--border))]"
        >
          <div className="container mx-auto px-3 py-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.filter((l) => l.mobileOnly).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobile}
                  className={`${navLinkClass(isActive(link.path))} gap-2 px-3 py-3 min-h-[48px] text-sm`}
                >
                  <link.icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={handleRandomTribe}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
