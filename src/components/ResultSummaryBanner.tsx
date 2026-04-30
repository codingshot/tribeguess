import { Trophy, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultSummaryBannerProps {
  inputName: string;
  topTribeName: string;
  confidence: number;
  totalMatches: number;
  matchType?: string;
}

export function ResultSummaryBanner({
  inputName,
  topTribeName,
  confidence,
  totalMatches,
  matchType,
}: ResultSummaryBannerProps) {
  const isStrong = confidence >= 80;
  const isMedium = confidence >= 50 && confidence < 80;

  return (
    <div className={cn(
      "p-3 sm:p-4 rounded-xl border mb-4 animate-scale-in",
      isStrong
        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800"
        : isMedium
        ? "bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border-blue-200 dark:border-blue-800"
        : "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800"
    )}>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Confidence Gauge */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
          <svg className="w-12 h-12 sm:w-14 sm:h-14 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
            <circle
              cx="28" cy="28" r="24" fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(confidence / 100) * 150.8} 150.8`}
              className={cn(
                isStrong ? "stroke-green-500" : isMedium ? "stroke-blue-500" : "stroke-amber-500"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              "text-xs sm:text-sm font-bold",
              isStrong ? "text-green-700 dark:text-green-400" : isMedium ? "text-blue-700 dark:text-blue-400" : "text-amber-700 dark:text-amber-400"
            )}>
              {confidence}%
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-muted-foreground leading-snug">
              {isStrong ? (
                <Trophy className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0" aria-hidden />
              ) : isMedium ? (
                <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden />
              ) : (
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden />
              )}
              <span className={cn(
                "font-semibold",
                isStrong ? "text-green-800 dark:text-green-200" : isMedium ? "text-blue-800 dark:text-blue-200" : "text-amber-800 dark:text-amber-200"
              )}>
                {isStrong ? 'Strong match' : isMedium ? 'Likely match' : 'Possible match'}
              </span>
              <span className="text-muted-foreground/80">·</span>
              <span>
                <strong className="text-foreground">{inputName}</strong>
                {' → '}
                <strong className="text-foreground">{topTribeName}</strong>
                {totalMatches > 1 && (
                  <span className="text-muted-foreground"> ({totalMatches} picks)</span>
                )}
              </span>
            </p>
            {matchType && (
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{matchType}</p>
            )}
          </div>
          <div className="flex sm:flex-col items-baseline sm:items-end gap-1 sm:gap-0 sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-border/50 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums leading-none">{totalMatches}</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground sm:block">Matches</span>
          </div>
        </div>
      </div>
    </div>
  );
}
