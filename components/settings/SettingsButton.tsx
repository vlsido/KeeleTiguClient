import { useCallback } from "react";
import {
  useAtom
} from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";
import { SettingsIcon } from "../icons/SettingsIcon";
import CustomIconButton from "../buttons/CustomIconButton";
import { i18n } from "../store/i18n";

function SettingsButton() {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);

  const toggleSettings = useCallback(() => {
    setIsSettingsMenuOpen(!isSettingsMenuOpen);
  }, [isSettingsMenuOpen]);

  return (
    <CustomIconButton
      testID={"SETTINGS_BUTTON.ICON:PRESSABLE"}
      ariaLabel={i18n.t("settings", { defaultValue: "Sätingud" })}
      style={{ pointerEvents: "auto" }}
      onPress={toggleSettings}
    >
      <SettingsIcon />
    </CustomIconButton>
  )
}

export default SettingsButton;
