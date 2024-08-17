import TextButton from "@/components/TextButton";
import { loginUser } from "@/components/util/FirebaseUtil";
import { CommonColors } from "@/constants/Colors";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View, ViewStyle } from "react-native";
import { useSignal } from "@preact/signals-react";
import { Link, router } from "expo-router";
import { auth } from "@/components/util/FirebaseConfig";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import LoginButton from "@/components/LoginButton";

function Login() {
  const email = useSignal<string>("");
  const password = useSignal<string>("");
  const isProcessing = useSignal<boolean>(false);
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const emailBorderColor = useSharedValue<string>("gray");

  const emailAnimatedTextInputStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      borderColor: emailBorderColor.value,
    };
  });

  const passwordBorderColor = useSharedValue<string>("gray");

  const passwordAnimatedTextInputStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      borderColor: passwordBorderColor.value,
    };
  });

  async function handleLogin() {
    if (email.value === "" || password.value === "") {
      if (email.value === "") {
        emailBorderColor.value = "red";
      }
      if (password.value === "") {
        passwordBorderColor.value = "red";
      }
      return;
    }
    isProcessing.value = true;
    await loginUser(email.value, password.value).catch((error) => {
      alert(error.message);
      isProcessing.value = false;
    });


    isProcessing.value = false;
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      router.replace("/");
    }
  }

  function onChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    email.value = event.nativeEvent.text;
  }

  function onChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    password.value = event.nativeEvent.text;
  }



  return (
    <View style={styles.container}>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Email</Text>
        <AnimatedTextInput style={[{ paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white }, emailAnimatedTextInputStyle]} onChange={onChangeEmail} onFocus={() => emailBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Password</Text>
        <AnimatedTextInput style={[{ paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white }, passwordAnimatedTextInputStyle]} onChange={onChangePassword} textContentType="password" secureTextEntry={true} onFocus={() => passwordBorderColor.value = "gray"} />
      </View>
      <LoginButton onPress={handleLogin} isProcessing={isProcessing} />
      <Link
        style={styles.registerContainer}
        href="/register"
      >
        <Text style={styles.registerText}>Don't have an account?</Text>
      </Link>
    </View>
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
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
  },
  registerText: {
    fontSize: 20,
    color: CommonColors.white,
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
