import { Word } from "@/app/dictionary";
import { effect, signal } from "@preact/signals-react";

export const myDictionary = signal<Word[]>([]);

export const cachedWordsAndData = signal<Word[]>([]);


effect(() => {
  console.log("[CHANGED] dictionary history", cachedWordsAndData.value.length);
  if (cachedWordsAndData.value.length > 250) {
    cachedWordsAndData.value = cachedWordsAndData.value.slice(0, 250);
  }
});

export interface WordWithoutData {
  word: string;
}

export const allWords = signal<WordWithoutData[]>([]);

effect(() => {
  console.log("[CHANGED] all words", allWords.value.length);
});

