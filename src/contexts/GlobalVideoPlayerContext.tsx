import React, { createContext, useContext, useCallback, useEffect, useState, useRef } from 'react';
import { VideoItem, findUnplayedFallbackVideo, getYoutubeThumbnail } from '@/lib/videoAggregation';
import { toast } from 'sonner';

// Storage keys
const STORAGE_KEYS = {
  currentVideo: 'tribeguess_current_video',
  queue: 'tribeguess_queue',
  volume: 'tribeguess_volume',
  muted: 'tribeguess_muted',
  repeat: 'tribeguess_repeat',
  autoplayNext: 'tribeguess_autoplay_next',
  playedVideos: 'tribeguess_played_videos',
  videoVisible: 'tribeguess_video_visible',
  playerMini: 'tribeguess_player_mini',
  queueVisible: 'tribeguess_queue_visible',
};

const MAX_PLAYED_HISTORY = 50;
const MAX_QUEUE_SIZE = 100;

interface PlayOptions {
  fromOrigin?: boolean;
}

interface AddQueueOptions {
  dedupeByYoutubeId?: boolean;
  position?: 'end' | 'next';
}

interface PlaybackMeta {
  title?: string;
  channelTitle?: string;
  thumbnailUrl?: string;
  originUrl?: string;
  originLabel?: string;
}

interface GlobalVideoPlayerContextType {
  currentVideo: VideoItem | null;
  queue: VideoItem[];
  isPlaying: boolean;
  isLoading: boolean;
  
  playNow: (video: VideoItem, opts?: PlayOptions) => void;
  addToQueue: (video: VideoItem, opts?: AddQueueOptions) => void;
  addManyToQueue: (videos: VideoItem[], opts?: AddQueueOptions) => void;
  
  removeFromQueue: (videoId: string) => void;
  clearQueue: () => void;
  
  togglePlay: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  seekTo: (seconds: number) => void;
  
  setVolume: (value: number) => void;
  volume: number;
  toggleMute: () => void;
  isMuted: boolean;
  
  toggleRepeat: () => void;
  isRepeat: boolean;
  toggleAutoplayNext: () => void;
  isAutoplayNext: boolean;
  
  reorderQueue: (from: number, to: number) => void;
  
  isMini: boolean;
  toggleMini: () => void;
  
  videoVisible: boolean;
  toggleVideoVisible: () => void;
  
  queueVisible: boolean;
  toggleQueueVisible: () => void;
  setQueueVisible: (visible: boolean) => void;
  
  duration: number;
  currentTime: number;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  
  playbackMeta: PlaybackMeta;
  playedVideos: string[];
  
  // Player ref for internal use
  playerRef: React.MutableRefObject<any>;
  setPlayerState: (state: { duration?: number; currentTime?: number; isPlaying?: boolean; isLoading?: boolean }) => void;
  
  hasPlayer: boolean;
}

const GlobalVideoPlayerContext = createContext<GlobalVideoPlayerContextType | null>(null);

export function useGlobalVideoPlayer() {
  const context = useContext(GlobalVideoPlayerContext);
  if (!context) {
    throw new Error('useGlobalVideoPlayer must be used within GlobalVideoPlayerProvider');
  }
  return context;
}

