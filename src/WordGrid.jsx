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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '4px' }}>
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '4px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#f1f5f9',
                fontFamily: 'monospace',
                userSelect: 'none',
                cursor: 'default',
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
