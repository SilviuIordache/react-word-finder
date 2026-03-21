function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function LengthTracker({ length, total, found }) {
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

export default function GameHUD({ elapsedTime, foundByLength }) {
  return (
    <div className="flex w-full max-w-120 flex-col items-center gap-4 px-1">
      <div className="font-mono text-sm tracking-wider text-slate-300">
        ⏱ <span className="text-lg font-bold text-white">{formatTime(elapsedTime)}</span>
      </div>
      <div className="flex w-full items-start justify-center gap-4 sm:gap-6">
        {foundByLength.map(group => (
          <LengthTracker key={group.length} {...group} />
        ))}
      </div>
    </div>
  );
}
