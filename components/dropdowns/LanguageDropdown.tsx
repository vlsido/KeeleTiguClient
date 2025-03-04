import { useCallback } from "react";
import DropdownMenu from "./DropdownMenu";
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/storeHooks";
import { setLanguage } from "../store/slices/settingsSlice";
import { Language } from "../../constants/types";
import { useConfig } from "../../hooks/useConfig";
import { i18n } from "../store/i18n";

function LanguageDropdown() {
  const { rerender } = useConfig();

  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();
  const onSelect = useCallback((item: string) => {
    dispatch(setLanguage(item as Language));
    rerender();
  }, []);

  return (
    <DropdownMenu
      testID="LANGUAGE_DROPDOWN.DROPDOWN:PRESSABLE"
      ariaLabel={i18n.t("select_language_dropdown", { defaultValue: "Vali keel rippmenüü" })}
      onSelect={onSelect}
      items={[
        "EE",
        "EN",
        "RU"
      ]}
      defaultItem={language.toUpperCase()}
    />
  );
}

export default LanguageDropdown;
