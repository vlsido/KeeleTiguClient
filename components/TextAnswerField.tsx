import { CommonColors } from "@/constants/Colors";
import { Signal, useSignalEffect } from "@preact/signals-react";
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { sendAnswerButtonWidth } from "./SendAnswerButton";
import { useRef } from "react";

interface TextAnswerFieldProps {
  answer: Signal<string>;
  isValid: Signal<boolean>;
  onSubmit: () => void;
  textInputRef: React.RefObject<TextInput>;
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
      marginLeft.value = withTiming(sendAnswerButtonWidth.value, { duration: 100, reduceMotion: ReduceMotion.System });
    }
  });


  function onSumbit() {
    props.onSubmit();

  }

  return (
    <View
      style={styles.container}
    >
      <AnimatedTextInput
        ref={props.textInputRef}
        style={[styles.inputText, animatedStyle]}
        placeholder="Kirjuta vastust siia..."
        onFocus={() => props.isValid.value = true}
        onChange={(event) => onChange(event.nativeEvent.text)}
        onSubmitEditing={onSumbit}
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
    paddingVertical: 10,
    fontSize: 16,
    textAlign: "center",
    color: CommonColors.white,
  }

});
