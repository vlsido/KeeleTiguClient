import { ActivityIndicator, Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { ReadonlySignal } from "@preact/signals-react";
import { MaterialIcons } from "@expo/vector-icons";

interface TextButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabledBool?: boolean;
  customActivityIndicator?: any;
  isActivityIndicatorVisible?: ReadonlySignal<boolean>;
  activityIndicatorViewStyle?: any;
  activityIndicatorColor?: string;
  activityIndicatorSize?: number | "small" | "large";
  label: string;
  leftSideIcon?: keyof typeof MaterialIcons.glyphMap;
  leftSideIconSize?: number;
  leftSideIconColor?: string;
  numberOfLines?: number;
}

function TextButton(props: TextButtonProps) {
  const {
    style,
    text,
    textStyle,
    onPress,
    disabledBool,
    customActivityIndicator,
    isActivityIndicatorVisible,
    activityIndicatorViewStyle,
    activityIndicatorColor,
    activityIndicatorSize,
    label,
    leftSideIcon,
    leftSideIconSize,
    leftSideIconColor,
    numberOfLines
  } = props;

  if (isActivityIndicatorVisible && isActivityIndicatorVisible.value === true) {
    if (customActivityIndicator) {
      return customActivityIndicator;
    }

    return (
      <ActivityIndicator
        style={activityIndicatorViewStyle}
        color={activityIndicatorColor ?? "black"}
        size={activityIndicatorSize ?? "small"}
      />
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        style,
        { opacity: pressed ? 0.75 : 1 }, // Change opacity based on pressed state
      ]}
      onPress={onPress}
      disabled={disabledBool}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      accessibilityLabel={label}
    >
      {leftSideIcon && (
        <MaterialIcons
          name={leftSideIcon}
          size={leftSideIconSize}
          color={leftSideIconColor}
        />
      )}
      <Text numberOfLines={numberOfLines} ellipsizeMode="tail" style={textStyle}>
        {text}
      </Text>
    </Pressable>
  );
}

export default TextButton;
