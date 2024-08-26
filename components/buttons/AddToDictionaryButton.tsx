import { Alert, Pressable, StyleSheet, ViewStyle } from "react-native";
import { AddToDictionaryIcon } from "../icons/AddToDictionaryIcon";
import Animated, { ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { auth } from "../util/FirebaseConfig";
import { useContext } from "react";
import { HintContext } from "../store/HintContext";
import { myDictionary, myDictionaryHistory, randomWords } from "../util/WordsUtil";

function AddToDictionaryButton() {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacity = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: opacity.value,
    }
  });

  const { showHint } = useContext(HintContext);

  function onPress() {
    opacity.value = withTiming(0.5, { duration: 50, reduceMotion: ReduceMotion.System }, () => {
      opacity.value = withTiming(1, { duration: 100, reduceMotion: ReduceMotion.System });
    });

    const currentWord = randomWords.value.at(0);

    if (currentWord !== undefined) {
      console.log("Add to dictionary", auth.currentUser);

      if (myDictionary.value.find((word) => word.word === currentWord.word)) {
        showHint("Sõna on juba sõnastikus!", 500);
        return;
      }

      myDictionary.value = [...myDictionary.value, currentWord];
      myDictionaryHistory.value = [...myDictionaryHistory.value, currentWord];

      // Add to dictionary
      showHint("Lisatud!", 500);
    } else {

      showHint("Error! No words loaded.", 500);
    }

  }

  return (
    <AnimatedPressable onPress={onPress}
      style={[animatedStyle, styles.container]}
    >
      <AddToDictionaryIcon />
    </AnimatedPressable>
  )
}

export default AddToDictionaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(21,21,20,0.9)",
    borderRadius: 60,
    padding: 5,
    marginLeft: 15,
  },
});
