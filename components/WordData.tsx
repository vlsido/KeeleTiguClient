import { CommonColors } from "../constants/Colors";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Forms from "../components/text_components/Forms";
import { i18n } from "../components/store/i18n";
import { useHint } from "../hooks/useHint";
import {
  useAppDispatch,
  useAppSelector
} from "../hooks/storeHooks";
import {
  pushToMyDictionary
} from "../components/store/slices/dictionarySlice";
import FoundArticlesCounter from "../components/screens/word_data/FoundArticlesCounter";
import Type from "../components/screens/dictionary/Type";
import { Word } from "../app/dictionary";
import Usage from "./text_components/Usage";
import { memo } from "react";
import TextButton from "./buttons/TextButton";

interface WordDataProps {
  wordDataArray: Word[] | null;
  searchString: string;
}

function WordData(props: WordDataProps) {
  const { showHint } = useHint();
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const dispatch = useAppDispatch();

  function addToDictionary(wordToAdd: Word) {
    if (myDictionary.find((word) => word.word === wordToAdd.word)) {
      showHint(
        "Sõna on juba sõnastikus!",
        2500
      );
      return;
    }

    dispatch(pushToMyDictionary(wordToAdd));

    // Add to dictionary
    showHint(
      "Lisatud!",
      2500
    );
  }

  if (props.wordDataArray == null) {
    return null;
  }

  if (props.wordDataArray.length === 0) {
    return <Text
      testID="WORD_DATA.NOTHING_FOUND:TEXT"
      style={styles.notFoundText}>Ei leitud!</Text>;
  }

  return (
    <ScrollView
      testID="WORD_DATA.SCROLL_CONTAINER:VIEW"
      style={styles.container}
    >
      <FoundArticlesCounter wordData={props.wordDataArray} />
      {props.wordDataArray.map((
        wordData, index
      ) => {

        const composedWord = wordData.word.split("+");

        const searchStringIndex = composedWord.findIndex((wordPart) => wordPart.toLowerCase() === props.searchString);

        return (
          <View
            testID="WORD_DATA.SCROLL_CONTAINER.WORD:VIEW"
            key={`wordIndex-${index}`}
          >
            <Text>
              {composedWord.map((
                wordPart, index
              ) => {
                const separator = index === 0 ? "" : "+"
                return (
                  <Text key={`wordIndex-${index}-text`} style={[
                    styles.wordText,
                    index === searchStringIndex && styles.highlightedText
                  ]}>
                    {separator}{wordPart}
                  </Text>)
              })}
            </Text>
            <Forms key={`wordIndex-${index}-forms`} forms={wordData.forms} />
            <Type key={`wordIndex-${index}-type`} type={wordData.type} />
            <FlatList
              testID="WORD_DATA.SCROLL_CONTAINER.WORD.USAGES:FLATLIST"
              data={wordData.usages}
              renderItem={({ item, index }) => {
                return (
                  <Usage
                    key={index}
                    index={index}
                    definitionData={item.definitionData}
                    examples={item.examples}
                    searchString={props.searchString}
                  />
                )

              }
              } />
            <TextButton
              testID="WORD_DATA.SCROLL_CONTAINER.ADD_WORD:PRESSABLE"
              key={`wordIndex-${index}-add`}
              style={styles.addToDictionaryContainer}
              textStyle={styles.addToDictionaryText}
              text={i18n.t(
                "add_to_dictionary",
                { defaultValue: "Lisa sõnastikku" }
              )}
              onPress={() => addToDictionary(wordData)}
              label="Add to dictionary"
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

export default memo(WordData);

const styles = StyleSheet.create({
  notFoundText: {
    color: CommonColors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  container: {
    flex: 1,
    backgroundColor: CommonColors.black,
    paddingHorizontal: 15
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  highlightedText: {
    flexDirection: "row",
    color: CommonColors.black,
    backgroundColor: CommonColors.yellow,
    marginRight: "auto",
  },
  addToDictionaryContainer: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: CommonColors.white,
    borderWidth: 1,
  },
  addToDictionaryText: {
    fontSize: 16,
    color: CommonColors.white,
  },
});
