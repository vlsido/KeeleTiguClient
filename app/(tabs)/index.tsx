import {
  StyleSheet,
  View
} from "react-native";
import TranslateWordsGame from "../../components/screens/index/games/translate/TranslateWordsGame";
import { CommonColors } from "../../constants/Colors";

export default function Index() {
  return (
    <View
      testID="INDEX.CONTAINER:VIEW"
      style={styles.container}
    >
      <TranslateWordsGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: CommonColors.black,
    padding: 10,
  },
})
