import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs
} from "expo-router/ui";
import { StyleSheet, useWindowDimensions } from "react-native";
import { CommonColors } from "../../constants/Colors";
import { ExamIcon } from "../../components/icons/ExamIcon";
import { DictionaryIcon } from "../../components/icons/DictionaryIcon";
import { useNavigation } from "expo-router";
import {
  useCallback,
  useMemo
} from "react";
import {
  atom,
  useAtomValue
} from "jotai";
import { SearchIcon } from "../../components/icons/SearchIcon";
import { i18n } from "../../components/store/i18n";
import { useOrientation } from "../../hooks/useOrientation";

type Tab = "index" | "dictionary" | "search";

function RootLayoutTabs() {
  const navigationState = useNavigation().getState();

  const { isWide } = useOrientation();

  const getFocusedTab = useCallback(() => {
    const currentIndex = navigationState?.routes.at(0)?.state?.index;

    if (currentIndex == null) {
      const routes = navigationState?.routes.at(0)?.state?.routes;
      if (routes !== undefined && routes.length === 1) {
        const tab = routes[0].name;

        return tab as Tab;
      }
      return "index";
    }

    const tab = navigationState?.routes.at(0)?.state?.routeNames?.at(currentIndex);

    if (tab != null) {
      return tab as Tab;
    }

    return "index"
  }, [navigationState]);

  const focusedTab = useAtomValue<Tab>(
    useMemo(() => atom<Tab>(getFocusedTab()), [navigationState]));

  return (
    <Tabs style={[styles.container,
    isWide
    && { flexDirection: "row-reverse" }]}>
      <TabSlot style={styles.slot} />
      <TabList
        style={[styles.tabList,
        isWide
          ? {
            flexDirection: "column",
            paddingHorizontal: 2.5,
            paddingVertical: 10,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderColor: "white",
            height: "100%",
            maxHeight: 250
          }
          : {
            paddingHorizontal: 10,
            paddingVertical: 2.5,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderTopWidth: 2,
            borderColor: "white",
            width: "100%",
            maxWidth: 250
          }
        ]}
        accessible={true}
        role="tablist"
      >
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "index" && styles.active]}
          name="index"
          role="button"
          accessibilityLabel={i18n.t("TabsLayout_open_test_tab", { defaultValue: "Ava testi kaart" })}
          href="/">
          <ExamIcon
            role="none"
            color={CommonColors.white}
          />
        </TabTrigger>
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "dictionary" && styles.active]}
          name="dictionary"
          role="button"
          accessibilityLabel={i18n.t("TabsLayout_open_dictionary_tab", { defaultValue: "Ava sõnastiku kaart" })}
          href="/dictionary">
          <DictionaryIcon
            role="none"
            color={CommonColors.white}
          />
        </TabTrigger>
        <TabTrigger
          style={[styles.buttonContainer, focusedTab === "search" && styles.active]}
          name="search"
          role="button"
          accessibilityLabel={i18n.t("TabsLayout_open_search_tab", { defaultValue: "Ava otsingu kaart" })}
          href="/search">
          <SearchIcon
            role="none"
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
  },
  tabList: {
    justifyContent: "space-between",
    backgroundColor: CommonColors.saladGreen,
    alignSelf: "center",
    borderColor: CommonColors.whiteAlternative,
  },
  buttonContainer: {
    backgroundColor: "rgba(21,22,21,0.8)",
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(21,22,21,0.8)",
    borderWidth: 3,
    borderRadius: 60,
  }
})
