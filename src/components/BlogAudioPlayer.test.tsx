import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BlogAudioPlayer } from '@/components/BlogAudioPlayer';

function mockSpeechSynthesis() {
  const speak = vi.fn();
  const cancel = vi.fn();
  const pause = vi.fn();
  const resume = vi.fn();
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();

  const synth = {
    speak,
    cancel,
    pause,
    resume,
    getVoices: vi.fn(() => [] as SpeechSynthesisVoice[]),
    paused: false,
    pending: false,
    speaking: false,
    addEventListener,
    removeEventListener,
  };

  vi.stubGlobal('speechSynthesis', synth as unknown as SpeechSynthesis);
  return { speak, cancel, synth };
}

describe('BlogAudioPlayer', () => {
  beforeEach(() => {
    class MockUtterance {
      text = '';
      rate = 1;
      pitch = 1;
      volume = 1;
      voice: SpeechSynthesisVoice | null = null;
      onboundary: ((ev: SpeechSynthesisEvent) => void) | null = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((ev: SpeechSynthesisErrorEvent) => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance as unknown as typeof SpeechSynthesisUtterance);
    mockSpeechSynthesis();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete (globalThis as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance;
  });

  it('renders the article audio region when speech API exists', () => {
    render(<BlogAudioPlayer title="Test Article" content="Hello world." />);
    expect(screen.getByRole('region', { name: /article audio player/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /play article narration/i })).toBeTruthy();
  });

  it('calls speak when play is clicked', () => {
    const { speak } = mockSpeechSynthesis();
    render(<BlogAudioPlayer title="Title" content="Body text." />);
    const playButtons = screen.getAllByRole('button', { name: /play article narration/i });
    fireEvent.click(playButtons[0]);
    expect(speak).toHaveBeenCalledTimes(1);
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toContain('Title');
    expect(utterance.text).toContain('Body');
  });

  it('returns null when speechSynthesis is missing', () => {
    vi.unstubAllGlobals();
    // @ts-expect-error intentional removal for test
    delete (window as { speechSynthesis?: SpeechSynthesis }).speechSynthesis;
    const { container } = render(<BlogAudioPlayer title="T" content="C" />);
    expect(container.firstChild).toBeNull();
  });
});
