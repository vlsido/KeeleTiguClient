import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  ViewStyle
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { AnimatedPressable } from "./util/AnimatedComponentsUtil";

interface IconButtonProps {
  onPress: () => void;
  size: number;
  color: string;
  style?: ViewStyle;
}

function IconButton(props: IconButtonProps) {
  const opacity = useSharedValue<number>(1);

  const animatedPressableStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: opacity.value,
    };
  });

  function onPress() {
    opacity.value = withTiming(
      0,
      { duration: 75 },
      () => {
        opacity.value = withTiming(
          1,
          { duration: 75 }
        );
      }
    );
    props.onPress();
  }

  return (
    <AnimatedPressable onPress={onPress} style={[
      props.style,
      animatedPressableStyle
    ]} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
      <Ionicons name="search-outline" size={props.size} color={props.color} />
    </AnimatedPressable>
  );
}

export default IconButton;
