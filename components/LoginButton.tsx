
import { ActivityIndicator, StyleSheet, View } from "react-native";
import TextButton from "./TextButton";
import { CommonColors } from "@/constants/Colors";
import { ReadonlySignal } from "@preact/signals-react";

interface LoginButtonProps {
  isProcessing: ReadonlySignal<boolean>;
  onPress: () => void;
}

function LoginButton(props: LoginButtonProps) {

  if (props.isProcessing.value === true) {
    return (
      <View style={styles.loginContainer}>
        <ActivityIndicator
          color={CommonColors.white}
          size="small"
        />
      </View>
    )
  }

  return (
    <TextButton
      text="Logi sisse"
      style={styles.loginContainer}
      textStyle={styles.loginText}
      label="Login"
      onPress={props.onPress}
    />
  );
}

export default LoginButton;

const styles = StyleSheet.create({
  loginContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.black,
    padding: 10,
    backgroundColor: CommonColors.green,
    marginTop: 10,
    marginBottom: 20
  },
  loginText: {
    fontSize: 20,
    color: CommonColors.black,
  },
});
