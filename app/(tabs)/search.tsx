import {
  StyleSheet,
  View,
} from "react-native";
import { CommonColors } from "../../constants/Colors";
import {
  useCallback,
  useMemo,
} from "react";
import {
  useAtomValue,
  useSetAtom
} from "jotai";
import {
  runOnJS,
} from "react-native-reanimated";
import { Word } from "./dictionary";
import WordData from "../../components/WordData";
import {
  Gesture,
  GestureDetector
} from "react-native-gesture-handler";
import {
  areResultsVisibleAtom,
  searchStringAtom,
  wordsDataArrayAtom
} from "../../components/screens/search/searchAtoms";
import SearchField from "../../components/screens/search/SearchField";

function Search() {
  const wordsDataArray = useAtomValue<Word[] | null>(wordsDataArrayAtom);

  const searchString = useAtomValue<string>(searchStringAtom);

  const setAreResultsVisible = useSetAtom(areResultsVisibleAtom);

  const makeResultsUnvisible = useCallback(
    () => {
      setAreResultsVisible(false);
    },
    [
      setAreResultsVisible
    ]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap().onEnd(() => {
        runOnJS(makeResultsUnvisible)();
      }),
    [
      makeResultsUnvisible
    ]
  );

  return (
    <GestureDetector
      gesture={tapGesture}
      userSelect="text"
    >
      <View
        testID="SEARCH.CONTAINER:VIEW"
        style={styles.container}
      >
        <SearchField />
        <View style={styles.wordsDataContainer}>
          <WordData wordDataArray={wordsDataArray} searchString={searchString} />
        </View>
      </View>
    </GestureDetector>
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

  wordsDataContainer: {
    flex: 1,
    width: "100%"
  },
});
