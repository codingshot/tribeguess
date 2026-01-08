import logo from '@/assets/logo.png';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const ringSize = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <div 
          className={`absolute ${ringSize[size]} rounded-full border-4 border-primary/20 border-t-primary animate-spin`}
          style={{ animationDuration: '1s' }}
        />
        {/* Logo in center */}
        <img
          src={logo}
          alt=""
          className={`${sizeClasses[size]} object-contain animate-pulse`}
        />
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}

export function FullPageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
