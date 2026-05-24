import { useState, useEffect } from 'react';
import { SpaceCanvas } from './components/SpaceCanvas';
import { MarsScene, EarthPlanet, FlyingRocket, Spaceship, RedClouds, FogLayer } from './components/MarsScene';
import { LoadingScreen } from './components/LoadingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AlarmLights, ScanlineEffect } from './components/UIElements';
import { questions } from './data/questions';

type GameState = 'loading' | 'quiz' | 'results';

function App() {
  const [gameState, setGameState] = useState<GameState>('loading');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showAlarm, setShowAlarm] = useState(false);

  useEffect(() => {
    if (gameState !== 'quiz') return;
    const interval = setInterval(() => {
      setElapsedTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const handleLoadComplete = () => {
    setShowAlarm(true);
    setTimeout(() => {
      setGameState('quiz');
      setShowAlarm(false);
    }, 1200);
  };

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setGameState('results');
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setElapsedTime(0);
    setGameState('loading');
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#020408' }}>
      {/* Canvas background */}
      <SpaceCanvas />

      {/* Planets and objects */}
      <MarsScene />
      <EarthPlanet />
      <RedClouds />
      <FogLayer />

      {/* Flying objects */}
      {[0, 1.5, 3].map(d => (
        <FlyingRocket key={`rocket-${d}`} delay={d} top={`${15 + d * 8}%`} scale={0.7 + d * 0.15} />
      ))}
      {[0.5, 2].map(d => (
        <Spaceship key={`ship-${d}`} delay={d} top={`${35 + d * 15}%`} />
      ))}

      {/* Effects */}
      <AlarmLights active={showAlarm} />
      <ScanlineEffect />

      {/* UI Layers */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        {gameState === 'loading' && <LoadingScreen onLoadComplete={handleLoadComplete} />}
        {gameState === 'quiz' && (
          <QuizScreen
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            score={score}
            elapsedTime={elapsedTime}
          />
        )}
        {gameState === 'results' && <ResultsScreen score={score} totalQuestions={questions.length} time={elapsedTime} onRestart={handleRestart} />}
      </div>
    </div>
  );
}

export default App;
