import { CommonColors } from "../../constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

function DictionaryLink() {

  return (
    <Link href="/Dictionary" style={styles.linkContainer}>
      <Text style={styles.linkText}>Minu Sõnastik</Text>
    </Link>
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
