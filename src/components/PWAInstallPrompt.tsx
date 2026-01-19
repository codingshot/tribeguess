import { useState, useEffect } from 'react';
import { Download, X, Share, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if user previously dismissed
    const wasDismissed = localStorage.getItem('pwa-install-dismissed');
    if (wasDismissed) {
      const dismissedAt = parseInt(wasDismissed, 10);
      // Show again after 7 days
      if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
        setDismissed(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      handleDismiss();
    }
  };

  // Don't show if already installed or dismissed
  if (isInstalled || dismissed) return null;

  // Show iOS instructions
  if (isIOS) {
    return (
      <>
        {!showIOSInstructions ? (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4">
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Install TribeGuess</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Add to your home screen for the best experience
                </p>
                <Button 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => setShowIOSInstructions(true)}
                >
                  <Share className="h-4 w-4 mr-2" />
                  How to Install
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-xl p-6 max-w-sm w-full">
              <button 
                onClick={() => { setShowIOSInstructions(false); handleDismiss(); }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-lg font-bold mb-4">Install on iOS</h2>
              
              <ol className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Tap the <Share className="inline h-4 w-4" /> Share button in Safari</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Scroll down and tap "Add to Home Screen"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span>Tap "Add" to install TribeGuess</span>
                </li>
              </ol>
              
              <Button 
                className="mt-6 w-full" 
                variant="outline"
                onClick={() => { setShowIOSInstructions(false); handleDismiss(); }}
              >
                Got it!
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show standard install prompt (Android/Desktop)
  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Install TribeGuess</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Works offline • Faster access • Home screen icon
          </p>
          <Button size="sm" className="mt-3 w-full" onClick={handleInstall}>
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
        </div>
      </div>
    </div>
  );
}
