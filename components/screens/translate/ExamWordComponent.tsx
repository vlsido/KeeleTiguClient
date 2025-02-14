import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  atom,
  useAtomValue
} from "jotai";
import {
  gameWordsAtom,
} from "./translateAtoms";
import {
  Word,
  WordAndExamData
} from "../../../app/dictionary";
import { CommonColors } from "../../../constants/Colors";
import AddToDictionaryButton from "../../buttons/AddToDictionaryIconButton";

export interface ExamWord {
  word: string;
  russianTranslations: string[];
}

interface ExamWordComponentProps {
  mode: "any" | "my_dictionary";
  isAnswerVisible: boolean;
}

const currentWordAtom = atom<React.JSX.Element[]>((get) => {
  const wordElements: React.JSX.Element[] = [];

  const gameWords = get(gameWordsAtom);

  if (gameWords.length > 0) {
    const word = gameWords.at(0);

    if (word != null) {
      word.examData.russianTranslations.forEach((
        translation, translationIndex
      ) => {
        if (translationIndex > 2) return;
        const textElements: React.JSX.Element[] = [];
        const russianTranslationWordParts = translation.split("\"");

        // Iterate over the word parts and style the accented letter

        russianTranslationWordParts.forEach((
          wordPart, index
        ) => {
          if (index === 0) {
            // The first part before the first quote is normal
            textElements.push(<Text key={`russian-${translationIndex}-current-word-part-${index}`} style={styles.normalText}>{wordPart}</Text>);
          } else {
            // The part after the quote, where the first letter is the accent
            textElements.push(
              <Text key={`russian-${translationIndex}-current-word-part-${index}`} style={styles.accentedText}>{wordPart[0]}</Text>,
              <Text key={`russina-${translationIndex}-current-word-part-${index}-rest`} style={styles.normalText}>{wordPart.slice(1)}</Text>
            );
          }
        });

        wordElements.push(<Text key={`russian-${translationIndex}-current-word-translation-view`} style={styles.wordPartsTogether}>{textElements}</Text>);

      });

      return wordElements;
    }
  }
  return wordElements;
});

const currentAnswerAtom = atom<React.JSX.Element[]>((get) => {
  const wordElements: React.JSX.Element[] = [];

  const gameWords = get(gameWordsAtom);

  if (gameWords.length > 0) {
    const word = gameWords.at(0);
    if (word != null) {
      const wordParts = word.examData.word.split("+");

      if (wordParts.length === 1) {
        wordElements.push(<Text key={"whole-word"} style={styles.normalText}>{word.examData.word}</Text>);
        return wordElements;
      }

      const wholeWord = wordParts.join("");

      wordElements.push(<Text key="whole-word" style={styles.normalText}>{wholeWord}</Text>);

      wordParts.forEach((
        wordPart, index
      ) => {
        if (index === 0) {
          wordElements.push(<Text key={`answer-part-${index}-parentheses`} style={styles.smallText}> (<Text key={`answer-part-${index}`} style={styles.smallAccentedText}>{wordPart}</Text></Text>);

        } else if (index !== 0 && index !== wordParts.length - 1) {
          wordElements.push(<Text key={`answer-part-${index}`} style={styles.smallText}>{wordPart}</Text>);

        } else if (index === wordParts.length - 1) {
          wordElements.push(<Text key={`answer-part-${index}`} style={styles.smallText}>+{wordPart})</Text>);

        }
      });

      return wordElements;
    }
  }

  return wordElements;
});

function ExamWordComponent(props: ExamWordComponentProps) {
  const gameWords = useAtomValue<Word[] | WordAndExamData[]>(gameWordsAtom);

  const currentWord = useAtomValue<React.JSX.Element[]>(currentWordAtom);

  const currentAnswer = useAtomValue<React.JSX.Element[]>(currentAnswerAtom);

  if (gameWords.length === 0) {
    return (
      <View
        testID="EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER:VIEW"
        style={styles.loadingContainer}
      >
        <ActivityIndicator testID="EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER.LOADING:ACTIVITY_INDICATOR" size={32} color={CommonColors.white} />
      </View>
    );
  }

  return (
    <>
      <View
        testID="EXAM_WORD_COMPONENT.WORD_CONTAINER:VIEW"
        style={styles.container}
      >
        {currentWord}
      </View>
      {props.isAnswerVisible === true && (
        <View testID="EXAM_WORD_COMPONENT.ANSWER_CONTAINER:VIEW" style={styles.answerContainer}>
          <Text style={{ textAlign: "center" }}>
            {currentAnswer}
          </Text>
          {props.mode === "any" && <AddToDictionaryButton word={gameWords.at(0)} />}
        </View>
      )}
    </>
  );
}

export default ExamWordComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
