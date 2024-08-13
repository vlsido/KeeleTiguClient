import { StyleSheet, TextInput, View } from "react-native";

function TextAnswerField() {

  return (
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.inputText}
        multiline={true}
        placeholder="Нажмите!"
      />
    </View>
  )
}

export default TextAnswerField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: "auto"
  },
  inputText: {
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
  }

});
