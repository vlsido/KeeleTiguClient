import { useEffect } from "react";
import {
  Linking,
  StyleSheet,
  View
} from "react-native";
import { CommonColors } from "../constants/Colors";
import MovedNotice from "../components/MovedNotice";

function Moved() {

  useEffect(() => {
    Linking.openURL("https://keeletigu.web.app");
  }, []);

  return (
    <View
      testID="MOVED.CONTAINER:VIEW"
      style={styles.container}>
      <MovedNotice />
    </View>
  );
}

export default Moved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonColors.black
  }
});
