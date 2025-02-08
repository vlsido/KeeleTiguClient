import { StyleSheet, Text, View } from "react-native";

import packageJson from "../package.json";
import { CommonColors } from "../constants/Colors";

function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        by coslavko
      </Text>
      <Text style={styles.text}>
        Examinyasha
      </Text>
      <Text style={styles.text}>
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
    justifyContent: "space-between"
  },
  text: {
    color: CommonColors.white,
    fontSize: 12,
    padding: 2.5

  },
})
