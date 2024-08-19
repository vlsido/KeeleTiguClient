import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  ReduceMotion,
  runOnJS,
} from "react-native-reanimated";
import { ReadonlySignal, Signal, useSignal, useSignalEffect } from "@preact/signals-react";
import { CommonColors } from "@/constants/Colors";

interface HintProps {
  text: ReadonlySignal<string>;
  isHintVisible: Signal<boolean>;
  duration: ReadonlySignal<number>;
}

function Hint(props: HintProps) {
  const opacity = useSharedValue(0);

  const isMounted = useSignal<boolean>(false);

  useSignalEffect(() => {
    if (props.isHintVisible.value === true) {
      isMounted.value = true;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  function hideWithDelay() {
    setTimeout(() => {
      opacity.value = withTiming(
        0,
        {
          duration: 500,
          reduceMotion: ReduceMotion.System,
        },
        () => {
          runOnJS(unmount)();
        },
      );
    }, props.duration.value);
  }

  function unmount() {
    isMounted.value = false;
    props.isHintVisible.value = false;
  }

  function onLayout() {
    opacity.value = withTiming(
      1,
      {
        duration: 500,
        reduceMotion: ReduceMotion.System,
      },
      () => {
        runOnJS(hideWithDelay)();
      },
    );
  }


  if (isMounted.value === false) {
    return null;
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        {
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          justifyContent: "center",
          pointerEvents: "none",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.hintAnimatedView,
          animatedStyle,
          {
            backgroundColor: CommonColors.white,
            borderColor: CommonColors.black,
          },
        ]}
      >
        <Text style={[styles.hintText, { color: CommonColors.black }]}>
          {props.text}
        </Text>
      </Animated.View>
    </View>
  );
}

export default Hint;

const styles = StyleSheet.create({
  hintAnimatedView: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    padding: 15,
  },
  hintText: {
    fontFamily: "Roboto_Regular",
    fontSize: 14,
    textAlign: "center",
  },
  openSettingsButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    margin: 5,
    alignItems: "center",
  },
});

