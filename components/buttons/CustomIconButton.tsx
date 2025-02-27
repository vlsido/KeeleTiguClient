import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle
} from "react-native";

interface CustomIconButtonProps extends PressableProps {
  testID: string;
  style?: StyleProp<ViewStyle>
}

function CustomIconButton(props: CustomIconButtonProps) {
  return (
    <Pressable
      testID={props.testID}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          height: 48,
          width: 48,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style
      ]}
      onPress={props.onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {props.children}
    </Pressable>
  );
}

export default CustomIconButton;
