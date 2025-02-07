import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import OptionButton from "./OptionButton";
import { useEffect } from "react";
import {
  atom,
  useAtom
} from "jotai";
import { useHint } from "../../../../../hooks/useHint";
import { useAppSelector } from "../../../../../hooks/storeHooks";
import { AnimatedPressable } from "../../../../util/AnimatedComponentsUtil";
import { TranslateIcon } from "../../../../icons/TranslateIcon";
import { CommonColors } from "../../../../../constants/Colors";

const gameOptionsAtom = atom<"any" | "my_dictionary">("any");
const gameOptionsContainerHeightAtom = atom<number>(0);
const isGameOptionsVisibleAtom = atom<boolean>(false);

function TranslateWordsGame() {
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const { showHint } = useHint();

  const [
    gameOptions,
    setGameOptions
  ] = useAtom<"any" | "my_dictionary">(gameOptionsAtom);

  const [
    gameOptionsContainerHeight,
    setGameOptionsContainerHeight
  ] = useAtom<number>(gameOptionsContainerHeightAtom);

  const [
    isGameOptionsVisible,
    setIsGameOptionsVisible
  ] = useAtom<boolean>(isGameOptionsVisibleAtom);

  const translateOptionsHeight = useSharedValue<number>(0);
  const translateGameContainerOpacity = useSharedValue<number>(1);

  useEffect(
    () => {
      translateOptionsHeight.value = withTiming(
        isGameOptionsVisible === true ? gameOptionsContainerHeight : 0,
        { duration: 500 }
      );
    },
    [
      isGameOptionsVisible
    ]
  );

  function toggleTranslateGameOptions() {
    translateGameContainerOpacity.value = withTiming(
      translateGameContainerOpacity.value === 1 ? 0.5 : 1,
      { duration: 50 },
      () => {
        translateGameContainerOpacity.value = withTiming(
          translateGameContainerOpacity.value === 0.5 ? 1 : 0.75,
          { duration: 50 }
        );
      }
    );
    setIsGameOptionsVisible(!isGameOptionsVisible);
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

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[
          translateGameContainerAnimatedStyle,
          styles.translateButton
        ]}
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
      <Animated.View style={[
        translateOptionsAnimatedStyle,
        { overflow: "hidden", alignItems: "center" }
      ]}>
        <View
          style={[
            styles.translateOptionsContainer
          ]}
          onLayout={(event) => {
            setGameOptionsContainerHeight(event.nativeEvent.layout.height)
          }}>
          <OptionButton
            text={"Suvalised sõnad"}
            onPress={() => { setGameOptions("any") }}
            isSelected={gameOptions === "any"} />
          <OptionButton
            text={"Sõnad mu sõnastikust"}
            onPress={() => {
              if (myDictionary.length < 1) {
                showHint(
                  "Sõnastik on tühi",
                  2500
                );
                return;
              }
              setGameOptions("my_dictionary");
            }}
            isSelected={gameOptions === "my_dictionary"} />
          <Pressable style={styles.startButtonContainer}
            onPress={() =>
              router.navigate({ pathname: "/translate", params: { mode: gameOptions } })
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
  container: {
    width: "75%",
    maxWidth: 400
  },
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
