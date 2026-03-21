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

const grid = generateGrid(GRID_SIZE);

export default function WordGrid() {
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
