
import {
  PayloadAction,
  createSlice
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Language } from "../../../constants/types";
import { i18n } from "../i18n";

import ee from "../translations/ee.json";
import en from "../translations/en.json";
import ru from "../translations/ru.json";

export interface SettingsState {
  language: Language;
  highlightRussianAccentLetters: boolean;
}

const initialState: SettingsState = {
  language: "ee",
  highlightRussianAccentLetters: true
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loadSettings: (
      state) => {
      const language = localStorage.getItem("language");

      i18n.store(ee);
      i18n.store(en);
      i18n.store(ru);

      i18n.defaultLocale = "ee";

      i18n.locale = language ?? "ee";

      state.language = (language ?? "ee") as Language;

      const highlightRussianAccentLettersString = localStorage.getItem("highlightRussianAccentLetters");

      const hightlightRussianAccentLetters =
        highlightRussianAccentLettersString != null
          ? JSON.parse(highlightRussianAccentLettersString)
          : true;

      state.highlightRussianAccentLetters = hightlightRussianAccentLetters;
    },
    setLanguage: (
      state, action: PayloadAction<Language>
    ) => {
      const locale = action.payload.toLowerCase();
      i18n.locale = locale;
      state.language = action.payload;
      localStorage.setItem(
        "language",
        locale
      );
    },
    setHighlightRussianAccentLetters: (
      state, action: PayloadAction<boolean>
    ) => {
      state.highlightRussianAccentLetters = action.payload;
      localStorage.setItem(
        "highlightRussianAccentLetters",
        JSON.stringify(action.payload)
      );
    },
    toggleHighlightRussianAccentLetters: (
      state) => {
      const newState = !state.highlightRussianAccentLetters;
      state.highlightRussianAccentLetters = newState;
      localStorage.setItem(
        "highlightRussianAccentLetters",
        JSON.stringify(newState)
      );
    },
    resetSettings: (state) => {
      i18n.locale = "ee";
      state.language = "ee";
      state.highlightRussianAccentLetters = true;
      localStorage.removeItem("language");
      localStorage.removeItem("highlightRussianAccentLetters");
    }
  },
});


export const {
  loadSettings,
  setLanguage,
  setHighlightRussianAccentLetters,
  toggleHighlightRussianAccentLetters,
  resetSettings
} = settingsSlice.actions;

export const selectLanguage = (state: RootState) => state.settings.language;

export const selectHighlightRussianAccentLetters = (state: RootState) => state.settings.highlightRussianAccentLetters;

export default settingsSlice.reducer;
