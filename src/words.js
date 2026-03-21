import commonWords from './commonWords.json';

function getRandomWord(letterCount) {
  const pool = commonWords[letterCount];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateWordSet() {
  const wordSet = new Set();

  const targets = [
    { count: 5, length: 3 },
    { count: 4, length: 4 },
    { count: 3, length: 5 },
  ];

  for (const { count, length } of targets) {
    let added = 0;
    while (added < count) {
      const word = getRandomWord(length);
      if (!wordSet.has(word)) {
        wordSet.add(word);
        added++;
      }
    }
  }

  return wordSet;
}
