import { StyleSheet } from "react-native";
import { router } from "expo-router";
import TextButton from "./TextButton";
import { CommonColors } from "../constants/Colors";

function LeftHeaderButton() {

  return (
    <TextButton
      onPress={() => router.replace("/")}
      text="Tagasi"
      style={styles.backContainer}
      textStyle={styles.backText}
      label="Tagasi"
    />
  );
}

export default LeftHeaderButton;

const styles = StyleSheet.create({
  backContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
    marginLeft: 20,
  },
  backText: {
    fontSize: 16,
    color: CommonColors.white,
  }
});
