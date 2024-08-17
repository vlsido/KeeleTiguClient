import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import MaterialIconButton from "./MaterialIconButton";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CommonColors } from "@/constants/Colors";
import { signal } from "@preact/signals-react";

interface SendAnswerButtonProps {
  onPress: () => void;
}

export const sendAnswerButtonWidth = signal<number>(0);

function SendAnswerButton(props: SendAnswerButtonProps) {
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

    props.onPress();
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, styles.container]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={onPress}
      onLayout={(event) => { sendAnswerButtonWidth.value = event.nativeEvent.layout.width }}
    >
      <Text style={styles.text}>{"VASTA"}</Text>
    </AnimatedPressable>
  );
}

export default SendAnswerButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    backgroundColor: CommonColors.white,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: CommonColors.black,
  }
});
