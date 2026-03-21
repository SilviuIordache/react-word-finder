export default function StartModal({ totalWords, onStart }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 max-w-sm w-full mx-4 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-mono tracking-widest text-white">
            Word Finder
          </h1>
        </div>

        <ul className="text-slate-300 text-sm flex flex-col gap-2">
          <li>🔍 Find all <span className="text-white font-semibold">{totalWords} hidden words</span> in the grid</li>
          <li>👆 Drag across letters to select a word — left to right or top to bottom</li>
          <li>✅ Found words stay highlighted in the grid</li>
          <li>⏱ Your time counts up — finish as fast as you can</li>
        </ul>

        <button
          onClick={onStart}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono py-3 rounded-lg tracking-widest transition-colors"
        >
          START
        </button>
      </div>
    </div>
  );
}
