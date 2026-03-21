export default function LengthTracker({
  label,
  length,
  total,
  found,
  foundClassName = 'bg-emerald-500',
  emptyClassName = 'bg-slate-600',
  maxPerRow,
}) {
  const circleCount = Math.max(total, found);
  const circlesPerRow = maxPerRow ?? circleCount;

  return (
    <div className="flex min-w-22 flex-col items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
        {label ?? `${length}-letter`}
      </span>
      <div
        className="flex flex-wrap items-center justify-start gap-1.5"
        style={{ maxWidth: `${circlesPerRow * 10 + (circlesPerRow - 1) * 6}px` }}
      >
        {Array.from({ length: circleCount }, (_, index) => (
          <span
            key={index}
            className={[
              'h-2.5 w-2.5 rounded-full transition-colors',
              index < found ? foundClassName : emptyClassName,
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
