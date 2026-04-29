import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface BlogAudioPlayerProps {
  title: string;
  content: string;
}

interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  description: string;
}

const AFRICAN_VOICE_PREFERENCES: VoiceOption[] = [
  { id: 'en-ZA', name: 'English (South Africa)', lang: 'en-ZA', description: 'African English' },
  { id: 'en-NG', name: 'English (Nigeria)', lang: 'en-NG', description: 'African English' },
  { id: 'en-KE', name: 'English (Kenya)', lang: 'en-KE', description: 'African English' },
  { id: 'sw-KE', name: 'Swahili (Kenya)', lang: 'sw-KE', description: 'East African' },
  { id: 'sw-TZ', name: 'Swahili (Tanzania)', lang: 'sw-TZ', description: 'East African' },
  { id: 'yo-NG', name: 'Yoruba (Nigeria)', lang: 'yo-NG', description: 'West African' },
  { id: 'ha-NG', name: 'Hausa (Nigeria)', lang: 'ha-NG', description: 'West African' },
  { id: 'zu-ZA', name: 'Zulu (South Africa)', lang: 'zu-ZA', description: 'Southern African' },
  { id: 'xh-ZA', name: 'Xhosa (South Africa)', lang: 'xh-ZA', description: 'Southern African' },
  { id: 'af-ZA', name: 'Afrikaans', lang: 'af-ZA', description: 'Southern African' },
  { id: 'en-GB', name: 'English (UK)', lang: 'en-GB', description: 'Standard' },
  { id: 'en-US', name: 'English (US)', lang: 'en-US', description: 'Standard' },
];

/** Maximum text length for a single utterance to avoid browser limits */
const MAX_UTTERANCE_LENGTH = 4000;

function getSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  return window.speechSynthesis;
}

type PlayOptions = {
  /** Skip resume path and start a new utterance (e.g. after changing voice while paused). */
  forceRestart?: boolean;
  /** Use this voice id instead of React state (state may not have flushed yet). */
  voiceId?: string;
};

