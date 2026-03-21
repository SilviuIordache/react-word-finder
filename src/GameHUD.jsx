import LengthTracker from './LengthTracker';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function GameHUD({ elapsedTime, foundByLength, extraFoundCount, onOpenHints, canOpenHints }) {
  return (
    <div className="flex w-full max-w-120 flex-col items-center gap-4 px-1">
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={onOpenHints}
          disabled={!canOpenHints}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 font-mono text-sm font-bold text-slate-300 transition-colors hover:border-slate-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Open hints"
        >
          ?
        </button>
        <div className="font-mono text-sm tracking-wider text-slate-300">
          ⏱ <span className="text-lg font-bold text-white">{formatTime(elapsedTime)}</span>
        </div>
        <div className="h-8 w-8" />
      </div>
      <div className="flex w-full items-start justify-center gap-4 sm:gap-6">
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
