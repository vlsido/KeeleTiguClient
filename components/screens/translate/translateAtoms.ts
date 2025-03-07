import { atom } from "jotai";

export const answerAtom = atom<string>("");
export const isA1LevelOnAtom = atom<boolean>(true);
export const isA2LevelOnAtom = atom<boolean>(true);
export const isB1LevelOnAtom = atom<boolean>(true);

export enum EWordsLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1"
}
