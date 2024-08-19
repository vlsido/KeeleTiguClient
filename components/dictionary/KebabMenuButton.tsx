import { Pressable, StyleSheet, View } from "react-native";
import { useSignal } from "@preact/signals-react";
import KebabMenu from "./KebabMenu";
import { CommonColors } from "@/constants/Colors";
import { myDictionary } from "../util/WordsUtil";

interface KebabMenuButtonProps {
  word: string;
}

function KebabMenuButton(props: KebabMenuButtonProps) {

  const isVisible = useSignal<boolean>(false);


  function triggerMenu() {
    isVisible.value = !isVisible.value;
  }


  return (
    <>
      <Pressable onPress={triggerMenu} style={styles.container}>
        <View style={styles.dot} />
        <View style={{ height: 2 }} />
        <View style={styles.dot} />
        <View style={{ height: 2 }} />
        <View style={styles.dot} />
      </Pressable>
      <KebabMenu
        isVisible={isVisible}
        onClose={triggerMenu}
        word={props.word}
      />
    </>
  );
}

export default KebabMenuButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: CommonColors.white,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: CommonColors.black,
  },
});
