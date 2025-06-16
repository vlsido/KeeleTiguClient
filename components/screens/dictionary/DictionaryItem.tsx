import {
  StyleSheet,
  Text,
  View
} from "react-native";
import Type from "./Type";
import {
  memo,
  useMemo
} from "react";
import { Word } from "../../../app/(tabs)/dictionary";
import Forms from "../../text_components/Forms";
import { CommonColors } from "../../../constants/Colors";
import Usage from "../../text_components/Usage";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { removeIndexFromMyDictionary } from "../../store/slices/dictionarySlice";
import {
  atom,
  useAtom
} from "jotai";
import CustomIconButton from "../../buttons/CustomIconButton";
import { CloseIcon } from "../../icons/CloseIcon";
import { i18n } from "../../store/i18n";

interface DictionaryItemProps extends Word {
  length: number;
}

function DictionaryItem(props: DictionaryItemProps) {
  const [isDisplayed, setIsDisplayed] = useAtom<boolean>(useMemo(() => atom<boolean>(true), []));

  const dispatch = useAppDispatch();

  function onRemoveWord() {
    setIsDisplayed(false);
    dispatch(removeIndexFromMyDictionary(props.index));
  }

  return (
    <View
      testID="DICTIONARY_ITEM.CONTAINER:VIEW"
      style={[styles.itemContainer, { display: isDisplayed ? "flex" : "none" }]}
    >
      <View style={styles.wordContainer}>
        <View>
          <View style={styles.header}>
            <Text style={styles.wordText}>
              <Text style={styles.indexText}>{props.length}.</Text>
              {props.word}{" "}
            </Text>
            <CustomIconButton
              testID="DICTIONARY_ITEM.CONTAINER.REMOVE_ICON:PRESSABLE"
              onPress={onRemoveWord}
              size={32}
              ariaLabel={i18n.t("remove_word", { defaultValue: "Eemalda sõna" })}
            >
              <CloseIcon />
            </CustomIconButton>
          </View>
          <Forms forms={props.forms} />
          <Type type={props.type} />
          {props.usages.map((
            usage, index
          ) => {
            return (
              <Usage
                key={index}
                usageIndex={index}
                definitionData={usage.definitionData}
                examples={usage.examples}
                searchString={undefined}
              />
            )
          })}

        </View>
      </View>
    </View>
  );
}

export default memo(DictionaryItem);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: CommonColors.black,
    borderColor: "white",
    borderRadius: 20,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    padding: 20,
    marginVertical: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wordContainer: {
    width: "100%",
    paddingHorizontal: 10,
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
