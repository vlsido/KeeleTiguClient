import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ReduceMotion
} from "react-native-reanimated";
import { CommonColors } from "../../constants/Colors";
import { i18n } from "../store/i18n";
import {
  atom,
  useAtom
} from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";
import AboutThisAppHint from "../hints/AboutThisAppHint";

import packageJson from "../../package.json";
import LanguageDropdown from "../dropdowns/LanguageDropdown";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { toggleHighlightRussianAccentLetters } from "../store/slices/settingsSlice";
import CustomIconButton from "../buttons/CustomIconButton";
import { CloseIcon } from "../icons/CloseIcon";

interface SettingsMenuProps {
}

function SettingsMenu(props: SettingsMenuProps) {
  const [isSettingsMenuOpen, setIsSettingsOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);

  const [isAboutThisAppHintVisible, setIsAboutThisAppHintVisible] =
    useAtom<boolean>(useMemo(() => atom<boolean>(false), []));

  const highlightRussianAccentLetters = useAppSelector((state) => state.settings.highlightRussianAccentLetters);

  const dispatch = useAppDispatch();

  function toggleHighlight() {
    dispatch(toggleHighlightRussianAccentLetters());
  }

  if (!isSettingsMenuOpen) return null;

  return (
    <Animated.View
      testID={"SETTINGS_MENU.CONTAINER:VIEW"}
      style={styles.container}
      entering={FadeIn
        .reduceMotion(ReduceMotion.System)
        .duration(133)
      }
      exiting={FadeOut
        .reduceMotion(ReduceMotion.System)
        .duration(133)
      }
    >
      <Animated.View
        testID="SETTINGS_MENU.CONTAINER.MENU:VIEW"
        style={styles.menu}
        entering={FadeIn
          .reduceMotion(ReduceMotion.System)
          .duration(133)
        }
        exiting={FadeOut
          .reduceMotion(ReduceMotion.System)
          .duration(133)
        }
      >
        <CustomIconButton
          testID="SETTINGS_MENU_CONTAINER.MENU.CLOSE:PRESSABLE"
          onPress={() => setIsSettingsOpen(false)}
          aria-label="Close menu"
          size={32}
          style={styles.closeButtonContainer}
        >
          <CloseIcon />
        </CustomIconButton>
        <View style={styles.options}>
          <View style={[styles.optionContainer, { zIndex: 1 }]}>
            <Text style={styles.optionText}>
              {i18n.t("SettingsMenu_language", {
                defaultValue: "Keel"
              })}
            </Text>
            <LanguageDropdown />
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>
              {i18n.t("SettingsMenu_turn_on_accent_letters", {
                defaultValue: "Teha vene sõna rõhke nähtavaks"
              })}
            </Text>
            <View style={styles.switchContainer}>
              <Switch
                value={highlightRussianAccentLetters}
                onValueChange={toggleHighlight} />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable
            style={styles.footerItemContainer}
            onPress={() => setIsAboutThisAppHintVisible(true)}
          >
            <Text style={styles.aboutThisAppText}>
              {i18n.t("SettingsMenu_about_this_app", { defaultValue: "Sellest appist" })}
            </Text>
          </Pressable>
          <View style={styles.footerItemContainer}>
            <Text style={styles.buildText}>
              {i18n.t("build", { defaultValue: "Versioon" })} {packageJson.version}
            </Text>
          </View>
        </View>
      </Animated.View>
      <AboutThisAppHint
        isVisible={isAboutThisAppHintVisible}
        onClose={() => setIsAboutThisAppHintVisible(false)}
      />
    </Animated.View >
  );
}

export default SettingsMenu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  menu: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: CommonColors.whiteAlternative,
    padding: 10,
    borderRadius: 30,
    gap: 10
  },
  closeButtonContainer: {
    alignSelf: "flex-end"
  },
  options: {
    gap: 10,
    marginBottom: 30
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: CommonColors.black,
    gap: 10,
    padding: 10,
    borderRadius: 10,
  },
  optionText: {
    color: "white"
  },
  footer: {
    width: "100%",
    gap: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  footerItemContainer: {
    flex: 1,
    alignItems: "center"
  },
  aboutThisAppText: {
    color: CommonColors.blue,
    fontSize: 14
  },
  buildText: {
    color: CommonColors.white,
    fontSize: 14
  },
  switchContainer: {

  }
});
