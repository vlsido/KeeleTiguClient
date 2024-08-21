import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Dimensions, FlatList, StyleSheet, TextInput, View } from "react-native";
import { WordWithoutData, allWords } from "@/components/util/WordsUtil";
import { CommonColors } from "@/constants/Colors";
import SearchItem from "@/components/search/SearchItem";

function Search() {
  const searchResults = useSignal<WordWithoutData[]>([]);

  useSignalEffect(() => {
    if (searchResults.value) {
      console.log("searchResults", searchResults.value.length);
    }
  });

  function onChange(text: string) {
    if (text === "") {
      searchResults.value = [];
      return;
    }
    console.log("allWords", allWords.value);
    const textLowerCase = text.toLowerCase();
    searchResults.value = allWords.value.filter((word) => word.word.toLowerCase().includes(textLowerCase));

  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, Dimensions.get("window").width > Dimensions.get("window").height ? { width: "50%" } : { width: "90%" }]}>
        <TextInput placeholder="Otsi..." style={styles.searchInput} onChange={(event) => onChange(event.nativeEvent.text)} />
        <FlatList
          data={searchResults.value}
          renderItem={({ item, index }) => <SearchItem word={item.word} index={index + 1} />}
          keyExtractor={(item, index) => `item-${item}-${index}`}
        />
      </View>
    </View>
  );

}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: CommonColors.black,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
  },
});
