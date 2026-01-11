import { AlertCircle, Sparkles, Globe, Search, ArrowRight, Puzzle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NameBreakdown {
  fullName: string;
  prefix?: { text: string; tribes: { name: string; percentage: number }[] };
  suffix?: { text: string; tribes: { name: string; percentage: number }[] };
  root?: { text: string; meaning?: string };
  religiousIndicator?: { type: string; note: string };
}

export interface SimilarName {
  name: string;
  tribe: string;
  tribeSlug: string;
  similarity: number;
}

export interface GlobalMatch {
  origin: string;
  region: string;
  confidence: number;
}

interface NameAnalysisCardProps {
  inputName: string;
  breakdown: NameBreakdown | null;
  similarNames: SimilarName[];
  globalMatches: GlobalMatch[];
  hasResults: boolean;
  topConfidence: number;
}

export function NameAnalysisCard({ 
  inputName, 
  breakdown, 
  similarNames, 
  globalMatches, 
  hasResults,
  topConfidence 
}: NameAnalysisCardProps) {
  const showNoResults = !hasResults || topConfidence < 30;
  const showWeakResults = topConfidence >= 30 && topConfidence < 60;
  
  return (
    <div className="mb-6 space-y-4 animate-fade-in">
      {/* Name Breakdown Analysis */}
      {breakdown && (breakdown.prefix || breakdown.suffix || breakdown.religiousIndicator) && (
        <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/30 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Puzzle className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Name Breakdown</h3>
          </div>
          
          {/* Visual word breakdown */}
          <div className="flex items-center justify-center gap-1 mb-4 p-3 bg-background/80 rounded-lg">
            {breakdown.prefix && (
              <div className="relative group">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded font-mono text-sm font-bold border-2 border-blue-300 dark:border-blue-700">
                  {breakdown.prefix.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  prefix
                </div>
              </div>
            )}
            {breakdown.root && (
              <div className="relative group">
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded font-mono text-sm font-bold border-2 border-amber-300 dark:border-amber-700">
                  {breakdown.root.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-600 dark:text-amber-400 whitespace-nowrap">
                  root
                </div>
              </div>
            )}
            {breakdown.suffix && (
              <div className="relative group">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded font-mono text-sm font-bold border-2 border-green-300 dark:border-green-700">
                  {breakdown.suffix.text}
                </span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-green-600 dark:text-green-400 whitespace-nowrap">
                  suffix
                </div>
              </div>
            )}
          </div>
          
          {/* Percentage breakdown row */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Pattern Match Confidence</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {breakdown.prefix && breakdown.prefix.tribes.slice(0, 3).map((match, i) => (
                <div key={`prefix-${i}`} className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs">
                  <span className="font-medium text-blue-700 dark:text-blue-300">{match.name}</span>
                  <span className="text-blue-600/70 dark:text-blue-400/70">{match.percentage}%</span>
                </div>
              ))}
              {breakdown.suffix && breakdown.suffix.tribes.slice(0, 3).map((match, i) => (
                <div key={`suffix-${i}`} className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded-full text-xs">
                  <span className="font-medium text-green-700 dark:text-green-300">{match.name}</span>
                  <span className="text-green-600/70 dark:text-green-400/70">{match.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Religious indicator */}
          {breakdown.religiousIndicator && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-xs">
                <span className="text-purple-600 dark:text-purple-400">🕊️ {breakdown.religiousIndicator.type}</span>
                <span className="text-purple-500/80 dark:text-purple-300/80">{breakdown.religiousIndicator.note}</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Global Name Matches */}
      {globalMatches.length > 0 && (
        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Global Name Origins</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {globalMatches.map((match, i) => (
              <Link 
                key={i}
                to="/global-origins"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {match.origin}
                </span>
                <span className="text-xs text-muted-foreground">{match.region}</span>
                <span className="text-xs font-medium px-1.5 py-0.5 bg-secondary rounded text-muted-foreground">
                  {match.confidence}%
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            This name may have origins outside Africa. <Link to="/global-origins" className="text-primary hover:underline">Explore global origins →</Link>
          </p>
        </div>
      )}
      
      {/* No Results / Weak Results Message */}
      {showNoResults && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                We couldn't confidently identify "{inputName}"
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                This name doesn't match our African naming patterns database. It may be a unique spelling, 
                a non-African name, or simply not in our records yet.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link 
                  to="/global-origins" 
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  Check global origins
                </Link>
                <span className="text-amber-500">•</span>
                <Link 
                  to="/learn" 
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
                >
                  <Search className="w-3 h-3" />
                  Browse all tribes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showWeakResults && !showNoResults && (
        <div className="p-3 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ Low confidence match. Results below are our best guesses based on partial pattern matching.
          </p>
        </div>
      )}
      
      {/* Similar Names Suggestions */}
      {similarNames.length > 0 && (
        <div className="p-4 bg-background rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Similar Names in Database</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Did you mean one of these? Names with similar spelling patterns:
          </p>
          <div className="flex flex-wrap gap-2">
            {similarNames.slice(0, 6).map((similar, i) => (
              <a
                key={i}
                href={`/?name=${encodeURIComponent(similar.name)}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
              >
                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {similar.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({similar.tribe})
                </span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}