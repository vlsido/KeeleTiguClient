import { MaterialIcons } from "@expo/vector-icons";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { StyleSheet, Text } from "react-native";
import { CommonColors } from "../../constants/Colors";

function RootLayoutTabs() {

  return (
    <Tabs style={styles.container}>
      <TabSlot style={styles.slot} />
      <TabList style={styles.tabList}>
        <TabTrigger style={styles.buttonContainer} name="index" href="/">
          <MaterialIcons name="home" size={32} color={CommonColors.black} />
        </TabTrigger>
        <TabTrigger style={styles.buttonContainer} name="dictionary" href="/dictionary">
          <MaterialIcons name="book" size={32} color={CommonColors.black} />
        </TabTrigger>
        <TabTrigger style={styles.buttonContainer} name="search" href="/search">
          <MaterialIcons name="search" size={32} color={CommonColors.black} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

export default RootLayoutTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
  tabList: {
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    maxWidth: 600
  },
  buttonContainer: {
    backgroundColor: CommonColors.white,
    height: 48,
    width: 48,
    padding: 5,
    borderRadius: 5,
    borderWidth: 2
  }
})
