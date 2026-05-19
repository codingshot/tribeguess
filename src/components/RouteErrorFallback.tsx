import { Link } from 'react-router-dom';
import { ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRouteRecoveryContent, type RecoveryVariant } from '@/lib/routeContext';
import { cn } from '@/lib/utils';

interface RouteErrorFallbackProps {
  variant: RecoveryVariant;
  pathname: string;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
  showStatusCode?: boolean;
}

export function RouteErrorFallback({
  variant,
  pathname,
  errorMessage,
  onRetry,
  className,
  showStatusCode = variant === 'not-found',
}: RouteErrorFallbackProps) {
  const { headline, subtext, primaryCta, secondaryCtas } = getRouteRecoveryContent(
    pathname,
    variant
  );

  const primaryIsReload = variant === 'error';

  return (
    <div className={cn('text-center max-w-lg mx-auto', className)}>
      {showStatusCode && (
        <div className="mb-6 text-8xl font-bold gradient-gold-text">404</div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{headline}</h1>
      <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">{subtext}</p>

      {errorMessage && import.meta.env.DEV && (
        <p className="text-xs text-destructive/80 mb-4 font-mono break-all">{errorMessage}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
        {primaryIsReload ? (
          <Button
            type="button"
            className="gap-2"
            onClick={() => {
              onRetry?.();
              window.location.reload();
            }}
          >
            <RefreshCw className="w-4 h-4" />
            {primaryCta.label}
          </Button>
        ) : (
          <Button asChild className="gap-2">
            <Link to={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        )}

        {secondaryCtas.map(cta => (
          <Button key={`${cta.href}-${cta.label}`} variant="outline" asChild className="gap-2">
            <Link to={cta.href}>
              {cta.label === 'Home' ? <Home className="w-4 h-4" /> : null}
              {cta.label}
            </Link>
          </Button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back to previous page
      </button>
    </div>
  );
}
