export default function Cell({ letter, row, col, onPointerDown }) {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center bg-slate-800 text-lg font-bold text-slate-100 font-mono select-none cursor-default"
      onPointerDown={() => {
        console.log('pointerDown', { row, col, letter });
        onPointerDown(row, col);
      }}
    >
      {letter}
    </div>
  );
}
