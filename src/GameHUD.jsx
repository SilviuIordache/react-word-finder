function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function GameHUD({ elapsedTime, foundCount, totalWords }) {
  return (
    <div className="flex items-center justify-between w-full max-w-[480px] px-1">
      <div className="font-mono text-slate-300 text-sm tracking-wider">
        ⏱ <span className="text-white text-lg font-bold">{formatTime(elapsedTime)}</span>
      </div>
      <div className="font-mono text-slate-300 text-sm tracking-wider">
        <span className="text-white text-lg font-bold">{foundCount}</span>
        <span> / {totalWords} words found</span>
      </div>
    </div>
  );
}
