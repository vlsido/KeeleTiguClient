import { StyleSheet, Text, View } from "react-native";

import packageJson from "../package.json";
import { CommonColors } from "../constants/Colors";

function Footer() {
  return (
    <View style={styles.container}>
      <Text testID="FOOTER.AUTHOR:TEXT" style={styles.text}>
        by coslavko
      </Text>
      <Text testID="FOOTER.APP_NAME:TEXT" style={styles.text}>
        Examinyasha
      </Text>
      <Text testID="FOOTER.APP_BUILD:TEXT" style={styles.text}>
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
    marginHorizontal: "2.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    color: CommonColors.white,
    textAlign: "center",
    fontSize: 12,
    padding: 2.5

  },
})
