import { Word } from "../../app/dictionary";
import { CommonColors } from "../../constants/Colors";
import { ReadonlySignal } from "@preact/signals-react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { i18n } from "../store/i18n";

interface FoundArticlesCounterProps {
  wordData: ReadonlySignal<Word[] | null>;
}

function FoundArticlesCounter(props: FoundArticlesCounterProps) {
  if (!props.wordData.value) {
    return null;
  }

  if (props.wordData.value.length > 0 && props.wordData.value.length < 51) {
    return (
      <View style={styles.wordCount}>
        <Text
          style={styles.wordCountText}
        >
          {i18n.t(
            "count_words_in_search",
            {
              defaultValue: "Leitud %{count} artiklit",
              count: props.wordData.value.length,
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
