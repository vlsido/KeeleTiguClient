import {
  StyleSheet,
  View,
} from "react-native";
import Settings from "./settings/SettingsButton";

function Header() {

  return (
    <View testID="HEADER.CONTAINER:VIEW"
      style={[styles.container]}>
      <View style={[styles.buttonContainer]}>
        <Settings />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    pointerEvents: "none"
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    pointerEvents: "none"
  },
  linksContainer: {
    flexDirection: "row",
  }
})
