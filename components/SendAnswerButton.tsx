import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, { ReduceMotion, SharedValue, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CommonColors } from "@/constants/Colors";
import { ReadonlySignal, signal, useSignalEffect } from "@preact/signals-react";
import { CheckmarkIcon } from "./icons/CheckmarkIcon";

export const textAnswerFieldContainerWidth = signal<number>(0);

interface SendAnswerButtonProps {
  answer: ReadonlySignal<string>;
  opacity: SharedValue<number>;
  onPress: () => void;
}

function SendAnswerButton(props: SendAnswerButtonProps) {

  const left = useSharedValue<number>(0);

  useSignalEffect(() => {
    if (textAnswerFieldContainerWidth.value !== 0) {
      left.value = textAnswerFieldContainerWidth.value;
    }
  });

  const pointerEvents = useSharedValue<"auto" | "none">("none");

  useSignalEffect(() => {
    if (props.answer.value !== "") {
      props.opacity.value = withTiming(1, { duration: 100 });
      pointerEvents.value = "auto";
    } else {
      props.opacity.value = withTiming(0.16888, { duration: 33 });
      pointerEvents.value = "none";
    }
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

  if (textAnswerFieldContainerWidth.value === 0) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, styles.container]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onPress}
    >
      <CheckmarkIcon scale={1.25} />
    </AnimatedPressable>
  );
}

export default SendAnswerButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
    position: "absolute",
  },
  text: {
    fontWeight: "bold",
    color: CommonColors.black,
  }
});
