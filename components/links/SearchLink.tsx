import {
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../constants/Colors";

function SearchLink({ onPress }) {

  return (
    <Pressable onPress={() => onPress("search")} style={styles.linkContainer}>
      <Text style={styles.linkText}>Otsi</Text>
    </Pressable>
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
