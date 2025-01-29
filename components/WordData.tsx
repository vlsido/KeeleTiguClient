import { CommonColors } from "../constants/Colors";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Forms from "../components/text_components/Forms";
import TextButton from "../components/TextButton";
import { i18n } from "../components/store/i18n";
import { useHint } from "../hooks/useHint";
import {
  useAppDispatch,
  useAppSelector
} from "../hooks/storeHooks";
import {
  pushToCachedDictionary,
  pushToMyDictionary
} from "../components/store/slices/dictionarySlice";
import FoundArticlesCounter from "../components/screens/word_data/FoundArticlesCounter";
import Type from "../components/screens/dictionary/Type";
import Examples from "../components/screens/dictionary/Examples";
import { Word } from "../app/dictionary";

interface WordDataProps {
  wordDataArray: Word[];
  searchString: string;
}

function WordData(props: WordDataProps) {
  const { showHint } = useHint();
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const dispatch = useAppDispatch();

  if (props.wordDataArray.length === 0) {
    return null;
  }

  function normalizeRussianTranslation(translation: string) {
    return translation.replace(
      /\"/g,
      ""
    ).toLowerCase();
  }

  function addToDictionary(wordToAdd: Word) {
    if (myDictionary.find((word) => word.word === wordToAdd.word)) {
      showHint(
        "Sõna on juba sõnastikus!",
        2500
      );
      return;
    }

    dispatch(pushToMyDictionary(wordToAdd));

    dispatch(pushToCachedDictionary(wordToAdd));

    // Add to dictionary
    showHint(
      "Lisatud!",
      2500
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FoundArticlesCounter wordData={props.wordDataArray} />
      <FlatList
        data={props.wordDataArray}

        renderItem={({ item, index }) => {

          return (
            <View key={`wordIndex-${index}`}>
              <Text key={`wordIndex-${index}-text`} style={styles.wordText}>
                {item.word}{" "}
              </Text>
              <Forms key={`wordIndex-${index}-forms`} forms={item.forms} />
              <Type key={`wordIndex-${index}-type`} type={item.type} />
              {item.usages.map((
                usage, usageIndex
              ) => {
                return (
                  <View key={`usage-${usageIndex}`}>
                    {usage.definitionData.map((
                      definition, index
                    ) => {
                      const definitionIndexString: string = index === 0 ? `${usageIndex + 1}. ` : "\u25A0 "

                      return (
                        <View key={`usage-${index}-definition-${index}`}>
                          <Text key={`usage-${index}-definition-${index}-text`} style={styles.definitionText}>{definitionIndexString}{definition.definitionText}</Text>
                          {
                            definition.russianTranslations.map((
                              translation, translationIndex
                            ) => {
                              const textElements: React.JSX.Element[] = [];
                              if (translation == null) {
                                console.log(
                                  "Translation is null",
                                  translation
                                );
                                return null;
                              }
                              const russianTranslationWordParts = translation.split("\"");

                              const russianTranslationWordPartsJoined = russianTranslationWordParts.join("");

                              // Iterate over the word parts and style the accented letter
                              for (let i = 0; i < russianTranslationWordParts.length; i++) {
                                if (i === 0) {
                                  // The first part before the first quote is normal
                                  textElements.push(<Text key={`usage-${index}-russian-translation-${translationIndex}-current-word-part-${i}`} style={styles.russianText}>{russianTranslationWordParts[i]}</Text>);
                                } else {
                                  // The part after the quote, where the first letter is the accent
                                  textElements.push(<Text key={`usage-${index}-russian-translation-${translationIndex}-current-word-part-${i}`} style={styles.russianAccentText}>{russianTranslationWordParts[i][0]}
                                    <Text key={`usage-${index}-russian-translation-${translationIndex}-current-word-part-${i}-rest`} style={styles.russianText}>{russianTranslationWordParts[i].slice(1)}</Text>
                                  </Text>,);
                                }
                              }
                              if (normalizeRussianTranslation(russianTranslationWordPartsJoined).includes(normalizeRussianTranslation(props.searchString)) === true) {
                                return (
                                  <View key={`usage-${index}-russian-translation-${translationIndex}-current-word-translation-view`} style={styles.wordPartsTogetherHighlighted}>{textElements}</View>
                                )
                              }

                              return (
                                <View key={`usage-${index}-russian-translation-${translationIndex}-current-word-translation-view`} style={styles.wordPartsTogether}>{textElements}</View>
                              )
                            })
                          }
                        </View>
                      )
                    })}
                    <Examples key={`wordIndex-${index}-examples`} examples={usage.examples} />
                  </View>
                )


              })}
              <TextButton key={`wordIndex-${index}-add`} style={styles.addToDictionaryContainer} textStyle={styles.addToDictionaryText} text={i18n.t(
                "add_to_dictionary",
                { defaultValue: "Lisa sõnastikku" }
              )} onPress={() => addToDictionary(item)} label="Add to dictionary" />
            </View>
          );
        }}
      />
    </ScrollView>
  );
}

export default WordData;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: CommonColors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: CommonColors.black,
    padding: 15
  },

  wordContainer: {
    margin: 10,
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  definitionText: {
    color: "rgba(243, 245, 243, 0.8)",
    fontSize: 16
  },
  indexText: {
    color: CommonColors.white,
    fontSize: 14,
    marginTop: 5,
    marginRight: 5
  },
  russianText: {
    color: CommonColors.purple,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  wordPartsTogether: {
    flexDirection: "row",
  },
  wordPartsTogetherHighlighted: {
    flexDirection: "row",
    backgroundColor: "rgba(241, 241, 240, 0.1)",
    borderRadius: 5,
    marginRight: "auto",
  },
  addToDictionaryContainer: {
    marginVertical: 20,
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
  notFoundText: {
    color: CommonColors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
