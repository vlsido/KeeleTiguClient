import { createContext, useEffect } from "react";
import Hint from "../Hint";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { allWords, myDictionary, myDictionaryHistory, randomWords } from "../util/WordsUtil";
import { callCloudFunction } from "../util/CloudFunctions";
import { RandomWordsResponse, Word } from "@/app/dictionary";

interface WordsContextProps {
  cacheDictionary: () => void;
  clearAllCache: () => void;
}

export const WordsContext = createContext<WordsContextProps>({
  cacheDictionary: () => { return },
  clearAllCache: async () => { return }

});


function WordsContextProvider({ children }: { children: React.ReactNode }) {


  async function getRandomWords() {
    const data = {
      numberOfWords: 100,
    };

    const responseData = await callCloudFunction("GetRandomWords_Node", data) as RandomWordsResponse | null;

    if (responseData != null) {
      const examWordsData = responseData.randomWords.map((word: Word) => {
        return {
          word: word.word,
          type: word.type,
          forms: word.forms,
          usages: word.usages,
        };
      });


      randomWords.value = examWordsData;

    }

  };


  useSignalEffect(() => {
    if (randomWords.value.length === 0) {
      getRandomWords();
    }
  });

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


  function clearAllCache() {
    randomWords.value = [];
    myDictionary.value = [];
    myDictionaryHistory.value = [];
    allWords.value = [];

    localStorage.removeItem("myDictionary");
    localStorage.removeItem("myDictionaryHistory");
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
