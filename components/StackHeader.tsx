import {
  StyleSheet,
  View
} from "react-native";
import { router } from "expo-router";
import { CommonColors } from "../constants/Colors";
import { i18n } from "./store/i18n";
import SettingsButton from "./settings/SettingsButton";
import CustomIconButton from "./buttons/CustomIconButton";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";

function StackHeader() {

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <CustomIconButton
          testID="STACK_HEADER.BACK_ICON:PRESSABLE"
          onPress={() => router.replace("/")}
          aria-label={i18n.t("StackHeader_go_back", { defaultValue: "Tagasi" })}
        >
          <ArrowBackIcon />
        </CustomIconButton>
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
