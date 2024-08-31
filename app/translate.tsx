import TextAnswerField from "@/components/TextAnswerField";
import { CommonColors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Word } from "./dictionary";
import { batch, useSignal } from "@preact/signals-react";
import ExamWordComponent from "@/components/ExamWordComponent";
import TextButton from "@/components/TextButton";
import { myDictionary, cachedWordsAndData } from "@/components/util/WordsUtil";
import { useLocalSearchParams } from "expo-router";

export default function Translate() {
  const { mode } = useLocalSearchParams<{ mode: "any" | "my_dictionary" }>();

  const gameWords = useSignal<Word[]>([]);

  const answer = useSignal<string>("");
  const isAnswerValid = useSignal<boolean>(true);
  const isAnswerVisible = useSignal<boolean>(false);
  const correctCount = useSignal<number>(0);
  const incorrectCount = useSignal<number>(0);

  function shuffleArray(array: Word[]) {
    let newIndex, temporaryData;
    for (let index = 0; index < array.length; index++) {
      newIndex = Math.floor(Math.random() * index);
      temporaryData = array[index];
      array[index] = array[newIndex];
      array[newIndex] = temporaryData;
    }
    return array;
  }

  useEffect(() => {
    switch (mode) {
      case "any":
        gameWords.value = shuffleArray(cachedWordsAndData.value);
        break;
      case "my_dictionary":
        gameWords.value = shuffleArray(myDictionary.value);
        break;
    }
  }, [mode]);

  const lastIncorrectWord = useSignal<string>("");

  const textInputRef = useRef<TextInput>(null);

  function checkAnswer() {
    if (answer.value === "") {
      return;
    }

    const currentWordLowercase = gameWords.value[0].word.split("+").join("");
    const answerLowercase = answer.value.toLowerCase();

    if (currentWordLowercase === answerLowercase) {
      console.log("Correct!");
      isAnswerVisible.value = false;
      batch(() => {
        gameWords.value = gameWords.value.slice(1);
        correctCount.value += 1;
      });
    } else {
      console.log("Incorrect!");
      if (lastIncorrectWord.value !== currentWordLowercase) {
        batch(() => {
          lastIncorrectWord.value = currentWordLowercase;
          incorrectCount.value += 1;
        });
      }

      batch(() => {
        isAnswerValid.value = false;
        isAnswerVisible.value = true;

      });
    }

    answer.value = "";
  }

  function skipWord() {
    batch(() => {
      isAnswerVisible.value = false;
      gameWords.value = gameWords.value.slice(1);
      answer.value = "";
    });

  }

  return (
    <>
      <View
        style={styles.container}
      >
        <View style={styles.topContainer}>
          {
            cachedWordsAndData.value.length === 0 ? <Text style={{ color: CommonColors.white, fontSize: 20, marginTop: 10 }}>Võtame sõnad sõnastikust...</Text> :
              <>
                {mode === "my_dictionary" &&
                  <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                    On jaanud: {gameWords.value.length}
                  </Text>

                }
                <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                  Õige: {correctCount.value}
                </Text>
                <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                  Vale: {incorrectCount.value}
                </Text>
              </>
          }

          <ExamWordComponent words={gameWords} isAnswerVisible={isAnswerVisible} />
        </View>
        <View style={styles.bottomContainer} >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextAnswerField answer={answer} isValid={isAnswerValid} onSubmit={checkAnswer} textInputRef={textInputRef} />
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
