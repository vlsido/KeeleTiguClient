import { atom } from "jotai";

export const hintTextAtom = atom<string>("Text was supposed to be here :/");
export const isHintVisibleAtom = atom<boolean>(false);
export const durationAtom = atom<number>(2500);
