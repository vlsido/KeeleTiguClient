import { CommonColors } from "@/constants/Colors";
import { useSignal } from "@preact/signals-react";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Word } from "./dictionary";
import { allWords, myDictionary, myDictionaryHistory } from "@/components/util/WordsUtil";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import Forms from "@/components/text_components/Forms";
import Type from "@/components/dictionary/Type";
import Examples from "@/components/dictionary/Examples";
import TextButton from "@/components/TextButton";
import { i18n } from "@/components/store/i18n";
import { HintContext } from "@/components/store/HintContext";

interface WordDataResponse {
  wordData: Word;
}

function WordData() {
  const { word } = useLocalSearchParams<{ word: string }>();

  const wordData = useSignal<Word | null>(null);

  useEffect(() => {
    getWordData();
  });

  async function getWordData() {
    console.log("Open word", word);
    const wordDataFromHistory = myDictionaryHistory.value.find((wordData) => wordData.word === word);

    if (wordDataFromHistory !== undefined) {
      wordData.value = wordDataFromHistory;
      return;
    }

    const response = await callCloudFunction("GetWordData_Node", { word: word }) as WordDataResponse | undefined;

    if (response != null) {
      console.log("Response", response);

      myDictionaryHistory.value = [...myDictionaryHistory.value, response.wordData]

      wordData.value = response.wordData;
    }
  }

  const { showHint } = useContext(HintContext);

  function addToDictionary() {
    if (wordData.value == null) {
      return;
    }

    console.log("added");

    if (myDictionary.value.find((word) => word.word === wordData.value?.word)) {
      showHint("Sõna on juba sõnastikus!", 500);
      return;
    }

    myDictionary.value = [...myDictionary.value, wordData.value];

    // Add to dictionary
    showHint("Lisatud!", 500);
  }

  if (wordData.value === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={32} color={CommonColors.white} />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.wordText}>
        {wordData.value.word}{" "}
      </Text>
      <Forms forms={wordData.value.forms} />
      <Type type={wordData.value.type} />
      <Text style={styles.definitionText}>{wordData.value.definition}</Text>
      {wordData.value.russianTranslations.map((translation, index) => {
        const textElements: React.JSX.Element[] = [];
        if (translation == null) {
          console.log("Translation is null", translation);
          return null;
        }
        const russianTranslationWordParts = translation.split("\"");

        // Iterate over the word parts and style the accented letter
        for (let i = 0; i < russianTranslationWordParts.length; i++) {
          if (i === 0) {
            // The first part before the first quote is normal
            textElements.push(<Text key={`russian-translation-${index}-current-word-part-${i}`} style={styles.russianText}>{russianTranslationWordParts[i]}</Text>);
          } else {
            // The part after the quote, where the first letter is the accent
            textElements.push(
              <Text key={`russian-translation-${index}-current-word-part-${i}`} style={styles.russianAccentText}>{russianTranslationWordParts[i][0]}</Text>,
              <Text key={`russian-translation-${index}-current-word-part-${i}-rest`} style={styles.russianText}>{russianTranslationWordParts[i].slice(1)}</Text>
            );
          }
        }

        return (
          <View key={`russian-translation-${index}-current-word-translation-view`} style={styles.wordPartsTogether}> {textElements} </View>
        )
      })}
      <Examples examples={wordData.value.examples} />
      <TextButton style={styles.addToDictionaryContainer} textStyle={styles.addToDictionaryText} text={i18n.t("add_to_dictionary", { defaultValue: "Lisa sõnastikku" })} onPress={addToDictionary} label="Add to dictionary" />
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
    flexGrow: 1,
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
  addToDictionaryContainer: {
    marginTop: 20,
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
