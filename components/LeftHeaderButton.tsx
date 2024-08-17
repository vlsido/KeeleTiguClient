import { StyleSheet, Text, View } from "react-native";
import { auth } from "./util/FirebaseConfig";
import { router } from "expo-router";
import TextButton from "./TextButton";
import { CommonColors } from "@/constants/Colors";

function LeftHeaderButton() {

  return (
    <TextButton
      onPress={() => router.replace("/")}
      text="Back"
      style={styles.backContainer}
      textStyle={styles.backText}
      label="Back"
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
