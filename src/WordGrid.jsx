import { useState } from 'react';
import commonWords from './commonWords.json';

function getRandomWord(letterCount) {
  const pool = commonWords[letterCount];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateWordSet() {
  const wordSet = new Set();

  const targets = [
    { count: 5, length: 3 },
    { count: 4, length: 4 },
    { count: 3, length: 5 },
  ];

  for (const { count, length } of targets) {
    let added = 0;
    while (added < count) {
      const word = getRandomWord(length);
      if (!wordSet.has(word)) {
        wordSet.add(word);
        added++;
      }
    }
  }

  return wordSet;
}

console.log('Game words:', generateWordSet());

const GRID_SIZE = 10;

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function randomLetter() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function generateGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => randomLetter())
  );
}

export default function WordGrid() {
  const [grid] = useState(() => generateGrid(GRID_SIZE));

  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 border border-slate-700 rounded text-lg font-bold text-slate-100 font-mono select-none cursor-default"
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
