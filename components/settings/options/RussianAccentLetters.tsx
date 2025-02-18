import { Text, View } from "react-native";
import { i18n } from "../../store/i18n";

function RussianAccentLetters() {

  return (
    <View>
      <Text>{i18n.t("RussianAccentLetters.", {})}</Text>
    </View>
  );
}
