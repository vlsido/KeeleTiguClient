import { Signal, useSignalEffect } from "@preact/signals-react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { myDictionary } from "../util/WordsUtil";
import TextButton from "../TextButton";
import { CommonColors } from "@/constants/Colors";

interface KebabMenuProps {
  isVisible: Signal<boolean>;
  onClose: () => void;
  word: string;
}

function KebabMenu(props: KebabMenuProps) {
  const opacity = useSharedValue<number>(0);

  function onRemoveWord() {
    myDictionary.value = myDictionary.value.filter((word) => word.word !== props.word);
    if (myDictionary.value.length === 0) {
      localStorage.removeItem("myDictionary");
    }
  }

  useSignalEffect(() => {
    if (props.isVisible.value === true) {
      opacity.value = withTiming(1, {
        duration: 250,
        reduceMotion: ReduceMotion.System,
      });
    }
  });

  function handleClose() {
    opacity.value = withTiming(
      0,
      { duration: 250, reduceMotion: ReduceMotion.System },
      () => {
        runOnJS(props.onClose)();
      },
    );
  }


  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const animatedPressableStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });


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
        animatedPressableStyle,
      ]}
      onPress={handleClose}
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
