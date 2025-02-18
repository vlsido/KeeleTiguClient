import { CommonColors } from "../constants/Colors";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Forms from "../components/text_components/Forms";
import FoundArticlesCounter from "../components/screens/word_data/FoundArticlesCounter";
import Type from "../components/screens/dictionary/Type";
import { Word } from "../app/dictionary";
import Usage from "./text_components/Usage";
import AddToDictionaryTextButton from "./buttons/AddToDictionaryTextButton";

interface WordDataProps {
  wordDataArray: Word[] | null;
  searchString: string;
}

function WordData(props: WordDataProps) {

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
          >
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
            <Forms key={`wordIndex-${wordData.index}-forms`} forms={wordData.forms} />
            <Type key={`wordIndex-${wordData.index}-type`} type={wordData.type} />
            <FlatList
              testID="WORD_DATA.SCROLL_CONTAINER.WORD.USAGES:FLATLIST"
              data={wordData.usages}
              keyExtractor={(_, index) => index.toString()}
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
            <AddToDictionaryTextButton
              key={`wordIndex-${wordData.index}-add`}
              wordData={wordData} />
          </View>
        );
      })}
    </ScrollView>
  );
}

export default WordData;

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

});
