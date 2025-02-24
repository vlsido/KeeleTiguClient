import {
  Image,
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
import { atom, useAtom } from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";
import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import OverlayHint from "../overlays/OverlayHint";

interface SettingsMenuProps {
}

function SettingsMenu(props: SettingsMenuProps) {
  const [isSettingsMenuOpen, setIsSettingsOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);

  const [isAboutThisAppHintVisible, setIsAboutThisAppHintVisible] =
    useAtom<boolean>(useMemo(() => atom<boolean>(false), []));


  if (!isSettingsMenuOpen) return null;

  return (
    <View
      testID={"SETTINGS_MENU.CONTAINER:VIEW"}
      style={styles.container}
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
        <MaterialIcons
          testID="SETTINGS_MENU_CONTAINER.MENU.CLOSE:PRESSABLE"
          name="close"
          size={32}
          color={CommonColors.white}
          onPress={() => setIsSettingsOpen(false)}
          style={styles.closeButtonContainer}
          ariaLabel="Close menu"
        />
        <View style={styles.options}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>
              {i18n.t("SettingsMenu.language", {
                defaultValue: "Keel"
              })}
            </Text>
            <View style={styles.switchContainer}>
              <Switch />
            </View>
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>
              {i18n.t("SettingsMenu.turn_on_accent_letters", {
                defaultValue: "Teha vene sõna rõhke nähtavaks"
              })}
            </Text>
            <View style={styles.switchContainer}>
              <Switch />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable
            style={styles.aboutThisAppButtonContainer}
            onPress={() => setIsAboutThisAppHintVisible(true)}
          >
            <Text style={styles.aboutThisAppText}>
              {i18n.t("SettingsMenu.about_this_app", { defaultValue: "Sellest appist" })}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
      <OverlayHint
        isVisible={isAboutThisAppHintVisible}
        onClose={() => setIsAboutThisAppHintVisible(false)}
      >
        <View style={styles.appIconContainer}>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={{ height: 64, width: 64 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.aboutThisAppHeader}>Examinyasha</Text>
      </OverlayHint>
    </View >
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
    alignItems: "center"
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end"
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
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  aboutThisAppButtonContainer: {

  },
  aboutThisAppText: {
    color: CommonColors.blue,
    fontSize: 12
  },
  appIconContainer: {
    width: 64,
    height: 64,
  },
  aboutThisAppHeader: {
    fontSize: 18,
    color: "white"
  },
});
