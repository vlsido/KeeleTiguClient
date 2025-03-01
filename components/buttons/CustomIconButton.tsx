import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle
} from "react-native";

interface CustomIconButtonProps extends PressableProps {
  testID: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
}

function CustomIconButton(props: CustomIconButtonProps) {
  return (
    <Pressable
      testID={props.testID}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          height: props.size ?? 48,
          width: props.size ?? 48,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style
      ]}
      onPress={props.onPress}
      aria-label={props["aria-label"]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {props.children}
    </Pressable>
  );
}

export default CustomIconButton;
