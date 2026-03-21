import { readFileSync, writeFileSync } from 'fs';
import wordListPath from 'word-list';

const allWords = readFileSync(wordListPath, 'utf8')
  .split('\n')
  .map(w => w.trim().toLowerCase())
  .filter(w => /^[a-z]+$/.test(w) && w.length >= 3 && w.length <= 5);

console.log(`Total valid words (3–5 letters): ${allWords.length}`);
console.log('Sample:', allWords.slice(0, 10));

writeFileSync(
  'src/validWords.json',
  JSON.stringify(allWords)
);

console.log('✓ src/validWords.json written');
