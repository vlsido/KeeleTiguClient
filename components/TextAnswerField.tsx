import { CommonColors } from "@/constants/Colors";
import { Signal, useSignalEffect } from "@preact/signals-react";
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { sendAnswerButtonWidth } from "./SendAnswerButton";

interface TextAnswerFieldProps {
  answer: Signal<string>;
  isValid: Signal<boolean>;
  onSubmit: () => void;
}

function TextAnswerField(props: TextAnswerFieldProps) {

  function onChange(text: string) {
    console.log("text", text);
    props.answer.value = text;
  }

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const borderColor = useSharedValue<string>("gray");
  const marginLeft = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: borderColor.value,
      marginLeft: marginLeft.value,
    };
  });

  useSignalEffect(() => {
    if (props.isValid.value === false) {
      borderColor.value = "red";
    } else {
      borderColor.value = "gray";
    }
  });

  useSignalEffect(() => {
    if (sendAnswerButtonWidth.value > 0) {
      marginLeft.value = sendAnswerButtonWidth.value;
    }
  });

  return (
    <View
      style={styles.container}
    >
      <AnimatedTextInput
        style={[styles.inputText, animatedStyle]}
        placeholder="Kirjuta vastust siia..."
        onFocus={() => props.isValid.value = true}
        onChange={(event) => onChange(event.nativeEvent.text)}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  )
}

export default TextAnswerField;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "center",
    color: CommonColors.white,
  }

});
