import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";

export interface TextButtonProps {
  testID: string;
  text: string;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  disabledBool?: boolean;
  customActivityIndicator?: React.ReactNode;
  isActivityIndicatorVisible?: boolean;
  activityIndicatorViewStyle?: ViewStyle;
  activityIndicatorColor?: string;
  activityIndicatorSize?: number | "small" | "large";
  numberOfLines?: number;
  children?: React.ReactNode;
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
      role="button"
      accessibilityLabelledBy="buttonLabel"
      onHoverIn={props.onHoverIn}
      onHoverOut={props.onHoverOut}
    >
      {props.children}
      <Text
        nativeID="buttonLabel"
        style={props.textStyle}
        numberOfLines={props.numberOfLines}
        ellipsizeMode="tail"
      >
        {props.text}
      </Text>
    </Pressable>
  );
}

export default TextButton;
