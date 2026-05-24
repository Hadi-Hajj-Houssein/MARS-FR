import { useEffect, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const { playLaunch } = useAudio();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    playLaunch();
    const phases = [
      { duration: 1500, label: 'INITIALIZING SYSTEMS', end: 25 },
      { duration: 1500, label: 'LOADING MARS DATABASE', end: 50 },
      { duration: 1500, label: 'CALIBRATING INSTRUMENTS', end: 75 },
      { duration: 1200, label: 'PREPARING FOR LAUNCH', end: 100 },
    ];

    let phaseIdx = 0;
    let accumulated = 0;

    const runPhase = () => {
      if (phaseIdx >= phases.length) {
        setTimeout(() => onLoadComplete(), 500);
        return;
      }

      const p = phases[phaseIdx];
      setPhase(phaseIdx);

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / p.duration, 1);
        const prevEnd = phaseIdx === 0 ? 0 : phases[phaseIdx - 1].end;
        const newProgress = prevEnd + (p.end - prevEnd) * t;
        setProgress(newProgress);

        if (t >= 1) {
          clearInterval(interval);
          phaseIdx++;
          accumulated += p.duration;
          setTimeout(runPhase, 200);
        }
      }, 20);
    };

    runPhase();
  }, [playLaunch, onLoadComplete]);

  const phases = ['INITIALIZING SYSTEMS', 'LOADING MARS DATABASE', 'CALIBRATING INSTRUMENTS', 'PREPARING FOR LAUNCH'];
  const labels = phases.slice(0, phase + 1);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center" style={{ zIndex: 200 }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(232, 98, 26, 0.5)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="font-orbitron text-4xl font-bold glow-text-red mb-2">MARS NEXUS</div>
          <div className="font-mono-tech text-xs tracking-widest" style={{ color: 'rgba(193, 68, 14, 0.6)' }}>
            MISSION CONTROL ALPHA
          </div>
        </div>

        {/* Progress section */}
        <div className="w-80 mx-auto mb-6">
          {/* Progress bar */}
          <div
            className="h-1.5 rounded-full overflow-hidden mb-6 glow-border"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '0.5px solid rgba(193,68,14,0.3)',
            }}
          >
            <div
              className="h-full rounded-full progress-bar-fill"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #c1440e, #e8621a, #f59e0b)`,
                boxShadow: '0 0 12px rgba(232,98,26,0.7)',
                transition: 'width 0.2s ease-out',
              }}
            />
          </div>

          {/* Status text */}
          <div className="font-mono-tech text-xs mb-4" style={{ color: 'rgba(245,158,11,0.8)', letterSpacing: '0.15em' }}>
            {Math.round(progress)}%
          </div>

          {/* Phase labels */}
          <div className="space-y-2">
            {labels.map((label, i) => (
              <div
                key={i}
                className="font-mono-tech text-xs animate-slide-up"
                style={{
                  color: i === labels.length - 1 ? 'rgba(232,98,26,0.9)' : 'rgba(193,68,14,0.4)',
                  letterSpacing: '0.1em',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                &gt; {label}
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic lines */}
        <div className="mt-8 space-y-1">
          <div
            className="h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(232,98,26,0.6), transparent)',
              animation: 'warpLines 1.5s ease-in-out infinite',
            }}
          />
          <div
            className="h-0.5"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(193,68,14,0.4), transparent)',
              animation: 'warpLines 2s ease-in-out infinite 0.3s',
            }}
          />
        </div>
      </div>

      {/* Corner brackets */}
      <div className="fixed top-8 left-8 w-16 h-16 border-2 border-transparent" style={{ borderTopColor: 'rgba(232,98,26,0.5)', borderLeftColor: 'rgba(232,98,26,0.5)' }} />
      <div className="fixed top-8 right-8 w-16 h-16 border-2 border-transparent" style={{ borderTopColor: 'rgba(232,98,26,0.5)', borderRightColor: 'rgba(232,98,26,0.5)' }} />
      <div className="fixed bottom-8 left-8 w-16 h-16 border-2 border-transparent" style={{ borderBottomColor: 'rgba(232,98,26,0.5)', borderLeftColor: 'rgba(232,98,26,0.5)' }} />
      <div className="fixed bottom-8 right-8 w-16 h-16 border-2 border-transparent" style={{ borderBottomColor: 'rgba(232,98,26,0.5)', borderRightColor: 'rgba(232,98,26,0.5)' }} />
    </div>
  );
}
