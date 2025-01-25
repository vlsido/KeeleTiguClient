import { CommonColors } from "../constants/Colors";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text
} from "react-native";

function ExamLink() {

  return (
    <Link href="/" style={styles.examLink}>
      <Text style={styles.examText}>Eksam</Text>
    </Link>
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
