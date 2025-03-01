import {
  useCallback
} from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  ReduceMotion,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import {
  useAtom,
  useAtomValue,
} from "jotai";
import {
  durationAtom,
  hintTextAtom,
  isHintVisibleAtom
} from "./hintAtoms";
import { CommonColors } from "../../../constants/Colors";

function Hint() {
  const hintText = useAtomValue<string>(hintTextAtom);

  const duration = useAtomValue<number>(durationAtom);

  const [
    isHintVisible,
    setIsHintVisible
  ] = useAtom(isHintVisibleAtom);

  function hideWithDelay() {
    setTimeout(
      () => {
        setIsHintVisible(false);
      },
      duration
    );
  }

  const onLayout = useCallback(
    () => {
      hideWithDelay();
    },
    [
      hideWithDelay
    ]
  );

  if (isHintVisible === false) {
    return null;
  }

  return (
    <Animated.View
      testID={"HINT.ABSOLUTE_CONTAINER:VIEW"}
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
      entering={FadeIn.duration(500).reduceMotion(ReduceMotion.System)}
      exiting={FadeOut.duration(500).reduceMotion(ReduceMotion.System)}
    >
      <Animated.View
        testID={"HINT.ABSOLUTE_CONTAINER.CONTAINER:VIEW"}
        style={[
          styles.hintAnimatedView,
          {
            backgroundColor: CommonColors.white,
            borderColor: CommonColors.black,
          },
        ]}
      >
        <Text testID="HINT.ABSOLUTE_CONTAINER.CONTAINER.HINT:TEXT" style={[
          styles.hintText,
          { color: CommonColors.black }
        ]}>
          {hintText}
        </Text>
      </Animated.View>
    </Animated.View>
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

