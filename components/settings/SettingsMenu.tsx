import {
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
import DraggableView from "../views/DraggableView";
import { CommonColors } from "../../constants/Colors";
import { i18n } from "../store/i18n";
import { useAtom } from "jotai";
import { isSettingsMenuOpenAtom } from "./settingsAtoms";
import MaterialIconButton from "../buttons/MaterialIconButton";
import { MaterialIcons } from "@expo/vector-icons";

interface SettingsMenuProps {
}

function SettingsMenu(props: SettingsMenuProps) {
  const [isSettingsMenuOpen, setIsSettingsOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);


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
        <View style={styles.option}>
          <Text>
            {i18n.t("SettingsMenu.turn_on_accent_letters", {
              defaultValue: "Teha vene sõna rõhke nähtavaks"
            })}
          </Text>
          <View style={styles.checkBox}>
            <Text style={styles.checkBoxIndicatorText}>
              X
            </Text>
          </View>
        </View>
      </Animated.View>
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
    borderRadius: 30
  },
  closeButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkBox: {
    borderWidth: 1,
    borderColor: "black"
  },
  checkBoxIndicatorText: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
