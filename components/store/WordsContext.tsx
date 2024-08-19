import { createContext, useEffect } from "react";
import Hint from "../Hint";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { myDictionary } from "../util/WordsUtil";

interface WordsContextProps {
  cacheDictionary: () => void;
}

export const WordsContext = createContext<WordsContextProps>({
  cacheDictionary: () => { return }
});


function WordsContextProvider({ children }: { children: React.ReactNode }) {

  useSignalEffect(() => {
    if (myDictionary.value.length > 0) {
      console.log("[CHANGED] Caching myDictionary", myDictionary.value);
      cacheDictionary();
    }
  });

  useEffect(() => {
    getCachedDictionary();
  }, []);


  function getCachedDictionary() {
    const cached = localStorage.getItem("myDictionary");

    myDictionary.value = cached != null ? JSON.parse(cached) : [];

    console.log("myDictionary loaded!", myDictionary.value);
  }

  function cacheDictionary() {
    localStorage.setItem("myDictionary", JSON.stringify(myDictionary.value));
    console.log("myDictionary cached!");
  }

  const value = {
    cacheDictionary,
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;
