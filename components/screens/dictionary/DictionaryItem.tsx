import {
  StyleSheet,
  Text,
  View
} from "react-native";
import Type from "./Type";
import { router } from "expo-router";
import { useCallback, useContext } from "react";
import { WordsContext } from "../../store/WordsContext";
import { Word } from "../../../app/dictionary";
import Forms from "../../text_components/Forms";
import { CommonColors } from "../../../constants/Colors";
import Usage from "../../text_components/Usage";
import CustomIconButton from "../../buttons/CustomIconButton";
import { TrashIcon } from "../../icons/TrashIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { setMyDictionary } from "../../store/slices/dictionarySlice";

interface DictionaryItemProps extends Word {
  index: number;
}

function DictionaryItem(props: DictionaryItemProps) {
  const { clearAllCache } = useContext(WordsContext);

  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const dispatch = useAppDispatch();

  if (props.word == "" || props.usages == null) {
    clearAllCache();
    router.replace("/");
  };

  const onRemoveWord = useCallback(() => {
    const myUpdatedDictionary = myDictionary.filter((word) => word.word !== props.word);

    dispatch(setMyDictionary(myUpdatedDictionary));

    if (myDictionary.length === 0) {
      localStorage.removeItem("myDictionary");
    }
  }, []);

  return (
    <View
      testID="DICTIONARY_ITEM.CONTAINER:VIEW"
      style={styles.itemContainer}
    >
      <Text style={styles.indexText}>{props.index}.</Text>
      <View style={styles.wordContainer}>
        <View>
          <Text style={styles.wordText}>
            {props.word}{" "}
          </Text>
          <Forms forms={props.forms} />
          <Type type={props.type} />
          {props.usages.map((
            usage, index
          ) => {
            return (
              <Usage
                key={index}
                index={index}
                definitionData={usage.definitionData}
                examples={usage.examples}
                searchString={undefined}
              />
            )
          })}

        </View>
      </View>
      <CustomIconButton onPress={onRemoveWord}>
        <TrashIcon />
      </CustomIconButton>
    </View>
  );
}

export default DictionaryItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "80%",
  },
  wordContainer: {
    width: "95%",
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
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
