import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { WordWithoutData } from "../util/WordsUtil";
import { RootState } from "../store/store";

interface SearchState {
  query: string;
  results: WordWithoutData[]
}

const initialState: SearchState = {
  query: "",
  results: []
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (
      state, action: PayloadAction<string>
    ) => {
      state.query = action.payload;
    },
    setResults: (
      state, action: PayloadAction<WordWithoutData[]>
    ) => {
      state.results = action.payload;
    }
  }

})

export const { setQuery, setResults } = searchSlice.actions;

export const selectQuery = (state: RootState) => state.search.query;

export default searchSlice.reducer;
