import { Word } from "@/app/dictionary";
import { effect, signal } from "@preact/signals-react";

export const randomWords = signal<Word[]>([]);

effect(() => {
  console.log("[CHANGED] Current Random Words", randomWords);
});


export const myDictionary = signal<Word[]>([]);

export const allWords = signal<Word[]>([]);

effect(() => {
  console.log("[CHANGED] all words", allWords.value.length);
});
