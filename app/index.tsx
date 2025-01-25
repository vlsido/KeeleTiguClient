import { StyleSheet, View } from "react-native";
import TranslateWordsGame from "../components/games/translate/TranslateWordsGame";
import { CommonColors } from "../constants/Colors";

export default function Index() {
  return (
    <View
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
    paddingVertical: 10,
  },
})
