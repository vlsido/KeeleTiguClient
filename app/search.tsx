import { useSignal, useSignalEffect } from "@preact/signals-react";
import { Dimensions, FlatList, Pressable, StyleSheet, TextInput, View, useWindowDimensions } from "react-native";
import { WordWithoutData, allWords } from "@/components/util/WordsUtil";
import { CommonColors } from "@/constants/Colors";
import SearchItem from "@/components/search/SearchItem";
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from "@/components/IconButton";

function Search() {
  const searchResults = useSignal<WordWithoutData[]>([]);

  const { height, width } = useWindowDimensions();

  useSignalEffect(() => {
    if (searchResults.value) {
      console.log("searchResults", searchResults.value.length);
    }
  });

  function detectLanguage(text: string) {
    let estonianCount = 0;
    let cyrillicCount = 0;

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);

      // Check for Cyrillic characters
      if ((charCode >= 0x0400 && charCode <= 0x04FF) ||
        (charCode >= 0x0500 && charCode <= 0x052F)) {
        cyrillicCount++;
      }
      // Check for general Latin characters (A-Z, a-z)
      // And check for Estonian specific characters
      else if ((charCode >= 0x0041 && charCode <= 0x005A) || (charCode >= 0x0061 && charCode <= 0x007A) || [0x00DC, 0x00FC, 0x00D5, 0x00F5, 0x00D6, 0x00F6, 0x00C4, 0x00E4, 0x017D, 0x017E, 0x0160, 0x0161].includes(charCode)) {
        estonianCount++;
      }
    }

    if (estonianCount > cyrillicCount) {
      return "Estonian (Latin)";
    } else if (cyrillicCount > estonianCount) {
      return "Russian (Cyrillic)";
    } else {
      return "Unknown or Mixed";
    }
  }

  function onChange(text: string) {
    if (text === "") {
      searchResults.value = [];
      return;
    }

    const language = detectLanguage(text);

    console.log("language", language);

    console.log("allWords", allWords.value);
    const textLowerCase = text.toLowerCase();
    searchResults.value = allWords.value.filter((word) => word.word.toLowerCase().includes(textLowerCase));
  }

  function searchDictionary() {
    console.log("searchDictionary");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, width > height ? { width: "50%" } : { width: "90%" }]}>
        <View style={[styles.searchFieldContainer]}>
          <TextInput
            placeholder="Otsi..."
            style={styles.searchInput}
            onChange={(event) => onChange(event.nativeEvent.text)} />
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
