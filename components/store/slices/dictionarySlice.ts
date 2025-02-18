import {
  PayloadAction,
  createSlice
} from "@reduxjs/toolkit";
import {
  Word,
  WordAndExamData
} from "../../../app/dictionary";
import { RootState } from "../store";
import { WordWithoutData } from "../../util/WordsUtil";

export interface DictionaryState {
  myDictionary: Word[],
  examDictionary: WordAndExamData[],
  words: WordWithoutData[]
}

const initialState: DictionaryState = {
  myDictionary: [],
  examDictionary: [],
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
      localStorage.setItem(
        "myDictionary",
        JSON.stringify(action.payload)
      );
    },
    pushToMyDictionary: (
      state, action: PayloadAction<Word>
    ) => {
      state.myDictionary.push(action.payload);
      localStorage.setItem(
        "myDictionary",
        JSON.stringify(state.myDictionary)
      );
    },
    removeIndexFromMyDictionary: (
      state, action: PayloadAction<number>
    ) => {
      state.myDictionary = state.myDictionary.filter((word) => word.index !== action.payload)
      localStorage.setItem(
        "myDictionary",
        JSON.stringify(state.myDictionary)
      );
    },
    setExamDictionary: (
      state, action: PayloadAction<WordAndExamData[]>
    ) => {
      state.examDictionary = action.payload;

      if (action.payload.length > 0) {
        localStorage.setItem(
          "wordsAndExamData",
          JSON.stringify(action.payload)
        )
      }
    },
    pushToExamDictionary: (
      state, action: PayloadAction<WordAndExamData>
    ) => {
      state.examDictionary.push(action.payload);
    },
    setWords: (
      state, action: PayloadAction<WordWithoutData[]>
    ) => {
      state.words = action.payload;
    },
    clearDictionary: (state) => {
      state.myDictionary = [];
      state.examDictionary = [];
      state.words = [];
    }
  },
});


export const {
  setMyDictionary,
  pushToMyDictionary,
  removeIndexFromMyDictionary,
  setExamDictionary,
  pushToExamDictionary,
  setWords,
  clearDictionary
} = dictionarySlice.actions;

export const selectMyDictionary = (state: RootState) => state.dictionary.myDictionary;

export const selectExamDictionary = (state: RootState) => state.dictionary.examDictionary;

export const selectWords = (state: RootState) => state.dictionary.words;

export default dictionarySlice.reducer;
