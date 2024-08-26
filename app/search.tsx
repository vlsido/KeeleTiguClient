import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Dimensions, FlatList, Pressable, StyleSheet, TextInput, View, useWindowDimensions } from "react-native";
import { WordWithoutData, allWords } from "@/components/util/WordsUtil";
import { CommonColors } from "@/constants/Colors";
import SearchItem from "@/components/search/SearchItem";
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from "@/components/IconButton";
import { router } from "expo-router";

function Search() {
  const searchQuery = useSignal<string>("");
  const searchResults = useSignal<WordWithoutData[]>([]);

  const { height, width } = useWindowDimensions();

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

    searchQuery.value = text;


    const textLowerCase = text.toLowerCase();
    searchResults.value = allWords.value.filter((word) => word.word.toLowerCase().includes(textLowerCase));
  }

  function searchDictionary() {
    if (searchQuery.value === "") {
      return;
    }
    router.push({ pathname: "/word_data", params: { word: searchQuery.value } });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, width > height ? { width: "50%" } : { width: "90%" }]}>
        <View style={[styles.searchFieldContainer]}>
          <TextInput
            placeholder="Otsi..."
            style={styles.searchInput}
            onChange={(event) => onChange(event.nativeEvent.text)}
            onSubmitEditing={searchDictionary}
          />
          <IconButton
            onPress={searchDictionary}
            size={24}
            color={CommonColors.white}
            style={{ padding: 10 }}
          />
        </View>
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
  searchFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  searchInput: {
    padding: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
    width: "100%",
  },
});
