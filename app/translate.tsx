import { CommonColors } from "../constants/Colors";
import {
  useCallback,
  useEffect,
  useRef
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Word } from "./dictionary";
import TextButton from "../components/TextButton";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "../hooks/storeHooks";
import {
  atom,
  useAtom,
  useSetAtom
} from "jotai";
import ExamWordComponent from "../components/screens/translate/ExamWordComponent";
import TextAnswerField from "../components/screens/translate/TextAnswerField";
import {
  answerAtom,
  gameWordsAtom,
  isAnswerValidAtom,
  isAnswerVisibleAtom
} from "../components/screens/translate/translateAtoms";

const correctCountAtom = atom<number>(0);
const incorrectCountAtom = atom<number>(0);
const lastIncorrectWordAtom = atom<string>("");

export default function Translate() {
  const { mode } = useLocalSearchParams<{ mode: "any" | "my_dictionary" }>();

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const cachedDictionary = useAppSelector((state) => state.dictionary.cachedDictionary);

  const [
    gameWords,
    setGameWords
  ] = useAtom<Word[]>(gameWordsAtom);

  const [
    answer,
    setAnswer
  ] = useAtom<string>(answerAtom);

  const setIsAnswerValid = useSetAtom(isAnswerValidAtom);

  const setIsAnswerVisible = useSetAtom(isAnswerVisibleAtom);

  const [
    correctCount,
    setCorrectCount
  ] = useAtom<number>(correctCountAtom);

  const [
    incorrectCount,
    setIncorrectCount
  ] = useAtom<number>(incorrectCountAtom);

  const [
    lastIncorrectWord,
    setLastIncorrectWord
  ] = useAtom<string>(lastIncorrectWordAtom);

  function shuffleArray(array: Word[]) {
    let newIndex: number;

    for (let index = 0; index < array.length; index++) {
      newIndex = Math.floor(Math.random() * index);
      [
        array[index],
        array[newIndex]
      ] = [
          array[newIndex],
          array[index]
        ];
    }
    return array;
  }

  const refreshGameWords = useCallback(
    () => {
      switch (mode) {
        case "any":
          setGameWords(shuffleArray([
            ...cachedDictionary
          ]));
          break;
        case "my_dictionary":
          setGameWords(shuffleArray([
            ...myDictionary
          ]));
          break;
      }
    },
    [
      mode === "any" ? cachedDictionary : myDictionary
    ]
  );

  useEffect(
    () => {
      refreshGameWords();
    },
    []
  );

  useEffect(
    () => {
      if (gameWords.length === 0) {
        refreshGameWords();
      }
    },
    [
      gameWords
    ]
  );


  const textInputRef = useRef<TextInput>(null);

  const checkAnswer = useCallback(
    () => {
      const answerLowercase = answer.toLowerCase().trim();

      if (answerLowercase === "" || gameWords.length === 0) {
        return;
      }

      const currentWordLowercase = gameWords[0].word.split("+").join("").toLowerCase();

      console.log(
        "gameWords: ",
        gameWords
      );

      console.log(
        "Current word: ",
        currentWordLowercase
      );
      console.log(
        "Answer: ",
        answerLowercase
      );

      if (currentWordLowercase === answerLowercase) {
        console.log("Correct!");
        setIsAnswerVisible(false);
        setGameWords(gameWords.slice(1));
        setCorrectCount(correctCount + 1);
      } else {
        console.log("Incorrect!");
        if (lastIncorrectWord !== currentWordLowercase) {
          setLastIncorrectWord(currentWordLowercase);
          setIncorrectCount(incorrectCount + 1);
        }

        setIsAnswerValid(false);
        setIsAnswerVisible(true);

      }

      setAnswer("");
    },
    [
      answer,
      gameWords,
      correctCount,
      incorrectCount
    ]
  );

  function skipWord() {
    setIsAnswerVisible(false);
    setGameWords(gameWords.slice(1));
    setAnswer("");
  }

  return (
    <>
      <View
        style={styles.container}
      >
        <View style={styles.topContainer}>
          {
            gameWords.length === 0 ? <Text style={{ color: CommonColors.white, fontSize: 20, marginTop: 10 }}>Võtame sõnad sõnastikust...</Text> :
              <>
                {mode === "my_dictionary" &&
                  <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                    On jaanud: {gameWords.length}
                  </Text>
                }
                <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                  Õige: {correctCount}
                </Text>
                <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                  Vale: {incorrectCount}
                </Text>
              </>
          }

          <ExamWordComponent mode={mode} />
        </View>
        <View style={styles.bottomContainer} >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextAnswerField onSubmit={checkAnswer} textInputRef={textInputRef} />
          </View>
          <TextButton
            onPress={skipWord}
            style={styles.skipWordContainer}
            textStyle={styles.skipWordText}
            text="JÄRGMINE"
            label="Next" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: CommonColors.black,
    paddingVertical: 10
  },
  topContainer: {
    alignItems: "center",
  },
  bottomContainer: {
    alignItems: "center",
  },
  skipWordContainer: {
    backgroundColor: CommonColors.white,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    marginTop: 10,
    marginBottom: 10,
  },
  skipWordText: {
    color: CommonColors.black,
    fontSize: 16,
    fontWeight: "bold",
  }
})
