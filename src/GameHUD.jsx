import LengthTracker from './LengthTracker';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function GameHUD({
  elapsedTime,
  foundByLength,
  extraFoundCount,
  onOpenHints,
  canOpenHints,
  onRestart,
  canRestart,
}) {
  return (
    <div className="flex w-full max-w-120 flex-col gap-5 px-1">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHints}
            disabled={!canOpenHints}
            className="flex h-8 items-center justify-center gap-1 rounded-full border border-slate-600 px-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Open hints"
          >
            <span>?</span>
            <span>Hint</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            disabled={!canRestart}
            className="flex h-8 items-center justify-center rounded-full border border-slate-600 px-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>
        <div className="font-mono text-sm tracking-wider text-slate-300">
          ⏱ <span className="text-lg font-bold text-white">{formatTime(elapsedTime)}</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 items-start gap-4">
        <LengthTracker
          label="EXTRA"
          total={extraFoundCount}
          found={extraFoundCount}
          foundClassName="bg-amber-300"
          emptyClassName="bg-transparent"
          maxPerRow={5}
        />
        {foundByLength.map(group => (
          <LengthTracker key={group.length} {...group} />
        ))}
      </div>
    </div>
  );
}
