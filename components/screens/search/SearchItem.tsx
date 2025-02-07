import {
  StyleSheet,
  View
} from "react-native";
import { CommonColors } from "../../../constants/Colors";
import TextButton from "../../TextButton";
import {
  atom,
  useAtom
} from "jotai";
import { useMemo } from "react";

interface SearchItemProps {
  index: number;
  word: string;
  onPress: (word: string) => Promise<void>
}

function SearchItem(props: SearchItemProps) {
  const [
    isHoveredIn,
    setIsHoveredIn
  ] = useAtom(useMemo(
    () => atom<boolean>(false),
    []
  ));

  function onHoverIn() {
    setIsHoveredIn(true);
  }

  function onHoverOut() {
    setIsHoveredIn(false);
  }

  return (
    <View style={styles.itemContainer}>
      <TextButton
        style={[
          styles.wordContainer,
          isHoveredIn === true ?
            { backgroundColor: "rgba(223, 255, 255, 0.9)" }
            : { backgroundColor: CommonColors.white }
        ]}
        text={props.word}
        onPress={() => props.onPress(props.word)}
        textStyle={[
          styles.wordText,
          isHoveredIn === true ? { color: CommonColors.black } : { color: CommonColors.black }
        ]}
        label={`Word: ${props.word}. Open link.`}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut} />
    </View>
  );
}

export default SearchItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  wordContainer: {
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  wordText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  definitionText: {
    color: "rgba(243, 245, 243, 0.8)",
    fontSize: 16
  },
  indexText: {
    color: CommonColors.white,
    fontSize: 14,
    marginTop: 5,
    marginRight: 5
  },
  russianText: {
    color: CommonColors.purple,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  wordPartsTogether: {
    flexDirection: "row",
  },
});
