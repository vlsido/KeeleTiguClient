import {
  useCallback,
  useEffect
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { router } from "expo-router";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import OptionButton from "./OptionButton";
import {
  atom,
  useAtom
} from "jotai";
import { useHint } from "../../../../../hooks/useHint";
import { useAppSelector } from "../../../../../hooks/storeHooks";
import { AnimatedPressable } from "../../../../util/AnimatedComponentsUtil";
import { TranslateIcon } from "../../../../icons/TranslateIcon";
import { CommonColors } from "../../../../../constants/Colors";
import {
  isA1LevelOnAtom,
  isA2LevelOnAtom,
  isB1LevelOnAtom
} from "../../../translate/translateAtoms";
import { EWordsLevel } from "../../../../util/WordsUtil";


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
    isA1LevelOn,
    setIsA1LevelOn
  ] = useAtom<boolean>(isA1LevelOnAtom);

  const [
    isA2LevelOn,
    setIsA2LevelOn
  ] = useAtom<boolean>(isA2LevelOnAtom);
  const [
    isB1LevelOn,
    setIsB1LevelOn
  ] = useAtom<boolean>(isB1LevelOnAtom);

  const [
    gameOptionsContainerHeight,
    setGameOptionsContainerHeight
  ] = useAtom<number>(gameOptionsContainerHeightAtom);

  const [
    isGameOptionsVisible,
    setIsGameOptionsVisible
  ] = useAtom<boolean>(isGameOptionsVisibleAtom);

  const a1LevelOpacity = useSharedValue<number>(0.5);
  const a2LevelOpacity = useSharedValue<number>(0.5);
  const b1LevelOpacity = useSharedValue<number>(0.5);

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

  useEffect(
    () => {
      if (gameOptions === "my_dictionary") {
        a1LevelOpacity.value = withTiming(
          0.5,
          { duration: 200, reduceMotion: ReduceMotion.System }
        );

        a2LevelOpacity.value = withTiming(
          0.5,
          { duration: 200, reduceMotion: ReduceMotion.System }
        );

        b1LevelOpacity.value = withTiming(
          0.5,
          { duration: 200, reduceMotion: ReduceMotion.System }
        );
        return;
      }


      a1LevelOpacity.value = withTiming(
        isA1LevelOn ? 1 : 0.5,
        { duration: 200, reduceMotion: ReduceMotion.System }
      );

      a2LevelOpacity.value = withTiming(
        isA2LevelOn ? 1 : 0.5,
        { duration: 200, reduceMotion: ReduceMotion.System }
      );

      b1LevelOpacity.value = withTiming(
        isB1LevelOn ? 1 : 0.5,
        { duration: 200, reduceMotion: ReduceMotion.System }
      );

    },
    [
      isA1LevelOn,
      isA2LevelOn,
      isB1LevelOn,
      gameOptions
    ]
  );

  const toggleWordsLevel = useCallback(
    (level: EWordsLevel) => {
      switch (level) {
        case EWordsLevel.A1:

          setIsA1LevelOn(!isA1LevelOn);
          break;
        case EWordsLevel.A2:
          setIsA2LevelOn(!isA2LevelOn);
          break;
        case EWordsLevel.B1:
          setIsB1LevelOn(!isB1LevelOn);
          break;
      }
    },
    [
      gameOptions,
      setIsA1LevelOn,
      setIsA2LevelOn,
      setIsB1LevelOn,
      isA1LevelOn,
      isA2LevelOn,
      isB1LevelOn
    ]
  );

  const a1LevelAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: a1LevelOpacity.value
    }
  });

  const a2LevelAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: a2LevelOpacity.value
    }
  });

  const b1LevelAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: b1LevelOpacity.value
    }
  });

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
    <View
      testID="TRANSLATE_WORDS_GAME.CONTAINER:VIEW"
      style={styles.container}>
      <AnimatedPressable
        testID="TRANSLATE_WORDS_GAME.GAME:PRESSABLE"
        style={[
          translateGameContainerAnimatedStyle,
          styles.translateButton
        ]}
        aria-label="Ava tõlge mäng valikud"
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        onPress={toggleTranslateGameOptions}
      >
        <TranslateIcon testID="TRANSLATE_WORDS_GAME.GAME.TRANSLATION:ICON" />
        <Text style={styles.translateButtonDescription}>
          Sõnade tõlkimine
        </Text>
      </AnimatedPressable>
      <Animated.View
        testID={"TRANSLATE_WORDS_GAME.EXPANDING:VIEW"}
        style={[
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
            isSelected={gameOptions === "any"}>
            <AnimatedPressable
              style={[
                styles.languageLevelContainer,
                a1LevelAnimatedStyle
              ]}
              onPress={() => toggleWordsLevel(EWordsLevel.A1)}
              disabled={gameOptions === "my_dictionary"}
            >
              <Text style={styles.languageLevelText}>A1</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={[
                styles.languageLevelContainer,
                a2LevelAnimatedStyle
              ]}
              onPress={() => toggleWordsLevel(EWordsLevel.A2)}
              disabled={gameOptions === "my_dictionary"}
            >
              <Text style={styles.languageLevelText}>A2</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={[
                styles.languageLevelContainer,
                b1LevelAnimatedStyle
              ]}
              onPress={() => toggleWordsLevel(EWordsLevel.B1)}

              disabled={gameOptions === "my_dictionary"}
            >
              <Text style={styles.languageLevelText}>B1</Text>
            </AnimatedPressable>
          </OptionButton>
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
          <Pressable
            testID="TRANSLATE_WORDS_GAME.EXPANDING.START:PRESSABLE"
            style={[
              styles.startButtonContainer,
              {
                opacity: (gameOptions === "any" && !isA1LevelOn && !isA2LevelOn && !isB1LevelOn) ? 0.5 : 1
              }
            ]}
            onPress={() =>
              router.navigate({
                pathname: "/translate", params: {
                  mode: gameOptions,
                }
              })
            }
            disabled={
              gameOptions === "any" && !isA1LevelOn && !isA2LevelOn && !isB1LevelOn
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
    textAlign: "center",
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

  languageLevelContainer: {
    backgroundColor: CommonColors.white,
    opacity: 0.5,
    borderRadius: 5,
    padding: 10
  },
  languageLevelText: {
    fontSize: 16
  },
  // gradientContainer: {
  //   padding: 10,
  //   borderRadius: 5,
  // }
});
