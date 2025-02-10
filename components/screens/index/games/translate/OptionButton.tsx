import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native"
import { CheckmarkIcon } from "../../../../icons/CheckmarkIcon";
import { CommonColors } from "../../../../../constants/Colors";

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

function OptionButton(props: OptionButtonProps) {
  return (
    <Pressable
      testID="OPTION_BUTTON.CONTAINER:PRESSABLE"
      disabled={props.isSelected}
      style={[
        styles.optionContainer,
        { opacity: props.isSelected ? 1 : 0.75 }
      ]} onPress={props.onPress}>
      <View style={styles.verticalContainer}>
        <View>
          <Text
            testID="OPTION_BUTTON.CONTAINER.OPTION_NAME:TEXT"
            style={styles.optionText}>{props.text}</Text>
        </View>
        {props.children ? (
          <View
            testID="OPTION_BUTTON.CONTAINER.CHILDREN:VIEW"
            style={styles.childrenContainer}
          >
            {props.children}
          </View>
        ) : null}
      </View>
      <View testID="OPTION_BUTTON.CONTAINER.SELECTED:VIEW" style={styles.checkmarkContainer}>
        {props.isSelected === true && (
          <CheckmarkIcon
            testID="OPTION_BUTTON.CONTAINER.SELECTED.CHECKMARK:ICON" />
        )}
      </View>
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
    width: "100%",
    paddingVertical: 10
  },
  optionText: {
    color: CommonColors.white,
    fontSize: 16
  },
  verticalContainer: {
    flexDirection: "column",
    paddingVertical: 5,
    gap: 10
  },
  childrenContainer: {
    minHeight: 36,
    minWidth: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  checkmarkContainer: {
    minHeight: 36,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center"
  }
});
