function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function formatWord(word) {
  return word.toUpperCase();
}

export default function GameWonModal({ elapsedTime, plantedWords, extraWords, onRestart, hasUsedHints }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="mx-4 flex max-h-[80vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-xl border border-slate-600 bg-slate-800 p-6 sm:p-8">
        <div className="text-center">
          <h1 className="font-mono text-3xl font-bold tracking-[0.18em] text-white sm:tracking-widest">
            You win! 🎉
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            You managed to find all the words in{' '}
            <span className="font-mono font-bold text-white">{formatTime(elapsedTime)}</span>
          </p>
          {!hasUsedHints ? (
            <p className="mt-3 font-mono text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Perfect run
            </p>
          ) : (
            <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Hints used: Yes
            </p>
          )}
          {!hasUsedHints && (
            <p className="mt-2 text-sm text-slate-400">
              You found all the words without using hints.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:gap-6">
          <section>
            <h2 className="mb-3 font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.25em]">
              Planted
              <br />
              Words
            </h2>
            <ul className="flex flex-col gap-1 font-mono text-sm text-emerald-400 sm:text-base">
              {plantedWords.map(word => (
                <li key={word}>- {formatWord(word)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.25em]">
              Extra
              <br />
              Words
            </h2>
            <ul className="flex flex-col gap-1 font-mono text-sm text-amber-300 sm:text-base">
              {extraWords.length > 0 ? (
                extraWords.map(word => (
                  <li key={word}>- {formatWord(word)}</li>
                ))
              ) : (
                <li className="text-slate-500">- NONE</li>
              )}
            </ul>
          </section>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg bg-indigo-600 py-3 font-mono font-bold tracking-widest text-white transition-colors hover:bg-indigo-500"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
