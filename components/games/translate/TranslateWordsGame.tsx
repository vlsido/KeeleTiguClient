import { TranslateIcon } from "@/components/icons/TranslateIcon";
import { CommonColors } from "@/constants/Colors";
import { untracked, useSignal, useSignalEffect } from "@preact/signals-react";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View, ViewStyle, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import OptionButton from "./OptionButton";
import { myDictionary } from "@/components/util/WordsUtil";
import { useContext } from "react";
import { HintContext } from "@/components/store/HintContext";

function TranslateWordsGame() {
  const dimensions = useWindowDimensions();

  const translateOptionsContainerHeight = useSignal<number>(0);
  const translateOptionsHeight = useSharedValue<number>(0);
  const isTranslateOptionsVisible = useSignal<boolean>(false);
  const translateGameContainerOpacity = useSharedValue<number>(1);

  useSignalEffect(() => {
    if (isTranslateOptionsVisible.value != null) {
      untracked(() => {
        translateOptionsHeight.value = withTiming(isTranslateOptionsVisible.value === true ? translateOptionsContainerHeight.value : 0, { duration: 500 });
      });
    }
  });

  function toggleTranslateGameOptions() {
    translateGameContainerOpacity.value = withTiming(translateGameContainerOpacity.value === 1 ? 0.5 : 1, { duration: 50 }, () => {
      translateGameContainerOpacity.value = withTiming(translateGameContainerOpacity.value === 0.5 ? 1 : 0.75, { duration: 50 });
    });
    isTranslateOptionsVisible.value = !isTranslateOptionsVisible.value;
  }


  const translateOptionsAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: translateOptionsHeight.value,
    };
  });

  const translateGameContainerAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: translateGameContainerOpacity.value,
    };
  });

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const wordsOptions = useSignal<"any" | "my_dictionary">("any");

  const { showHint } = useContext(HintContext);

  return (

    <View style={{ width: dimensions.width > dimensions.height ? "33%" : "75%" }}>
      <AnimatedPressable
        style={[translateGameContainerAnimatedStyle, styles.translateButton]}
        aria-label="Ava tõlge mäng valikud"
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        onPress={toggleTranslateGameOptions}
      >
        <TranslateIcon />
        <Text style={styles.translateButtonDescription}>
          Sõnade tõlkimine
        </Text>
      </AnimatedPressable>
      <Animated.View style={[translateOptionsAnimatedStyle, { overflow: "hidden", alignItems: "center" }]}>
        <View
          style={[styles.translateOptionsContainer]}
          onLayout={(event) => { translateOptionsContainerHeight.value = event.nativeEvent.layout.height }}>
          <OptionButton
            text={"Suvalised sõnad"}
            onPress={() => { wordsOptions.value = "any" }}
            isSelected={wordsOptions.value === "any"} />
          <OptionButton
            text={"Sõnad mu sõnastikust"}
            onPress={() => {
              if (myDictionary.value.length < 1) {
                showHint("Sõnastik on tühi", 1000);
                return;
              }
              wordsOptions.value = "my_dictionary"
            }}
            isSelected={wordsOptions.value === "my_dictionary"} />
          <Pressable style={styles.startButtonContainer}
            onPress={() =>
              router.navigate({ pathname: "/translate", params: { mode: wordsOptions.value } })
            }
            aria-label="Alusta" >
            <Text style={styles.startButtonText}>Alusta</Text>
          </Pressable>
        </View>
      </Animated.View >
    </View >
  )
}

export default TranslateWordsGame;

const styles = StyleSheet.create({
  translateButton: {
    padding: 10,
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CommonColors.white,
    alignItems: "center",
  },
  translateButtonDescription: {
    color: CommonColors.white,
    fontSize: 18,
    marginTop: 10
  },
  translateOptionsContainer: {
    width: "90%",
    backgroundColor: "#2C332C",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonColors.white,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  startButtonContainer: {
    marginLeft: "auto",
    borderRadius: 10,
    borderColor: CommonColors.white,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: CommonColors.black
  },
  startButtonText: {
    color: CommonColors.white,
    fontSize: 20
  },
  // gradientContainer: {
  //   padding: 10,
  //   borderRadius: 5,
  // }
});
