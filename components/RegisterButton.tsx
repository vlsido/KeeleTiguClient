import { ActivityIndicator, StyleSheet, View } from "react-native";
import TextButton from "./TextButton";
import { CommonColors } from "@/constants/Colors";
import { ReadonlySignal } from "@preact/signals-react";

interface RegisterButtonProps {
  isProcessing: ReadonlySignal<boolean>;
  onPress: () => void;
}

function RegisterButton(props: RegisterButtonProps) {

  if (props.isProcessing.value === true) {
    return (
      <View style={styles.registerContainer}>
        <ActivityIndicator
          color={CommonColors.white}
          size="small"
        />
      </View>
    )
  }


  return (
    <TextButton
      text="Register"
      style={styles.registerContainer}
      textStyle={styles.registerText}
      label="Register"
      onPress={props.onPress}
    />
  );
}

export default RegisterButton;

const styles = StyleSheet.create({
  registerContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.black,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: CommonColors.yellow,
  },
  registerText: {
    fontSize: 20,
    color: CommonColors.black,
  },
});
