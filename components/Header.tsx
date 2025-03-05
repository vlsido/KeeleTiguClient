import {
  StyleSheet,
  View,
} from "react-native";
import Settings from "./settings/SettingsButton";
import { CommonColors } from "../constants/Colors";
import { useOrientation } from "../hooks/useOrientation";

function Header() {
  const { isWide } = useOrientation();

  return (
    <View testID="HEADER.CONTAINER:VIEW"
      style={[styles.container,
      isWide && { position: "absolute", backgroundColor: "transparent", pointerEvents: "none" }]}>
      <View style={[styles.buttonContainer,
      isWide && { position: "absolute", backgroundColor: "transparent", pointerEvents: "none" }
      ]}>
        <Settings />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: CommonColors.black
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: CommonColors.black
  },
  linksContainer: {
    flexDirection: "row",
  }
})
