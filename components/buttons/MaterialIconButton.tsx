import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MaterialIconButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
  onPress: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLayout?: (layoutEvent: LayoutChangeEvent) => void;
  disabledBool?: boolean;
  ariaLabel: string;
  enableContrastLayer?: boolean;
  children?: React.ReactNode;
  isVisible?: boolean;
  testID: string;
}

function MaterialIconButton(props: MaterialIconButtonProps) {

  if (props.isVisible === false) {
    return null;
  }

  return (
    <Pressable
      testID={props.testID}
      style={({ pressed }) => [
        props.containerStyle,
        props.enableContrastLayer
          ? { backgroundColor: "rgba(0, 0, 0, 0.2)", borderRadius: 60 }
          : {},
        {
          opacity: pressed ? 0.5 : 1,
          height: 48,
          width: 48,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      aria-label={props.ariaLabel}
      role="button"
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onLayout={props.onLayout}
      disabled={props.disabledBool}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialIcons
        name={props.name}
        color={props.color}
        size={props.size}
        style={[
          props.iconStyle
        ]}
      />
      {props.children}
    </Pressable>
  );
}

export default MaterialIconButton;
