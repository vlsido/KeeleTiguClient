import {
  ActivityIndicator,
  StyleSheet,
  View
} from "react-native";
import { CommonColors } from "../constants/Colors";

function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={CommonColors.white}
        />
      </View>
    </View>
  )
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: CommonColors.black,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
