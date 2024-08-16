import TextButton from "@/components/TextButton";
import { loginUser } from "@/components/util/FirebaseUtil";
import { CommonColors } from "@/constants/Colors";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View, ViewStyle } from "react-native";
import { useSignal } from "@preact/signals-react";
import { Link, router } from "expo-router";
import { auth } from "@/components/util/FirebaseConfig";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

function Login() {
  const email = useSignal<string>("");
  const password = useSignal<string>("");


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
    await loginUser(email.value, password.value).then(() => {
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        router.replace("/");
      }
    }).catch((error) => {
      alert(error.message);
    });
  }

  function onChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    email.value = event.nativeEvent.text;
  }

  function onChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    password.value = event.nativeEvent.text;
  }

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

      <TextButton
        text="Login"
        style={styles.loginContainer}
        textStyle={styles.loginText}
        label="Login"
        onPress={handleLogin}
      />
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
