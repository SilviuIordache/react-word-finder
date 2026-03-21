import { useState, useEffect } from 'react';
import Cell from './Cell';

const GRID_SIZE = 10;

// ─── Grid population ──────────────────────────────────────────────────────────

const VOWELS = 'AEIOU';
const CONSONANTS = 'BCDFGHJKLMNPQRSTVWXYZ';
const VOWEL_PROBABILITY = 0.5;

function randomFiller() {
  return Math.random() < VOWEL_PROBABILITY
    ? VOWELS[Math.floor(Math.random() * VOWELS.length)]
    : CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
}

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

  // Fill remaining empty cells with weighted random letters
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === null) grid[r][c] = randomFiller();
    }
  }

  return grid;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WordGrid({ wordSet }) {
  const [grid] = useState(() => buildGrid(wordSet));
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);

  // End the drag when the pointer is released anywhere on the page
  useEffect(() => {
    const handlePointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      console.log('Selected word:', selectedCells.map(({ row, col }) => grid[row][col]).join(''));
      setSelectedCells([]);
    };
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [isDragging, selectedCells, grid]);

  const handlePointerDown = (row, col) => {
    setIsDragging(true);
    setSelectedCells([{ row, col }]);
  };

  const handlePointerEnter = (row, col) => {
    if (!isDragging) return;
    setSelectedCells(prev => {
      if (prev.some(c => c.row === row && c.col === col)) return prev;
      return [...prev, { row, col }];
    });
  };

  const isSelected = (row, col) =>
    selectedCells.some(c => c.row === row && c.col === col);

  return (
    // touch-action: none prevents the browser from hijacking the drag as a scroll on mobile
    <div className="border border-slate-600 divide-y divide-slate-600" style={{ touchAction: 'none' }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex divide-x divide-slate-600">
          {row.map((letter, colIndex) => (
            <Cell
              key={colIndex}
              letter={letter}
              row={rowIndex}
              col={colIndex}
              selected={isSelected(rowIndex, colIndex)}
              onPointerDown={handlePointerDown}
              onPointerEnter={handlePointerEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
