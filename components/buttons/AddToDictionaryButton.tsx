import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { AddToDictionaryIcon } from "../icons/AddToDictionaryIcon";
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

function AddToDictionaryButton() {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: opacity.value,
    }
  });

  function onPress() {
    opacity.value = withTiming(0.5, { duration: 50, reduceMotion: ReduceMotion.System }, () => {
      opacity.value = withTiming(1, { duration: 100, reduceMotion: ReduceMotion.System });
    });
  }

  return (
    <AnimatedPressable onPress={onPress}
      style={[animatedStyle, styles.container]}
    >
      <AddToDictionaryIcon />
    </AnimatedPressable>
  )
}

export default AddToDictionaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(21,21,20,0.9)",
    borderRadius: 60,
    padding: 5,
    marginLeft: 15,
  },
});
