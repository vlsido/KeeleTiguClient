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
import { memo } from "react";

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
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  if (myDictionary.length === 0) {
    return (
      <View style={styles.noWordsContainer}>
        <Text style={styles.loadingText}>Siin pole midagi. Lisa uued sõnad eksami leheküljel.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18n.t(
          "count_words_in_dictionary",
          {
            defaultValue: "Sõnastikus on %{count} sõnad",
            count: myDictionary.length,
          }
        )}
      </Text>
      <FlatList
        data={myDictionary}
        keyExtractor={(item) => `word-${myDictionary.indexOf(item)}`}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item, index }) => <DictionaryItem {...item} index={index + 1} />}
      />
    </View>
  );
}

export default memo(Dictionary);

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
