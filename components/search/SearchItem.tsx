import { Word } from "@/app/dictionary";
import { StyleSheet, Text, View } from "react-native";
import Forms from "../text_components/Forms";
import { CommonColors } from "@/constants/Colors";
import Type from "../dictionary/Type";
import Examples from "../dictionary/Examples";
import TextButton from "../TextButton";
import { i18n } from "../store/i18n";
import { useContext } from "react";
import { HintContext } from "../store/HintContext";
import { allWords, myDictionary } from "../util/WordsUtil";

interface SearchItemProps extends Word {
  index: number;
}

function SearchItem(props: SearchItemProps) {
  const { showHint } = useContext(HintContext);

  function addToDictionary() {
    console.log("added");

    if (myDictionary.value.find((word) => word.word === props.word)) {
      showHint("Sõna on juba sõnastikus!", 500);
      return;
    }

    const word = allWords.value.find((word) => word.word === props.word);

    if (word === undefined) {
      console.error("Word is undefined", props.word);
      return;
    }

    myDictionary.value = [...myDictionary.value, word];

    // Add to dictionary
    showHint("Lisatud!", 500);
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.wordContainer}>
        <View>
          <Text style={styles.wordText}>
            {props.word}{" "}
          </Text>
          <Forms forms={props.forms} />
          <Type type={props.type} />
          <Text style={styles.definitionText}>{props.definition}</Text>
          {props.russianTranslations.map((translation, index) => {
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
          <Examples examples={props.examples} />
        </View>
      </View>
      <TextButton style={styles.addToDictionaryContainer} textStyle={styles.addToDictionaryText} text={i18n.t("add_to_dictionary", { defaultValue: "Lisa" })} onPress={addToDictionary} label="Add to dictionary" />
    </View>
  );
}

export default SearchItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: CommonColors.yellow,
    marginVertical: 5,
    padding: 5,
  },
  wordContainer: {
    width: "95%",
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
  }
});
