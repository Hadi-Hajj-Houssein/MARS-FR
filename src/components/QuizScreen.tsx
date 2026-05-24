import { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { Question } from '../data/questions';
import { RadarWidget, HoloBar, MissionTimer } from './UIElements';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
  score: number;
  elapsedTime: number;
}

export function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  score,
  elapsedTime,
}: QuizScreenProps) {
  const { playClick, playCorrect, playWrong } = useAudio();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    playClick();
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === question.correct) {
      playCorrect();
    } else {
      playWrong();
    }
    setTimeout(() => {
      onAnswer(selected);
    }, 600);
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ zIndex: 10 }}>
      {/* Top HUD */}
      <div className="flex justify-between items-start p-6 glassmorphism-light border-b border-orange-900 border-opacity-20">
        <div>
          <div className="font-orbitron text-xs tracking-widest mb-2" style={{ color: 'rgba(193,68,14,0.6)' }}>
            {question.mission}
          </div>
          <div className="font-mono-tech text-xs" style={{ color: 'rgba(245,158,11,0.7)' }}>
            Q{questionNumber}/{totalQuestions} • {question.category}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
            MISSION ELAPSED
          </div>
          <div className="font-mono-tech text-lg" style={{ color: 'rgba(245,158,11,0.9)' }}>
            <MissionTimer seconds={elapsedTime} />
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
            SCORE
          </div>
          <div className="font-orbitron text-xl font-bold glow-text-red">{score}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Question */}
          <div className="mb-12 animate-fade-scale">
            <div className="glassmorphism rounded-lg p-8 mb-8 glow-border">
              <h2 className="font-orbitron text-2xl font-bold mb-4" style={{ color: 'rgba(245,158,11,0.95)' }}>
                {question.question}
              </h2>
            </div>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(193,68,14,0.2)' }}>
                <div
                  className="h-full"
                  style={{
                    width: `${(questionNumber / totalQuestions) * 100}%`,
                    background: 'linear-gradient(90deg, #c1440e, #e8621a)',
                    boxShadow: '0 0 8px rgba(232,98,26,0.5)',
                  }}
                />
              </div>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`answer-option glassmorphism-light rounded-lg p-6 text-left transition-all ${
                    selected === i ? 'answer-selected' : ''
                  } ${answered && i === question.correct ? 'border-green-500 bg-green-950 bg-opacity-10' : ''} ${
                    answered && selected === i && i !== question.correct ? 'border-red-500 bg-red-950 bg-opacity-10' : ''
                  }`}
                  style={{
                    borderColor: selected === i ? 'rgba(245,158,11,0.7)' : 'rgba(193,68,14,0.3)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-orbitron font-bold text-sm"
                      style={{
                        background:
                          selected === i
                            ? 'rgba(245,158,11,0.2)'
                            : answered && i === question.correct
                              ? 'rgba(34,197,94,0.2)'
                              : answered && selected === i && i !== question.correct
                                ? 'rgba(239,68,68,0.2)'
                                : 'rgba(193,68,14,0.1)',
                        color:
                          selected === i
                            ? 'rgba(245,158,11,0.9)'
                            : answered && i === question.correct
                              ? 'rgba(34,197,94,0.9)'
                              : answered && selected === i && i !== question.correct
                                ? 'rgba(239,68,68,0.9)'
                                : 'rgba(232,98,26,0.6)',
                        border: selected === i ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(193,68,14,0.2)',
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="flex-1">
                      <p
                        className="font-rajdhani text-sm leading-relaxed"
                        style={{
                          color:
                            answered && i === question.correct
                              ? 'rgba(34,197,94,0.9)'
                              : answered && selected === i && i !== question.correct
                                ? 'rgba(239,68,68,0.9)'
                                : 'rgba(200,200,200,0.85)',
                        }}
                      >
                        {opt}
                      </p>
                    </div>
                    {answered && i === question.correct && <span className="text-lg">✓</span>}
                    {answered && selected === i && i !== question.correct && <span className="text-lg">✗</span>}
                  </div>
                </button>
              ))}
            </div>

            {/* Submit button */}
            {!answered && (
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className="btn-mars px-12 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  SUBMIT ANSWER
                </button>
              </div>
            )}

            {answered && (
              <div className="flex justify-center">
                <button onClick={() => onAnswer(selected)} className="btn-mars px-12 py-3 text-sm">
                  NEXT MISSION
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side panels */}
      <div className="fixed right-6 bottom-6 space-y-4">
        <div className="glassmorphism rounded-lg p-4" style={{ width: 180 }}>
          <div className="font-mono-tech text-xs mb-3" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
            SYSTEM STATUS
          </div>
          <HoloBar label="OXYGEN" value={85} />
          <HoloBar label="POWER" value={72} />
          <HoloBar label="HULL" value={94} />
        </div>
        <div className="glassmorphism rounded-lg p-4 flex justify-center" style={{ width: 180 }}>
          <RadarWidget />
        </div>
      </div>

      {/* Left side info */}
      <div className="fixed left-6 bottom-6 glassmorphism rounded-lg p-4" style={{ maxWidth: 280 }}>
        <div className="font-mono-tech text-xs mb-2" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.1em' }}>
          MISSION BRIEFING
        </div>
        <p className="font-rajdhani text-xs leading-relaxed" style={{ color: 'rgba(200,200,200,0.65)' }}>
          Answer questions about Mars exploration and survival. Knowledge of the Red Planet is critical for mission success.
        </p>
      </div>
    </div>
  );
}