// Helper to safely parse JSON from localStorage
function safeJSONParse<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function GlobalVideoPlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<any>(null);
  
  // State
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(() => 
    safeJSONParse(STORAGE_KEYS.currentVideo, null)
  );
  const [queue, setQueue] = useState<VideoItem[]>(() => 
    safeJSONParse(STORAGE_KEYS.queue, [])
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(() => 
    safeJSONParse(STORAGE_KEYS.volume, 80)
  );
  const [isMuted, setIsMuted] = useState(() => 
    safeJSONParse(STORAGE_KEYS.muted, false)
  );
  const [isRepeat, setIsRepeat] = useState(() => 
    safeJSONParse(STORAGE_KEYS.repeat, false)
  );
  const [isAutoplayNext, setIsAutoplayNext] = useState(() => 
    safeJSONParse(STORAGE_KEYS.autoplayNext, true)
  );
  const [playedVideos, setPlayedVideos] = useState<string[]>(() => 
    safeJSONParse(STORAGE_KEYS.playedVideos, [])
  );
  const [videoVisible, setVideoVisible] = useState(() => 
    safeJSONParse(STORAGE_KEYS.videoVisible, true)
  );
  const [isMini, setIsMini] = useState(() => 
    safeJSONParse(STORAGE_KEYS.playerMini, false)
  );
  const [queueVisible, setQueueVisible] = useState(() => 
    safeJSONParse(STORAGE_KEYS.queueVisible, false)
  );
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentVideo, JSON.stringify(currentVideo));
  }, [currentVideo]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.queue, JSON.stringify(queue.slice(0, MAX_QUEUE_SIZE)));
  }, [queue]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.volume, JSON.stringify(volume));
  }, [volume]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.muted, JSON.stringify(isMuted));
  }, [isMuted]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.repeat, JSON.stringify(isRepeat));
  }, [isRepeat]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.autoplayNext, JSON.stringify(isAutoplayNext));
  }, [isAutoplayNext]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.playedVideos, JSON.stringify(playedVideos.slice(-MAX_PLAYED_HISTORY)));
  }, [playedVideos]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.videoVisible, JSON.stringify(videoVisible));
  }, [videoVisible]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.playerMini, JSON.stringify(isMini));
  }, [isMini]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.queueVisible, JSON.stringify(queueVisible));
  }, [queueVisible]);
  
  // Playback meta
  const playbackMeta: PlaybackMeta = {
    title: currentVideo?.title,
    channelTitle: currentVideo?.channelTitle,
    thumbnailUrl: currentVideo?.thumbnailUrl || (currentVideo?.youtubeId ? getYoutubeThumbnail(currentVideo.youtubeId) : undefined),
    originUrl: currentVideo?.originUrl,
    originLabel: currentVideo?.originLabel,
  };
  
  // Actions
  const playNow = useCallback((video: VideoItem, opts?: PlayOptions) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setIsLoading(true);
    setCurrentTime(0);
    
    // Add to played history
    setPlayedVideos(prev => {
      const filtered = prev.filter(id => id !== video.youtubeId);
      return [...filtered, video.youtubeId].slice(-MAX_PLAYED_HISTORY);
    });
    
    toast.success(`Now playing: ${video.title || 'Video'}`);
  }, []);
  
  const addToQueue = useCallback((video: VideoItem, opts?: AddQueueOptions) => {
    setQueue(prev => {
      // Check for duplicates if requested
      if (opts?.dedupeByYoutubeId) {
        const exists = prev.some(v => v.youtubeId === video.youtubeId) ||
                      currentVideo?.youtubeId === video.youtubeId;
        if (exists) {
          toast.info('Video already in queue');
          return prev;
        }
      }
      
      toast.success(`Added to queue: ${video.title || 'Video'}`);
      
      if (opts?.position === 'next') {
        return [video, ...prev].slice(0, MAX_QUEUE_SIZE);
      }
      return [...prev, video].slice(0, MAX_QUEUE_SIZE);
    });
  }, [currentVideo]);
  
  const addManyToQueue = useCallback((videos: VideoItem[], opts?: AddQueueOptions) => {
    setQueue(prev => {
      let toAdd = videos;
      
      if (opts?.dedupeByYoutubeId) {
        const existingIds = new Set(prev.map(v => v.youtubeId));
        if (currentVideo) existingIds.add(currentVideo.youtubeId);
        toAdd = videos.filter(v => !existingIds.has(v.youtubeId));
      }
      
      if (toAdd.length === 0) {
        toast.info('All videos already in queue');
        return prev;
      }
      
      toast.success(`Added ${toAdd.length} videos to queue`);
      
      if (opts?.position === 'next') {
        return [...toAdd, ...prev].slice(0, MAX_QUEUE_SIZE);
      }
      return [...prev, ...toAdd].slice(0, MAX_QUEUE_SIZE);
    });
  }, [currentVideo]);
  
  const removeFromQueue = useCallback((videoId: string) => {
    setQueue(prev => prev.filter(v => v.id !== videoId));
  }, []);
  
  const clearQueue = useCallback(() => {
    setQueue([]);
    toast.info('Queue cleared');
  }, []);
  
  const togglePlay = useCallback(() => {
    if (!currentVideo && queue.length > 0) {
      // Play first from queue
      const first = queue[0];
      setQueue(prev => prev.slice(1));
      playNow(first);
    } else if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo?.();
      } else {
        playerRef.current.playVideo?.();
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentVideo, queue, isPlaying, playNow]);
  
  const nextVideo = useCallback(() => {
    if (queue.length > 0) {
      const next = queue[0];
      setQueue(prev => prev.slice(1));
      playNow(next);
    } else if (isAutoplayNext) {
      // Find unplayed fallback
      const fallback = findUnplayedFallbackVideo(playedVideos);
      if (fallback) {
        playNow(fallback);
      } else {
        setIsPlaying(false);
        toast.info('Queue empty');
      }
    } else {
      setIsPlaying(false);
    }
  }, [queue, isAutoplayNext, playedVideos, playNow]);
  
  const previousVideo = useCallback(() => {
    // Seek to start
    if (playerRef.current) {
      playerRef.current.seekTo?.(0, true);
      setCurrentTime(0);
    }
  }, []);
  
  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo?.(seconds, true);
      setCurrentTime(seconds);
    }
  }, []);
  
  const setVolume = useCallback((value: number) => {
    setVolumeState(Math.max(0, Math.min(100, value)));
    if (playerRef.current) {
      playerRef.current.setVolume?.(value);
    }
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (playerRef.current) {
        if (prev) {
          playerRef.current.unMute?.();
        } else {
          playerRef.current.mute?.();
        }
      }
      return !prev;
    });
  }, []);
  
  const toggleRepeat = useCallback(() => {
    setIsRepeat(prev => !prev);
  }, []);
  
  const toggleAutoplayNext = useCallback(() => {
    setIsAutoplayNext(prev => !prev);
  }, []);
  
  const reorderQueue = useCallback((from: number, to: number) => {
    setQueue(prev => {
      const newQueue = [...prev];
      const [removed] = newQueue.splice(from, 1);
      newQueue.splice(to, 0, removed);
      return newQueue;
    });
  }, []);
  
  const toggleMini = useCallback(() => {
    setIsMini(prev => !prev);
  }, []);
  
  const toggleVideoVisible = useCallback(() => {
    setVideoVisible(prev => !prev);
  }, []);
  
  const toggleQueueVisible = useCallback(() => {
    setQueueVisible(prev => !prev);
  }, []);
  
  const setPlayerState = useCallback((state: { duration?: number; currentTime?: number; isPlaying?: boolean; isLoading?: boolean }) => {
    if (state.duration !== undefined) setDuration(state.duration);
    if (state.currentTime !== undefined && !isDragging) setCurrentTime(state.currentTime);
    if (state.isPlaying !== undefined) setIsPlaying(state.isPlaying);
    if (state.isLoading !== undefined) setIsLoading(state.isLoading);
  }, [isDragging]);
  
  const value: GlobalVideoPlayerContextType = {
    currentVideo,
    queue,
    isPlaying,
    isLoading,
    playNow,
    addToQueue,
    addManyToQueue,
    removeFromQueue,
    clearQueue,
    togglePlay,
    nextVideo,
    previousVideo,
    seekTo,
    setVolume,
    volume,
    toggleMute,
    isMuted,
    toggleRepeat,
    isRepeat,
    toggleAutoplayNext,
    isAutoplayNext,
    reorderQueue,
    isMini,
    toggleMini,
    videoVisible,
    toggleVideoVisible,
    queueVisible,
    toggleQueueVisible,
    setQueueVisible,
    duration,
    currentTime,
    isDragging,
    setIsDragging,
    playbackMeta,
    playedVideos,
    playerRef,
    setPlayerState,
    hasPlayer: !!currentVideo,
  };
  
  return (
    <GlobalVideoPlayerContext.Provider value={value}>
      {children}
    </GlobalVideoPlayerContext.Provider>
  );
}
