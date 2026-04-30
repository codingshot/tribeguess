/**
 * Minimal YouTube IFrame API surface used by TribeGuess players.
 * Keeps typings local without @types/youtube dependency.
 */
export type YoutubeIframeInstance = {
  destroy?: () => void;
  stopVideo?: () => void;
  setPlaybackRate?: (rate: number) => void;
  playVideo?: () => void;
  mute?: () => void;
  setVolume?: (volume: number) => void;
  seekTo?: (seconds: number, allowSeekAhead?: boolean) => void;
  getDuration?: () => number;
  getCurrentTime?: () => number;
};

export type YoutubePlayerReadyEvent = { target: YoutubeIframeInstance };

export type YoutubePlayerStateChangeEvent = { target: YoutubeIframeInstance; data: number };

export type YoutubePlayerErrorEvent = { data?: number };

export type YoutubeIFramePlayerOptions = {
  height: string;
  width: string;
  videoId: string;
  playerVars?: Record<string, number>;
  events?: {
    onReady?: (event: YoutubePlayerReadyEvent) => void;
    onStateChange?: (event: YoutubePlayerStateChangeEvent) => void;
    onError?: (event: YoutubePlayerErrorEvent) => void;
  };
};

export type YoutubeIFrameApi = {
  Player: new (elementId: string, options: YoutubeIFramePlayerOptions) => YoutubeIframeInstance;
  PlayerState?: {
    ENDED?: number;
    PLAYING?: number;
    PAUSED?: number;
    BUFFERING?: number;
  };
};

declare global {
  interface Window {
    YT?: YoutubeIFrameApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}
