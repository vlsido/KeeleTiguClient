import { StyleSheet } from "react-native";
import {
  FadeIn,
  FadeOut,
  ReduceMotion,
} from "react-native-reanimated";
import { AnimatedPressable } from "../util/AnimatedComponentsUtil";

interface OverlayHintProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function OverlayHint(props: OverlayHintProps) {
  if (props.isVisible === false) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[styles.backgroundContainer]}
      onPress={props.onClose}
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
    </AnimatedPressable>
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
