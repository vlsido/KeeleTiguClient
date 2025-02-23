import {
  StyleSheet,
  ViewStyle
} from "react-native";
import { AddToDictionaryIcon } from "../icons/AddToDictionaryIcon";
import {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { Word, WordAndExamData } from "../../app/(tabs)/dictionary";
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/storeHooks";
import { AnimatedPressable } from "../util/AnimatedComponentsUtil";
import {
  pushToMyDictionary
} from "../store/slices/dictionarySlice";
import { useHint } from "../../hooks/useHint";

interface AddToDictionaryButtonProps {
  word: Word | WordAndExamData | undefined;
}

function AddToDictionaryIconButton(props: AddToDictionaryButtonProps) {
  const { showHint } = useHint();

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const dispatch = useAppDispatch();

  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: opacity.value,
    }
  });

  function onPress() {
    opacity.value = withTiming(
      0.5,
      { duration: 50, reduceMotion: ReduceMotion.System },
      () => {
        opacity.value = withTiming(
          1,
          { duration: 100, reduceMotion: ReduceMotion.System }
        );
      }
    );

    const currentWord = props.word;

    if (currentWord !== undefined) {
      if (myDictionary.find((word) => word.word === currentWord.word)) {
        showHint(
          "Sõna on juba sõnastikus!",
          2500
        );
        return;
      }

      const wordToAdd: Word = {
        index: currentWord.index,
        word: currentWord.word,
        type: currentWord.type,
        forms: currentWord.forms,
        usages: currentWord.usages
      }

      dispatch(pushToMyDictionary(wordToAdd));

      // Add to dictionary
      showHint(
        "Lisatud!",
        2500
      );
    } else {
      showHint(
        "Error! No words loaded.",
        2500
      );
    }

  }

  return (
    <AnimatedPressable onPress={onPress}
      style={[
        animatedStyle,
        styles.container
      ]}
    >
      <AddToDictionaryIcon />
    </AnimatedPressable>
  )
}

export default AddToDictionaryIconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(21,21,20,0.9)",
    borderRadius: 60,
    padding: 5,
    marginLeft: 15,
  },
});
