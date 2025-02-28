import {
  StyleSheet,
  View
} from "react-native";
import { router } from "expo-router";
import { CommonColors } from "../constants/Colors";
import MaterialIconButton from "./buttons/MaterialIconButton";
import { i18n } from "./store/i18n";
import SettingsButton from "./settings/SettingsButton";

function StackHeader() {

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <MaterialIconButton
          testID="STACK_HEADER.BACK_ICON:PRESSABLE"
          name="arrow-back"
          size={32}
          color={CommonColors.white}
          onPress={() => router.replace("/")}
          ariaLabel={i18n.t("StackHeader_go_back", { defaultValue: "Tagasi" })}
        />
        <SettingsButton />
      </View>
    </View>
  );
}

export default StackHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: CommonColors.black,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    maxWidth: 800,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: CommonColors.black
  }
})
