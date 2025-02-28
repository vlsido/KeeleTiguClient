import { useCallback } from "react";
import {
  StyleSheet
} from "react-native";
import { CommonColors } from "../../constants/Colors";
import MaterialIconButton from "../buttons/MaterialIconButton";
import {
  useAtom
} from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";

function SettingsButton() {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useAtom<boolean>(isSettingsMenuOpenAtom);

  const toggleSettings = useCallback(() => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  }, [isSettingsMenuOpen]);

  return (
    <MaterialIconButton
      testID={"SETTINGS_BUTTON.ICON:PRESSABLE"}
      onPress={toggleSettings}
      iconStyle={styles.container}
      color={CommonColors.white}
      name="settings"
      size={36}
      ariaLabel="Settings"
    />
  )
}

export default SettingsButton;

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: 36
  }
})
