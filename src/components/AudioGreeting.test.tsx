import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { AudioGreeting } from '@/components/AudioGreeting';

function mockSpeechWithVoices() {
  const speak = vi.fn();
  const cancel = vi.fn();
  const voices: SpeechSynthesisVoice[] = [
    { lang: 'sw-KE', name: 'Swahili', default: true, localService: true, voiceURI: 'x' },
  ] as SpeechSynthesisVoice[];

  const synth = {
    speak,
    cancel,
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => voices),
    paused: false,
    pending: false,
    speaking: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  vi.stubGlobal('speechSynthesis', synth as unknown as SpeechSynthesis);
  return { speak, cancel, synth };
}

describe('AudioGreeting', () => {
  beforeEach(() => {
    class MockUtterance {
      text = '';
      rate = 1;
      pitch = 1;
      volume = 1;
      voice: SpeechSynthesisVoice | null = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((ev: SpeechSynthesisErrorEvent) => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance as unknown as typeof SpeechSynthesisUtterance);
    mockSpeechWithVoices();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete (globalThis as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance;
  });

  it('renders phrase, mapped phonetic, and meaning', () => {
    render(
      <AudioGreeting phrase="Jambo" meaning="Hello in Swahili" languageName="Kiswahili" />
    );
    expect(screen.getByText(/"Jambo"/)).toBeTruthy();
    expect(screen.getByText(/\[JAHM-boh\]/)).toBeTruthy();
    expect(screen.getByText('Hello in Swahili')).toBeTruthy();
  });

  it('calls speak when play is clicked', async () => {
    const { speak } = mockSpeechWithVoices();
    render(<AudioGreeting phrase="Test phrase" meaning="Meaning" />);
    fireEvent.click(screen.getByRole('button', { name: /play pronunciation/i }));
    await waitFor(() => expect(speak).toHaveBeenCalledTimes(1));
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('Test phrase');
  });

  it('does not throw when speechSynthesis is missing', () => {
    vi.unstubAllGlobals();
    // @ts-expect-error intentional removal for test
    delete (window as { speechSynthesis?: SpeechSynthesis }).speechSynthesis;

    render(<AudioGreeting phrase="Hi" meaning="Greeting" />);
    fireEvent.click(screen.getByRole('button', { name: /play pronunciation/i }));
    expect(screen.getByText(/"Hi"/)).toBeTruthy();
  });
});
