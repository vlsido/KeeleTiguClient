import {
  StyleSheet
} from "react-native";
import {
  FadeIn,
  FadeOut,
  ReduceMotion,
} from "react-native-reanimated";
import {
  useAppDispatch,
  useAppSelector
} from "../../../hooks/storeHooks";
import { setMyDictionary } from "../../store/slices/dictionarySlice";
import { AnimatedPressable } from "../../util/AnimatedComponentsUtil";
import { CommonColors } from "../../../constants/Colors";
import TextButton from "../../buttons/TextButton";

interface KebabMenuProps {
  isVisible: boolean;
  onClose: () => void;
  word: string;
}

function KebabMenu(props: KebabMenuProps) {
  const myDictionary = useAppSelector((state) => state.dictionary.myDictionary);
  const dispatch = useAppDispatch();

  function onRemoveWord() {
    const myUpdatedDictionary = myDictionary.filter((word) => word.word !== props.word);

    dispatch(setMyDictionary(myUpdatedDictionary));

    if (myDictionary.length === 0) {
      localStorage.removeItem("myDictionary");
    }
  }

  if (props.isVisible === false) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: "auto",
          borderRadius: 15,
          backgroundColor: "rgba(33,34,33, 0.85)",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      entering={FadeIn.
        duration(250).
        reduceMotion(ReduceMotion.System)}
      exiting={FadeOut.
        duration(250).
        reduceMotion(ReduceMotion.System)}
      onPress={props.onClose}
    >
      <TextButton
        text={"Eemalda"}
        onPress={onRemoveWord}
        style={styles.removeButtonContainer}
        label={"Remove word from dictionary"}
        textStyle={styles.removeButtonText}
      />
    </AnimatedPressable>
  );

}

export default KebabMenu;

const styles = StyleSheet.create({
  removeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: CommonColors.white,
    borderWidth: 1,
  },
  removeButtonText: {
    fontSize: 16,
    color: CommonColors.white,
  }
});
