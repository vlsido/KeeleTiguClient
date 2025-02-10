import {
  createContext,
  useCallback,
  useEffect
} from "react";
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/storeHooks";
import {
  clearDictionary,
  setExamDictionary,
  setMyDictionary
} from "./slices/dictionarySlice";
import { WordAndExamData } from "../../app/dictionary";

interface WordsContextProps {
  cacheDictionary: () => void;
  clearAllCache: () => void;
}

export const WordsContext = createContext<WordsContextProps>({
  cacheDictionary: () => { return },
  clearAllCache: async () => { return }
});

function WordsContextProvider({ children }: { children: React.ReactNode }) {
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const examDictionary = useAppSelector((state) => state.dictionary.examDictionary);

  const dispatch = useAppDispatch();

  useEffect(
    () => {

      // IDEA: probably can do this without useEffect
      if (examDictionary.length < 3) {
        dispatch({ type: "dictionary/fetchRandomWords" });
        return;
      }

      if (examDictionary.length === 0) {
        const cachedWordsAndExamData = localStorage.getItem("wordsAndExamData");

        if (cachedWordsAndExamData != null) {
          const parsedCachedWordsAndExamData: WordAndExamData[] = JSON.parse(cachedWordsAndExamData);
          if (parsedCachedWordsAndExamData.length > 0) {
            dispatch(setExamDictionary(parsedCachedWordsAndExamData));
            return;

          }
        }
      }

      if (examDictionary.length > 0) {
        localStorage.setItem(
          "wordsAndExamData",
          JSON.stringify(examDictionary)
        )

      }

    },
    [
      examDictionary
    ]
  );

  useEffect(
    () => {
      console.log(
        "my",
        myDictionary
      );
      if (myDictionary.length > 0) {
        cacheDictionary();
      }
    },
    [
      myDictionary
    ]
  );

  useEffect(
    () => {
      getExamDictionary();
    },
    []
  );

  function getExamDictionary() {
    const cached = localStorage.getItem("myDictionary");

    const myDictionaryCached = cached != null ? JSON.parse(cached) : [];

    dispatch(setMyDictionary(myDictionaryCached));
  }

  const cacheDictionary = useCallback(
    () => {
      localStorage.setItem(
        "myDictionary",
        JSON.stringify(myDictionary)
      );
    },
    [
      myDictionary
    ]
  );

  function clearAllCache() {
    dispatch(clearDictionary());

    localStorage.removeItem("myDictionary");
    localStorage.removeItem("wordsAndExamData");
    localStorage.removeItem("allWords");
  }

  const value = {
    cacheDictionary,
    clearAllCache
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;
