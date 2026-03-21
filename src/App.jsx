import { useState, useEffect } from 'react';
import { generateWordSet } from './words';
import WordGrid from './WordGrid';
import StartModal from './StartModal';
import GameHUD from './GameHUD';
import './App.css';

function buildLengthStats(words) {
  const counts = new Map();

  for (const word of words) {
    counts.set(word.length, (counts.get(word.length) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([a], [b]) => a - b)
    .map(([length, total]) => ({ length, total }));
}

export default function App() {
  const [wordSet] = useState(() => generateWordSet());
  const [gameStarted, setGameStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());

  const wordLengthStats = buildLengthStats(wordSet);
  const foundByLength = wordLengthStats.map(({ length, total }) => ({
    length,
    total,
    found: Array.from(foundWords).filter(word => word.length === length).length,
  }));

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
        foundByLength={foundByLength}
      />

      <WordGrid
        wordSet={wordSet}
        onWordFound={word => setFoundWords(prev => new Set([...prev, word]))}
      />
    </div>
  );
}
