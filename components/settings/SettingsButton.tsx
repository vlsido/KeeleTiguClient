import { useCallback } from "react";
import {
  StyleSheet
} from "react-native";
import {
  useAtom
} from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";
import { SettingsIcon } from "../icons/SettingsIcon";
import CustomIconButton from "../buttons/CustomIconButton";

function SettingsButton() {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);

  const toggleSettings = useCallback(() => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  }, [isSettingsMenuOpen]);

  return (
    <CustomIconButton
      testID={"SETTINGS_BUTTON.ICON:PRESSABLE"}
      onPress={toggleSettings}
    >
      <SettingsIcon
      />
    </CustomIconButton>
  )
}

export default SettingsButton;
