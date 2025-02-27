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
import { i18n } from "../store/i18n";

interface AddToDictionaryButtonProps {
  word: Word | WordAndExamData | undefined;
  backgroundStyle: "light" | "dark"
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
          i18n.t("already_in_dictionary", { defaultValue: "Sõna on juba sõnastikus!" }),
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
        i18n.t("added", { defaultValue: "Lisatud!" }),
        2500
      );
    } else {
      showHint(
        i18n.t("error", { defaultValue: "Tekkis viga!" }),
        2500
      );
    }

  }

  return (
    <AnimatedPressable onPress={onPress}
      style={[
        animatedStyle,
        styles.container,
        { backgroundColor: props.backgroundStyle === "light" ? "#fff" : "#000" }
      ]}
    >
      <AddToDictionaryIcon color={props.backgroundStyle === "light" ? "#000" : "#fff"} />
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
