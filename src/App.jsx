import WordGrid from './WordGrid';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6">
      <h1 className="text-white text-2xl font-bold font-mono tracking-widest">
        Word Finder
      </h1>
      <WordGrid />
    </div>
  );
}
