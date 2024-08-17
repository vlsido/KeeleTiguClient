import { CommonColors } from "@/constants/Colors";
import { Signal, useComputed, useSignalEffect } from "@preact/signals-react";
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface ExamWord {
  word: string;
  russianTranslation: string;
}

interface ExamWordComponentProps {
  examWords: Signal<ExamWord[]>;
  isAnswerVisible: Signal<boolean>;
}

function ExamWordComponent(props: ExamWordComponentProps) {
  const currentWord = useComputed<React.JSX.Element[]>(() => {
    const word = props.examWords.value.at(0);
    const wordElements: React.JSX.Element[] = [];

    if (word != null) {
      const wordParts = word.russianTranslation.split("\"");

      // Array to hold the word parts with the accent letter styled
      const wordElements = [];

      // Iterate over the word parts and style the accented letter
      for (let i = 0; i < wordParts.length; i++) {
        if (i === 0) {
          // The first part before the first quote is normal
          wordElements.push(<Text key={`current-word-part-${i}`} style={styles.normalText}>{wordParts[i]}</Text>);
        } else {
          // The part after the quote, where the first letter is the accent
          wordElements.push(
            <Text key={`current-word-part-${i}`} style={styles.accentedText}>{wordParts[i][0]}</Text>,
            <Text key={`current-word-part-${i}-rest`} style={styles.normalText}>{wordParts[i].slice(1)}</Text>
          );
        }
      }

      return wordElements;
    }

    return wordElements;
  });

  const currentAnswer = useComputed<React.JSX.Element[]>(() => {
    const word = props.examWords.value.at(0);
    const wordElements: React.JSX.Element[] = [];

    if (word != null) {
      const wordParts = word.word.split("+");

      if (wordParts.length === 1) {
        wordElements.push(<Text key={"whole-word"} style={styles.normalText}>{word.word}</Text>);
        return wordElements;
      }

      const wholeWord = wordParts.join("");


      wordElements.push(<Text key="whole-word" style={styles.normalText}>{wholeWord}</Text>);

      for (let i = 0; i < wordParts.length; i++) {
        if (i === 0) {
          wordElements.push(<Text key={`answer-part-${i}-parentheses`} style={styles.smallText}> (<Text key={`answer-part-${i}`} style={styles.smallAccentedText}>{wordParts[i]}</Text></Text>);

        } else if (i !== 0 && i !== wordParts.length - 1) {
          wordElements.push(
            <Text key={`answer-part-${i}`} style={styles.smallText}>{wordParts[i]}</Text>
          );
        } else if (i === wordParts.length - 1) {
          wordElements.push(
            <Text key={`answer-part-${i}`} style={styles.smallText}>+{wordParts[i]})</Text>
          );
        }
      }

      return wordElements;
    }

    return wordElements;
  });

  return (
    <>
      <View style={styles.container}>
        {currentWord.value}
      </View>
      {props.isAnswerVisible.value === true && (
        <View style={styles.answerContainer}>
          {currentAnswer.value}
        </View>
      )}
    </>
  );
}

export default ExamWordComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: CommonColors.white,
    flexDirection: "row",
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  word: {
    fontSize: 20,
    color: CommonColors.white,
  },
  normalText: {
    fontSize: 20,
    color: CommonColors.white,
  },
  accentedText: {
    fontSize: 20,
    color: CommonColors.red,
  },

  smallText: {
    fontSize: 16,
    color: CommonColors.white,
  },
  smallAccentedText: {
    fontSize: 16,
    color: CommonColors.red,
  },
});
