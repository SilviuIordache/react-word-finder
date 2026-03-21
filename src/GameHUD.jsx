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
    <div className="flex w-full max-w-[480px] flex-col gap-4 px-1 sm:gap-5">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHints}
            disabled={!canOpenHints}
            className="flex h-8 items-center justify-center gap-1 rounded-full border border-slate-600 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 transition-colors hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs sm:tracking-[0.2em]"
            aria-label="Open hints"
          >
            <span>?</span>
            <span>Hint</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            disabled={!canRestart}
            className="flex h-8 items-center justify-center rounded-full border border-slate-600 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300 transition-colors hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs sm:tracking-[0.2em]"
            aria-label="Restart game"
          >
            Restart
          </button>
        </div>
        <div className="ml-auto font-mono text-sm tracking-wider text-slate-300">
          ⏱ <span className="text-base font-bold text-white sm:text-lg">{formatTime(elapsedTime)}</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 items-start gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-4">
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
