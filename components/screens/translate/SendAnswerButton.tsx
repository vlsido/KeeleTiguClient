import { useEffect } from "react";
import {
  StyleSheet,
  ViewStyle
} from "react-native";
import { useAtomValue } from "jotai";
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  answerAtom,
} from "./translateAtoms";
import { AnimatedPressable } from "../../util/AnimatedComponentsUtil";
import { CommonColors } from "../../../constants/Colors";
import { ArrowUpwardIcon } from "../../icons/ArrowUpwardIcon";

interface SendAnswerButtonProps {
  opacity: SharedValue<number>;
  onPress: () => void;
}

function SendAnswerButton(props: SendAnswerButtonProps) {
  const answer = useAtomValue<string>(answerAtom);

  const pointerEvents = useSharedValue<"auto" | "none">("none");

  useEffect(
    () => {
      if (answer !== "") {
        props.opacity.value = withTiming(
          1,
          { duration: 100 }
        );
        pointerEvents.value = "auto";
      } else {
        props.opacity.value = withTiming(
          0.16888,
          { duration: 33 }
        );
        pointerEvents.value = "none";
      }
    },
    [
      answer
    ]
  );

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: props.opacity.value,
      pointerEvents: pointerEvents.value,
    }
  });

  return (
    <AnimatedPressable
      testID="SEND_ANSWER_BUTTON.ICON_CONTAINER:PRESSABLE"
      style={[
        animatedStyle,
        styles.container
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={props.onPress}
    >
      <ArrowUpwardIcon testID="SEND_ANSWER_BUTTON.SEND:ICON" />
    </AnimatedPressable>
  );
}

export default SendAnswerButton;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
  },
  text: {
    fontWeight: "bold",
    color: CommonColors.black,
  }
});
