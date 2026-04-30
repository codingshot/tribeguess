import { Link } from 'react-router-dom';
import { Copy, Check, Share2, Heart, HeartOff, Users, Utensils, BookOpen, Shuffle, ArrowRight, Scale, Repeat2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CountryFlag } from './CountryFlag';

interface ResultQuickActionsProps {
  inputName: string;
  topTribeName?: string;
  topTribeSlug?: string;
  country: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  relatedNames?: string[];
  muslimEquivalents?: string[];
  westernEquivalents?: string[];
}

export function ResultQuickActions({
  inputName,
  topTribeName,
  topTribeSlug,
  country,
  isFavorite,
  onToggleFavorite,
  relatedNames = [],
  muslimEquivalents = [],
  westernEquivalents = [],
}: ResultQuickActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/?name=${encodeURIComponent(inputName)}&country=${country}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Result link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TribeGuess: "${inputName}" → ${topTribeName || 'Unknown'}`,
          text: topTribeName
            ? `I searched "${inputName}" on TribeGuess and it matched the ${topTribeName} tribe!`
            : `Search "${inputName}" on TribeGuess to discover its tribal origins!`,
          url: shareUrl,
        });
      } catch {
        /* user cancelled share or share failed */
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 p-3 space-y-2.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-9 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors touch-manipulation"
        >
          <Share2 className="w-3.5 h-3.5 shrink-0" aria-hidden />
          Share
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-9 text-xs font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors touch-manipulation"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600 shrink-0" aria-hidden /> : <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-9 text-xs font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors touch-manipulation"
        >
          {isFavorite ? <HeartOff className="w-3.5 h-3.5 text-red-500 shrink-0" aria-hidden /> : <Heart className="w-3.5 h-3.5 shrink-0" aria-hidden />}
          {isFavorite ? 'Unsave' : 'Save'}
        </button>
        {topTribeSlug && (
          <>
            <span className="hidden sm:inline w-px h-5 bg-border shrink-0 mx-0.5" aria-hidden />
            <Link
              to={`/learn/${topTribeSlug}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-9 text-xs text-primary bg-primary/5 border border-primary/20 rounded-md hover:bg-primary/10 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden />
              Learn
            </Link>
            <Link
              to={`/people?tribe=${encodeURIComponent(topTribeName || '')}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-9 text-xs text-foreground bg-secondary/60 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              <Users className="w-3.5 h-3.5 shrink-0" aria-hidden />
              People
            </Link>
            <Link
              to={`/recipes?tribe=${encodeURIComponent(topTribeName || '')}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-9 text-xs text-foreground bg-secondary/60 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              <Utensils className="w-3.5 h-3.5 shrink-0" aria-hidden />
              Recipes
            </Link>
          </>
        )}
        <Link
          to="/compare"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-9 text-xs text-foreground bg-secondary/60 border border-border rounded-md hover:bg-secondary transition-colors"
        >
          <Scale className="w-3.5 h-3.5 shrink-0" aria-hidden />
          Compare
        </Link>
      </div>

      {/* Muslim Equivalents */}
      {muslimEquivalents.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1 border-t border-border/60">
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0">
            <Repeat2 className="w-3 h-3 shrink-0" aria-hidden />
            Muslim equivalent:
          </span>
          {muslimEquivalents.slice(0, 3).map(eq => (
            <a
              key={eq}
              href={`/?name=${encodeURIComponent(eq)}&country=ALL`}
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
            >
              ☪️ {eq.charAt(0).toUpperCase() + eq.slice(1)}
              <ArrowRight className="w-3 h-3 shrink-0 opacity-70" aria-hidden />
            </a>
          ))}
        </div>
      )}

      {/* Western Equivalents (for reverse lookup) */}
      {westernEquivalents.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1 border-t border-border/60">
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0">
            <Repeat2 className="w-3 h-3 shrink-0" aria-hidden />
            Western equivalent:
          </span>
          {westernEquivalents.slice(0, 3).map(eq => (
            <a
              key={eq}
              href={`/?name=${encodeURIComponent(eq)}&country=ALL`}
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              ✝️ {eq}
              <ArrowRight className="w-3 h-3 shrink-0 opacity-70" aria-hidden />
            </a>
          ))}
        </div>
      )}

      {relatedNames.length > 0 && (
        <div className="pt-1 border-t border-border/60">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0">
              <Shuffle className="w-3 h-3 shrink-0" aria-hidden />
              Related:
            </span>
            <div className="flex flex-wrap gap-1">
            {relatedNames.slice(0, 8).map(name => (
              <a
                key={name}
                href={`/?name=${encodeURIComponent(name)}&country=${country}`}
                className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] sm:text-xs bg-secondary/50 rounded-md hover:bg-primary/10 hover:text-primary border border-border/80 hover:border-primary/30 transition-colors touch-manipulation"
              >
                {name}
                <ArrowRight className="w-2.5 h-2.5 opacity-50 shrink-0" aria-hidden />
              </a>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
