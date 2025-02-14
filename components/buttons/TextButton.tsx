import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface TextButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  disabledBool?: boolean;
  customActivityIndicator?: React.ReactNode;
  isActivityIndicatorVisible?: boolean;
  activityIndicatorViewStyle?: ViewStyle;
  activityIndicatorColor?: string;
  activityIndicatorSize?: number | "small" | "large";
  label: string;
  leftSideIcon?: keyof typeof MaterialIcons.glyphMap;
  leftSideIconSize?: number;
  leftSideIconColor?: string;
  numberOfLines?: number;
  testID: string;
}

function TextButton(props: TextButtonProps) {


  if (props.isActivityIndicatorVisible === true) {
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
      testID={props.testID}
      style={({ pressed }) => [
        props.style,
        {
          transitionDuration: "150ms",
          opacity: pressed ? 0.75 : 1
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabledBool}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      aria-label={props.label}
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
