import MaterialIconButton from "@/components/MaterialIconButton";
import TextButton from "@/components/TextButton";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import Forms from "@/components/text_components/Forms";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { myDictionary } from "@/components/util/WordsUtil";
import { CommonColors } from "@/constants/Colors";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";


export interface DictionaryRequest {
  page: number;
}

export interface RandomWordsResponse {
  randomWords: Word[];
}


export interface Word {
  word: string;
  definition?: string;
  type?: string;
  forms?: string;
  russianTranslations: string[];
  examples?: {
    estonianExample: string;
    russianTranslation: string[];
  }
}

export interface DictionaryResponse {
  dictionary: Word[];
}

function Dictionary() {

  if (myDictionary.value.length === 0) {

    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Siin pole midagi. Proovi uuesti hiljem.</Text>
      </View>
    );
  }

  function resetCache() {
    localStorage.removeItem("myDictionary");
    myDictionary.value = [];
  }

  return (
    <View style={styles.container}>
      <TextButton onPress={resetCache} text="reset" textStyle={{ color: "red" }} label={"reset"} />
      <FlatList
        data={myDictionary.value}
        keyExtractor={(item) => `word-${myDictionary.value.indexOf(item)}`}
        renderItem={({ item, index }) => <DictionaryItem {...item} index={index + 1} />}
      />
    </View>
  );
}


export default Dictionary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#222322"
  },
  loadingText: {
    fontSize: 20,
    color: CommonColors.white,
  },
  addContainer: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 20
  },
});
