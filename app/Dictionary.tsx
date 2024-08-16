import MaterialIconButton from "@/components/MaterialIconButton";
import Forms from "@/components/text_components/Forms";
import { useSignal, useSignalEffect } from "@preact/signals-react";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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
  const count = useSignal<number>(0);

  useEffect(() => {
    async function getDictionary() {
      try {
        // Assuming your XML file is in the assets folder


        const request = await fetch("http://192.168.8.110:3000/dict", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        const response = await request.text();

        console.log("Responsea", response);

        const json = JSON.parse(response);

        dictionaryWords.value = json;


        // .then(async (response) => {
        //   const text = await response.text();
        //   console.log("Response text", text);
        //   const json = JSON.parse(text);
        //
        //   console.log("Response json", json);
        //   dictionaryWords.value = json;
        //
        //
        // });


      } catch (error) {
        console.error('Error reading or parsing XML file:', error);
      }
    };

    getDictionary();
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

  async function goToPage(pageNumber: number) {
    const request = await fetch(`http://192.168.8.110:3000/dict/${pageNumber}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });


    const response = await request.text();

    console.log("Responseaaa", response);

    const json = JSON.parse(response);

    dictionaryWords.value = json;
  }

  if (isLoading.value === true) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => goToPage(2)} style={{ backgroundColor: "white", margin: 10, height: 40, width: 40 }} />
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
// <Text style={styles.russianText}>{russianTextBeforeAccentAndStartingWithAccent.at(0)}
// <Text style={{ color: "red" }}>{russianTextBeforeAccentAndStartingWithAccent[1]}</Text>
// </Text>

export default Dictionary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#222322"
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
