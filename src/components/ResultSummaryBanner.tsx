import { Trophy, Target, TrendingUp, Zap } from 'lucide-react';
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
      "p-4 rounded-xl border mb-4 animate-scale-in",
      isStrong
        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800"
        : isMedium
        ? "bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border-blue-200 dark:border-blue-800"
        : "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800"
    )}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Confidence Gauge */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
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
              "text-sm font-bold",
              isStrong ? "text-green-700 dark:text-green-400" : isMedium ? "text-blue-700 dark:text-blue-400" : "text-amber-700 dark:text-amber-400"
            )}>
              {confidence}%
            </span>
          </div>
        </div>

        {/* Summary Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isStrong ? (
              <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : isMedium ? (
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            )}
            <span className={cn(
              "text-sm font-bold",
              isStrong ? "text-green-800 dark:text-green-200" : isMedium ? "text-blue-800 dark:text-blue-200" : "text-amber-800 dark:text-amber-200"
            )}>
              {isStrong ? 'Strong Match!' : isMedium ? 'Likely Match' : 'Possible Match'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            "<strong className="text-foreground">{inputName}</strong>" most likely belongs to the{' '}
            <strong className="text-foreground">{topTribeName}</strong> tribe
            {totalMatches > 1 && ` (${totalMatches} possible matches)`}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{totalMatches}</div>
            <div className="text-[10px] text-muted-foreground">Matches</div>
          </div>
        </div>
      </div>
    </div>
  );
}
