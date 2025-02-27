import {
  useEffect,
  useMemo
} from "react";
import {
  StyleSheet,
  ViewStyle
} from "react-native";
import {
  atom,
  useAtom
} from "jotai";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";

interface AnswerStatusOverlayProps {
  correctCount: number;
  incorrectCount: number;
}

function AnswerStatusOverlay(props: AnswerStatusOverlayProps) {
  const [prevCorrectCount, setPrevCorrectCount] =
    useAtom<number>(useMemo(() => atom<number>(0), []));

  const [prevIncorrectCount, setPrevIncorrectCount] =
    useAtom<number>(useMemo(() => atom<number>(0), []));

  const opacity = useSharedValue<number>(0);

  const backgroundColor = useSharedValue<"#4ECB71" | "red">("#4ECB71");

  useEffect(() => {
    if (props.correctCount > prevCorrectCount) {
      setPrevCorrectCount(props.correctCount);
      backgroundColor.value = "#4ECB71";
      opacity.value = withSequence(
        withTiming(0.5, { duration: 150 }),
        withTiming(0, { duration: 150 })
      );
    } else if (props.incorrectCount > prevIncorrectCount) {
      setPrevIncorrectCount(props.correctCount);
      backgroundColor.value = "red";
      opacity.value = withSequence(
        withTiming(0.5, { duration: 150 }),
        withTiming(0, { duration: 150 })
      );
    }
  }, [
    props.correctCount,
    props.incorrectCount
  ]);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: opacity.value,
      backgroundColor: backgroundColor.value
    }
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]} />
  );
}

export default AnswerStatusOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    pointerEvents: "none"
  }
});
