import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle
} from "react-native";
import { CommonColors } from "../../constants/Colors";

interface RussianTranslationProps {
  translation: string;
  searchString: string | undefined;
  textStyle?: StyleProp<TextStyle>;
  accentTextStyle?: StyleProp<TextStyle>;
  highlightedTextStyle?: StyleProp<TextStyle>;
  highlightedAccentTextStyle?: StyleProp<TextStyle>;
}

function RussianTranslation(props: RussianTranslationProps) {
  const russianTextStyle = props.textStyle ? props.textStyle : styles.russianText;
  const russianAccentTextStyle = props.accentTextStyle ? props.accentTextStyle : styles.russianAccentText;
  const highlightedTextStyle = props.highlightedTextStyle ? props.highlightedTextStyle : styles.highlightedText;
  const highlightedAccentTextStyle = props.highlightedAccentTextStyle ? props.highlightedAccentTextStyle : styles.highlightedAccentText;

  const russianTranslationWordsArray = props.translation.split(" ");

  const searchStringIndex = props.translation.replaceAll(
    "\"",
    ""
  ).split(" ").
    findIndex((word) => word === props.searchString);

  const textElements: React.JSX.Element[] = [];

  // Iterate over the word parts
  russianTranslationWordsArray.forEach((
    word, wordIndex
  ) => {
    const splitWord = word.split("\"");

    const endSeparator = russianTranslationWordsArray.length === wordIndex + 1 ? "" : " ";

    if (splitWord.length <= 1) {
      textElements.push(<Text key={`wordIndex-${wordIndex}`} style={[
        russianTextStyle,
        wordIndex === searchStringIndex && highlightedTextStyle
      ]}>{word}{endSeparator}</Text>);
      return;
    }

    const elements: React.JSX.Element[] = [];

    splitWord.forEach((
      wordPart, wordPartIndex
    ) => {
      if (wordPartIndex === 0) {
        // The first part before the first quote is normal
        elements.push(<Text key={`wordIndex-${wordIndex}-part-${wordPartIndex}`} style={[
          russianTextStyle,
          wordIndex === searchStringIndex && highlightedTextStyle
        ]}>{wordPart}</Text>);
      } else {
        // The part after the quote, where the first letter is the accent
        elements.push(
          <Text key={`wordIndex-${wordIndex}-part-${wordPartIndex}-accent`} style={[
            russianAccentTextStyle,
            wordIndex === searchStringIndex && highlightedAccentTextStyle
          ]}>{wordPart[0]}
          </Text>,
          <Text key={`wordIndex-${wordIndex}-part-${wordPartIndex}-rest`} style={[
            russianTextStyle,
            wordIndex === searchStringIndex && highlightedTextStyle
          ]}>{wordPart.slice(1)}</Text>
        );
      }
    });

    textElements.push(<Text
      key={`wordIndex-${wordIndex}-word-${textElements.length}`}>{elements}{endSeparator}
    </Text>)

  });

  return (
    <Text testID="RUSSIAN_TRANSLATION.TRANSLATION:TEXT">{textElements}</Text>
  )
}

export default RussianTranslation;

const styles = StyleSheet.create({
  russianText: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: CommonColors.purple,
    fontSize: 16,
    fontWeight: "bold"
  },
  highlightedText: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginRight: "auto",
  },
  highlightedAccentText: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: CommonColors.red,
    marginRight: "auto",
  }
})
