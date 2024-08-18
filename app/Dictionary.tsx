import MaterialIconButton from "@/components/MaterialIconButton";
import Forms from "@/components/text_components/Forms";
import { callCloudFunction } from "@/components/util/CloudFunctions";
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
  dictionary: DictionaryWord[];
}

interface DictionaryWord {
  word: string;
  type: string;
  forms: string;
  definition: string;
  russian?: string;
}

function Dictionary() {
  const dictionaryWords = useSignal<DictionaryWord[]>([]);
  const isLoading = useSignal<boolean>(true);


  async function getDictionary(page: number) {
    const data: DictionaryRequest = {
      page: page
    }

    const responseData = await callCloudFunction("GetDictionary_Node", data) as DictionaryResponse | undefined;

    if (responseData != null) {
      dictionaryWords.value = responseData.dictionary;
    }

  };

  useEffect(() => {
    getDictionary(1);
  }, []);

  useSignalEffect(() => {
    if (dictionaryWords.value.length === 0) {
      isLoading.value = true;
    }

    if (dictionaryWords.value.length > 0) {
      console.log("Dictionary words changed", dictionaryWords.value);
      isLoading.value = false;
    }
  });


  if (isLoading.value === true) {

    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Siin pole midagi. Proovi uuesti hiljem.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => getDictionary(3)} style={{ backgroundColor: "white", margin: 10, height: 40, width: 40 }} />
      <FlatList
        data={dictionaryWords.value}
        keyExtractor={(item) => `word-${dictionaryWords.value.indexOf(item)}`}
        renderItem={({ item }) => <DictionaryItem {...item} />}
      />
    </View>
  );
}

function DictionaryItem({ word, type, forms, definition, russian }: DictionaryWord) {
  const russianTextSplit = russian?.split("\"");
  const accent = russianTextSplit?.at(1)?.slice(0, 1);
  const russianTextBeforeAccent = russianTextSplit?.at(0);
  const russianTextAfterAccent = russianTextSplit?.at(1)?.slice(1);

  return (
    <View style={{ flexDirection: "row" }}>
      <MaterialIconButton name="add" onPress={() => console.log(accent)} containerStyle={styles.addContainer} accessibilityLabel="Word" color={"black"} size={32} />
      <View>
        <Text style={styles.wordText} >{word}
        </Text>
        <Text style={styles.typeText} >{type}
        </Text>
        <Forms forms={forms} />
        <Text style={styles.definitionText}>{definition}</Text>
        <Text style={styles.russianText}>{russianTextBeforeAccent}
          <Text style={styles.russianAccentText}>{accent}
            <Text style={styles.russianText}>{russianTextAfterAccent}</Text>
          </Text>
        </Text>

      </View>
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
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  typeText: {
    color: "white",
    fontSize: 20
  },
  definitionText: {
    color: "white",
    fontSize: 20
  },
  russianText: {
    color: "#004fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold"
  }
});
