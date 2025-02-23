import { atom } from "jotai";
import { WordWithoutData } from "../../util/WordsUtil";
import { Word } from "../../../app/(tabs)/dictionary";
import { atomWithListeners } from "../../store/atoms";

export const queryAtom = atom<string>("");
export const resultsAtom = atom<WordWithoutData[]>([]);
export const wordsDataArrayAtom = atom<Word[] | null>(null);
export const isSearchingInProcessAtom = atom<boolean>(false);
export const searchStringAtom = atom<string>("");
export const [
  areResultsVisibleAtom,
  useAreResultsVisibleListener
] = atomWithListeners<boolean>(false);
