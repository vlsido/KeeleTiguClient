import SendAnswerButton from "@/components/SendAnswerButton";
import TextAnswerField from "@/components/TextAnswerField";
import { CommonColors } from "@/constants/Colors";
import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RandomWordsResponse, Word } from "./dictionary";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { batch, useSignal, useSignalEffect } from "@preact/signals-react";
import ExamWordComponent from "@/components/ExamWordComponent";
import TextButton from "@/components/TextButton";
import { randomWords } from "@/components/util/WordsUtil";



export default function Index() {
  const answer = useSignal<string>("");
  const isAnswerValid = useSignal<boolean>(true);
  const isAnswerVisible = useSignal<boolean>(false);
  const correctCount = useSignal<number>(0);
  const incorrectCount = useSignal<number>(0);

  async function getRandomWords() {
    const data = {
      numberOfWords: 100,
    };

    const responseData = await callCloudFunction("GetRandomWords_Node", data) as RandomWordsResponse | null;

    if (responseData != null) {
      const examWordsData = responseData.randomWords.map((word: Word) => {
        return {
          word: word.word,
          russianTranslations: word.russianTranslations,
          type: word.type,
          forms: word.forms,
          definition: word.definition,
          examples: word.examples,
        };
      });


      randomWords.value = examWordsData;

      console.log("respik", responseData);
    }

  };


  useSignalEffect(() => {
    if (randomWords.value.length === 0) {
      getRandomWords();
    }
  });



  const lastIncorrectWord = useSignal<string>("");

  const textInputRef = useRef<TextInput>(null);

  function checkAnswer() {
    if (answer.value === "") {
      return;
    }
    const currentWordLowercase = randomWords.value[0].word.split("+").join("");
    const answerLowercase = answer.value.toLowerCase();

    if (currentWordLowercase === answerLowercase) {
      console.log("Correct!");
      isAnswerVisible.value = false;
      batch(() => {
        randomWords.value = randomWords.value.slice(1);
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
      randomWords.value = randomWords.value.slice(1);
      answer.value = "";
    });
    textInputRef.current?.focus();
  }


  return (
    <View
      style={styles.constainer}
    >
      <View style={styles.topContainer}>
        {
          randomWords.value.length === 0 ? <Text style={{ color: CommonColors.white, fontSize: 20, marginTop: 10 }}>Võtame sõnad sõnastikust...</Text> :
            <>
              <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                Õige: {correctCount.value}
              </Text>
              <Text style={{ color: CommonColors.white, fontSize: 16 }}>
                Vale: {incorrectCount.value}
              </Text>
            </>
        }

        <ExamWordComponent isAnswerVisible={isAnswerVisible} />
      </View>
      <View style={styles.bottomContainer} >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextAnswerField answer={answer} isValid={isAnswerValid} onSubmit={checkAnswer} textInputRef={textInputRef} />
          <SendAnswerButton onPress={checkAnswer} />
        </View>
        <TextButton onPress={skipWord} style={styles.skipWordContainer} textStyle={styles.skipWordText} text="JÄRGMINE" label="Next" />

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  constainer: {
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
