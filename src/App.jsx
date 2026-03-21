import { useState, useEffect } from 'react';
import { generateWordSet } from './words';
import WordGrid from './WordGrid';
import StartModal from './StartModal';
import GameHUD from './GameHUD';
import './App.css';

export default function App() {
  const [wordSet] = useState(() => generateWordSet());
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setElapsedTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6">
      {!gameStarted && (
        <StartModal
          totalWords={wordSet.size}
          onStart={() => setGameStarted(true)}
        />
      )}

      <GameHUD
        elapsedTime={elapsedTime}
        foundCount={foundWords.size}
        totalWords={wordSet.size}
      />

      <WordGrid
        wordSet={wordSet}
        onWordFound={word => setFoundWords(prev => new Set([...prev, word]))}
      />
    </div>
  );
}
