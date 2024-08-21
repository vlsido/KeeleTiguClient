import { useSignal, useSignalEffect } from "@preact/signals-react";
import { FlatList, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Word } from "./dictionary";
import DictionaryItem from "@/components/dictionary/DictionaryItem";
import { allWords } from "@/components/util/WordsUtil";
import { CommonColors } from "@/constants/Colors";
import SearchItem from "@/components/search/SearchItem";

function Search() {
  const searchResults = useSignal<Word[]>([]);

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
    searchResults.value = allWords.value.filter((word) => word.word.includes(text));

  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Otsi..." style={styles.searchInput} onChange={(event) => onChange(event.nativeEvent.text)} />
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResults.value}
          renderItem={({ item, index }) => <SearchItem  {...item} index={index + 1} />}
          keyExtractor={(item, index) => `item-${item.word}-${index}`}
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
    padding: 10,
  },
  searchInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  resultsContainer: {
    backgroundColor: CommonColors.black,
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
});
