import { useCallback } from "react";
import DropdownMenu from "./DropdownMenu";
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/storeHooks";
import { setLanguage } from "../store/slices/settingsSlice";
import { Language } from "../../constants/types";
import { useConfig } from "../../hooks/useConfig";

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
