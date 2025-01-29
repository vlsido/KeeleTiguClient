import {
  Pressable,
  StyleSheet,
  Text
} from "react-native"
import { CheckmarkIcon } from "../../../../icons/CheckmarkIcon";
import { CommonColors } from "../../../../../constants/Colors";

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

function OptionButton(props: OptionButtonProps) {
  return (
    <Pressable style={styles.optionContainer} onPress={props.onPress}>
      <Text style={styles.optionText}>{props.text}</Text>
      {props.isSelected === true && <CheckmarkIcon />}
    </Pressable>
  )
}

export default OptionButton;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    minHeight: 64,
    borderBottomWidth: 1,
  },
  optionText: {
    color: CommonColors.white,
    fontSize: 16
  },
});
