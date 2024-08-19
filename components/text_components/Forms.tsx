import { StyleSheet, Text } from "react-native";

interface FormsProps {
  forms?: string;
}

function Forms(props: FormsProps) {
  if (!props.forms) {
    return null;
  }

  const fixedForms = props.forms.replaceAll("_&_", " ~ ");

  return (
    <Text style={styles.formsText}>{"<"}{fixedForms}{">"}</Text>
  );
}

export default Forms;

const styles = StyleSheet.create({
  formsText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16
  },
});
