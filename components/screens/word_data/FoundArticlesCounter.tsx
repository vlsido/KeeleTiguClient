import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { Word } from "../../../app/dictionary";
import { i18n } from "../../store/i18n";
import { CommonColors } from "../../../constants/Colors";

interface FoundArticlesCounterProps {
  wordData: Word[] | null;
}

function FoundArticlesCounter(props: FoundArticlesCounterProps) {
  if (!props.wordData) {
    return null;
  }

  if (props.wordData.length > 0 && props.wordData.length < 51) {
    return (
      <View style={styles.wordCount}>
        <Text
          style={styles.wordCountText}
        >
          {i18n.t(
            "count_words_in_search",
            {
              defaultValue: "Leitud %{count} artiklit",
              count: props.wordData.length,
            }
          )}
        </Text>
      </View>
    )
  }
}

export default FoundArticlesCounter;

const styles = StyleSheet.create({
  wordCount: {
    marginVertical: 3,
  },
  wordCountText: {
    color: CommonColors.white,
    fontSize: 16,
  },
});
