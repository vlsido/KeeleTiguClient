import { Pressable } from "react-native";

interface CustomIconButtonProps {
  testID: string;
  onPress: () => void;
  children: React.ReactNode;
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
      ]}
      onPress={props.onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {props.children}
    </Pressable>
  );
}

export default CustomIconButton;
