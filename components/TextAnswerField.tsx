import { CommonColors } from "@/constants/Colors";
import { Signal, useSignal, useSignalEffect } from "@preact/signals-react";
import { StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import Animated, { ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SendAnswerButton, { textAnswerFieldContainerWidth } from "./SendAnswerButton";


interface TextAnswerFieldProps {
  answer: Signal<string>;
  isValid: Signal<boolean>;
  onSubmit: () => void;
  textInputRef: React.RefObject<TextInput>;
}

function TextAnswerField(props: TextAnswerFieldProps) {
  const sendAnswerButtonOpacity = useSharedValue<number>(0);

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

  function onSubmit() {
    "worklet";
    sendAnswerButtonOpacity.value = withTiming(0.16888, { duration: 33, reduceMotion: ReduceMotion.System });
    props.textInputRef.current?.clear();
    runOnJS(props.onSubmit)();
  }


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.hintText}>(ühesõnaga)</Text>
      <View style={{}}>
        <AnimatedTextInput
          ref={props.textInputRef}
          onLayout={(event) => textAnswerFieldContainerWidth.value = event.nativeEvent.layout.width}
          style={[styles.inputText, animatedStyle]}
          placeholder="Kirjuta vastust siia..."
          onFocus={() => props.isValid.value = true}
          onChange={(event) => onChange(event.nativeEvent.text)}
          onSubmitEditing={onSubmit}
        />
        <SendAnswerButton opacity={sendAnswerButtonOpacity} answer={props.answer} onPress={onSubmit} />
      </View>
    </View>
  )
}

export default TextAnswerField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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
  },
  hintText: {
    fontSize: 12,
    color: "rgba(241, 242, 241, 0.8)",
    marginBottom: 5,
  }
});
