import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalVideoPlayer, PLAYBACK_SPEEDS } from '@/contexts/GlobalVideoPlayerContext';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Repeat, List, Minimize2, Maximize2, Video, VideoOff,
  X, ChevronUp, ChevronDown, ExternalLink, Loader2, Shuffle,
  PictureInPicture2, Expand, Gauge, GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { VideoQueueDrawer } from './VideoQueueDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
    // Already loaded
    if (ytApiLoaded && window.YT?.Player) {
      resolve();
      return;
    }
    
    // Check if already loaded but we haven't marked it
    if (window.YT?.Player) {
      ytApiLoaded = true;
      resolve();
      return;
    }
    
    ytApiCallbacks.push(resolve);
    
    if (ytApiLoading) return;
    ytApiLoading = true;
    
    const existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      ytApiLoaded = true;
      ytApiLoading = false;
      existingReady?.();
      ytApiCallbacks.forEach(cb => cb());
      ytApiCallbacks.length = 0;
    };
    
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag?.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }
  });
}

// Preload YouTube API immediately
if (typeof window !== 'undefined') {
  loadYouTubeApi();
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

type VideoMode = 'center' | 'mini' | 'fullscreen' | 'pip';

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
    playRandom,
    closePlayer,
    playbackSpeed,
    setPlaybackSpeed,
    cyclePlaybackSpeed,
  } = useGlobalVideoPlayer();
  
  const [videoMode, setVideoMode] = useState<VideoMode>('center');
  const [isPiPActive, setIsPiPActive] = useState(false);
  
  // Drag state for PiP/mini mode
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDraggingPlayer, setIsDraggingPlayer] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [ytReady, setYtReady] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  
  // Load YouTube API
  useEffect(() => {
    loadYouTubeApi().then(() => setYtReady(true));
  }, []);
  
  // Initialize player when video changes
  useEffect(() => {
    if (!currentVideo?.youtubeId || !playerContainerRef.current) return;
    
    let isMounted = true;
    
    const initPlayer = () => {
      if (!window.YT?.Player || !isMounted) return;
      
      // Clean up existing player
      if (playerRef.current) {
        try {
          playerRef.current.destroy?.();
        } catch {}
        playerRef.current = null;
      }
      
      // Clear container and create fresh div
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '';
        const playerDiv = document.createElement('div');
        playerDiv.id = `global-yt-player-${Date.now()}`;
        playerContainerRef.current.appendChild(playerDiv);
        
        try {
          playerRef.current = new window.YT.Player(playerDiv.id, {
            height: '100%',
            width: '100%',
            videoId: currentVideo.youtubeId,
            playerVars: {
              playsinline: 1,
              controls: 1,
              rel: 0,
              modestbranding: 1,
              autoplay: 1,
            },
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                try {
                  event.target.setVolume(volume);
                  if (isMuted) event.target.mute();
                  // Apply playback speed
                  event.target.setPlaybackRate?.(playbackSpeed);
                  event.target.playVideo();
                  setPlayerState({ isLoading: false });
                } catch {}
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                try {
                  const state = event.data;
                  if (state === window.YT?.PlayerState?.PLAYING) {
                    setPlayerState({ 
                      isPlaying: true, 
                      isLoading: false,
                      duration: event.target.getDuration?.() || 0
                    });
                  } else if (state === window.YT?.PlayerState?.PAUSED) {
                    setPlayerState({ isPlaying: false });
                  } else if (state === window.YT?.PlayerState?.ENDED) {
                    if (isRepeat) {
                      event.target.seekTo?.(0);
                      event.target.playVideo?.();
                    } else {
                      nextVideo();
                    }
                  } else if (state === window.YT?.PlayerState?.BUFFERING) {
                    setPlayerState({ isLoading: true });
                  }
                } catch {}
              },
              onError: () => {
                if (!isMounted) return;
                setPlayerState({ isLoading: false, isPlaying: false });
                nextVideo();
              }
            }
          });
        } catch (err) {
          console.error('Failed to create YouTube player:', err);
          setPlayerState({ isLoading: false, isPlaying: false });
        }
      }
    };
    
    // If API ready, init immediately, otherwise wait
    if (ytReady && window.YT?.Player) {
      initPlayer();
    } else {
      loadYouTubeApi().then(() => {
        if (isMounted) {
          setYtReady(true);
          initPlayer();
        }
      });
    }
    
    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy?.();
        } catch {}
        playerRef.current = null;
      }
    };
  }, [ytReady, currentVideo?.youtubeId, isRepeat, playbackSpeed]);
  
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
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (!currentVideo) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(100, volume + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 10));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyN':
          e.preventDefault();
          nextVideo();
          break;
        case 'Escape':
          e.preventDefault();
          if (videoMode === 'fullscreen') {
            setVideoMode('center');
          } else {
            closePlayer();
          }
          break;
        case 'KeyF':
          e.preventDefault();
          setVideoMode(videoMode === 'fullscreen' ? 'center' : 'fullscreen');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideo, togglePlay, seekTo, currentTime, duration, setVolume, volume, toggleMute, nextVideo, closePlayer, videoMode]);
  
  const handleSliderChange = useCallback((value: number[]) => {
    setSliderValue(value[0]);
  }, []);
  
  const handleSliderCommit = useCallback((value: number[]) => {
    seekTo(value[0]);
    setIsDragging(false);
  }, [seekTo, setIsDragging]);
  
  // Picture-in-Picture handler
  const togglePiP = useCallback(async () => {
    try {
      // PiP isn't directly available for iframes, so we'll simulate with a floating mini mode
      if (videoMode === 'pip') {
        setVideoMode('center');
        setIsPiPActive(false);
        setDragPosition({ x: 0, y: 0 });
      } else {
        setVideoMode('pip');
        setIsPiPActive(true);
      }
    } catch (err) {
      console.error('PiP error:', err);
    }
  }, [videoMode]);
  
  const toggleFullscreen = useCallback(() => {
    if (videoMode === 'fullscreen') {
      setVideoMode('center');
    } else {
      setVideoMode('fullscreen');
    }
  }, [videoMode]);
  
  const minimizeToCorner = useCallback(() => {
    setVideoMode('mini');
    setDragPosition({ x: 0, y: 0 });
  }, []);
  
  const expandToCenter = useCallback(() => {
    setVideoMode('center');
    setDragPosition({ x: 0, y: 0 });
  }, []);
  
  // Drag handlers for mini/pip mode
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (videoMode !== 'mini' && videoMode !== 'pip') return;
    
    e.preventDefault();
    setIsDraggingPlayer(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      posX: dragPosition.x,
      posY: dragPosition.y,
    };
  }, [videoMode, dragPosition]);
  
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingPlayer) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    setDragPosition({
      x: dragStartRef.current.posX + deltaX,
      y: dragStartRef.current.posY + deltaY,
    });
  }, [isDraggingPlayer]);
  
  const handleDragEnd = useCallback(() => {
    setIsDraggingPlayer(false);
  }, []);
  
  // Add drag event listeners
  useEffect(() => {
    if (isDraggingPlayer) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDragMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDraggingPlayer, handleDragMove, handleDragEnd]);
  
  // Don't render if no current video is playing
  if (!currentVideo) return null;
  
  // Get video container classes based on mode
  const getVideoContainerClasses = () => {
    if (!videoVisible) {
      return "w-1 h-1 -top-[9999px] left-0 opacity-0 pointer-events-none";
    }
    
    switch (videoMode) {
      case 'fullscreen':
        return "fixed inset-0 w-full h-full z-[100] rounded-none";
      case 'mini':
      case 'pip':
        return "fixed z-50";
      case 'center':
      default:
        return "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl aspect-video z-50";
    }
  };
  
  // Get positioning styles for draggable modes
  const getDragStyles = (): React.CSSProperties => {
    if (videoMode === 'mini' || videoMode === 'pip') {
      return {
        right: `${16 - dragPosition.x}px`,
        bottom: `${112 - dragPosition.y}px`,
        width: videoMode === 'pip' ? '384px' : '320px',
        height: videoMode === 'pip' ? '224px' : '192px',
      };
    }
    return {};
  };
  
  return (
    <>
      {/* Video Queue Drawer */}
      <VideoQueueDrawer />
      
      {/* Backdrop for center/fullscreen mode */}
      {videoVisible && (videoMode === 'center' || videoMode === 'fullscreen') && (
        <div 
          className="fixed inset-0 bg-black/80 z-40"
          onClick={() => setVideoMode('mini')}
        />
      )}
      
      {/* Video Container */}
      {currentVideo && (
        <div 
          className={cn(
            "bg-black rounded-lg overflow-hidden shadow-2xl border border-border transition-all duration-300",
            getVideoContainerClasses(),
            (videoMode === 'mini' || videoMode === 'pip') && "cursor-move"
          )}
          style={getDragStyles()}
        >
          {/* Drag Handle for mini/pip modes */}
          {videoVisible && (videoMode === 'mini' || videoMode === 'pip') && (
            <div 
              className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/60 to-transparent z-10 cursor-move flex items-center justify-center"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <GripVertical className="h-4 w-4 text-white/70" />
            </div>
          )}
          
          <div ref={playerContainerRef} className="w-full h-full" />
          
          {/* Video Controls Overlay */}
          {videoVisible && (
            <div className="absolute top-2 right-2 flex items-center gap-1">
              {/* Speed Control */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                    title={`Playback speed: ${playbackSpeed}x`}
                  >
                    <span className="text-xs font-bold">{playbackSpeed}x</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[80px]">
                  {PLAYBACK_SPEEDS.map((speed) => (
                    <DropdownMenuItem
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={cn(
                        "cursor-pointer",
                        playbackSpeed === speed && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {speed}x
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* PiP Button */}
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 bg-black/50 hover:bg-black/70 text-white",
                  isPiPActive && "text-primary"
                )}
                onClick={togglePiP}
                title="Picture-in-Picture"
              >
                <PictureInPicture2 className="h-4 w-4" />
              </Button>
              
              {/* Fullscreen Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={toggleFullscreen}
                title={videoMode === 'fullscreen' ? "Exit fullscreen" : "Fullscreen"}
              >
                {videoMode === 'fullscreen' ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Expand className="h-4 w-4" />
                )}
              </Button>
              
              {/* Minimize to corner */}
              {videoMode !== 'mini' && videoMode !== 'pip' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                  onClick={minimizeToCorner}
                  title="Minimize"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
              
              {/* Expand from corner */}
              {(videoMode === 'mini' || videoMode === 'pip') && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                  onClick={expandToCenter}
                  title="Expand"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
              
              {/* Close/Hide Video */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
                onClick={toggleVideoVisible}
                title="Hide video"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Tribe Tags at bottom */}
          {videoVisible && playbackMeta.tribeNames && playbackMeta.tribeNames.length > 0 && videoMode !== 'mini' && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 max-w-[60%]">
              {playbackMeta.tribeNames.slice(0, 3).map((tribeName, idx) => {
                const tribeId = playbackMeta.tribeIds?.[idx];
                return (
                  <Link
                    key={`${tribeName}-${idx}`}
                    to={tribeId ? `/learn/${tribeId}` : `/learn?q=${encodeURIComponent(tribeName)}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-black/70 hover:bg-black/90 text-white text-xs cursor-pointer"
                    >
                      {tribeName}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Player Bar */}
      <div 
        ref={containerRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg h-12"
      >
        <div className="container mx-auto px-2 sm:px-4 h-full">
          <div className="flex items-center gap-2 h-full">
            {/* Thumbnail */}
            {currentVideo && !videoVisible && playbackMeta.thumbnailUrl && (
              <img 
                src={playbackMeta.thumbnailUrl} 
                alt="" 
                className="w-10 h-7 rounded object-cover flex-shrink-0 cursor-pointer"
                onClick={() => {
                  toggleVideoVisible();
                  setVideoMode('center');
                }}
              />
            )}
            
            {/* Play controls */}
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={previousVideo}>
                <SkipBack className="h-3.5 w-3.5" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8 rounded-full" onClick={togglePlay}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextVideo}>
                <SkipForward className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {/* Time & Progress */}
            <span className="text-xs text-muted-foreground w-8 text-right hidden sm:block">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[sliderValue]}
              max={duration || 100}
              step={1}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              onPointerDown={() => setIsDragging(true)}
              className="flex-1 min-w-[60px]"
            />
            <span className="text-xs text-muted-foreground w-8 hidden sm:block">
              {formatTime(duration)}
            </span>
            
            {/* Title & Tribe tags */}
            <div className="hidden md:flex items-center gap-2 min-w-0 max-w-[200px]">
              <p className="text-xs font-medium truncate">
                {playbackMeta.title || 'Playing...'}
              </p>
              {playbackMeta.tribeNames && playbackMeta.tribeNames.length > 0 && (
                <Link
                  to={playbackMeta.tribeIds?.[0] ? `/learn/${playbackMeta.tribeIds[0]}` : `/learn?q=${encodeURIComponent(playbackMeta.tribeNames[0])}`}
                >
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 hover:bg-primary/10 cursor-pointer">
                    {playbackMeta.tribeNames[0]}
                  </Badge>
                </Link>
              )}
            </div>
            
            {/* Right controls */}
            <div className="flex items-center gap-0.5">
              {/* Volume with hover slider */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 hidden sm:flex" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  side="top" 
                  align="center" 
                  className="w-10 h-32 p-2 flex flex-col items-center gap-2"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <Slider
                    orientation="vertical"
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setVolume(v[0])}
                    className="h-20"
                  />
                  <span className="text-[10px] text-muted-foreground">{isMuted ? 0 : volume}%</span>
                </PopoverContent>
              </Popover>
              
              {/* Speed */}
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-7 w-7 hidden sm:flex", playbackSpeed !== 1 && "text-primary")}
                onClick={cyclePlaybackSpeed}
                title={`Speed: ${playbackSpeed}x`}
              >
                <span className="text-[10px] font-bold">{playbackSpeed}x</span>
              </Button>
              
              {/* Repeat */}
              <Button variant="ghost" size="icon" className={cn("h-7 w-7", isRepeat && "text-primary")} onClick={toggleRepeat}>
                <Repeat className="h-3.5 w-3.5" />
              </Button>
              
              {/* Shuffle */}
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={playRandom} title="Shuffle">
                <Shuffle className="h-3.5 w-3.5" />
              </Button>
              
              {/* Video toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-7 w-7", videoVisible && "text-primary")}
                onClick={() => {
                  if (!videoVisible) setVideoMode('center');
                  toggleVideoVisible();
                }}
              >
                {videoVisible ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
              </Button>
              
              {/* Queue */}
              <Button variant="ghost" size="icon" className={cn("h-7 w-7 relative", queueVisible && "text-primary")} onClick={toggleQueueVisible}>
                <List className="h-3.5 w-3.5" />
                {queue.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {queue.length}
                  </span>
                )}
              </Button>
              
              {/* Close */}
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive" onClick={closePlayer}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for fixed player */}
      <div className="h-12" />
    </>
  );
}
