import {
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../constants/Colors";

function DictionaryLink({ onPress }) {

  return (
    <Pressable onPress={() => onPress("dictionary")} style={styles.linkContainer}>
      <Text style={styles.linkText}>Minu Sõnastik</Text>
    </Pressable>
  )
}

export default DictionaryLink;

const styles = StyleSheet.create({
  linkContainer: {
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
  },
  linkText: {
    color: CommonColors.white,
    fontSize: 16,
  },
});
