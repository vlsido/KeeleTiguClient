import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MaterialIconButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
  onPress: any;
  onLongPress?: any;
  onPressIn?: any;
  onPressOut?: any;
  disabledBool?: boolean;
  accessibilityLabel: string;
  enableContrastLayer?: boolean;
  children?: React.ReactNode;
  isVisible?: boolean;
}

function MaterialIconButton(props: MaterialIconButtonProps) {
  const {
    containerStyle,
    iconStyle,
    name,
    color,
    size,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    disabledBool,
    accessibilityLabel,
    enableContrastLayer,
    children,
    isVisible,
  } = props;

  if (isVisible === false) {
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        enableContrastLayer
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
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabledBool}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityLabel={accessibilityLabel}
    >
      <MaterialIcons
        name={name}
        color={color}
        size={size}
        style={[iconStyle]}
      />
      {children}
    </Pressable>
  );
}

export default MaterialIconButton;
