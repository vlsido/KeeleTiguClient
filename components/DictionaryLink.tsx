import { CommonColors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

function DictionaryLink() {

  return (
    <Link href="/dictionary" style={styles.dictionaryLink}>
      <Text style={styles.dictionaryText}>Minu Sõnastik</Text>
    </Link>
  )
}

export default DictionaryLink;

const styles = StyleSheet.create({
  dictionaryLink: {
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
  },
  dictionaryText: {
    color: CommonColors.white,
    fontSize: 16,
  },
});
