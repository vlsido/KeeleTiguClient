import {
  atom,
  useAtomValue
} from "jotai";
import { CommonColors } from "../constants/Colors";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

function getMaintenanceText() {
  const maintenanceText = localStorage.getItem("maintenanceText");

  if (maintenanceText != null) {
    return maintenanceText;
  }
  return "Uuendame appi, proovige uuesti hiljem!"
}

const maintenanceTextAtom = atom<string>(getMaintenanceText);

function Maintenance() {
  const maintenanceText = useAtomValue<string>(maintenanceTextAtom);

  return (
    <View
      testID="MAINTENANCE.CONTAINER:VIEW"
      style={styles.container}>
      <Text
        testID="MAINTENANCE.CONTAINER:TEXT"
        style={styles.text}>
        {maintenanceText}
      </Text>
    </View>
  );
}

export default Maintenance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonColors.black,
    paddingVertical: 10
  },
  text: {
    color: CommonColors.white,
    fontSize: 20
  },
});
