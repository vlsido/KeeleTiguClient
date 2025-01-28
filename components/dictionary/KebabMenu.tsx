import {
  Signal,
} from "@preact/signals-react";
import {
  Pressable,
  StyleSheet
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ReduceMotion,
} from "react-native-reanimated";
import { myDictionary } from "../util/WordsUtil";
import TextButton from "../TextButton";
import { CommonColors } from "../../constants/Colors";
import { AnimatedPressable } from "../util/AnimatedComponentsUtil";

interface KebabMenuProps {
  isVisible: Signal<boolean>;
  onClose: () => void;
  word: string;
}

function KebabMenu(props: KebabMenuProps) {

  function onRemoveWord() {
    myDictionary.value = myDictionary.value.filter((word) => word.word !== props.word);
    if (myDictionary.value.length === 0) {
      localStorage.removeItem("myDictionary");
    }
  }

  if (!props.isVisible.value) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: "auto",
          borderRadius: 15,
          backgroundColor: "rgba(33,34,33, 0.85)",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      entering={FadeIn.
        duration(250).
        reduceMotion(ReduceMotion.System)}
      exiting={FadeOut.
        duration(250).
        reduceMotion(ReduceMotion.System)}
      onPress={props.onClose}
    >
      <TextButton
        text={"Eemalda"}
        onPress={onRemoveWord}
        style={styles.removeButtonContainer}
        label={"Remove word from dictionary"}
        textStyle={styles.removeButtonText}
      />
    </AnimatedPressable>
  );

}

export default KebabMenu;

const styles = StyleSheet.create({
  removeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: CommonColors.white,
    borderWidth: 1,
  },
  removeButtonText: {
    fontSize: 16,
    color: CommonColors.white,
  }
});
