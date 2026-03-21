export default function LengthTracker({ length, total, found }) {
  return (
    <div className="flex min-w-[88px] flex-col items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
        {length}-letter
      </span>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={[
              'h-2.5 w-2.5 rounded-full transition-colors',
              index < found ? 'bg-emerald-500' : 'bg-slate-600',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
