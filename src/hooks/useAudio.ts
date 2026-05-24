import { useRef, useCallback, useEffect, useState } from 'react';

function createOscillator(
  ctx: AudioContext,
  freq: number,
  type: OscillatorType,
  duration: number,
  gainVal: number = 0.3
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(gainVal, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const [musicOn, setMusicOn] = useState(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    try {
      const ctx = getCtx();
      createOscillator(ctx, 800, 'sine', 0.08, 0.15);
      createOscillator(ctx, 1200, 'sine', 0.05, 0.08);
    } catch {}
  }, [getCtx]);

  const playAlert = useCallback(() => {
    try {
      const ctx = getCtx();
      createOscillator(ctx, 440, 'square', 0.1, 0.2);
      setTimeout(() => createOscillator(ctx, 660, 'square', 0.1, 0.2), 150);
    } catch {}
  }, [getCtx]);

  const playCorrect = useCallback(() => {
    try {
      const ctx = getCtx();
      createOscillator(ctx, 523, 'sine', 0.15, 0.25);
      setTimeout(() => createOscillator(ctx, 659, 'sine', 0.15, 0.25), 120);
      setTimeout(() => createOscillator(ctx, 784, 'sine', 0.2, 0.35), 240);
    } catch {}
  }, [getCtx]);

  const playWrong = useCallback(() => {
    try {
      const ctx = getCtx();
      createOscillator(ctx, 200, 'sawtooth', 0.2, 0.3);
      setTimeout(() => createOscillator(ctx, 150, 'sawtooth', 0.2, 0.3), 100);
    } catch {}
  }, [getCtx]);

  const playLaunch = useCallback(() => {
    try {
      const ctx = getCtx();
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createOscillator(ctx, 80 + i * 20, 'sawtooth', 0.3, 0.1 + i * 0.02);
        }, i * 80);
      }
    } catch {}
  }, [getCtx]);

  const startAmbient = useCallback(() => {
    try {
      const ctx = getCtx();
      if (ambientRef.current) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      osc.frequency.setValueAtTime(65, ctx.currentTime + 4);
      osc.frequency.setValueAtTime(55, ctx.currentTime + 8);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);

      osc.start();
      ambientRef.current = osc;
      ambientGainRef.current = gain;
    } catch {}
  }, [getCtx]);

  const stopAmbient = useCallback(() => {
    try {
      if (ambientRef.current && ambientGainRef.current) {
        ambientGainRef.current.gain.linearRampToValueAtTime(
          0,
          (ctxRef.current?.currentTime ?? 0) + 1
        );
        setTimeout(() => {
          ambientRef.current?.stop();
          ambientRef.current = null;
          ambientGainRef.current = null;
        }, 1100);
      }
    } catch {}
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicOn(prev => {
      if (!prev) {
        startAmbient();
        return true;
      } else {
        stopAmbient();
        return false;
      }
    });
  }, [startAmbient, stopAmbient]);

  useEffect(() => {
    return () => {
      stopAmbient();
      ctxRef.current?.close();
    };
  }, [stopAmbient]);

  return { playClick, playAlert, playCorrect, playWrong, playLaunch, toggleMusic, musicOn };
}
