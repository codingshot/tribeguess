import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, ListPlus, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { VideoItem, getYoutubeThumbnail, isValidYoutubeId } from '@/lib/videoAggregation';
import { cn } from '@/lib/utils';

interface InlineVideoPlayerProps {
  youtubeId: string;
  title?: string;
  sourceType?: VideoItem['sourceType'];
  tribeId?: string;
  tribeName?: string;
  originUrl?: string;
  originLabel?: string;
  category?: string;
  className?: string;
}

// YouTube IFrame API loader
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Shared YouTube API state
let ytApiReady = false;
const ytApiCallbacks: (() => void)[] = [];

function ensureYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    // Already ready
    if (ytApiReady && window.YT?.Player) {
      resolve();
      return;
    }
    
    ytApiCallbacks.push(resolve);
    
    // Check if API is already loaded
    if (window.YT?.Player) {
      ytApiReady = true;
      ytApiCallbacks.forEach(cb => cb());
      ytApiCallbacks.length = 0;
      return;
    }
    
    // Check if script exists but not loaded yet
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (existingScript) {
      // Wait for existing script
      return;
    }
    
    // Load the script
    const existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      existingReady?.();
      ytApiCallbacks.forEach(cb => cb());
      ytApiCallbacks.length = 0;
    };
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
}

// Preload YouTube API
ensureYouTubeApi();

export function InlineVideoPlayer({
  youtubeId,
  title,
  sourceType = 'YOUTUBE_GENERIC',
  tribeId,
  tribeName,
  originUrl,
  originLabel,
  category,
  className,
}: InlineVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [ytReady, setYtReady] = useState(false);
  
  const { playNow, addToQueue } = useGlobalVideoPlayer();
  
  const video: VideoItem = {
    id: `inline-${youtubeId}`,
    youtube: youtubeId,
    youtubeId,
    title: title || 'Video',
    thumbnailUrl: getYoutubeThumbnail(youtubeId),
    sourceType,
    tribeIds: tribeId ? [tribeId] : [],
    tribeNames: tribeName ? [tribeName] : [],
    originUrl,
    originLabel,
    category,
  };
  
  // Check if YouTube API is ready
  useEffect(() => {
    if (window.YT?.Player) {
      setYtReady(true);
    } else {
      ensureYouTubeApi().then(() => setYtReady(true));
    }
  }, []);
  
  // Handle scroll - transfer to global player when out of view
  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            // Transfer to global player
            const currentTime = playerRef.current?.getCurrentTime?.() || 0;
            playNow({ ...video, id: `global-${youtubeId}` });
            
            // Clean up inline player
            if (playerRef.current) {
              try {
                playerRef.current.destroy();
              } catch {}
              playerRef.current = null;
            }
            setIsPlaying(false);
            setShowThumbnail(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [isPlaying, video, playNow, youtubeId]);
  
  const handlePlay = useCallback(() => {
    if (!ytReady || !playerContainerRef.current) return;
    
    setShowThumbnail(false);
    
    // Create unique player ID
    const playerId = `inline-player-${youtubeId}-${Date.now()}`;
    
    // Clear container
    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = '';
      const playerDiv = document.createElement('div');
      playerDiv.id = playerId;
      playerContainerRef.current.appendChild(playerDiv);
    }
    
    playerRef.current = new window.YT.Player(playerId, {
      height: '100%',
      width: '100%',
      videoId: youtubeId,
      playerVars: {
        playsinline: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (state === window.YT.PlayerState.PAUSED || 
                     state === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
        onError: () => {
          setShowThumbnail(true);
          setIsPlaying(false);
        }
      }
    });
  }, [ytReady, youtubeId]);
  
  const handleAddToQueue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQueue(video, { dedupeByYoutubeId: true });
  };
  
  const handleTransferToGlobal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playNow(video);
    
    // Clean up inline player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
    }
    setIsPlaying(false);
    setShowThumbnail(true);
  };
  
  if (!isValidYoutubeId(youtubeId)) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full aspect-video rounded-lg overflow-hidden bg-muted", className)}
    >
      {showThumbnail ? (
        <>
          <img 
            src={getYoutubeThumbnail(youtubeId)}
            alt={title || 'Video thumbnail'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              onClick={handlePlay}
            >
              <Play className="h-7 w-7" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-11 w-11 rounded-full shadow-lg"
              onClick={handleAddToQueue}
              title="Add to queue"
            >
              <ListPlus className="h-5 w-5" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div ref={playerContainerRef} className="w-full h-full" />
          {isPlaying && (
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-black/70 hover:bg-black/90 text-white"
                onClick={handleTransferToGlobal}
                title="Move to global player"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-black/70 hover:bg-black/90 text-white"
                onClick={handleAddToQueue}
                title="Add to queue"
              >
                <ListPlus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
