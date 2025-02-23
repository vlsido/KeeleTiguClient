import { StyleSheet, View } from "react-native";
import Settings from "./settings/SettingsButton";
import { CommonColors } from "../constants/Colors";

function Header() {

  return (
    <View testID="HEADER.CONTAINER:VIEW" style={styles.container}>
      <Settings />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: CommonColors.black,
  },
  linksContainer: {
    flexDirection: "row",
  }
})
