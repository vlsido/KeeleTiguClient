import { useCallback } from "react";
import {
  Linking,
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../constants/Colors";
import { i18n } from "../store/i18n";
import { Pressable } from "react-native-gesture-handler";
import { useAppSelector } from "../../hooks/storeHooks";

function AttributionText() {
  const language = useAppSelector((state) => state.settings.language);

  const openEKI = useCallback(() => {
    Linking.openURL("https://eki.ee");
  }, []);

  const openCreativeCommonsBY = useCallback(() => {
    Linking.openURL("https://creativecommons.org/licenses/by/4.0/");
  }, []);

  switch (language) {
    case "en":
      return (
        <Text style={styles.attributionText}>
          <Text style={styles.attributionText}>
            App uses the dictionaries created by the
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_eki_website", { defaultValue: "Ava Eesti Keele Instituudi lehekülg" })
            }
            onPress={openEKI}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Institute of the Estonian Language
            </Text>
          </Pressable>
          ,{" "}
          <Text style={styles.attributionText}>
            licensed by
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_cc_by_website", { defaultValue: "Ava Creative Commons BY 4.0 lehekülg" })
            }
            onPress={openCreativeCommonsBY}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Creative Commons BY 4.0
            </Text>
          </Pressable>
          .
        </Text>
      );
    case "ru":
      return (
        <Text style={styles.attributionText}>
          <Text style={styles.attributionText}>
            Приложение использует словари, созданные
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_eki_website", { defaultValue: "Ava Eesti Keele Instituudi lehekülg" })
            }
            onPress={openEKI}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Институтом Эстонского Языка
            </Text>
          </Pressable>
          ,{" "}
          <Text style={styles.attributionText}>
            лицензировано
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_cc_by_website", { defaultValue: "Ava Creative Commons BY 4.0 lehekülg" })
            }
            onPress={openCreativeCommonsBY}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Creative Commons BY 4.0
            </Text>
          </Pressable>
          .
        </Text>
      );
    default:
      return (
        <Text style={styles.attributionText}>
          <Text style={styles.attributionText}>
            App kasutab
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_eki_website", { defaultValue: "Ava Eesti Keele Instituudi lehekülg" })
            }
            onPress={openEKI}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Eesti Keele Instituudi
            </Text>
          </Pressable>
          {" "}
          <Text style={styles.attributionText}>
            loodud sõnastikud
          </Text>
          ,{" "}
          <Text style={styles.attributionText}>
            tüüplitsentsiks on
          </Text>
          {" "}
          <Pressable
            role="link"
            accessibilityLabel={
              i18n.t("open_cc_by_website", { defaultValue: "Ava Creative Commons BY 4.0 lehekülg" })
            }
            onPress={openCreativeCommonsBY}
          >
            <Text style={[styles.attributionText, styles.link]}>
              Creative Commons BY 4.0
            </Text>
          </Pressable>
          .
        </Text>
      );

  }
}

export default AttributionText;

const styles = StyleSheet.create({
  attributionText: {
    fontWeight: "thin",
    fontSize: 14,
    color: "white",
    textAlign: "center"
  },
  link: {
    color: CommonColors.blue
  },
});
