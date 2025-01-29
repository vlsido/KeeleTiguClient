import { atom } from "jotai";
import { Word } from "../../../app/dictionary";

export const gameWordsAtom = atom<Word[]>([]);
export const isAnswerVisibleAtom = atom<boolean>(false);
export const answerAtom = atom<string>("");
export const isAnswerValidAtom = atom<boolean>(true);
export const textAnswerFieldContainerWidthAtom = atom<number>(0);
