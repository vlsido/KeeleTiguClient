import { CommonColors } from "../../constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface FormsProps {
  forms: string | undefined;
}

function Forms(props: FormsProps) {
  if (!props.forms) {
    return null;
  }

  const fixedForms = props.forms.replaceAll(
    "_&_",
    " ~ "
  );

  return (
    <View style={styles.container}>
      <Text style={styles.formsText} >{fixedForms}</Text>
    </View>
  );
}

export default Forms;

const styles = StyleSheet.create({
  container: {
    width: "98%",
    marginVertical: 3,
  },
  formsText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
  },
  separator: {
    color: CommonColors.white,
    fontSize: 18,
  },
});
