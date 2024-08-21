import { CommonColors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

function SearchLink() {

  return (
    <Link href="/search" style={styles.linkContainer}>
      <Text style={styles.linkText}>Otsi</Text>
    </Link>
  )
}

export default SearchLink;

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
