import {
  useCallback,
  useEffect
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
import { CommonColors } from "../../../../../constants/Colors";
import {
  isA1LevelOnAtom,
  isA2LevelOnAtom,
  isB1LevelOnAtom
} from "../../../translate/translateAtoms";
import { EWordsLevel } from "../../../../util/WordsUtil";
import { i18n } from "../../../../store/i18n";

const gameOptionsAtom = atom<"any" | "my_dictionary">("any");


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


  const a1LevelOpacity = useSharedValue<number>(0.5);
  const a2LevelOpacity = useSharedValue<number>(0.5);
  const b1LevelOpacity = useSharedValue<number>(0.5);

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

  return (
    <View
      testID="TRANSLATE_WORDS_GAME.CONTAINER:VIEW"
      style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>
          {i18n.t("TranslateWordsGame.translate_words", { defaultValue: "Sõnade tõlkimine" })}
        </Text>
      </View>
      <View style={styles.numberOfWords}>
        <View style={styles.numberOfWordsHeaderTextContainer}>
          <Text style={styles.numberOfWordsHeaderText}>
            {i18n.t("TranslateWordsGame.number_of_words", { defaultValue: "Sõnade arv" })}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.numberOfWordsTextInputContainer}>
            <TextInput
              style={styles.numberOfWordsTextInput}
              placeholder="20"
              inputMode="numeric"
            />
          </View>
          <View style={styles.unlimitedWordsContainer}>
            <View style={styles.unlimitedWordsTextContainer}>
              <Text style={styles.unlimitedWordsText}>
                {i18n.t("TranslateWordsGame.unlimited_words", { defaultValue: "Piiritu" })}
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>
                ✔
              </Text>
            </View>
          </View>
        </View>
      </View>
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
      <View style={styles.startContainer}>
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
          <Text style={styles.startButtonText}>
            {i18n.t("TranslateWordsGame.start", { defaultValue: "ALUSTA" })}
          </Text>
        </Pressable>
      </View>
    </View >
  )
}

export default TranslateWordsGame;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#171814",
    borderWidth: 1,
    borderColor: CommonColors.whiteAlternative,
    borderRadius: 60,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTextContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%"
  },
  headerText: {
    color: CommonColors.white,
    fontSize: 18,
    textAlign: "center",
  },
  numberOfWords: {
    width: "100%",
    gap: 5
  },
  numberOfWordsHeaderTextContainer: {
    width: "100%",
    paddingHorizontal: 5
  },
  numberOfWordsHeaderText: {
    fontSize: 12,
    fontWeight: "light",
    opacity: 0.75,
    color: "white"
  },
  row: {
    flexDirection: "row"
  },
  numberOfWordsTextInputContainer: {
    backgroundColor: CommonColors.black,
    borderWidth: 2,
    borderColor: CommonColors.whiteAlternative,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  numberOfWordsTextInput: {
    fontSize: 12,
    color: "white"
  },
  unlimitedWordsContainer: {
    paddingHorizontal: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  unlimitedWordsTextContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  unlimitedWordsText: {
    fontSize: 12,
    color: "white"
  },
  checkboxContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxText: {
    fontSize: 12,
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
  startContainer: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  startButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 60,
    marginVertical: 12,
    paddingVertical: 12,
    borderColor: CommonColors.whiteAlternative,
    borderWidth: 1,
    backgroundColor: CommonColors.black,
  },
  startButtonText: {
    color: CommonColors.white,
    fontSize: 18
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
});
