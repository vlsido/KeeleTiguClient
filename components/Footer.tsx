import { StyleSheet, Text, View } from "react-native";

import packageJson from "../package.json";
import { CommonColors } from "../constants/Colors";

function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.buildText}>
        Build {packageJson.version}
      </Text>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "flex-end",
  },
  buildText: {
    color: CommonColors.white,
    fontSize: 12,
    marginRight: "2.5%",
    padding: 2.5
  }
})
