import { ActivityIndicator, Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { ReadonlySignal } from "@preact/signals-react";
import { MaterialIcons } from "@expo/vector-icons";

interface TextButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
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


  if (props.isActivityIndicatorVisible && props.isActivityIndicatorVisible.value === true) {
    if (props.customActivityIndicator) {
      return props.customActivityIndicator;
    }

    return (
      <ActivityIndicator
        style={props.activityIndicatorViewStyle}
        color={props.activityIndicatorColor ?? "black"}
        size={props.activityIndicatorSize ?? "small"}
      />
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [
        props.style,
        { opacity: pressed ? 0.75 : 1 }, // Change opacity based on pressed state
      ]}
      onPress={props.onPress}
      disabled={props.disabledBool}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      accessibilityLabel={props.label}
      onHoverIn={props.onHoverIn}
      onHoverOut={props.onHoverOut}
    >
      {props.leftSideIcon && (
        <MaterialIcons
          name={props.leftSideIcon}
          size={props.leftSideIconSize}
          color={props.leftSideIconColor}
        />
      )}
      <Text numberOfLines={props.numberOfLines} ellipsizeMode="tail" style={props.textStyle}>
        {props.text}
      </Text>
    </Pressable>
  );
}

export default TextButton;
