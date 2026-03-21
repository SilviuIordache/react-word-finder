import validWords from './validWords.json';

// Build a Set once at module load for O(1) lookups
const dictionary = new Set(validWords);

export function isValidWord(word) {
  return dictionary.has(word.toLowerCase());
}
