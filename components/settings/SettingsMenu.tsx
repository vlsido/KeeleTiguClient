import {
  StyleSheet,
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

interface SettingsMenuProps {
}

function SettingsMenu(props: SettingsMenuProps) {
  const [isSettingsMenuOpen, setIsSettingsOpen] =
    useAtom<boolean>(isSettingsMenuOpenAtom);


  if (!isSettingsMenuOpen) return null;

  return (
    <Animated.View
      testID={"SETTINGS_MENU.CONTAINER:VIEW"}
      style={styles.container}
      exiting={FadeOut
        .reduceMotion(ReduceMotion.System)
        .duration(133)
      }
    >
      <DraggableView
        testID="SETTINGS_MENU.CONTAINER.DRAG_BAR:VIEW"
        style={styles.dragBar}
        uid="settingsMenu"
      />

      <View>
        <Text>
          {i18n.t("SettingsMenu.turn_on_accent_letters", {
            defaultValue: "Teha vene sõna rõhke nähtavaks"
          })}
        </Text>
      </View>
    </Animated.View>
  );
}

export default SettingsMenu;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    top: 200,
    left: 100,
    height: 200,
    width: 300,
    backgroundColor: CommonColors.white,
    borderRadius: 20
  },
  dragBar: {
    width: "80%",
    height: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: "center"
  }
});
