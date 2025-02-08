import { useAtomValue } from "jotai";
import {
  StyleSheet,
  ViewStyle
} from "react-native";
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  answerAtom,
  textAnswerFieldContainerWidthAtom
} from "./translateAtoms";
import { useEffect } from "react";
import { AnimatedPressable } from "../../util/AnimatedComponentsUtil";
import { CommonColors } from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

interface SendAnswerButtonProps {
  opacity: SharedValue<number>;
  onPress: () => void;
}

function SendAnswerButton(props: SendAnswerButtonProps) {
  const left = useSharedValue<number>(0);

  const answer = useAtomValue<string>(answerAtom);

  const textAnswerFieldContainerWidth = useAtomValue<number>(textAnswerFieldContainerWidthAtom);

  useEffect(
    () => {
      if (textAnswerFieldContainerWidth !== 0) {
        left.value = textAnswerFieldContainerWidth;
      }
    },
    [
      textAnswerFieldContainerWidth
    ]
  );

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
      left: left.value,
      pointerEvents: pointerEvents.value,
    }
  });

  function onPress() {
    props.onPress();
  }

  if (textAnswerFieldContainerWidth === 0) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[
        animatedStyle,
        styles.container
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onPress}
    >
      <MaterialIcons
        name="arrow-upward"
        size={32}
        color={"black"}
      />
    </AnimatedPressable>
  );
}

export default SendAnswerButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 32,
    width: 32,
    alignSelf: "flex-end",
    margin: 8,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: CommonColors.black,
  }
});
