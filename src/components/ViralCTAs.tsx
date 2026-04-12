import { Link } from 'react-router-dom';
import { Sparkles, Share2, ArrowLeftRight, BookMarked } from 'lucide-react';
import { ShareButton } from '@/components/ShareButton';

interface ViralCTAsProps {
  tribeName?: string;
  tribeSlug?: string;
  className?: string;
}

/**
 * Growth loop CTAs — appears on every major page.
 * "Guess your tribe" + share + compare + name origin.
 */
export function ViralCTAs({ tribeName, tribeSlug, className = '' }: ViralCTAsProps) {
  return (
    <section className={`bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 sm:p-6 border border-primary/20 ${className}`}>
      <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Explore More
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {tribeName
          ? `Enjoyed learning about the ${tribeName}? Try these next!`
          : 'Discover your heritage and share it with friends.'}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/"
          className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium">Guess Your Tribe</span>
        </Link>
        <Link
          to="/compare"
          className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
        >
          <ArrowLeftRight className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium">Compare Tribes</span>
        </Link>
        <Link
          to="/names"
          className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
        >
          <BookMarked className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium">Name Origins</span>
        </Link>
        <div className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border text-center">
          <Share2 className="w-5 h-5 text-primary" />
          <ShareButton
            title={tribeName ? `Learn about the ${tribeName} tribe` : 'Discover African Tribes on TribeGuess'}
            url={tribeSlug ? `/learn/${tribeSlug}` : '/tribes'}
            description={tribeName ? `Discover the ${tribeName} people - their culture, names, and history.` : 'Explore 350+ African tribes, their cultures, names, and traditions.'}
          />
        </div>
      </div>
    </section>
  );
}
