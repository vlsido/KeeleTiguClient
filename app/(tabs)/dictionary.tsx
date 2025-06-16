import {
  useCallback,
  useMemo
} from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { WordWithoutData } from "../../components/util/WordsUtil";
import { i18n } from "../../components/store/i18n";
import { CommonColors } from "../../constants/Colors";
import { useAppSelector } from "../../hooks/storeHooks";
import DictionaryItem from "../../components/screens/dictionary/DictionaryItem";
import {
  atom,
  useAtom
} from "jotai";
import { useFocusEffect } from "expo-router";
import { useOrientation } from "../../hooks/useOrientation";
import { HEADER_TOP_PADDING, NAV_BOTTOM_PADDING } from "../../constants/common";

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
  const { isWide } = useOrientation();

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const getDictionary = useCallback(() => {
    if (myDictionary.length === 0) return [];

    return myDictionary;
  }, [myDictionary]);

  const [myDictionaryState, setMyDictionaryState] =
    useAtom<Word[]>(useMemo(() => atom<Word[]>(getDictionary()), []));

  useFocusEffect(
    useCallback(() => {
      setMyDictionaryState(getDictionary());
    }, [getDictionary])
  );

  if (myDictionaryState.length === 0) {
    return (
      <View
        testID="DICTIONARY.WORDS_EMPTY:VIEW"
        style={styles.noWordsContainer}
      >
        <Text
          testID="DICTIONARY.WORDS_EMPTY:TEXT"
          style={styles.loadingText}>
          {i18n.t("Dictionary_empty", { defaultValue: "Siin pole midagi. Lisa uued sõnad testi leheküljel või otsingus." })}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <ScrollView
        testID="DICTIONARY.CONTAINER:VIEW"
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.counter}>
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
        </View>
        <FlatList
          testID="DICTIONARY.WORDS_LIST:FLATLIST"
          data={myDictionaryState}
          style={[styles.list, !isWide && { paddingBottom: NAV_BOTTOM_PADDING }]}
          aria-label={i18n.t("words_from_my_dictionary", { defaultValue: "Minu sõnastiku sõnad" })}
          contentContainerStyle={styles.listContentContainer}
          keyExtractor={(item) => item.index.toString()}
          renderItem={({ item, index }) => <DictionaryItem {...item} length={index + 1} />}
        />
      </ScrollView>
    </View>
  );
}

export default Dictionary;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: CommonColors.black
  },
  counter: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 60
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  noWordsContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: CommonColors.black
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
  list: {
    width: "100%",
    paddingHorizontal: 15
  },
  listContentContainer: {
    gap: 10,
    maxWidth: 600,
    alignSelf: "center"
  }
});
