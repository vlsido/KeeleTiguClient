import { MaterialIcons } from "@expo/vector-icons";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { StyleSheet } from "react-native";
import { CommonColors } from "../../constants/Colors";
import { ExamIcon } from "../../components/icons/ExamIcon";
import { DictionaryIcon } from "../../components/icons/DictionaryIcon";
import Header from "../../components/Header";
import { useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { atom, useAtom } from "jotai";

type Tab = "index" | "dictionary" | "search";

function RootLayoutTabs() {
  const navigationState = useNavigation().getState();

  const [focusedTab, setFocusedTab] = useAtom<Tab>(
    useMemo(() => atom<Tab>("index"), []));

  useEffect(() => {
    const currentIndex = navigationState?.routes.at(0)?.state?.index;

    if (currentIndex == null) return;

    const tab = navigationState?.routes.at(0)?.state?.routeNames?.at(currentIndex);

    if (tab != null) {
      setFocusedTab(tab as Tab);
    }
  }, [navigationState]);

  return (
    <Tabs style={styles.container}>
      <Header />
      <TabSlot style={styles.slot} />
      <TabList style={styles.tabList}>
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "index" && styles.active]}
          name="index"
          href="/">
          <ExamIcon color={CommonColors.white} />
        </TabTrigger>
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "dictionary" && styles.active]}
          name="dictionary"
          href="/dictionary">
          <DictionaryIcon color={CommonColors.white} />
        </TabTrigger>
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "search" && styles.active]}
          name="search"
          href="/search">
          <MaterialIcons
            name="search"
            size={32}
            color={CommonColors.white}
          />
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
  active: {
    borderColor: "white",
    borderWidth: 3
  },
  tabList: {
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: CommonColors.saladGreen,
    alignSelf: "center",
    borderColor: CommonColors.whiteAlternative,
    borderWidth: 2,
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: "2.5%",
    maxWidth: 250,
  },
  buttonContainer: {
    backgroundColor: "rgba(21,22,21,0.8)",
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  }
})
