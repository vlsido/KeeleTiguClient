import {
  memo,
  useEffect,
  useRef
} from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CommonColors } from "../constants/Colors";
import Forms from "../components/text_components/Forms";
import FoundArticlesCounter from "../components/screens/word_data/FoundArticlesCounter";
import Type from "../components/screens/dictionary/Type";
import { Word } from "../app/(tabs)/dictionary";
import Usage from "./text_components/Usage";
import AddToDictionaryIconButton from "./buttons/AddToDictionaryIconButton";
import { i18n } from "./store/i18n";
import { NAV_BOTTOM_PADDING, SEARCH_TOP_PADDING } from "../constants/common";

interface WordDataProps {
  wordDataArray: Word[] | null;
  searchString: string;
}

function WordData(props: WordDataProps) {

  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollRef?.current?.scrollTo({ y: 0 })
  }, [props.wordDataArray]);

  if (props.wordDataArray == null) {
    return null;
  }

  if (props.wordDataArray.length === 0) {
    return (
      <Text
        testID="WORD_DATA.NOTHING_FOUND:TEXT"
        style={styles.notFoundText}>
        {i18n.t("not_found", { defaultValue: "Ei leitud!" })}
      </Text>
    );
  }

  return (
    <ScrollView
      testID="WORD_DATA.SCROLL_CONTAINER:VIEW"
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <FoundArticlesCounter wordData={props.wordDataArray} />
      <View style={{ gap: 15 }}>
        {props.wordDataArray.map((
          wordData
        ) => {

          const composedWord = wordData.word.split("+");

          let searchStringIndex = composedWord.findIndex((wordPart) => wordPart.toLowerCase() === props.searchString);

          if (searchStringIndex === -1) {
            const joinedWord = composedWord.join("").toLowerCase();
            searchStringIndex = joinedWord === props.searchString ? -2 : -1;
          }

          return (
            <View
              testID="WORD_DATA.SCROLL_CONTAINER.WORD:VIEW"
              key={`wordIndex-${wordData.index}`}
              style={styles.wordContainer}
            >
              <View style={styles.wordHeader}>
                <Text>
                  {composedWord.map((
                    wordPart, index
                  ) => {
                    const separator = index === 0 ? "" : "+"
                    return (
                      <Text key={`wordIndex-${index}-text`} style={[
                        styles.wordText,
                        (index === searchStringIndex || searchStringIndex === -2) && styles.highlightedText
                      ]}>
                        {separator}{wordPart}
                      </Text>)
                  })}
                </Text>
                <AddToDictionaryIconButton
                  key={`wordIndex-${wordData.index}-add`}
                  word={wordData}
                  backgroundStyle="light"
                />
              </View>
              <Forms
                key={`wordIndex-${wordData.index}-forms`}
                forms={wordData.forms} />
              <Type
                key={`wordIndex-${wordData.index}-type`}
                type={wordData.type} />
              <FlatList
                testID="WORD_DATA.SCROLL_CONTAINER.WORD.USAGES:FLATLIST"
                data={wordData.usages}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.listContentContainer}
                accessibilityLabel={i18n.t("usages", { defaultValue: "Kasutamised" })}
                renderItem={({ item, index }) => {
                  return (
                    <Usage
                      usageIndex={index}
                      definitionData={item.definitionData}
                      examples={item.examples}
                      searchString={props.searchString}
                    />
                  )
                }
                } />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default memo(WordData);

const styles = StyleSheet.create({
  notFoundText: {
    color: CommonColors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    width: "100%",
    padding: 15,
    gap: 10,
    paddingTop: SEARCH_TOP_PADDING,
    paddingBottom: NAV_BOTTOM_PADDING + 15
  },
  wordContainer: {
    backgroundColor: CommonColors.black,
    borderColor: "white",
    borderRadius: 20,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  highlightedText: {
    flexDirection: "row",
    color: CommonColors.black,
    backgroundColor: "white",
    marginRight: "auto",
  },
  listContentContainer: {
    maxWidth: 600,
    width: "100%",
    alignSelf: "center"
  }
});
