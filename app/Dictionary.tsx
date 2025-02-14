import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { WordWithoutData } from "../components/util/WordsUtil";
import { i18n } from "../components/store/i18n";
import { CommonColors } from "../constants/Colors";
import { useAppSelector } from "../hooks/storeHooks";
import DictionaryItem from "../components/screens/dictionary/DictionaryItem";
import {
  memo,
  useEffect,
  useMemo
} from "react";
import { atom, useAtom } from "jotai";

export interface DictionaryRequest {
  page: number;
}

export interface RandomWordsResponse {
  randomWords: WordAndExamData[];
}

export interface AllWordsResponse {
  dictionary: Word[];
}

export interface OnlyWordsResponse {
  dictionary: WordWithoutData[];
}

export interface Word {
  index: number;
  word: string;
  type: "s" | "adj" | "adv" | "v" | "konj" | undefined;
  forms: string | undefined;
  usages: {
    definitionData: {
      definitionText: string | undefined;
      fieldsOfKnowledge: string[];
      russianTranslations: string[];
    }[];
    examples?: {
      estonianExample: string;
      russianTranslations: string[];
    }[];
  }[]
}

export interface WordAndExamData extends Word {
  examData: {
    word: string,
    level: "A1" | "A2" | "B1",
    russianTranslations: string[]
  }
}

export interface DictionaryResponse {
  dictionary: Word[];
}

function Dictionary() {
  const [myDictionaryState, setMyDictionaryState] =
    useAtom<Word[]>(useMemo(() => atom<Word[]>([]), []));
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  useEffect(() => {
    if (myDictionary.length === 0) return;

    if (myDictionaryState.length === 0) {
      setMyDictionaryState(myDictionary);
    }
  }, [myDictionary]);

  if (myDictionary.length === 0) {
    return (
      <View
        testID="DICTIONARY.WORDS_EMPTY:VIEW"
        style={styles.noWordsContainer}
      >
        <Text
          testID="DICTIONARY.WORDS_EMPTY:TEXT"
          style={styles.loadingText}>
          Siin pole midagi. Lisa uued sõnad eksami leheküljel või otsingus.
        </Text>
      </View>
    );
  }

  return (
    <View
      testID="DICTIONARY.CONTAINER:VIEW"
      style={styles.container}
    >
      <Text
        testID="DICTIONARY.WORD_COUNT:TEXT"
        style={styles.text}
      >
        {i18n.t(
          "count_words_in_dictionary",
          {
            defaultValue: "Sõnastikus on %{count} sõnad",
            count: myDictionary.length,
          }
        )}
      </Text>
      <FlatList
        testID="DICTIONARY.WORDS_LIST:FLATLIST"
        data={myDictionaryState}
        keyExtractor={(item) => item.index.toString()}
        renderItem={({ item, index }) => <DictionaryItem {...item} length={index + 1} />}
      />
    </View>
  );
}

export default Dictionary;

const styles = StyleSheet.create({
  noWordsContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#222322"
  },
  container: {
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 15,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#222322"
  },
  separator: {
    height: 10
  },
  loadingText: {
    fontSize: 20,
    color: CommonColors.white,
    textAlign: "center"
  },
  addContainer: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 16
  },
});
