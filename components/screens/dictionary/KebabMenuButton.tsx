import {
  Pressable,
  StyleSheet,
  View
} from "react-native";
import KebabMenu from "./KebabMenu";
import { CommonColors } from "../../../constants/Colors";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { atomWithToggle } from "../../store/atoms";

interface KebabMenuButtonProps {
  word: string;
}

function KebabMenuButton(props: KebabMenuButtonProps) {
  const [
    isVisible,
    toggleIsVisible
  ] = useAtom(useMemo(
    () => atomWithToggle(false),
    []
  ));

  function triggerMenu() {
    toggleIsVisible();
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