export const BlogAudioPlayer = ({ title, content }: BlogAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('en-ZA');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Must reflect reality on first render: a follow-up effect would run too late and touch `speechSynthesis` before this flips. */
  const [isSupported, setIsSupported] = useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  const [rate, setRate] = useState(0.9);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Chrome bug workaround: speech pauses after ~15s without a keep-alive
  const chromeResumeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalCharsRef = useRef(0);
  const spokenCharsRef = useRef(0);
  const previousVolumeRef = useRef(0.8);
  const progressResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Feature detection (effects run only on client; still guard for unusual embeds)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  // Load voices
  useEffect(() => {
    const synth = getSynth();
    if (!isSupported || !synth) return;

    const loadVoices = () => {
      try {
        setAvailableVoices(synth.getVoices());
      } catch {
        setAvailableVoices([]);
      }
    };

    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  // Cleanup on unmount — stop any speech and clear intervals
  useEffect(() => {
    return () => {
      const synth = getSynth();
      if (isSupported && synth) {
        try {
          synth.cancel();
        } catch {
          /* ignore */
        }
      }
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
      if (progressResetTimeoutRef.current) {
        clearTimeout(progressResetTimeoutRef.current);
        progressResetTimeoutRef.current = null;
      }
    };
  }, [isSupported]);

  const clearTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (chromeResumeRef.current) {
      clearInterval(chromeResumeRef.current);
      chromeResumeRef.current = null;
    }
    if (progressResetTimeoutRef.current) {
      clearTimeout(progressResetTimeoutRef.current);
      progressResetTimeoutRef.current = null;
    }
  }, []);

  // New article / plain-text payload — stop any in-flight speech so we never read stale text
  useEffect(() => {
    const synth = getSynth();
    if (!synth || !isSupported) return;
    try {
      synth.cancel();
    } catch {
      /* ignore */
    }
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setError(null);
    spokenCharsRef.current = 0;
    clearTimers();
  }, [title, content, isSupported, clearTimers]);

  const getMatchingVoice = useCallback((targetLang: string): SpeechSynthesisVoice | null => {
    if (!targetLang?.trim()) {
      return availableVoices[0] ?? null;
    }
    // Try exact match first
    let voice = availableVoices.find(v => v.lang === targetLang);
    if (voice) return voice;

    // Try language prefix match
    const langPrefix = targetLang.split('-')[0];
    if (!langPrefix) return availableVoices[0] ?? null;
    voice = availableVoices.find(v => v.lang.startsWith(langPrefix));
    if (voice) return voice;

    // Fallback to any English voice
    voice = availableVoices.find(v => v.lang.startsWith('en'));
    return voice || availableVoices[0] || null;
  }, [availableVoices]);

  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\[\^\d+\]/g, '') // Remove footnote markers
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert markdown links to text
      .replace(/[*_#`]/g, '') // Remove markdown formatting
      .replace(/https?:\/\/\S+/g, '') // Remove URLs
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\.{3,}/g, '...') // Normalize ellipsis
      .trim();
  };

  const startProgressPollingAndChromeKeepAlive = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (chromeResumeRef.current) {
      clearInterval(chromeResumeRef.current);
      chromeResumeRef.current = null;
    }

    progressIntervalRef.current = setInterval(() => {
      if (synth.speaking && !synth.paused) {
        if (spokenCharsRef.current === 0) {
          spokenCharsRef.current += 12;
          const denom = Math.max(1, totalCharsRef.current);
          setProgress(Math.min((spokenCharsRef.current / denom) * 100, 99));
        }
      }
    }, 100);

    chromeResumeRef.current = setInterval(() => {
      if (synth.speaking && !synth.paused) {
        try {
          synth.pause();
          synth.resume();
        } catch {
          /* ignore */
        }
      }
    }, 10000);
  }, []);

  const handlePlay = useCallback(
    (opts?: PlayOptions) => {
      if (!isSupported) return;
      const synth = getSynth();
      if (!synth) {
        setIsSupported(false);
        return;
      }

      setError(null);

      const voiceKey = opts?.voiceId ?? selectedVoice;

      if (isPaused && !opts?.forceRestart) {
        // React "paused" but engine already finished / cleared — start fresh instead of noop resume
        if (!synth.paused && !synth.speaking && !synth.pending) {
          setIsPaused(false);
          setIsPlaying(false);
        } else {
          try {
            synth.resume();
          } catch {
            setError('Could not resume playback.');
            return;
          }
          setIsPaused(false);
          setIsPlaying(true);
          startProgressPollingAndChromeKeepAlive();
          return;
        }
      }

      // Stop any current speech
      try {
        synth.cancel();
      } catch {
        /* ignore */
      }
      clearTimers();

      const cleanContent = cleanTextForSpeech(typeof content === 'string' ? content : '');
      const fullText = `${title}. ${cleanContent}`.slice(0, MAX_UTTERANCE_LENGTH).trim();
      if (!fullText) {
        setError('Nothing to read for this article.');
        return;
      }
      totalCharsRef.current = fullText.length;
      spokenCharsRef.current = 0;

      const utterance = new SpeechSynthesisUtterance(fullText);
      const voice = getMatchingVoice(voiceKey);

      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = isMuted ? 0 : volume;

      // Use boundary events for accurate progress tracking
      utterance.onboundary = (event) => {
        if (event.charIndex !== undefined) {
          spokenCharsRef.current = event.charIndex;
          const denom = Math.max(1, totalCharsRef.current);
          const newProgress = Math.min((event.charIndex / denom) * 100, 99);
          setProgress(newProgress);
        }
      };

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setError(null);
        startProgressPollingAndChromeKeepAlive();
      };

      utterance.onend = () => {
        utteranceRef.current = null;
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
        clearTimers();
        progressResetTimeoutRef.current = setTimeout(() => {
          progressResetTimeoutRef.current = null;
          setProgress(0);
        }, 2000);
      };

      utterance.onerror = (event) => {
        utteranceRef.current = null;
        setIsPlaying(false);
        setIsPaused(false);
        clearTimers();
        if (event.error === 'interrupted' || event.error === 'canceled') {
          return;
        }
        setError('Playback failed. Your browser may not support this voice.');
      };

      utteranceRef.current = utterance;
      try {
        synth.speak(utterance);
      } catch {
        setError('Playback failed to start.');
        setIsPlaying(false);
        setIsPaused(false);
        clearTimers();
        utteranceRef.current = null;
      }
    },
  [
    title,
    content,
    selectedVoice,
    getMatchingVoice,
    volume,
    isMuted,
    isPaused,
    rate,
    isSupported,
    clearTimers,
    startProgressPollingAndChromeKeepAlive,
  ]);

  const handlePause = useCallback(() => {
    const synth = getSynth();
    if (!synth || (!synth.speaking && !synth.pending)) return;
    try {
      synth.pause();
    } catch {
      return;
    }
    setIsPaused(true);
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (chromeResumeRef.current) {
      clearInterval(chromeResumeRef.current);
      chromeResumeRef.current = null;
    }
  }, []);

  const handleStop = useCallback(() => {
    const synth = getSynth();
    if (synth) {
      try {
        synth.cancel();
      } catch {
        /* ignore */
      }
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setError(null);
    spokenCharsRef.current = 0;
    utteranceRef.current = null;
    clearTimers();
  }, [clearTimers]);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    if (newVolume === undefined) return;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    // Live-update volume on current utterance
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      // Unmute — restore previous volume
      setIsMuted(false);
      setVolume(previousVolumeRef.current || 0.8);
      if (utteranceRef.current) {
        utteranceRef.current.volume = previousVolumeRef.current || 0.8;
      }
    } else {
      // Mute — save current volume
      previousVolumeRef.current = volume;
      setIsMuted(true);
      if (utteranceRef.current) {
        utteranceRef.current.volume = 0;
      }
    }
  }, [isMuted, volume]);

  const handleRateChange = useCallback((value: number[]) => {
    const next = value[0];
    if (next === undefined) return;
    setRate(next);
    // Rate can't be changed live — user will hear the change on next play
  }, []);

  const handleVoiceChange = useCallback(
    (newVoice: string) => {
      const replay = isPlaying || isPaused;
      setSelectedVoice(newVoice);
      if (!replay) return;
      handleStop();
      requestAnimationFrame(() => {
        handlePlay({ forceRestart: true, voiceId: newVoice });
      });
    },
    [isPlaying, isPaused, handleStop, handlePlay]
  );

  if (!isSupported) {
    return null; // Don't render the player if TTS is unavailable
  }

  const voiceOption = AFRICAN_VOICE_PREFERENCES.find(v => v.id === selectedVoice);
  const formattedProgress = progress > 0 && progress < 100 ? `${Math.round(progress)}%` : '';

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50"
      role="region"
      aria-label="Article audio player"
    >
      {/* Progress bar */}
      <div className="h-1 bg-muted" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="h-full bg-primary transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2.5 sm:py-3 gap-2 sm:gap-4">
          {/* Play/Pause/Stop controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {isPlaying ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePause}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 touch-manipulation"
                aria-label="Pause article narration"
              >
                <Pause className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePlay()}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 touch-manipulation"
                aria-label={isPaused ? 'Resume article narration' : 'Play article narration'}
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            )}

            {(isPlaying || isPaused) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStop}
                className="h-9 w-9 text-muted-foreground hover:text-foreground touch-manipulation"
                aria-label="Stop narration"
              >
                <Square className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Title and status */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {error ? (
                <span className="text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 inline flex-shrink-0" />
                  {error}
                </span>
              ) : (
                <>
                  {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Ready to play'}
                  {formattedProgress && ` · ${formattedProgress}`}
                  {voiceOption && <span className="hidden sm:inline"> · {voiceOption.description}</span>}
                </>
              )}
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-9 w-9 touch-manipulation"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-9 w-9 touch-manipulation"
              aria-label={isExpanded ? 'Collapse player settings' : 'Expand player settings'}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded settings panel */}
        {isExpanded && (
          <div className="pb-4 pt-2 border-t border-border space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Voice selector */}
              <div>
                <label htmlFor="voice-select" className="text-xs text-muted-foreground mb-1.5 block font-medium">
                  Voice / Accent
                </label>
                <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                  <SelectTrigger id="voice-select" className="w-full">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {AFRICAN_VOICE_PREFERENCES.map((voice) => {
                      // Mark voices that are actually available on this device
                      const isAvailable = availableVoices.some(v => v.lang === voice.lang);
                      return (
                        <SelectItem key={voice.id} value={voice.id}>
                          <span className="flex items-center gap-2">
                            <span>{voice.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({voice.description}{!isAvailable && ' · fallback'})
                            </span>
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Volume slider */}
              <div>
                <label htmlFor="volume-slider" className="text-xs text-muted-foreground mb-1.5 block font-medium">
                  Volume · {Math.round((isMuted ? 0 : volume) * 100)}%
                </label>
                <Slider
                  id="volume-slider"
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.05}
                  className="w-full"
                  aria-label="Volume"
                />
              </div>

              {/* Speed slider */}
              <div>
                <label htmlFor="speed-slider" className="text-xs text-muted-foreground mb-1.5 block font-medium">
                  Speed · {rate.toFixed(1)}×
                </label>
                <Slider
                  id="speed-slider"
                  value={[rate]}
                  onValueChange={handleRateChange}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  className="w-full"
                  aria-label="Playback speed"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              💡 Some African language voices may not be available on all devices. 
              Speed changes take effect on next play. 
              {availableVoices.length > 0 && ` ${availableVoices.length} voices available on your device.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
