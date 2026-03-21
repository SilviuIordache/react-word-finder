export default function Cell({ letter, row, col, selected, onPointerDown, onPointerEnter }) {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-lg font-bold font-mono select-none cursor-default transition-colors
        ${selected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-100'}`}
      onPointerDown={() => onPointerDown(row, col)}
      onPointerEnter={() => onPointerEnter(row, col)}
    >
      {letter}
    </div>
  );
}
