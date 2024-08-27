import { CommonColors } from "@/constants/Colors";
import { useSignal } from "@preact/signals-react";
import { StyleSheet, Text, View } from "react-native";

function Maintenance() {
  const maintenanceText = useSignal<string>(getMaintenanceText());


  function getMaintenanceText() {
    const maintenanceText = localStorage.getItem("maintenanceText");

    if (maintenanceText != null) {
      return maintenanceText;
    }
    return "Uuendame appi, proovige uuesti hiljem!"
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{maintenanceText.value}</Text>
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
