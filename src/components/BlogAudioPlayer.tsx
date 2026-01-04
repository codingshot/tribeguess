import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
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
  { id: 'sw-KE', name: 'Swahili (Kenya)', lang: 'sw-KE', description: 'East African' },
  { id: 'sw-TZ', name: 'Swahili (Tanzania)', lang: 'sw-TZ', description: 'East African' },
  { id: 'yo-NG', name: 'Yoruba (Nigeria)', lang: 'yo-NG', description: 'West African' },
  { id: 'ha-NG', name: 'Hausa (Nigeria)', lang: 'ha-NG', description: 'West African' },
  { id: 'zu-ZA', name: 'Zulu (South Africa)', lang: 'zu-ZA', description: 'Southern African' },
  { id: 'xh-ZA', name: 'Xhosa (South Africa)', lang: 'xh-ZA', description: 'Southern African' },
  { id: 'af-ZA', name: 'Afrikaans', lang: 'af-ZA', description: 'Southern African' },
  { id: 'en-ZA', name: 'English (South Africa)', lang: 'en-ZA', description: 'African English' },
  { id: 'en-NG', name: 'English (Nigeria)', lang: 'en-NG', description: 'African English' },
  { id: 'en-KE', name: 'English (Kenya)', lang: 'en-KE', description: 'African English' },
  { id: 'en-GB', name: 'English (UK)', lang: 'en-GB', description: 'Standard' },
  { id: 'en-US', name: 'English (US)', lang: 'en-US', description: 'Standard' },
];

export const BlogAudioPlayer = ({ title, content }: BlogAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('en-ZA');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalCharsRef = useRef(0);
  const spokenCharsRef = useRef(0);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const getMatchingVoice = useCallback((targetLang: string): SpeechSynthesisVoice | null => {
    // Try exact match first
    let voice = availableVoices.find(v => v.lang === targetLang);
    if (voice) return voice;

    // Try language prefix match
    const langPrefix = targetLang.split('-')[0];
    voice = availableVoices.find(v => v.lang.startsWith(langPrefix));
    if (voice) return voice;

    // Fallback to any English voice
    voice = availableVoices.find(v => v.lang.startsWith('en'));
    return voice || availableVoices[0] || null;
  }, [availableVoices]);

  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/\[\^\d+\]/g, '') // Remove footnote markers
      .replace(/[*_#]/g, '') // Remove markdown
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  };

  const handlePlay = useCallback(() => {
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const fullText = `${title}. ${cleanTextForSpeech(content)}`;
    totalCharsRef.current = fullText.length;
    spokenCharsRef.current = 0;

    const utterance = new SpeechSynthesisUtterance(fullText);
    const voice = getMatchingVoice(selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      // Track progress via boundary events
      progressIntervalRef.current = setInterval(() => {
        // Estimate progress based on time (not perfect but functional)
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
          spokenCharsRef.current += 15; // Approximate chars per 100ms
          const newProgress = Math.min((spokenCharsRef.current / totalCharsRef.current) * 100, 99);
          setProgress(newProgress);
        }
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setTimeout(() => setProgress(0), 1000);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [title, content, selectedVoice, getMatchingVoice, volume, isMuted, isPaused]);

  const handlePause = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    spokenCharsRef.current = 0;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const getVoiceDisplayName = (voiceId: string): string => {
    const voiceOption = AFRICAN_VOICE_PREFERENCES.find(v => v.id === voiceId);
    return voiceOption?.name || voiceId;
  };

  const voiceOption = AFRICAN_VOICE_PREFERENCES.find(v => v.id === selectedVoice);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Play/Pause controls */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePause}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Pause className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlay}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            )}

            {(isPlaying || isPaused) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStop}
                className="text-muted-foreground hover:text-foreground"
              >
                Stop
              </Button>
            )}
          </div>

          {/* Title and info */}
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground">
              {isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Ready to play'}
              {voiceOption && ` • ${voiceOption.description}`}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Volume */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-8 w-8"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            {/* Expand button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded controls */}
        {isExpanded && (
          <div className="pb-4 pt-2 border-t border-border space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Voice selector */}
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1.5 block">Voice / Accent</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {AFRICAN_VOICE_PREFERENCES.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        <span className="flex items-center gap-2">
                          <span>{voice.name}</span>
                          <span className="text-xs text-muted-foreground">({voice.description})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Volume slider */}
              <div className="w-full sm:w-48">
                <label className="text-xs text-muted-foreground mb-1.5 block">Volume</label>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              💡 Tip: Some African language voices may not be available on all devices. 
              The player will automatically select the closest available voice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
