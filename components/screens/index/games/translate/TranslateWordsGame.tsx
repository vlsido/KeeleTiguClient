import {
  useCallback,
  useEffect,
  useMemo
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import {
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
import Checkbox from "../../../../buttons/Checkbox";
import { TranslateGameMode } from "../../../../../constants/types";

const gameOptionsAtom = atom<TranslateGameMode>("any");

function TranslateWordsGame() {
  const { showHint } = useHint();

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const { width: screenWidth } = useWindowDimensions();

  const [
    gameOptions,
    setGameOptions
  ] = useAtom<TranslateGameMode>(gameOptionsAtom);

  const [numberOfWords, setNumberOfWords] = useAtom<number>(useMemo(() => atom<number>(20), []));

  const [isUnlimitedGame, setIsUnlimitedGame] = useAtom<boolean>(useMemo(() => atom<boolean>(false), []));

  const [isNumberOfWordsValid, setIsNumberOfWordsValid] = useAtom<boolean>(useMemo(() => atom<boolean>(true), []));

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
      if (gameOptions === "my_dictionary" || gameOptions === "") {
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

  const onCheckboxPress = useCallback((isChecked: boolean) => {
    setIsNumberOfWordsValid(true);
    setIsUnlimitedGame(isChecked);
  }, []);

  const onChangeNumberOfWords = useCallback((text: string) => {
    setIsNumberOfWordsValid(true);

    if (text.length === 0) {
      setNumberOfWords(0);

      return;
    }

    const charCode = text.charCodeAt(text.length - 1);

    if (charCode >= 48 && charCode <= 57) {
      setNumberOfWords(parseInt(text));
    }
  }, []);

  const toggleOption = useCallback((option: "any" | "my_dictionary") => {
    switch (option) {
      case "any":
        if (gameOptions === "any") return setGameOptions("");
        if (gameOptions === "my_dictionary") return setGameOptions("all");
        if (gameOptions === "all") return setGameOptions("my_dictionary");
        if (gameOptions === "") return setGameOptions("any");
        break;
      case "my_dictionary":
        if (gameOptions === "any") return setGameOptions("all");
        if (gameOptions === "my_dictionary") return setGameOptions("");
        if (gameOptions === "all") return setGameOptions("any");
        if (gameOptions === "") return setGameOptions("my_dictionary");
        break;
    }
  }, [gameOptions]);

  const startGame = useCallback(() => {
    if (!isUnlimitedGame && numberOfWords === 0) {
      setIsNumberOfWordsValid(false);
      return;
    }

    if (gameOptions === "any" && !isA1LevelOn && !isA2LevelOn && !isB1LevelOn) return;

    if (gameOptions === "") return;

    router.navigate({
      pathname: "/translate", params: {
        mode: gameOptions,
        quantity: isUnlimitedGame ? "0" : numberOfWords.toString()
      }
    })
  }, [
    numberOfWords,
    isUnlimitedGame,
    gameOptions,
    isA1LevelOn,
    isA2LevelOn,
    isB1LevelOn,
    router,
  ]);

  return (
    <View
      testID="TRANSLATE_WORDS_GAME.CONTAINER:VIEW"
      style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>
          {i18n.t("TranslateWordsGame_translate_words", { defaultValue: "Sõnade tõlkimine" })}
        </Text>
      </View>
      <View style={styles.numberOfWords}>
        <View style={styles.numberOfWordsHeaderTextContainer}>
          <Text style={styles.numberOfWordsHeaderText}>
            {i18n.t("TranslateWordsGame_number_of_words", { defaultValue: "Sõnade arv" })}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={[
            styles.numberOfWordsTextInputContainer,
            { opacity: isUnlimitedGame === true ? 0.25 : 1 },
            !isNumberOfWordsValid && { borderColor: "red" }
          ]}>
            <TextInput
              testID="TRANSLATE_WORDS_GAME.CONTAINER.NUMBER_OF_WORDS_CONTAINER.NUMBER:INPUT"
              style={[styles.numberOfWordsTextInput, { pointerEvents: isUnlimitedGame === true ? "none" : "auto" }]}
              inputMode="numeric"
              placeholder="20"
              value={numberOfWords.toString()}
              onChangeText={(text: string) => onChangeNumberOfWords(text)}
            />
          </View>
          <View style={styles.unlimitedWordsContainer}>
            <View style={styles.unlimitedWordsTextContainer}>
              <Text
                style={styles.unlimitedWordsText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {i18n.t("TranslateWordsGame_unlimited_words", { defaultValue: "Piiritu" })}
              </Text>
            </View>
            <Checkbox
              testID="TRANSLATE_WORDS_GAME.CONTAINER.NUMBER_OF_WORDS.UNLIMITED_WORDS.CHECKBOX:PRESSABLE"
              onPress={onCheckboxPress}
            />
          </View>
        </View>
      </View>
      <OptionButton
        text={i18n.t("TranslateWordsGame_random_words", { defaultValue: "Juhuslikud sõnad" })}
        onPress={() => toggleOption("any")}
        isSelected={gameOptions === "any" || gameOptions === "all"}>
        <View style={[styles.optionChildren, screenWidth > 250 ? { flexDirection: "row" } : { flexDirection: "column", alignItems: "flex-start" }]}>
          <AnimatedPressable
            style={[
              styles.languageLevelContainer,
              a1LevelAnimatedStyle
            ]}
            onPress={() => toggleWordsLevel(EWordsLevel.A1)}
            disabled={gameOptions === "my_dictionary" || gameOptions === ""}
          >
            <Text style={styles.languageLevelText}>A1</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              styles.languageLevelContainer,
              a2LevelAnimatedStyle
            ]}
            onPress={() => toggleWordsLevel(EWordsLevel.A2)}
            disabled={gameOptions === "my_dictionary" || gameOptions === ""}
          >
            <Text style={styles.languageLevelText}>A2</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              styles.languageLevelContainer,
              b1LevelAnimatedStyle
            ]}
            onPress={() => toggleWordsLevel(EWordsLevel.B1)}
            disabled={gameOptions === "my_dictionary" || gameOptions === ""}
          >
            <Text style={styles.languageLevelText}>B1</Text>
          </AnimatedPressable>
        </View>
      </OptionButton>
      <OptionButton
        text={i18n.t("TranslateWordsGame_words_from_my_dictionary", { defaultValue: "Sõnad mu sõnastikust" })}
        onPress={() => {
          if (myDictionary.length < 1) {
            showHint(
              i18n.t("Hint_dictionary_is_empty", { defaultValue: "Sõnastik on tühi!" }),
              2500
            );
            return;
          }
          toggleOption("my_dictionary");
        }}
        isSelected={gameOptions === "my_dictionary" || gameOptions === "all"} />
      <View
        testID="TRANSLATE_WORDS_GAME.CONTAINER.START_CONTAINER:VIEW"
        style={styles.startContainer}>
        <Pressable
          testID="TRANSLATE_WORDS_GAME.CONTAINER.START_CONTAINER.START:PRESSABLE"
          style={[
            styles.startButtonContainer,
            {
              opacity:
                ((gameOptions === "any" || gameOptions === "all")
                  && !isA1LevelOn && !isA2LevelOn && !isB1LevelOn)
                  || gameOptions === "" ? 0.5 : 1
            }
          ]}
          onPress={startGame}
          disabled={
            ((gameOptions === "any" || gameOptions === "all")
              && !isA1LevelOn && !isA2LevelOn && !isB1LevelOn)
            || gameOptions === ""
          }
          aria-label={i18n.t("start", { defaultValue: "Alusta" })} >
          <Text
            style={styles.startButtonText}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {i18n.t("TranslateWordsGame_start", { defaultValue: "ALUSTA" })}
          </Text>
        </Pressable>
      </View>
    </View >
  )
}

export default TranslateWordsGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    maxHeight: 500,
    maxWidth: 400,
    backgroundColor: "#171814",
    borderWidth: 1,
    borderColor: CommonColors.whiteAlternative,
    borderRadius: 60,
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
    flexDirection: "row",
    flex: 1
  },
  numberOfWordsTextInputContainer: {
    flex: 1,
    backgroundColor: CommonColors.black,
    borderWidth: 2,
    borderColor: CommonColors.whiteAlternative,
    borderRadius: 5,
    justifyContent: "center",
  },
  numberOfWordsTextInput: {
    fontSize: 14,
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  unlimitedWordsContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  unlimitedWordsTextContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  unlimitedWordsText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  optionChildren: {
    flex: 1,
    alignItems: "center",
    gap: 5
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
});
