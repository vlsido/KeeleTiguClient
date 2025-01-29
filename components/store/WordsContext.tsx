import {
  createContext,
  useEffect
} from "react";
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/storeHooks";
import {
  clearDictionary,
  setMyDictionary
} from "./slices/dictionarySlice";

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
  const cachedDictionary = useAppSelector((state) => state.dictionary.cachedDictionary);

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      // IDEA: probably can do this without useEffect
      if (cachedDictionary.length < 3) {
        dispatch({ type: "dictionary/fetchRandomWords" });
      }
    },
    [
      cachedDictionary
    ]
  );

  useEffect(
    () => {
      if (myDictionary.length > 0) {
        console.log(
          "[CHANGED] Caching myDictionary",
          myDictionary
        );
        cacheDictionary();
      }
    },
    [
      myDictionary
    ]
  );

  useEffect(
    () => {
      getCachedDictionary();
    },
    []
  );

  function getCachedDictionary() {
    const cached = localStorage.getItem("myDictionary");

    const myDictionaryCached = cached != null ? JSON.parse(cached) : [];

    dispatch(setMyDictionary(myDictionaryCached));

    console.log(
      "myDictionary loaded!",
      myDictionary
    );
  }

  function cacheDictionary() {
    localStorage.setItem(
      "myDictionary",
      JSON.stringify(myDictionary)
    );
    console.log("myDictionary cached!");
  }

  function clearAllCache() {
    dispatch(clearDictionary());

    localStorage.removeItem("myDictionary");
    localStorage.removeItem("cachedWordsAndData");
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
