import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalVideoPlayer } from '@/contexts/GlobalVideoPlayerContext';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Repeat, List, Minimize2, Maximize2, Video, VideoOff,
  X, ChevronUp, ChevronDown, ExternalLink, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { VideoQueueDrawer } from './VideoQueueDrawer';

// YouTube IFrame API loader
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

let ytApiLoaded = false;
let ytApiLoading = false;
const ytApiCallbacks: (() => void)[] = [];

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (ytApiLoaded && window.YT?.Player) {
      resolve();
      return;
    }
    
    ytApiCallbacks.push(resolve);
    
    if (ytApiLoading) return;
    ytApiLoading = true;
    
    window.onYouTubeIframeAPIReady = () => {
      ytApiLoaded = true;
      ytApiCallbacks.forEach(cb => cb());
      ytApiCallbacks.length = 0;
    };
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function GlobalVideoPlayer() {
  const {
    currentVideo,
    queue,
    isPlaying,
    isLoading,
    togglePlay,
    nextVideo,
    previousVideo,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isRepeat,
    toggleRepeat,
    isMini,
    toggleMini,
    videoVisible,
    toggleVideoVisible,
    queueVisible,
    toggleQueueVisible,
    duration,
    currentTime,
    isDragging,
    setIsDragging,
    playbackMeta,
    playerRef,
    setPlayerState,
    playNow,
    hasPlayer,
  } = useGlobalVideoPlayer();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [ytReady, setYtReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  
  // Load YouTube API
  useEffect(() => {
    loadYouTubeApi().then(() => setYtReady(true));
  }, []);
  
  // Initialize player when video changes
  useEffect(() => {
    if (!ytReady || !currentVideo?.youtubeId || !playerContainerRef.current) return;
    
    // Clean up existing player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
    }
    
    // Create player container
    const playerId = 'global-yt-player';
    let playerElement = document.getElementById(playerId);
    if (!playerElement) {
      playerElement = document.createElement('div');
      playerElement.id = playerId;
      playerContainerRef.current.appendChild(playerElement);
    }
    
    playerRef.current = new window.YT.Player(playerId, {
      height: '100%',
      width: '100%',
      videoId: currentVideo.youtubeId,
      playerVars: {
        playsinline: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume);
          if (isMuted) event.target.mute();
          setPlayerState({ isLoading: false });
        },
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT.PlayerState.PLAYING) {
            setPlayerState({ 
              isPlaying: true, 
              isLoading: false,
              duration: event.target.getDuration() 
            });
          } else if (state === window.YT.PlayerState.PAUSED) {
            setPlayerState({ isPlaying: false });
          } else if (state === window.YT.PlayerState.ENDED) {
            if (isRepeat) {
              event.target.seekTo(0);
              event.target.playVideo();
            } else {
              nextVideo();
            }
          } else if (state === window.YT.PlayerState.BUFFERING) {
            setPlayerState({ isLoading: true });
          }
        },
        onError: () => {
          setPlayerState({ isLoading: false, isPlaying: false });
          nextVideo();
        }
      }
    });
    
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
        playerRef.current = null;
      }
    };
  }, [ytReady, currentVideo?.youtubeId, isRepeat]);
  
  // Update current time
  useEffect(() => {
    if (!playerRef.current || !isPlaying) return;
    
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime && !isDragging) {
        setPlayerState({ currentTime: playerRef.current.getCurrentTime() });
      }
    }, 250);
    
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, setPlayerState]);
  
  // Sync slider
  useEffect(() => {
    if (!isDragging) {
      setSliderValue(currentTime);
    }
  }, [currentTime, isDragging]);
  
  // Media Session API
  useEffect(() => {
    if ('mediaSession' in navigator && currentVideo) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playbackMeta.title || 'TribeGuess Video',
        artist: playbackMeta.channelTitle || 'TribeGuess',
        artwork: playbackMeta.thumbnailUrl ? [
          { src: playbackMeta.thumbnailUrl, sizes: '320x180', type: 'image/jpeg' }
        ] : []
      });
      
      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('previoustrack', previousVideo);
      navigator.mediaSession.setActionHandler('nexttrack', nextVideo);
    }
  }, [currentVideo, playbackMeta, togglePlay, previousVideo, nextVideo]);
  
  const handleSliderChange = useCallback((value: number[]) => {
    setSliderValue(value[0]);
  }, []);
  
  const handleSliderCommit = useCallback((value: number[]) => {
    seekTo(value[0]);
    setIsDragging(false);
  }, [seekTo, setIsDragging]);
  
  // Don't render if no current video and not mini mode
  if (!showPlayer) return null;
  
  return (
    <>
      {/* Video Queue Drawer */}
      <VideoQueueDrawer />
      
      {/* Player Bar */}
      <div 
        ref={containerRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg transition-all duration-300",
          isMini ? "h-14" : "h-20 sm:h-24"
        )}
      >
        {/* Floating Video Window */}
        {videoVisible && currentVideo && (
          <div className={cn(
            "absolute bg-black rounded-lg overflow-hidden shadow-2xl border border-border transition-all",
            isMini 
              ? "w-24 h-14 -top-16 right-4" 
              : "w-48 h-28 sm:w-64 sm:h-36 -top-32 sm:-top-40 right-4"
          )}>
            <div ref={playerContainerRef} className="w-full h-full" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white"
              onClick={toggleVideoVisible}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        {/* Hidden player container when video not visible */}
        {!videoVisible && currentVideo && (
          <div ref={playerContainerRef} className="absolute -top-[9999px] left-0 w-1 h-1 overflow-hidden" />
        )}
        
        <div className="container mx-auto px-2 sm:px-4 h-full">
          <div className={cn(
            "flex items-center gap-2 sm:gap-4 h-full",
            isMini && "gap-1 sm:gap-2"
          )}>
            {/* Left: Video Info */}
            <div className={cn(
              "flex items-center gap-2 sm:gap-3 min-w-0 flex-1",
              isMini && "max-w-[30%]"
            )}>
              {currentVideo ? (
                <>
                  {!videoVisible && playbackMeta.thumbnailUrl && (
                    <img 
                      src={playbackMeta.thumbnailUrl} 
                      alt="" 
                      className={cn(
                        "rounded object-cover flex-shrink-0",
                        isMini ? "w-10 h-6" : "w-14 h-10 sm:w-16 sm:h-12"
                      )}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={cn(
                      "font-medium truncate",
                      isMini ? "text-xs" : "text-sm"
                    )}>
                      {playbackMeta.title || 'Playing...'}
                    </p>
                    {!isMini && playbackMeta.originLabel && (
                      <Link 
                        to={playbackMeta.originUrl || '#'}
                        className="text-xs text-muted-foreground hover:text-primary truncate flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {playbackMeta.originLabel}
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">TribeGuess Video Player</span>
                </div>
              )}
            </div>
            
            {/* Center: Controls */}
            <div className={cn(
              "flex flex-col items-center gap-1",
              isMini ? "flex-row gap-1" : "min-w-[200px] sm:min-w-[300px]"
            )}>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", isMini && "h-7 w-7")}
                  onClick={previousVideo}
                  disabled={!currentVideo}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="default"
                  size="icon"
                  className={cn(
                    "rounded-full",
                    isMini ? "h-8 w-8" : "h-10 w-10"
                  )}
                  onClick={togglePlay}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", isMini && "h-7 w-7")}
                  onClick={nextVideo}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    isMini && "h-7 w-7",
                    isRepeat && "text-primary"
                  )}
                  onClick={toggleRepeat}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Progress bar */}
              {!isMini && currentVideo && (
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[sliderValue]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSliderChange}
                    onValueCommit={handleSliderCommit}
                    onPointerDown={() => setIsDragging(true)}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-10">
                    {formatTime(duration)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Right: Extra Controls */}
            <div className={cn(
              "flex items-center gap-1 sm:gap-2",
              isMini ? "gap-0.5" : ""
            )}>
              {/* Volume */}
              <div className="hidden sm:flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                {!isMini && (
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setVolume(v[0])}
                    className="w-20"
                  />
                )}
              </div>
              
              {/* Video toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", videoVisible && "text-primary")}
                onClick={toggleVideoVisible}
                title={videoVisible ? "Hide video" : "Show video"}
              >
                {videoVisible ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              
              {/* Queue */}
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8 relative", queueVisible && "text-primary")}
                onClick={toggleQueueVisible}
              >
                <List className="h-4 w-4" />
                {queue.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {queue.length}
                  </span>
                )}
              </Button>
              
              {/* Minimize */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleMini}
              >
                {isMini ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              {/* Close */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowPlayer(false)}
                title="Hide player"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for fixed player */}
      <div className={cn(
        "transition-all duration-300",
        isMini ? "h-14" : "h-20 sm:h-24"
      )} />
    </>
  );
}
