import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Word } from "../../../app/dictionary";
import { RootState } from "../store";
import { WordWithoutData } from "../../util/WordsUtil";

interface DictionaryState {
  myDictionary: Word[],
  cachedDictionary: Word[],
  words: WordWithoutData[]
}

const initialState: DictionaryState = {
  myDictionary: [],
  cachedDictionary: [],
  words: []
}

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setMyDictionary: (
      state, action: PayloadAction<Word[]>
    ) => {
      state.myDictionary = action.payload;
    },
    pushToMyDictionary: (
      state, action: PayloadAction<Word>
    ) => {
      state.myDictionary.push(action.payload);
    },
    setCachedDictionary: (
      state, action: PayloadAction<Word[]>
    ) => {
      state.cachedDictionary = action.payload;
    },
    pushToCachedDictionary: (
      state, action: PayloadAction<Word>
    ) => {
      state.cachedDictionary.push(action.payload);
    },
    setWords: (
      state, action: PayloadAction<WordWithoutData[]>
    ) => {
      state.words = action.payload;
    },
    clearDictionary: (state) => {
      state.myDictionary = [];
      state.cachedDictionary = [];
      state.words = [];
    }
  },
});


export const {
  setMyDictionary,
  pushToMyDictionary,
  setCachedDictionary,
  pushToCachedDictionary,
  setWords,
  clearDictionary
} = dictionarySlice.actions;

export const selectMyDictionary = (state: RootState) => state.dictionary.myDictionary;

export const selectCachedDictionary = (state: RootState) => state.dictionary.cachedDictionary;

export const selectWords = (state: RootState) => state.dictionary.words;

export default dictionarySlice.reducer;
