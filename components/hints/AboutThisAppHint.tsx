import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import OverlayHint from "../overlays/OverlayHint";
import { i18n } from "../store/i18n";
import { CommonColors } from "../../constants/Colors";
import { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GitHubIcon } from "../icons/GitHubIcon";

interface AboutThisAppHint {
  isVisible: boolean;
  onClose: () => void;
}

function AboutThisAppHint(props: AboutThisAppHint) {

  const openGithub = useCallback(() => {
    Linking.openURL("https://github.com/vlsido/ExaminyashaClient");
  }, []);

  return (
    <OverlayHint
      isVisible={props.isVisible}
      onClose={props.onClose}
    >
      <View style={styles.container}>
        <View style={styles.centeringContainer}>
          <View style={styles.appIconContainer}>
            <Image
              source={require("../../assets/images/favicon.png")}
              style={{ height: 64, width: 64 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headerText}>Examinyasha</Text>
        </View>
        <View style={styles.centeringContainer}>
          <Text style={styles.bodyText}>
            {i18n.t("app_description", {
              defaultValue: "Selline app on avatud lähtekoodiga projekt tehtud Vladislav \"coslavko\" Sidorenko poolt."
            })}
          </Text>
          <Pressable
            testID="AboutThisAppHint.Github:PRESSABLE"
            onPress={openGithub}
            style={styles.githubContainer}
          >
            <GitHubIcon />
            <View style={styles.githubTextContainer}>
              <Text style={styles.githubText}>GitHub</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.centeringContainer}>
          <Text style={styles.closeHintText}>
            {i18n.t("tap_to_close", { defaultValue: "Sulgemiseks puudutage." })}
          </Text>
        </View>
      </View>
    </OverlayHint>

  );
}

export default AboutThisAppHint;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 35,
    paddingHorizontal: 20,
    maxWidth: 300
  },
  appIconContainer: {
    width: 64,
    height: 64,
  },
  centeringContainer: {
    alignItems: "center",
    gap: 10
  },
  headerText: {
    fontSize: 20,
    color: "white"
  },
  bodyText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "light"
  },
  githubContainer: {
    borderRadius: 20,
    backgroundColor: CommonColors.black,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    gap: 2.5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: CommonColors.whiteAlternative,
  },
  githubTextContainer: {
    flexDirection: "row"
  },
  githubText: {
    fontWeight: "light",
    fontSize: 16,
    color: "white"
  },
  closeHintText: {
    color: CommonColors.white,
    fontSize: 16,
    fontWeight: "light",
    opacity: 0.75
  }
})
