import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native"
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
      style={[
        styles.optionContainer,
        { opacity: props.isSelected ? 1 : 0.75 }
      ]} onPress={props.onPress}>
      <View style={styles.verticalContainer}>
        <View style={styles.optionTextContainer}>
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
      <View testID="OPTION_BUTTON.CONTAINER.SELECTED:VIEW" style={styles.switchContainer}>
        <Switch
          testID="OPTION_BUTTON.CONTAINER.SELECTED.SWITCH:PRESSABLE"
          value={props.isSelected}
          trackColor={{ false: CommonColors.white, true: CommonColors.white }}
          thumbColor={CommonColors.saladGreen}
        />
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
    width: "100%",
    backgroundColor: CommonColors.black,
    borderWidth: 1,
    borderColor: CommonColors.whiteAlternative,
    borderRadius: 15,
    paddingVertical: 10
  },
  optionTextContainer: {
    width: "100%"
  },
  optionText: {
    width: "100%",
    color: CommonColors.white,
    fontSize: 16
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 5,
    gap: 10
  },
  childrenContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  switchContainer: {
    minHeight: 36,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center"
  }
});
