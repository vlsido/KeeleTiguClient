import { loginUser } from "../components/util/FirebaseUtil";
import { CommonColors } from "../constants/Colors";
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TextStyle,
  View,
} from "react-native";
import {
  Link,
  router
} from "expo-router";
import { auth } from "../components/util/FirebaseConfig";
import {
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import LoginButton from "../components/LoginButton";
import {
  atom,
  useAtom
} from "jotai";
import { useMemo } from "react";
import { AnimatedTextInput } from "../components/util/AnimatedComponentsUtil";

function Login() {
  const [
    email,
    setEmail
  ] = useAtom<string>(useMemo(
    () => atom<string>(""),
    []
  ));

  const [
    password,
    setPassword
  ] = useAtom<string>(useMemo(
    () => atom<string>(""),
    []
  ));

  const [
    isProcessing,
    setIsProcessing
  ] = useAtom<boolean>(useMemo(
    () => atom<boolean>(false),
    []
  ));

  const emailBorderColor = useSharedValue<string>("gray");

  const emailAnimatedTextInputStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: emailBorderColor.value,
    };
  });

  const passwordBorderColor = useSharedValue<string>("gray");

  const passwordAnimatedTextInputStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: passwordBorderColor.value,
    };
  });

  async function handleLogin() {
    if (email === "" || password === "") {
      if (email === "") {
        emailBorderColor.value = "red";
      }
      if (password === "") {
        passwordBorderColor.value = "red";
      }
      return;
    }

    setIsProcessing(true);

    await loginUser(
      email,
      password
    ).catch((error) => {
      alert("Error logging in: " +
        error.message);
      console.error(
        "Error logging in",
        error
      );
    });

    setIsProcessing(false);
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      router.replace("/");
    }
  }

  function onChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setEmail(event.nativeEvent.text);
  }

  function onChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setPassword(event.nativeEvent.text);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>E-mail</Text>
        <AnimatedTextInput style={[
          { paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white },
          emailAnimatedTextInputStyle
        ]} onChange={onChangeEmail} onFocus={() => emailBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Parool</Text>
        <AnimatedTextInput style={[
          { paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white },
          passwordAnimatedTextInputStyle
        ]} onChange={onChangePassword} textContentType="password" secureTextEntry={true} onFocus={() => passwordBorderColor.value = "gray"} />
      </View>
      <LoginButton onPress={handleLogin} isProcessing={isProcessing} />
      <Link
        style={styles.registerContainer}
        href="/register"
      >
        <Text style={styles.registerText}>Pole kontot? Registreeru!</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonColors.black,
  },
  separator: {
    height: 20,
  },
  noAccountText: {
    fontSize: 16,
    marginVertical: 20,
    color: CommonColors.white,
  },
  registerContainer: {
    borderRadius: 3,
    backgroundColor: CommonColors.yellow,
    borderColor: CommonColors.white,
    padding: 10,
  },
  registerText: {
    fontSize: 18,
    color: CommonColors.black,
  },
  textInputName: {
    fontSize: 14,
    marginLeft: 3,
    marginBottom: 5,
    color: CommonColors.white,
  },
  textField: {
    padding: 10,
  }
});
