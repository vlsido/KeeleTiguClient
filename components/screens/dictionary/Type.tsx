import {
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../../constants/Colors";

interface TypeProps {
  type: "s" | "v" | "adj" | "adv" | "konj" | undefined;
}

function Type(props: TypeProps) {
  const type = () => {
    switch (props.type) {
      case "s":
        return "substantiiv";
      case "v":
        return "verb";
      case "adj":
        return "adjektiiv";
      case "adv":
        return "adverb";
      case "konj":
        return "konjunktiiv";
      default:
        return undefined;
    }
  }

  return (
    <Text style={styles.typeText}>
      {type()}
    </Text>
  );
}

export default Type;

const styles = StyleSheet.create({
  typeText: {
    color: CommonColors.green,
    fontSize: 16
  },
});
