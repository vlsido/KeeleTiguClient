import { useCallback } from "react";
import { View } from "react-native";
import ExamLink from "./links/ExamLink";
import DictionaryLink from "./links/DictionaryLink";
import SearchLink from "./links/SearchLink";
import {
  router,
  useNavigation
} from "expo-router";

function Header() {

  const navigation = useNavigation();

  // We dismiss to screens until Expo maintainers fix Stack navigator
  const onPress = useCallback((page: "exam" | "dictionary" | "search") => {
    const currentRoutes = navigation.getState()?.routes;
    switch (page) {
      case "exam":
        if (currentRoutes?.some((route) => route.name === "index")) {
          router.dismissTo("/");
        } else {
          router.push("/");
        }
        break;
      case "search":
        if (currentRoutes?.some((route) => route.name === "search")) {
          router.dismissTo("/search");
        } else {
          router.push("/search");
        }
        break;
      case "dictionary":
        if (currentRoutes?.some((route) => route.name === "dictionary")) {
          router.dismissTo("/dictionary");
        } else {
          router.push("/dictionary");
        }
        break;
    }
  }, [navigation]);

  return (
    <View testID="HEADER.CONTAINER:VIEW" style={{ flexDirection: "row" }}>
      <ExamLink onPress={onPress} />
      <DictionaryLink onPress={onPress} />
      <SearchLink onPress={onPress} />
    </View>
  );
}

export default Header;
