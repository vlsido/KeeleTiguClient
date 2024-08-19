import { Word } from "@/app/dictionary";
import { StyleSheet, Text, View } from "react-native";
import Forms from "../text_components/Forms";
import { CommonColors } from "@/constants/Colors";
import Animated from "react-native-reanimated";
import TextButton from "../TextButton";
import { useSignal } from "@preact/signals-react";
import Examples from "./Examples";
import KebabMenuButton from "./KebabMenuButton";

interface DictionaryItemProps extends Word {
  index: number;
}

function DictionaryItem({ word, type, forms, definition, russianTranslations, examples, index }: DictionaryItemProps) {

  const typeString = (() => {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case "s":
        return "substantiiv";
      case "v":
        return "verb";
      case "adj":
        return "adjektiiv";
      case "adv":
        return "adverb";
    }

    return undefined;
  })

  const RussianTranslations = (() => {
    const wordElements: React.JSX.Element[] = [];

    if (word != null) {
      russianTranslations.forEach((translation, index) => {
        const textElements: React.JSX.Element[] = [];
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

        wordElements.push(<View key={`russian-translation-${index}-current-word-translation-view`} style={styles.wordPartsTogether}> {textElements} </View>);


        return wordElements;
      });
    }
    return wordElements;
  });

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{index}.</Text>
      <View style={styles.wordContainer}>
        <View>
          <Text style={styles.wordText}>
            {word}{" "}
          </Text>
          <Forms forms={forms} />
          <Text style={styles.typeText} >{typeString()}
          </Text>
          <Text style={styles.definitionText}>{definition}</Text>
          {RussianTranslations()}
          <Examples examples={examples} />
        </View>
      </View>
      <KebabMenuButton word={word} />
    </View>
  );
}

export default DictionaryItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
  },
  wordContainer: {
    width: "95%",
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  typeText: {
    color: CommonColors.green,
    fontSize: 16
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
});
