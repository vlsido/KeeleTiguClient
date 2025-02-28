import { StyleSheet, Text, View } from "react-native";
import { i18n } from "../../../store/i18n";
import GradeBadge from "../../../miscellaneous/GradeBadge";
import { CommonColors } from "../../../../constants/Colors";

interface TranslateWordsGameResultsHeaderProps {
  correctCount: number;
  incorrectCount: number;
}

function TranslateWordsGameResultsHeader(props: TranslateWordsGameResultsHeaderProps) {
  const percentage = (props.correctCount * 100) / (props.correctCount + props.incorrectCount);

  if (percentage === 100) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.text]}>
            {i18n.t("TranslateWordsGameResultsHeader_all_right", { defaultValue: "Suurepärane! Kõik sõnad on õigesti tõlginud!" })}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {i18n.t("TranslateWordsGameResultsHeader_test_results", { defaultValue: "Testi tulemus on" })}
          {" "}
          <Text style={styles.rightAnswerText}>
            {i18n.t("TranslateWordsGameResultsHeader_correct_count", { defaultValue: "%{count} õige", count: props.correctCount })}
            {" "}
          </Text>
          {i18n.t("and", { defaultValue: "ja" })}
          {" "}
          <Text style={styles.wrongAnswerText}>
            {i18n.t("TranslateWordsGameResultsHeader_incorrect_count", { defaultValue: "%{count} vale", count: props.incorrectCount })}
            {" "}
          </Text>
          {i18n.t("incorrect_answers_plural", { defaultValue: "vastust", count: props.incorrectCount })}
        </Text>
      </View>
      <GradeBadge percentage={percentage} />
    </View>
  );
}

export default TranslateWordsGameResultsHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center"
  },
  rightAnswerText: {
    color: CommonColors.green
  },
  wrongAnswerText: {
    color: "red"
  },
})
