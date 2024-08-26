import { Word } from "@/app/dictionary";
import { effect, signal } from "@preact/signals-react";

export const randomWords = signal<Word[]>([]);

effect(() => {
  console.log("[CHANGED] Current Random Words", randomWords);
});


export const myDictionary = signal<Word[]>([]);

export const myDictionaryHistory = signal<Word[]>([]);


effect(() => {
  const dictionaryLength = myDictionary.value.length;
  console.log("[CHANGED] dictionary history", dictionaryLength);
  if (dictionaryLength > 500) {
    myDictionaryHistory.value = myDictionaryHistory.value.slice(-250);
  }
});

export interface WordWithoutData {
  word: string;
}

export const allWords = signal<WordWithoutData[]>([]);

effect(() => {
  console.log("[CHANGED] all words", allWords.value.length);
});

