import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
  ViewStyle,
} from "react-native";
import {
  WordWithoutData,
} from "../components/util/WordsUtil";
import { CommonColors } from "../constants/Colors";
import { SearchIcon } from "../components/icons/SearchIcon";
import {
  useCallback,
  useMemo,
  useRef
} from "react";
import {
  atom,
  useAtom
} from "jotai";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Word } from "./dictionary";
import { callCloudFunction } from "../components/util/CloudFunctions";
import { useHint } from "../hooks/useHint";
import { useAppSelector } from "../hooks/storeHooks";
import SearchItem from "../components/screens/search/SearchItem";
import WordData from "../components/WordData";

interface SearchDataResults {
  queryResponse: Word[];
}

const queryAtom = atom<string>("");
const resultsAtom = atom<WordWithoutData[]>([]);
const wordsDataArrayAtom = atom<Word[]>([]);
const isSearchingInProcessAtom = atom<boolean>(false);
const searchStringAtom = atom<string>("");
const searchTimeoutIdAtom = atom<NodeJS.Timeout | null>(null);

function Search() {
  const { showHint } = useHint();

  const words = useAppSelector((state) => state.dictionary.words);

  const [
    query,
    setQuery
  ] = useAtom<string>(queryAtom);

  const [
    results,
    setResults
  ] = useAtom<WordWithoutData[]>(resultsAtom);

  const [
    wordsDataArray,
    setWordsDataArray
  ] = useAtom<Word[]>(wordsDataArrayAtom);

  const [
    searchString,
    setSearchString
  ] = useAtom<string>(searchStringAtom);

  const [
    isSearchingInProcess,
    setIsSearchingInProcess
  ] = useAtom<boolean>(isSearchingInProcessAtom);

  const [
    searchTimeoutId,
    setSearchTimeoutId
  ] = useAtom<NodeJS.Timeout | null>(searchTimeoutIdAtom);

  const [
    searchFieldHeight,
    setSearchFieldHeight
  ] = useAtom<number>(useMemo(
    () => atom<number>(0),
    []
  ));

  const searchListOpacity = useSharedValue<number>(0);
  const searchListPointerEvents = useSharedValue<"auto" | "none">("none");

  const inputRef = useRef<TextInput | null>(null);

  const makeResultsVisible = useCallback(
    () => {
      searchListOpacity.value = 1;
      searchListPointerEvents.value = "auto";
    },
    []
  );

  const makeResultsUnvisible = useCallback(
    () => {
      searchListOpacity.value = 0;
      searchListPointerEvents.value = "none";
    },
    []
  );

  function onChange(text: string) {
    if (text.length === 0) {
      setQuery("");
      setResults([]);
      return;
    }

    setQuery(text);

    if (searchTimeoutId != null) {
      clearTimeout(searchTimeoutId);
    }

    const timeoutId = setTimeout(
      () => {
        const textLowerCase = text.toLowerCase();

        const searchResults = words.filter((word) => word.word.toLowerCase().includes(textLowerCase));

        setResults(searchResults);
      },
      500
    );

    setSearchTimeoutId(timeoutId);

  }

  const detectLanguage = useCallback(
    (word: string) => {
      let estonianCount = 0;
      let cyrillicCount = 0;

      for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);

        // Check for Cyrillic characters
        if ((charCode >= 0x0400 && charCode <= 0x04FF) ||
          (charCode >= 0x0500 && charCode <= 0x052F)) {
          cyrillicCount++;
        }
        // Check for general Latin characters (A-Z, a-z)
        // And check for Estonian specific characters
        else if ((charCode >= 0x0041 && charCode <= 0x005A) || (charCode >= 0x0061 && charCode <= 0x007A) || [
          0x00DC,
          0x00FC,
          0x00D5,
          0x00F5,
          0x00D6,
          0x00F6,
          0x00C4,
          0x00E4,
          0x017D,
          0x017E,
          0x0160,
          0x0161
        ].includes(charCode)) {
          estonianCount++;
        }
      }

      if (estonianCount > cyrillicCount) {
        return "estonian";
      } else if (cyrillicCount > estonianCount) {
        return "russian";
      } else {
        return "unknown";
      }
    },
    []
  );

  const getWordData = useCallback(
    async (word: string) => {
      if (word === "") {
        return;
      }

      makeResultsUnvisible();

      setQuery(word);

      setSearchString(word);

      const language = detectLanguage(word);

      try {
        setIsSearchingInProcess(true);
        const response = await callCloudFunction(
          "GetWordData_Node",
          { word: word, language }
        ) as SearchDataResults | undefined;

        if (response != null) {
          console.log(
            "Response",
            response
          );

          setWordsDataArray(response.queryResponse);

        } else {
          alert("Ei leitud!");
          setWordsDataArray([]);
        }

      } catch (error) {
        switch (error.code) {
          case "cloud-function/error":
            showHint("Server error");
            break;
          default:
            console.error(
              "Unexpected error",
              error
            );
            break;
        }

      } finally {
        setIsSearchingInProcess(false);
      }
    },
    [
      detectLanguage,
      showHint
    ]
  );

  const flatListAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: searchListOpacity.value,
      pointerEvents: searchListPointerEvents.value
    };
  });

  const onSearchFieldLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setSearchFieldHeight(event.nativeEvent.layout.height + 10);
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
      ]}
      >
        <View style={[
          styles.searchFieldContainer
        ]}
          onLayout={(event: LayoutChangeEvent) => onSearchFieldLayout(event)}
        >
          <TextInput
            ref={inputRef}
            placeholder="Otsi..."
            style={styles.searchInput}
            value={query}
            onChange={(event) => onChange(event.nativeEvent.text)}
            onFocus={makeResultsVisible}
            onBlur={() => {
              setTimeout(
                () => {
                  makeResultsUnvisible();
                },
                1
              );
            }}
            onSubmitEditing={(event: NativeSyntheticEvent<TextInputChangeEventData>) => getWordData(event.nativeEvent.text)}
          />
          <Pressable
            onPress={() => getWordData(query)}
            style={styles.searchIconContainer}
            aria-label="Otsi sõna"
          >
            <SearchIcon />
          </Pressable>
        </View>
      </View>
      <Animated.View style={[
        flatListAnimatedStyle,
        {
          position: "absolute",
          maxWidth: 400,
          width: "80%",
          top: searchFieldHeight + 10,
          bottom: "50%",
          zIndex: 1
        }
      ]}>
        <FlatList
          data={results}
          contentContainerStyle={{ backgroundColor: CommonColors.white }}
          renderItem={({ item, index }) => <SearchItem word={item.word} index={index + 1} onPress={getWordData} />}
          keyExtractor={(
            item, index
          ) => `item-${item}-${index}`}
        />
      </Animated.View>
      <View style={styles.wordsDataContainer}>
        {isSearchingInProcess === true ? (
          <View>
            <ActivityIndicator size={36} color={CommonColors.white} />
          </View>
        ) : (<WordData wordDataArray={wordsDataArray} searchString={searchString} />)}
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
    justifyContent: "center"
  },
  gestureContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  searchContainer: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 400,
    padding: 10,
  },
  searchFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchInput: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: CommonColors.white,
    fontSize: 16,
    width: "100%",
    outlineColor: CommonColors.black
  },
  searchIconContainer: {
    backgroundColor: CommonColors.white,
    borderRadius: 10,
    width: 36,
    height: 36,
    marginLeft: 10
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  wordsDataContainer: {
    flex: 1,
    width: "100%"
  }
});
