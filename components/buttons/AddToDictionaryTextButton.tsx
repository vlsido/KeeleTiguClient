import { StyleSheet } from "react-native";
import { useHint } from "../../hooks/useHint";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { pushToMyDictionary } from "../store/slices/dictionarySlice";
import { useCallback } from "react";
import { Word } from "../../app/(tabs)/dictionary";
import TextButton from "./TextButton";
import { i18n } from "../store/i18n";
import { CommonColors } from "../../constants/Colors";

interface AddToDictionaryTextButtonProps {
  wordData: Word
}

function AddToDictionaryTextButton(props: AddToDictionaryTextButtonProps) {
  const { showHint } = useHint();
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const dispatch = useAppDispatch();

  const addToDictionary = useCallback(() => {
    if (myDictionary.find((word) => word.word === props.wordData.word)) {
      showHint(
        i18n.t("already_in_dictionary", { defaultValue: "Sõna on juba sõnastikus!" }),
        2500
      );
      return;
    }

    dispatch(pushToMyDictionary(props.wordData));

    // Add to dictionary
    showHint(
      i18n.t("added", { defaultValue: "Lisatud!" }),
      2500
    );
  }, [props.wordData, myDictionary]);

  return (
    <TextButton
      testID="ADD_TO_DICTIONARY_TEXT_BUTTON.CONTAINER:PRESSABLE"
      style={styles.addToDictionaryContainer}
      textStyle={styles.addToDictionaryText}
      text={i18n.t(
        "add_to_dictionary",
        { defaultValue: "Lisa sõnastikku" }
      )}
      onPress={addToDictionary}
      ariaLabel={i18n.t(
        "add_to_dictionary",
        { defaultValue: "Lisa sõnastikku" }
      )}
    />
  );
}

export default AddToDictionaryTextButton;

const styles = StyleSheet.create({
  addToDictionaryContainer: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: CommonColors.white,
    borderWidth: 1,
  },
  addToDictionaryText: {
    fontSize: 16,
    color: CommonColors.white,
  },
})
