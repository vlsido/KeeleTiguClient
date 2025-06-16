import {
  useCallback,
  useMemo,
  useRef
} from "react";
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  View,
  ViewStyle
} from "react-native";
import {
  atom,
  useAtom,
  useSetAtom,
} from "jotai";
import { useAppSelector } from "../../../hooks/storeHooks";
import { useHint } from "../../../hooks/useHint";
import {
  queryAtom,
  resultsAtom,
  searchStringAtom,
  useAreResultsVisibleListener,
  wordsDataArrayAtom
} from "./searchAtoms";
import { WordWithoutData } from "../../util/WordsUtil";
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { callCloudFunction } from "../../util/CloudFunctions";
import { Word, WordAndExamData } from "../../../app/(tabs)/dictionary";
import {
  Gesture,
  GestureDetector
} from "react-native-gesture-handler";
import { SearchIcon } from "../../icons/SearchIcon";
import { FlatList } from "react-native";
import SearchItem from "./SearchItem";
import { CommonColors } from "../../../constants/Colors";
import { i18n } from "../../store/i18n";
import LoadingIndicator from "../../indicators/LoadingIndicator";
import { useOrientation } from "../../../hooks/useOrientation";

interface SearchDataResults {
  queryResponse: WordAndExamData[];
}

function SearchField() {
  const { showHint } = useHint();

  const { isWide } = useOrientation();

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
    searchString,
    setSearchString
  ] = useAtom<string>(searchStringAtom);

  const [isSearching, setIsSearching] =
    useAtom<boolean>(useMemo(() => atom<boolean>(false), []));

  const setWordsDataArray = useSetAtom(wordsDataArrayAtom);

  const inputRef = useRef<TextInput | null>(null);

  const searchFieldHeight = useSharedValue<number>(0);
  const searchFieldWidth = useSharedValue<number>(0);
  const searchListDisplay = useSharedValue<"flex" | "none">("none");

  const makeResultsUnvisible = useCallback(
    () => {
      searchListDisplay.value = "none";
    },
    []
  );
  const makeResultsVisible = useCallback(
    () => {
      searchListDisplay.value = "flex";
    },
    []
  );

  useAreResultsVisibleListener(useCallback(
    (
      get, set, newVal, prevVal
    ) => {
      switch (newVal) {
        case true:
          makeResultsVisible();
          break;
        case false:
          makeResultsUnvisible();
          break;

      }
    },
    [
      makeResultsVisible,
      makeResultsUnvisible
    ],
  ))

  const detectLanguage = useCallback(
    (word: string) => {
      let estonianCount = 0;
      let cyrillicCount = 0;

      for (const char of word) {
        const charCode = char.charCodeAt(0);

        // Check for Cyrillic characters
        if (charCode >= 0x0400 && charCode <= 0x04FF) {
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

  function getEstonianWordPriority(wordObj: Word, query: string) {
    const wordLowerCase = wordObj.word.replaceAll("+", "").toLowerCase();

    if (wordLowerCase === query) return 0;

    if (wordLowerCase.startsWith(query)) return 1;

    if (wordLowerCase.includes(query)) return 2;

    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition
          .definitionText?.toLowerCase()
          === query))) return 3;

    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition
          .definitionText?.toLowerCase()
          .startsWith(query)))) return 4;

    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition
          .definitionText?.toLowerCase()
          .includes(query)))) return 5;

    if (wordObj.usages
      .some((usage) => usage
        .examples?.some((example) => example.estonianExample
          .toLowerCase()
          .includes(query)))) return 6;

    return 7;
  }

  function getRussianWordPriority(wordObj: Word, query: string) {
    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition.russianTranslations
          .some((russianTranslation) => russianTranslation
            .toLowerCase()
            .replaceAll("\"", "")
            === query)))
    ) return 0;

    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition.russianTranslations
          .some((russianTranslation) => russianTranslation
            .toLowerCase()
            .replaceAll("\"", "")
            .startsWith(query))))
    ) return 1;

    if (wordObj.usages
      .some((usage) => usage.definitionData
        .some((definition) => definition.russianTranslations
          .some((russianTranslation) => russianTranslation
            .toLowerCase()
            .replaceAll("\"", "")
            .includes(query))))
    ) return 2;

    if (wordObj.usages
      .some((usage) => usage
        .examples?.some((example) => example.russianTranslations
          .some((russianTranslation) => russianTranslation
            .toLowerCase()
            .replaceAll("\"", "")
            .includes(query))))) return 3;

    return 4;
  }

  function sortWords(
    words: Word[],
    query: string,
    queryLanguage: "russian" | "estonian",
  ) {
    switch (queryLanguage) {
      case "estonian":
        return words.sort((a, b) => {
          const priorityDiff = getEstonianWordPriority(a, query) - getEstonianWordPriority(b, query);

          if (priorityDiff !== 0) return priorityDiff;

          return a.word.localeCompare(b.word);
        });
      case "russian":
        return words.sort((a, b) => {
          const priorityDiff = getRussianWordPriority(a, query) - getRussianWordPriority(b, query);

          if (priorityDiff !== 0) return priorityDiff;

          return a.word.localeCompare(b.word);
        });
    }

  }

  const getWordData = useCallback(
    async (word: string) => {
      if (word === "") {
        return;
      }

      const wordNormalized = word.replaceAll("+", "").toLowerCase().trim();

      if (wordNormalized === searchString) {
        return;
      }

      makeResultsUnvisible();

      setQuery(word);

      setSearchString(wordNormalized);

      const language = detectLanguage(word);

      if (language === "unknown") {
        alert(i18n.t("unknown_language", { defaultValue: "Teadmata keel!" }));
        return;
      }

      try {
        setIsSearching(true);
        const response = await callCloudFunction(
          "GetWordData_Node",
          { word: word, language }
        ) as SearchDataResults | undefined;

        if (response != null) {
          if (response.queryResponse.length > 1) {

            const sortedWordsArray: Word[] = sortWords(
              response.queryResponse,
              wordNormalized,
              language
            );

            setWordsDataArray(sortedWordsArray);
            return;
          }

          setWordsDataArray(response.queryResponse);

        } else {
          alert(i18n.t("not_found", { defaultValue: "Ei leitud!" }));
          setWordsDataArray([]);
        }

      } catch (error) {
        switch (error.code) {
          case "cloud-function/error":
            showHint(i18n.t("error", { defaultValue: "Tekkis viga!" }));
            break;
          default:
            console.error(
              "Unexpected error",
              error
            );
            break;
        }

      } finally {
        setIsSearching(false);
      }
    },
    [
      query,
      detectLanguage,
      showHint,
      sortWords,
      searchString
    ]
  );

  const listTapGesture = useMemo(
    () =>
      Gesture.Tap().onEnd(() => {
        // We don't want list tap to make results unvisible, this is why we need this
      }),
    []
  );

  const searchTapGesture = useMemo(
    () =>
      Gesture.Tap().onEnd(() => {
        // We don't want search tap to make results unvisible, this is why we need this
      }),
    []
  );

  const onChangeText = useCallback(
    (text: string) => {
      makeResultsVisible();
      if (text.length === 0) {
        setQuery("");
        setResults([]);
        return;
      }

      setQuery(text);

      const textLowerCase = text.toLowerCase();

      const searchResults = words.
        filter((word) => word.word.toLowerCase().includes(textLowerCase)).
        sort((
          a, b
        ) => {
          const aStarts = a.word.toLowerCase().startsWith(textLowerCase);
          const bStarts = b.word.toLowerCase().startsWith(textLowerCase);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return a.word.localeCompare(b.word);
        });

      setResults(searchResults);
    },
    [
      makeResultsVisible,
      words,
    ]
  );

  const onSearchFieldLayout = useCallback(
    (event: LayoutChangeEvent) => {
      searchFieldHeight.value = event.nativeEvent.layout.height + 68;
      searchFieldWidth.value = event.nativeEvent.layout.width - 25;
    },
    []
  );

  const onKeyPress = useCallback((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === "Escape") {
      makeResultsUnvisible();
    }
  }, [makeResultsUnvisible]);

  const flatListAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      top: searchFieldHeight.value,
      width: searchFieldWidth.value,
      display: searchListDisplay.value
    };
  });

  return (
    <>
      <View
        testID="SEARCH_FIELD.CONTAINER:VIEW"
        style={[
          styles.searchContainer,
        ]}
      >
        <GestureDetector gesture={searchTapGesture}>
          <View style={[
            styles.searchFieldContainer
          ]}
            onLayout={(event: LayoutChangeEvent) => onSearchFieldLayout(event)}
          >
            <TextInput
              testID="SEARCH_FIELD.QUERY:INPUT"
              ref={inputRef}
              placeholder={i18n.t("SearchField_search_placeholder", { defaultValue: "Otsi..." })}
              style={styles.searchInput}
              value={query}
              onChangeText={onChangeText}
              onFocus={makeResultsVisible}
              onSubmitEditing={(event: NativeSyntheticEvent<TextInputChangeEventData>) => getWordData(event.nativeEvent.text)}
              role="searchbox"
              onKeyPress={onKeyPress}
            />
            <Pressable
              testID="SEARCH_FIELD.FIND_WORD:PRESSABLE"
              onPress={() => getWordData(query)}
              style={styles.searchIconContainer}
              aria-label={i18n.t("SearchField_search_word", { defaultValue: "Otsi sõna" })}
              role="button"
            >
              {isSearching === true
                ? <LoadingIndicator
                  testID="SEARCH_FIELD.FIND_WORD.LOADING:ACTIVITY_INDICATOR"
                  color="black" />
                : <SearchIcon color={"#212221"} />}
            </Pressable>
          </View>
        </GestureDetector>
      </View>
      <GestureDetector gesture={listTapGesture}>
        <Animated.View style={[
          flatListAnimatedStyle,
          styles.flatListContainer,
          { bottom: isWide ? 0 : "25%" }
        ]}>
          <FlatList
            data={results}
            contentContainerStyle={{ backgroundColor: CommonColors.white }}
            renderItem={({ item }) => <SearchItem word={item.word} onPress={getWordData} />}
            keyExtractor={(
              item
            ) => `item-${item.index}`}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
}

export default SearchField;

const styles = StyleSheet.create({
  gestureContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  searchContainer: {
    position: "absolute",
    top: 48,
    zIndex: 1000,
    backgroundColor: CommonColors.yellowA50,
    borderRadius: 60,
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
    borderRadius: 60,
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
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  searchResultsContainer: {
    paddingTop: 10,
  },
  flatListContainer: {
    position: "absolute",
    maxWidth: 400,
    width: "100%",
    zIndex: 1,
  },
})
