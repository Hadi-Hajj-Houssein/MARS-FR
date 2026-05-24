import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { RadarWidget, DataStream } from './UIElements';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  time: number;
  onRestart: () => void;
}

export function ResultsScreen({ score, totalQuestions, time, onRestart }: ResultsScreenProps) {
  const { playCorrect } = useAudio();
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    playCorrect();
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(score / 20);
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [score, playCorrect]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const rating =
    percentage >= 90
      ? { text: 'MISSION SUCCESS', color: '#22c55e' }
      : percentage >= 70
        ? { text: 'MISSION PARTIAL SUCCESS', color: '#f59e0b' }
        : percentage >= 50
          ? { text: 'SURVIVAL ACHIEVED', color: '#f97316' }
          : { text: 'MISSION CRITICAL', color: '#ef4444' };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 10 }}>
      <div className="w-full max-w-2xl">
        {/* Main panel */}
        <div className="glassmorphism rounded-lg p-8 mb-6 glow-border">
          {/* Mission result */}
          <div className="text-center mb-8">
            <div className="font-orbitron text-xs tracking-widest mb-2" style={{ color: 'rgba(193,68,14,0.6)' }}>
              MISSION REPORT
            </div>
            <h1 className="font-orbitron text-4xl font-bold mb-4" style={{ color: rating.color, textShadow: `0 0 20px ${rating.color}` }}>
              {rating.text}
            </h1>
            <p className="font-mono-tech text-xs" style={{ color: 'rgba(200,200,200,0.6)', letterSpacing: '0.1em' }}>
              MARS NEXUS MISSION CONTROL ALPHA
            </p>
          </div>

          {/* Score display */}
          <div className="bg-black bg-opacity-40 rounded-lg p-8 mb-8 border border-orange-900 border-opacity-20">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
                  SCORE
                </div>
                <div
                  className="font-orbitron text-4xl font-bold animate-scoreReveal"
                  style={{
                    color: 'rgba(245,158,11,0.95)',
                    textShadow: '0 0 20px rgba(232,98,26,0.6)',
                  }}
                >
                  {displayScore}
                </div>
                <div className="font-mono-tech text-xs mt-1" style={{ color: 'rgba(193,68,14,0.5)' }}>
                  / {totalQuestions}
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
                  ACCURACY
                </div>
                <div className="font-orbitron text-4xl font-bold" style={{ color: 'rgba(245,158,11,0.95)' }}>
                  {percentage}%
                </div>
              </div>
              <div>
                <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
                  TIME
                </div>
                <div className="font-orbitron text-4xl font-bold" style={{ color: 'rgba(245,158,11,0.95)' }}>
                  {formatTime(time)}
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono-tech text-xs" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
                MISSION COMPLETION
              </span>
              <span className="font-mono-tech text-xs" style={{ color: 'rgba(245,158,11,0.9)' }}>
                {percentage}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(193,68,14,0.2)' }}>
              <div
                className="h-full"
                style={{
                  width: `${percentage}%`,
                  background: rating.color,
                  boxShadow: `0 0 12px ${rating.color}`,
                  transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
            <div className="font-mono-tech text-xs mb-3" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
              ANALYSIS
            </div>
            <p className="font-rajdhani text-sm leading-relaxed" style={{ color: 'rgba(200,200,200,0.7)' }}>
              {percentage >= 90
                ? 'Exceptional performance. You have demonstrated comprehensive knowledge of Mars exploration and survival protocols. Recommend for immediate deployment.'
                : percentage >= 70
                  ? 'Good performance. Your knowledge of Mars conditions is solid. Continue training and you will be mission-ready.'
                  : percentage >= 50
                    ? 'Baseline achieved. You possess fundamental Mars knowledge. Recommend additional training modules before deployment.'
                    : 'Critical gaps detected. Extensive additional training required. Review all mission briefing materials.'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button onClick={onRestart} className="btn-mars px-8 py-3 text-sm">
              RESTART MISSION
            </button>
            <a href="/" className="btn-mars px-8 py-3 text-sm inline-block text-center">
              RETURN TO NEXUS
            </a>
          </div>
        </div>

        {/* Side panels */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glassmorphism rounded-lg p-4">
            <div className="font-mono-tech text-xs mb-3" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
              SYSTEM DIAGNOSTICS
            </div>
            <DataStream />
          </div>
          <div className="glassmorphism rounded-lg p-4 flex justify-center items-center">
            <div>
              <div className="font-mono-tech text-xs text-center mb-4" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
                RADAR STATUS
              </div>
              <RadarWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
