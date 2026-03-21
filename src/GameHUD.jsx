import LengthTracker from './LengthTracker';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
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
