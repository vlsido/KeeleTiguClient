import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CommonColors } from "../../../../constants/Colors";
import TranslateWordsGameResultsHeader from "./TranslateWordsGameResultsHeader";
import TextButton from "../../../buttons/TextButton";
import { i18n } from "../../../store/i18n";
import { WordAndExamData } from "../../../../app/(tabs)/dictionary";
import { RestartIcon } from "../../../icons/RestartIcon";


export interface ResultsData {
  word: WordAndExamData;
  answer: string;
  userAnswer: string;
}

interface TranslateWordsGameResultsProps {
  results: ResultsData[];
  correctCount: number;
  incorrectCount: number;
  onRestart: () => void;
  onRestartToFixMistakes: () => void;
}

function TranslateWordsGameResults(props: TranslateWordsGameResultsProps) {


  return (
    <View style={styles.container}>
      <TranslateWordsGameResultsHeader
        correctCount={props.correctCount}
        incorrectCount={props.incorrectCount} />
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.listContentContainer}>
          {props.results.map((item, index) => {
            return (
              <View
                key={index}
                style={styles.listItemContainer}
              >
                <View style={styles.wordContainer}>
                  {item.word.examData.russianTranslations.map((word, index) => {
                    if (index > 2) return null;
                    return <Text
                      key={index}
                      style={styles.wordText}>{word.replaceAll("\"", "")}
                    </Text>
                  })}
                </View>
                <View style={styles.wordContainer}>
                  <Text style={[styles.userAnswerText,
                  item.userAnswer === item.answer
                    ? { color: CommonColors.green }
                    : { color: "red", textDecorationLine: "line-through" }]}>
                    {item.userAnswer}
                  </Text>
                  {item.userAnswer !== item.answer && (
                    <Text style={styles.wordText}>{item.answer}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TextButton
        testID="TRANSLATE_WORDS_GAME_RESULTS.SCROLL_CONTAINER.START_AGAIN:PRESSABLE"
        text={i18n.t("start_again", { defaultValue: "Alusta uuesti" })}
        onPress={props.onRestart}
        label={i18n.t("start_again", { defaultValue: "Alusta uuesti" })}
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
      >
        <RestartIcon />
      </TextButton>
      {props.incorrectCount > 0 && (
        <TextButton
          testID="TRANSLATE_WORDS_GAME_RESULTS.SCROLL_CONTAINER.FIX_MISTAKES:PRESSABLE"
          text={i18n.t("fix_mistakes", { defaultValue: "Paranda vead" })}
          onPress={props.onRestartToFixMistakes}
          label={i18n.t("fix_mistakes", { defaultValue: "Paranda vead" })}
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
        >
          <RestartIcon />
        </TextButton>
      )}
    </View>
  )
}

export default TranslateWordsGameResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    marginVertical: 10
  },
  listContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
  },
  listContentContainer: {
    gap: 10
  },
  listItemContainer: {
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48,
    paddingVertical: 10
  },
  wordContainer: {
    alignItems: "center",
    flex: 1
  },
  wordText: {
    fontSize: 16,
    color: "white",
    textAlign: "center"
  },
  userAnswerText: {
    fontSize: 16
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    gap: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white"
  }
});
