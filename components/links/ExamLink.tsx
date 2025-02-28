import {
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../constants/Colors";

function ExamLink({ onPress }) {

  return (
    <Pressable onPress={() => onPress("exam")} style={styles.examLink}>
      <Text style={styles.examText}>Eksam</Text>
    </Pressable>
  )
}

export default ExamLink;

const styles = StyleSheet.create({
  examLink: {
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
  },
  examText: {
    color: CommonColors.white,
    fontSize: 16,
  },
});
