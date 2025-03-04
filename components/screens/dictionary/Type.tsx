import {
  StyleSheet,
  Text
} from "react-native";
import { CommonColors } from "../../../constants/Colors";
import { i18n } from "../../store/i18n";

interface TypeProps {
  type: "s" | "v" | "adj" | "adv" | "konj" | undefined;
}

function Type(props: TypeProps) {
  function type() {
    switch (props.type) {
      case "s":
        return i18n.t("Type_noun", { defaultValue: "substantiiv" });
      case "v":
        return i18n.t("Type_verb", { defaultValue: "verb" });
      case "adj":
        return i18n.t("Type_adjective", { defaultValue: "adjektiiv" });
      case "adv":
        return i18n.t("Type_adverb", { defaultValue: "adverb" });
      case "konj":
        return i18n.t("Type_subjunctive", { defaultValue: "konjunktiiv" });
      default:
        return "";
    }
  }

  return (
    <Text
      testID="TYPE.WORD_TYPE:TEXT"
      style={styles.typeText}
      accessibilityLabel={i18n.t("type", { defaultValue: "Sõnaliik" })}
    >
      {type()}
    </Text>
  );
}

export default Type;

const styles = StyleSheet.create({
  typeText: {
    color: CommonColors.green,
    fontSize: 16
  },
});
