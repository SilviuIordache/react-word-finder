import { useState } from 'react';
import commonWords from './commonWords.json';
import { isValidWord } from './validator';

const GRID_SIZE = 10;

// ─── Word set generation ──────────────────────────────────────────────────────

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

// ─── Grid population ──────────────────────────────────────────────────────────

function buildGrid(wordSet) {
  // Start with an empty grid of nulls
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  );

  for (const word of wordSet) {
    const letters = word.toUpperCase().split('');
    const isHorizontal = Math.random() < 0.5;
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      attempts++;

      // Pick a random starting position that leaves room for the word
      const row = isHorizontal
        ? Math.floor(Math.random() * GRID_SIZE)
        : Math.floor(Math.random() * (GRID_SIZE - letters.length + 1));

      const col = isHorizontal
        ? Math.floor(Math.random() * (GRID_SIZE - letters.length + 1))
        : Math.floor(Math.random() * GRID_SIZE);

      // Check every cell the word would occupy
      const canPlace = letters.every((letter, i) => {
        const r = isHorizontal ? row : row + i;
        const c = isHorizontal ? col + i : col;
        return grid[r][c] === null || grid[r][c] === letter;
      });

      if (canPlace) {
        letters.forEach((letter, i) => {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          grid[r][c] = letter;
        });
        placed = true;
      }
    }
  }

  return grid;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WordGrid() {
  const [grid] = useState(() => {
    const wordSet = generateWordSet();
    return buildGrid(wordSet);
  });

  return (
    <div className="border border-slate-600 divide-y divide-slate-600">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex divide-x divide-slate-600">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 text-lg font-bold text-slate-100 font-mono select-none cursor-default"
            >
              {letter ?? '·'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
