import { useCallback } from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../constants/Colors";
import { i18n } from "./store/i18n";

function MovedNotice() {

  const openLink = useCallback(() => {
    Linking.openURL("https://keeletigu.web.app")
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={openLink}>
      <Text style={styles.text}>
        {i18n.t("MovedNotice_description", { defaultValue: "Me asume uuel leheküljel!" })}
      </Text>
      <Text style={[styles.text, styles.textLink]}>
        https://keeletigu.web.app
      </Text>
    </Pressable>
  );
}

export default MovedNotice;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: CommonColors.white,
    borderRadius: 20,
    padding: 20
  },
  text: {
    color: CommonColors.white,
    fontSize: 32,
    textAlign: "center"
  },
  textLink: {
    color: CommonColors.blue
  }
})
