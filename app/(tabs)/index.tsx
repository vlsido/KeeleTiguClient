import {
  StyleSheet,
} from "react-native";
import TranslateWordsGame from "../../components/screens/index/games/translate/TranslateWordsGame";
import { CommonColors } from "../../constants/Colors";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView
      testID="INDEX.CONTAINER:VIEW"
      contentContainerStyle={styles.container}
    >
      <TranslateWordsGame />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: CommonColors.black,
    padding: 10,
  },
})
