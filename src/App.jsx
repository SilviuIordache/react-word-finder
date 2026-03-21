import { useState, useEffect } from 'react';
import { generateWordSet } from './words';
import WordGrid from './WordGrid';
import StartModal from './StartModal';
import GameHUD from './GameHUD';
import GameWonModal from './GameWonModal';
import HintModal from './HintModal';
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
  const [wordSet, setWordSet] = useState(() => generateWordSet());
  const [gameKey, setGameKey] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());
  const [extraWords, setExtraWords] = useState(new Set());

  const wordLengthStats = buildLengthStats(wordSet);
  const foundByLength = wordLengthStats.map(({ length, total }) => ({
    length,
    total,
    found: Array.from(foundWords).filter(word => word.length === length).length,
  }));

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    const interval = setInterval(() => {
      setElapsedTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (!gameStarted || gameWon) return;
    if (foundWords.size === wordSet.size) {
      setGameWon(true);
    }
  }, [foundWords, gameStarted, gameWon, wordSet.size]);

  const plantedWords = Array.from(wordSet).sort();
  const foundExtraWords = Array.from(extraWords).sort();

  const restartGame = () => {
    setWordSet(generateWordSet());
    setGameKey(prev => prev + 1);
    setGameStarted(true);
    setGameWon(false);
    setShowHints(false);
    setElapsedTime(0);
    setFoundWords(new Set());
    setExtraWords(new Set());
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6">
      {!gameStarted && (
        <StartModal
          totalWords={wordSet.size}
          onStart={() => setGameStarted(true)}
        />
      )}

      {gameWon && (
        <GameWonModal
          elapsedTime={elapsedTime}
          plantedWords={plantedWords}
          extraWords={foundExtraWords}
          onRestart={restartGame}
        />
      )}

      {showHints && (
        <HintModal
          plantedWords={plantedWords}
          foundWords={foundWords}
          onClose={() => setShowHints(false)}
        />
      )}

      <GameHUD
        elapsedTime={elapsedTime}
        foundByLength={foundByLength}
        extraFoundCount={extraWords.size}
        canOpenHints={gameStarted && !gameWon}
        onOpenHints={() => setShowHints(true)}
      />

      <WordGrid
        key={gameKey}
        wordSet={wordSet}
        disabled={!gameStarted || gameWon}
        onWordFound={word => setFoundWords(prev => new Set([...prev, word]))}
        onExtraWordFound={word => setExtraWords(prev => new Set([...prev, word]))}
      />
    </div>
  );
}
