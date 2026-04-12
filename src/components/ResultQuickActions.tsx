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
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-3">
      {/* Primary Actions Row */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors touch-manipulation"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Result
        </button>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors touch-manipulation"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <button
          onClick={onToggleFavorite}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors touch-manipulation"
        >
          {isFavorite ? <HeartOff className="w-3.5 h-3.5 text-red-500" /> : <Heart className="w-3.5 h-3.5" />}
          {isFavorite ? 'Unsave' : 'Save Name'}
        </button>
      </div>

      {/* Explore More Actions */}
      <div className="flex flex-wrap gap-2">
        {topTribeSlug && (
          <>
            <Link
              to={`/learn/${topTribeSlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Learn about {topTribeName}
            </Link>
            <Link
              to={`/people?tribe=${encodeURIComponent(topTribeName || '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground bg-secondary/50 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Famous {topTribeName} people
            </Link>
            <Link
              to={`/recipes?tribe=${encodeURIComponent(topTribeName || '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground bg-secondary/50 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <Utensils className="w-3.5 h-3.5" />
              {topTribeName} recipes
            </Link>
          </>
        )}
        <Link
          to="/compare"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground bg-secondary/50 border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          <Scale className="w-3.5 h-3.5" />
          Compare tribes
        </Link>
      </div>

      {/* Try Related Names */}
      {relatedNames.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Shuffle className="w-3 h-3" />
            Try these related names:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {relatedNames.slice(0, 8).map(name => (
              <a
                key={name}
                href={`/?name=${encodeURIComponent(name)}&country=${country}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-secondary/50 rounded-lg hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-colors touch-manipulation"
              >
                {name}
                <ArrowRight className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
