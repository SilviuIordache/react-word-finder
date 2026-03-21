const STATUS_STYLES = {
  found:    'bg-green-500 text-white',
  selected: 'bg-indigo-500 text-white',
  invalid:  'bg-red-500 text-white',
  default:  'bg-slate-800 text-slate-100',
};

export default function Cell({ letter, row, col, status = 'default', onPointerDown, onPointerEnter }) {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-lg font-bold font-mono select-none cursor-default transition-colors ${STATUS_STYLES[status]}`}
      onPointerDown={() => onPointerDown(row, col)}
      onPointerEnter={() => onPointerEnter(row, col)}
    >
      {letter}
    </div>
  );
}
