import { CommonColors } from "@/constants/Colors";
import { Signal, useComputed, useSignalEffect } from "@preact/signals-react";
import { Fragment } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { randomWords } from "./util/WordsUtil";
import { AddToDictionaryIcon } from "./icons/AddToDictionaryIcon";
import AddToDictionaryButton from "./buttons/AddToDictionaryButton";

export interface ExamWord {
  word: string;
  russianTranslations: string[];
}

interface ExamWordComponentProps {
  isAnswerVisible: Signal<boolean>;
}

function ExamWordComponent(props: ExamWordComponentProps) {
  const currentWord = useComputed<React.JSX.Element[]>(() => {
    const wordElements: React.JSX.Element[] = [];
    if (randomWords.value.length > 0) {
      const word = randomWords.value.at(0);

      if (word != null) {
        word.usages.at(0)?.definitionData.at(0)?.russianTranslations.forEach((translation, index) => {
          const textElements: React.JSX.Element[] = [];
          const russianTranslationWordParts = translation.split("\"");

          // Iterate over the word parts and style the accented letter
          for (let i = 0; i < russianTranslationWordParts.length; i++) {
            if (i === 0) {
              // The first part before the first quote is normal
              textElements.push(<Text key={`russian-${index}-current-word-part-${i}`} style={styles.normalText}>{russianTranslationWordParts[i]}</Text>);
            } else {
              // The part after the quote, where the first letter is the accent
              textElements.push(
                <Text key={`russian-${index}-current-word-part-${i}`} style={styles.accentedText}>{russianTranslationWordParts[i][0]}</Text>,
                <Text key={`russina-${index}-current-word-part-${i}-rest`} style={styles.normalText}>{russianTranslationWordParts[i].slice(1)}</Text>
              );
            }
          }

          wordElements.push(<View key={`russian-${index}-current-word-translation-view`} style={styles.wordPartsTogether}> {textElements} </View>);
        });


        return wordElements;
      }
    }
    wordElements.push(<ActivityIndicator key={"activity-indicator"} size={32} color={CommonColors.white} />);
    return wordElements;
  });

  const currentAnswer = useComputed<React.JSX.Element[]>(() => {
    const wordElements: React.JSX.Element[] = [];
    if (randomWords.value.length > 0) {
      const word = randomWords.value.at(0);
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
          <AddToDictionaryButton />
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
    flexDirection: "column",
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
  wordPartsTogether: {
    flexDirection: "row",
  },
});
