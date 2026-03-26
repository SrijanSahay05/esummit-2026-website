'use client';

import { useRef, useCallback } from 'react';

export function useAudioSystem() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  }, []);

  const playBeep = useCallback((freq = 440, duration = 0.08, type: OscillatorType = 'square') => {
    if (!enabledRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.04;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const playHoverSound = useCallback(() => playBeep(880, 0.04), [playBeep]);

  const playClickSound = useCallback(() => {
    playBeep(660, 0.05);
    setTimeout(() => playBeep(880, 0.05), 50);
  }, [playBeep]);

  const toggleAudio = useCallback(() => {
    initAudio();
    enabledRef.current = !enabledRef.current;
    if (enabledRef.current) {
      playBeep(988, 0.08);
      setTimeout(() => playBeep(1319, 0.12), 80);
    }
    return enabledRef.current;
  }, [initAudio, playBeep]);

  const enableAudio = useCallback(() => {
    initAudio();
    enabledRef.current = true;
  }, [initAudio]);

  return {
    playBeep,
    playHoverSound,
    playClickSound,
    toggleAudio,
    enableAudio,
    isEnabled: () => enabledRef.current,
  };
}
