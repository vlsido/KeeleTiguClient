import {
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";
import { router } from "expo-router";
import { CommonColors } from "../constants/Colors";
import { i18n } from "./store/i18n";
import SettingsButton from "./settings/SettingsButton";
import CustomIconButton from "./buttons/CustomIconButton";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";
import { useCallback } from "react";

function StackHeader() {

  const goToMainPage = useCallback(() => {
    if (router.canGoBack()) {
      return router.back();
    }

    router.dismissAll();
    return router.replace("/");
  }, [router]);

  return (
    <View
      style={[styles.container]}>
      <View style={[styles.buttonsContainer]}>
        <CustomIconButton
          testID="STACK_HEADER.BACK_ICON:PRESSABLE"
          onPress={goToMainPage}
          style={{ pointerEvents: "auto" }}
          ariaLabel={i18n.t("StackHeader_go_back", { defaultValue: "Tagasi" })}
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
    position: "absolute",
    pointerEvents: "none"
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    maxWidth: 800,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  }
})
