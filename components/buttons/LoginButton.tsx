import {
  ActivityIndicator,
  StyleSheet,
  View
} from "react-native";
import TextButton from "./TextButton";
import { CommonColors } from "../../constants/Colors";

interface LoginButtonProps {
  isProcessing: boolean;
  onPress: () => void;
}

function LoginButton(props: LoginButtonProps) {

  if (props.isProcessing === true) {
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
      testID="LOGIN_BUTTON.LOGIN:PRESSABLE"
      text="Logi sisse"
      style={styles.loginContainer}
      textStyle={styles.loginText}
      ariaLabel="Login"
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
