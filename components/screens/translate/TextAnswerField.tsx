import {
  useCallback,
  useEffect
} from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View
} from "react-native";
import {
  useSetAtom
} from "jotai";
import {
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  answerAtom,
} from "./translateAtoms";
import { AnimatedTextInput } from "../../util/AnimatedComponentsUtil";
import SendAnswerButton from "./SendAnswerButton";
import { CommonColors } from "../../../constants/Colors";
import { i18n } from "../../store/i18n";

interface TextAnswerFieldProps {
  onSubmit: () => void;
  textInputRef: React.RefObject<TextInput>;
  isAnswerValid: boolean;
  onFocus: () => void;
}

function TextAnswerField(props: TextAnswerFieldProps) {
  const setAnswer = useSetAtom(answerAtom);

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

  const onSubmit = useCallback(() => {
    "worklet";
    sendAnswerButtonOpacity.value = withTiming(
      0.16888,
      { duration: 33, reduceMotion: ReduceMotion.System }
    );
    props.textInputRef.current?.clear();
    runOnJS(props.onSubmit)();
  }, [
    props.textInputRef,
    props.onSubmit
  ]);

  return (
    <View
      testID="TEXT_ANSWER_FIELD.CONTAINER:VIEW"
      style={styles.container}
    >
      <View style={styles.textInputContainer}>
        <AnimatedTextInput
          ref={props.textInputRef}
          tabIndex={0}
          style={[
            styles.textInput,
            animatedStyle
          ]}
          placeholder={i18n.t("TextAnswerField_write_answer_here", { defaultValue: "Kirjuta vastust siia..." })}
          placeholderTextColor={CommonColors.whiteA50}
          onFocus={props.onFocus}
          onChange={(event) => onChange(event.nativeEvent.text)}
          onSubmitEditing={onSubmit}
        />
      </View>
      <SendAnswerButton opacity={sendAnswerButtonOpacity} onPress={onSubmit} />
    </View>
  )
}

export default TextAnswerField;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingLeft: 46,
    flexDirection: "row",
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
  },
  textInputContainer: {
    borderColor: CommonColors.white,
    borderWidth: 1,
    minHeight: 64,
    flex: 1,
    width: "100%",
    borderRadius: 60,
    backgroundColor: "black"
  },
  textInput: {
    fontSize: 16,
    padding: 15,
    borderRadius: 60,
    textAlign: "center",
    color: "rgb(233,234,233)",
    flex: 1,
  },


});
