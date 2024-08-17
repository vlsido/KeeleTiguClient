import SendAnswerButton from "@/components/SendAnswerButton";
import TextAnswerField from "@/components/TextAnswerField";
import { CommonColors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { DictionaryRequest, RandomWordsResponse, Word } from "./dictionary";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { batch, useSignal, useSignalEffect } from "@preact/signals-react";
import ExamWordComponent, { ExamWord } from "@/components/ExamWordComponent";
import TextButton from "@/components/TextButton";

export default function Index() {
  const examWords = useSignal<ExamWord[]>([]);
  const answer = useSignal<string>("");
  const isAnswerValid = useSignal<boolean>(true);
  const isAnswerVisible = useSignal<boolean>(false);
  const correctCount = useSignal<number>(0);
  const incorrectCount = useSignal<number>(0);

  async function getRandomWords() {
    const data = {
      numberOfWords: 10,
    };

    const responseData = await callCloudFunction("GetRandomWords_Node", data) as RandomWordsResponse | null;

    if (responseData != null) {
      const examWordsData = responseData.randomWords.map((word: Word) => {
        return {
          word: word.word,
          russianTranslation: word.russianTranslation,
        };
      });


      examWords.value = examWordsData;

      console.log("respik", responseData);
      console.log("examWords", examWords.value);
    }

  };

  useSignalEffect(() => {
    if (examWords.value.length === 0) {
      getRandomWords();
      correctCount.value = 0;
      incorrectCount.value = 0;
    }
  });

  const lastIncorrectWord = useSignal<string>("");

  const textInputRef = useRef<TextInput>(null);

  function checkAnswer() {
    if (answer.value === "") {
      return;
    }
    const currentWordLowercase = examWords.value[0].word.split("+").join("");
    const answerLowercase = answer.value.toLowerCase();

    if (currentWordLowercase === answerLowercase) {
      console.log("Correct!");
      isAnswerVisible.value = false;
      batch(() => {
        examWords.value = examWords.value.slice(1);
        correctCount.value += 1;
        answer.value = "";
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
  }

  function skipWord() {
    batch(() => {
      isAnswerVisible.value = false;
      examWords.value = examWords.value.slice(1);
      answer.value = "";
    });
    textInputRef.current?.focus();
  }


  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        backgroundColor: CommonColors.black,
      }}
    >
      {examWords.value.length === 0 ? <Text style={{ color: CommonColors.white, fontSize: 20, marginTop: 10 }}>Võtame sõnad sõnastikust...</Text> :
        <>
          <Text style={{ color: CommonColors.white, fontSize: 20, marginVertical: 10 }}>
            {examWords.value.length} sõna on jäänud
          </Text>
          <Text style={{ color: CommonColors.white, fontSize: 16 }}>
            Õige: {correctCount.value}
          </Text>
          <Text style={{ color: CommonColors.white, fontSize: 16 }}>
            Vale: {incorrectCount.value}
          </Text>
        </>
      }

      <ExamWordComponent examWords={examWords} isAnswerVisible={isAnswerVisible} />
      <View style={styles.separator} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextAnswerField answer={answer} isValid={isAnswerValid} onSubmit={checkAnswer} textInputRef={textInputRef} />
        <SendAnswerButton onPress={checkAnswer} />
      </View>
      <TextButton onPress={skipWord} style={styles.skipWordContainer} textStyle={styles.skipWordText} text="JÄRGMINE" label="Next" />
    </View>

  );
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
  },
  skipWordContainer: {
    backgroundColor: CommonColors.white,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    marginTop: 10,
    marginBottom: 50,
  },
  skipWordText: {
    color: CommonColors.black,
    fontSize: 16,
    fontWeight: "bold",
  }
})
