import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { LoadingIndicatorIcon } from "../icons/LoadingIndicatorIcon";
import { useEffect } from "react";
import { ViewProps, ViewStyle } from "react-native";

interface LoadingIndicatorProps extends ViewProps {
  testID: string;
  color: string;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
  const rotation = useSharedValue<number>(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }]
    }
  });

  return (
    <Animated.View testID={props.testID} style={animatedStyle}>
      <LoadingIndicatorIcon color={props.color} />
    </Animated.View>
  );
}

export default LoadingIndicator;
