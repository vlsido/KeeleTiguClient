import {
  useAtom,
  useSetAtom
} from "jotai";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View
} from "react-native";
import {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  answerAtom,
  isAnswerValidAtom,
  textAnswerFieldContainerWidthAtom
} from "./translateAtoms";
import { useEffect } from "react";
import { AnimatedTextInput } from "../../util/AnimatedComponentsUtil";
import SendAnswerButton from "./SendAnswerButton";
import { CommonColors } from "../../../constants/Colors";

interface TextAnswerFieldProps {
  onSubmit: () => void;
  textInputRef: React.RefObject<TextInput>;
}

function TextAnswerField(props: TextAnswerFieldProps) {
  const setAnswer = useSetAtom(answerAtom);

  const [
    isAnswerValid,
    setIsAnswerValid
  ] = useAtom<boolean>(isAnswerValidAtom);

  const setTextAnswerFieldContainerWidth = useSetAtom(textAnswerFieldContainerWidthAtom);

  const sendAnswerButtonOpacity = useSharedValue<number>(0);

  function onChange(text: string) {
    console.log(
      "text",
      text
    );
    setAnswer(text);
  }

  const borderColor = useSharedValue<string>("gray");
  const marginLeft = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: borderColor.value,
      marginLeft: marginLeft.value,
    };
  });

  useEffect(
    () => {
      if (isAnswerValid === false) {
        borderColor.value = "red";
      } else {
        borderColor.value = "gray";
      }
    },
    [
      isAnswerValid
    ]
  );

  function onSubmit() {
    "worklet";
    sendAnswerButtonOpacity.value = withTiming(
      0.16888,
      { duration: 33, reduceMotion: ReduceMotion.System }
    );
    props.textInputRef.current?.clear();
    runOnJS(props.onSubmit)();
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.hintText}>(ühesõnaga)</Text>
      <View>
        <AnimatedTextInput
          ref={props.textInputRef}
          tabIndex={0}
          onLayout={(event) => setTextAnswerFieldContainerWidth(event.nativeEvent.layout.width)}
          style={[
            styles.inputText,
            animatedStyle
          ]}
          placeholder="Kirjuta vastust siia..."
          placeholderTextColor={CommonColors.whiteA50}
          onFocus={() => setIsAnswerValid(true)}
          onChange={(event) => onChange(event.nativeEvent.text)}
          onSubmitEditing={onSubmit}
        />
        <SendAnswerButton opacity={sendAnswerButtonOpacity} onPress={onSubmit} />
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
