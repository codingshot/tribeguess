import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  confidence: number;
  size?: 'sm' | 'md';
}

export function ConfidenceMeter({ confidence, size = 'sm' }: ConfidenceMeterProps) {
  const isHigh = confidence >= 80;
  const isMed = confidence >= 50;
  const segments = 10;
  const filled = Math.round((confidence / 100) * segments);

  return (
    <div className="flex items-center gap-1.5" role="meter" aria-valuenow={confidence} aria-valuemin={0} aria-valuemax={100} aria-label={`${confidence}% confidence`}>
      <div className={cn("flex gap-0.5", size === 'md' ? 'gap-1' : 'gap-0.5')}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-sm transition-colors",
              size === 'md' ? 'w-2.5 h-4' : 'w-1.5 h-3',
              i < filled
                ? isHigh ? 'bg-green-500' : isMed ? 'bg-blue-500' : 'bg-amber-500'
                : 'bg-secondary'
            )}
          />
        ))}
      </div>
      <span className={cn(
        "font-bold tabular-nums",
        size === 'md' ? 'text-sm' : 'text-xs',
        isHigh ? 'text-green-600 dark:text-green-400' : isMed ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
      )}>
        {confidence}%
      </span>
    </div>
  );
}
