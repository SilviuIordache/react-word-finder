function formatWord(word) {
  return word.toUpperCase();
}

export default function HintModal({ plantedWords, foundWords, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="mx-4 flex w-full max-w-sm flex-col gap-6 rounded-xl border border-slate-600 bg-slate-800 p-8"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-mono text-2xl font-bold tracking-widest text-white">
              Hints
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              All planted words are listed below.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-sm text-slate-400 transition-colors hover:text-white"
          >
            CLOSE
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-sm sm:text-base">
          {plantedWords.map(word => (
            <li
              key={word}
              className={foundWords.has(word) ? 'text-emerald-400' : 'text-slate-500'}
            >
              {formatWord(word)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
