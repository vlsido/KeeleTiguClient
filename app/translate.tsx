import { CommonColors } from "../constants/Colors";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { WordAndExamData } from "./dictionary";
import { useLocalSearchParams } from "expo-router";
import {
  useAppDispatch,
  useAppSelector
} from "../hooks/storeHooks";
import {
  atom,
  useAtom,
  useAtomValue,
} from "jotai";
import ExamWordComponent from "../components/screens/translate/ExamWordComponent";
import TextAnswerField from "../components/screens/translate/TextAnswerField";
import {
  answerAtom,
  gameWordsAtom,
  isA1LevelOnAtom,
  isA2LevelOnAtom,
  isB1LevelOnAtom
} from "../components/screens/translate/translateAtoms";
import { useHint } from "../hooks/useHint";
import { setExamDictionary } from "../components/store/slices/dictionarySlice";
import { SkipNextIcon } from "../components/icons/SkipNextIcon";
import { VisibilityIcon } from "../components/icons/VisibilityIcon";
import CustomIconButton from "../components/buttons/CustomIconButton";

export default function Translate() {
  const { mode } = useLocalSearchParams<{ mode: "any" | "my_dictionary" }>();

  const { showHint } = useHint();

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);

  const examDictionary = useAppSelector((state) => state.dictionary.examDictionary);

  const dispatch = useAppDispatch();

  const [
    gameWords,
    setGameWords
  ] = useAtom<WordAndExamData[]>(gameWordsAtom);

  const [
    answer,
    setAnswer
  ] = useAtom<string>(answerAtom);

  const isA1LevelOn = useAtomValue(isA1LevelOnAtom);
  const isA2LevelOn = useAtomValue(isA2LevelOnAtom);
  const isB1LevelOn = useAtomValue(isB1LevelOnAtom);

  const [
    isAnswerValid,
    setIsAnswerValid
  ] = useAtom<boolean>(useMemo(
    () => atom<boolean>(false),
    []
  ));

  const [
    isAnswerVisible,
    setIsAnswerVisible
  ] = useAtom<boolean>(useMemo(
    () => atom<boolean>(false),
    []
  ));

  const [
    correctCount,
    setCorrectCount
  ] = useAtom<number>(useMemo(
    () => atom<number>(0),
    []
  ));

  const [
    incorrectCount,
    setIncorrectCount
  ] = useAtom<number>(useMemo(
    () => atom<number>(0),
    []
  ));

  const [
    lastIncorrectWord,
    setLastIncorrectWord
  ] = useAtom<string>(useMemo(
    () => atom<string>(""),
    []
  ));

  function shuffleArray(array: WordAndExamData[]) {
    let newIndex: number;

    array.forEach((
      _, index
    ) => {
      newIndex = Math.floor(Math.random() * index);
      [
        array[index],
        array[newIndex]
      ] = [
          array[newIndex],
          array[index]
        ];
    });
    return array;
  }

  const refreshGameWords = useCallback(
    () => {
      switch (mode) {
        case "any":
          const filteredDictionary = examDictionary.filter((wordAndExamData) =>
            (wordAndExamData.examData.level === "A1" && isA1LevelOn)
            || (wordAndExamData.examData.level === "A2" && isA2LevelOn)
            || (wordAndExamData.examData.level === "B1" && isB1LevelOn));
          console.log(
            "filted",
            filteredDictionary
          );

          if (filteredDictionary.length === 0) {
            if (isA1LevelOn || isA2LevelOn || isB1LevelOn) {
              dispatch({ type: "dictionary/fetchRandomWords" });
              return;
            }

            setGameWords(shuffleArray(examDictionary));
            return;
          }

          setGameWords(shuffleArray(filteredDictionary));
          break;
        case "my_dictionary":
          const newExamDictionary: (WordAndExamData | null)[] = myDictionary.map((wordsAndData) => {
            const russianTranslations = wordsAndData.usages.at(0)?.definitionData.at(0)?.russianTranslations;

            if (russianTranslations === undefined || russianTranslations.length === 0) {
              return null;
            }

            return {
              ...wordsAndData,
              examData: {
                word: wordsAndData.word,
                level: "B1",
                russianTranslations: russianTranslations
              }
            }
          });

          const filteredExamDictionary = newExamDictionary.filter((wordData) => wordData !== null) as WordAndExamData[];

          setGameWords(shuffleArray(filteredExamDictionary));
          break;
      }
    },
    [
      mode === "any" ? examDictionary : myDictionary,
      isA1LevelOn,
      isA2LevelOn,
      isB1LevelOn,
      shuffleArray,
      setGameWords
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
      console.log(
        "gameWords",
        gameWords
      );
      if (gameWords.length === 0) {
        refreshGameWords();
      }
    },
    [
      gameWords,
      examDictionary
    ]
  );

  const textInputRef = useRef<TextInput>(null);

  const removeWordFromExamDictionary = useCallback(
    () => {
      const newExamDictionary = examDictionary.filter((word) => word !== gameWords[0]);

      dispatch(setExamDictionary(newExamDictionary));
    },
    [
      examDictionary,
      gameWords
    ]
  );

  const checkAnswer = useCallback(
    () => {
      const answerLowercase = answer.toLowerCase().trim();

      if (answerLowercase === "" || gameWords.length === 0) {
        return;
      }

      const currentWordLowercase = gameWords[0].examData.word.split("+").join("").toLowerCase();

      if (currentWordLowercase === answerLowercase) {
        setIsAnswerVisible(false);
        removeWordFromExamDictionary();

        setGameWords(gameWords.filter((
          _, index
        ) => index !== 0));
        if (lastIncorrectWord !== currentWordLowercase) {
          setCorrectCount(correctCount + 1);
        }
      } else {
        if (lastIncorrectWord !== currentWordLowercase) {
          setLastIncorrectWord(currentWordLowercase);
          setIncorrectCount(incorrectCount + 1);
        }

        setIsAnswerValid(false);
        setIsAnswerVisible(true);

      }

      setAnswer("");

      setTimeout(
        () => {
          textInputRef.current?.focus();

        },
        1000
      );
    },
    [
      answer,
      gameWords,
      correctCount,
      incorrectCount,
      textInputRef
    ]
  );

  function skipWord() {
    setIsAnswerVisible(false);
    removeWordFromExamDictionary();
    setGameWords(gameWords.filter((
      _, index
    ) => index !== 0));
    setAnswer("");
  }

  const showWord = useCallback(
    () => {
      const currentWordLowercase = gameWords.at(0)?.word.split("+").join("").toLowerCase();

      if (currentWordLowercase === undefined) {
        showHint(
          "Oii, miski viga! Proovi uuesti!",
          2500
        );
      }

      if (currentWordLowercase !== undefined && lastIncorrectWord !== currentWordLowercase) {
        setLastIncorrectWord(currentWordLowercase);
        setIncorrectCount(incorrectCount + 1);
      }

      setIsAnswerValid(false);
      setIsAnswerVisible(true);

    },
    [
      gameWords,
      lastIncorrectWord,
      incorrectCount,
      setLastIncorrectWord,
      setIncorrectCount,
      setIsAnswerValid,
      setIsAnswerVisible,
    ]
  );

  const onTextFieldFocus = useCallback(
    () => {
      setIsAnswerValid(true)
    },
    []
  );

  return (
    <View
      testID="TRANSLATE.CONTAINER:VIEW"
      style={styles.container}
    >
      <View style={styles.topContainer}>
        {
          gameWords.length === 0 ? <Text style={styles.loadingWordsText}>Võtame sõnad sõnastikust...</Text> :
            <>
              {mode === "my_dictionary" &&
                <Text style={styles.wordsLeftText}>
                  Veel jaanud: {gameWords.length}
                </Text>
              }
              <View>
                <Text style={styles.rightWordsText}>
                  {"\u2713"} Õige: {correctCount}
                </Text>
              </View>
              <Text style={styles.wrongWordsText}>
                <Text style={styles.bold}>{"\u2A09"}{" "}</Text>
                Vale: {incorrectCount}
              </Text>
            </>
        }
        <ExamWordComponent
          mode={mode}
          isAnswerVisible={isAnswerVisible}
        />
      </View>
      <View style={styles.bottomContainer} >
        <View style={[styles.row, { alignItems: "center" }]}>
          <TextAnswerField
            textInputRef={textInputRef}
            onSubmit={checkAnswer}
            onFocus={onTextFieldFocus}
            isAnswerValid={isAnswerValid}
          />
        </View>
        <View style={[styles.row, { gap: 10 }]}>
          <CustomIconButton onPress={skipWord}>
            <SkipNextIcon />
          </CustomIconButton>
          <CustomIconButton onPress={showWord}>
            <VisibilityIcon />
          </CustomIconButton>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CommonColors.black,
    paddingVertical: 10
  },
  topContainer: {
    alignItems: "center",
    minHeight: "35%",
  },
  loadingWordsText: {
    color: CommonColors.white,
    fontSize: 20,
    marginTop: 10
  },
  wordsLeftText: {
    color: CommonColors.white,
    fontSize: 16,
    marginVertical: 5
  },
  rightWordsText: {
    color: CommonColors.green,
    fontSize: 16
  },
  wrongWordsText: {
    color: CommonColors.red,
    fontSize: 16
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: "55%",
  },
  bold: {
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row"
  }
})
