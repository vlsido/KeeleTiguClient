import SendAnswerButton from "@/components/SendAnswerButton";
import TextAnswerField from "@/components/TextAnswerField";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      <View
        style={{
          flex: 0.5,
          height: "100%",
          justifyContent: "flex-end",
          backgroundColor: "pink",
          flexDirection: "column",
        }}
      >
        <View style={styles.textField}>
          <TextAnswerField />
          <SendAnswerButton />
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          height: "100%",
          justifyContent: "flex-end",
          backgroundColor: "skyblue",
          flexDirection: "column",
        }}
      >
        <View style={styles.textField}>
          <TextAnswerField />
          <SendAnswerButton />
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  textField: {
    marginBottom: "10%"
  }
})
