import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import MaterialIconButton from "./MaterialIconButton";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

function SendAnswerButton() {
  const pressableOpacity = useSharedValue<number>(1);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: pressableOpacity.value,
    }
  });

  function onPress() {
    pressableOpacity.value = withTiming(0.5, { duration: 100 }, () => {
      pressableOpacity.value = withTiming(1, { duration: 100 });
    });
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, styles.container]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onPress}
    >
      <Text style={styles.text}>DONE</Text>
      <MaterialIcons
        name="arrow-forward"
        size={24}
        color="#007AFF"

      />
    </AnimatedPressable>
  );
}

export default SendAnswerButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FFA1",
    borderRadius: 5,
    borderColor: "#007AFF",
    borderWidth: 1,
    margin: 10
  },
  text: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
