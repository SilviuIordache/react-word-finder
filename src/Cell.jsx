const STATUS_STYLES = {
  found:    'bg-green-500 text-white',
  extra:    'bg-slate-800 text-slate-100 ring-1 ring-inset ring-amber-100/60',
  selected: 'bg-indigo-500 text-white',
  invalid:  'bg-red-500 text-white',
  default:  'bg-slate-800 text-slate-100',
};

export default function Cell({ letter, row, col, status = 'default', onPointerDown, onPointerEnter }) {
  return (
    <div
      className={`flex aspect-square w-full items-center justify-center text-base font-bold font-mono select-none cursor-default transition-colors sm:text-lg ${STATUS_STYLES[status]}`}
      data-row={row}
      data-col={col}
      onPointerDown={() => onPointerDown(row, col)}
      onPointerEnter={() => onPointerEnter(row, col)}
    >
      {letter}
    </div>
  );
}
