import {
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
  textAnswerFieldContainerWidthAtom
} from "./translateAtoms";
import { useEffect } from "react";
import { AnimatedTextInput } from "../../util/AnimatedComponentsUtil";
import SendAnswerButton from "./SendAnswerButton";
import { CommonColors } from "../../../constants/Colors";

interface TextAnswerFieldProps {
  onSubmit: () => void;
  textInputRef: React.RefObject<TextInput>;
  isAnswerValid: boolean;
  onFocus: () => void;
}

function TextAnswerField(props: TextAnswerFieldProps) {
  const setAnswer = useSetAtom(answerAtom);

  const setTextAnswerFieldContainerWidth = useSetAtom(textAnswerFieldContainerWidthAtom);

  const sendAnswerButtonOpacity = useSharedValue<number>(0);

  function onChange(text: string) {
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
      if (props.isAnswerValid === false) {
        borderColor.value = "red";
      } else {
        borderColor.value = "gray";
      }
    },
    [
      props.isAnswerValid
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
      <View style={styles.textField}>
        <View style={styles.textInputContainer}>
          <AnimatedTextInput
            ref={props.textInputRef}
            tabIndex={0}
            onLayout={(event) => setTextAnswerFieldContainerWidth(event.nativeEvent.layout.width)}
            style={[
              styles.textInput,
              animatedStyle
            ]}
            placeholder="Kirjuta vastust siia..."
            placeholderTextColor={CommonColors.whiteA50}
            onFocus={props.onFocus}
            onChange={(event) => onChange(event.nativeEvent.text)}
            onSubmitEditing={onSubmit}
          />
        </View>
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
  inputField: {
    borderWidth: 2,
    borderRadius: 15,

  },
  inputText: {
    paddingVertical: 10,
    fontSize: 16,
    color: CommonColors.white,
    textAlign: "center",
  },
  hintText: {
    fontSize: 12,
    color: "rgba(241, 242, 241, 0.8)",
    marginBottom: 5,
  },
  textField: {
    width: "100%",
    borderRadius: 20,
    borderColor: CommonColors.white,
    borderWidth: 1
  },
  textInputContainer: {
    minHeight: 64,
    flex: 1,
    width: "100%",
    borderRadius: 20,
  },
  textInput: {
    fontSize: 16,
    padding: 15,
    borderRadius: 20,
    textAlign: "center",
    color: "rgb(233,234,233)",
    flex: 1,
  },


});
