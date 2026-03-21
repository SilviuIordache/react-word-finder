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

export default function WordGrid({ wordSet, onWordFound }) {
  const [grid] = useState(() => buildGrid(wordSet));
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [startCell, setStartCell] = useState(null);
  const [dragDirection, setDragDirection] = useState(null); // 'horizontal' | 'vertical' | null
  const [foundCells, setFoundCells] = useState([]);        // permanently green
  const [flashCells, setFlashCells] = useState([]);        // { row, col, type: 'invalid' }

  // End the drag when the pointer is released anywhere on the page
  useEffect(() => {
    const handlePointerUp = () => {
      if (!isDragging) return;

      const word = selectedCells.map(({ row, col }) => grid[row][col]).join('');

      if (wordSet.has(word.toLowerCase())) {
        // Planted word — keep highlighted green permanently
        setFoundCells(prev => [...prev, ...selectedCells]);
        onWordFound(word.toLowerCase());
      } else {
        // Invalid — flash red then clear
        setFlashCells(selectedCells.map(c => ({ ...c, type: 'invalid' })));
        setTimeout(() => setFlashCells([]), 600);
      }

      setIsDragging(false);
      setStartCell(null);
      setDragDirection(null);
      setSelectedCells([]);
    };
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [isDragging, selectedCells, grid, wordSet, onWordFound]);

  const handlePointerDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    setDragDirection(null);
    setSelectedCells([{ row, col }]);
  };

  const handlePointerEnter = (row, col) => {
    if (!isDragging || !startCell) return;

    // Determine direction on first move away from the start cell
    let direction = dragDirection;
    if (!direction) {
      if (row === startCell.row && col !== startCell.col) direction = 'horizontal';
      else if (col === startCell.col && row !== startCell.row) direction = 'vertical';
      else return; // diagonal — ignore
      setDragDirection(direction);
    }

    // Once locked, ignore moves that leave the locked axis
    if (direction === 'horizontal' && row !== startCell.row) return;
    if (direction === 'vertical' && col !== startCell.col) return;

    // Compute every cell from start to current (fills gaps, handles shrinking)
    const cells = [];
    if (direction === 'horizontal') {
      const minCol = Math.min(startCell.col, col);
      const maxCol = Math.max(startCell.col, col);
      for (let c = minCol; c <= maxCol; c++) {
        cells.push({ row: startCell.row, col: c });
      }
    } else {
      const minRow = Math.min(startCell.row, row);
      const maxRow = Math.max(startCell.row, row);
      for (let r = minRow; r <= maxRow; r++) {
        cells.push({ row: r, col: startCell.col });
      }
    }

    setSelectedCells(cells);
  };

  const getCellStatus = (row, col) => {
    if (foundCells.some(c => c.row === row && c.col === col)) return 'found';
    const flash = flashCells.find(c => c.row === row && c.col === col);
    if (flash) return flash.type;
    if (selectedCells.some(c => c.row === row && c.col === col)) return 'selected';
    return 'default';
  };

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
              status={getCellStatus(rowIndex, colIndex)}
              onPointerDown={handlePointerDown}
              onPointerEnter={handlePointerEnter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
