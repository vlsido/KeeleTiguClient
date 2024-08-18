import { Word } from "@/app/dictionary";
import { effect, signal } from "@preact/signals-react";

export const randomWords = signal<Word[]>([]);

effect(() => {
  console.log("[CHANGED] Current Random Words", randomWords);
});
