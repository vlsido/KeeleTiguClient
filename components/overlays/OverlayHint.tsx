import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ReduceMotion,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector
} from "react-native-gesture-handler";

interface OverlayHintProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function OverlayHint(props: OverlayHintProps) {
  const tapGesture = useMemo(() =>
    Gesture.Tap().onEnd(() => {
      runOnJS(props.onClose)();
    }), [props.onClose]);

  if (props.isVisible === false) {
    return null;
  }

  return (
    <GestureDetector
      gesture={tapGesture}
    >
      <Animated.View
        style={[styles.backgroundContainer]}
        entering={FadeIn
          .reduceMotion(ReduceMotion.System)
          .duration(133)
        }
        exiting={FadeOut
          .reduceMotion(ReduceMotion.System)
          .duration(133)
        }
      >
        {props.children}
      </Animated.View>
    </GestureDetector>
  );
}

export default OverlayHint;

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
});
