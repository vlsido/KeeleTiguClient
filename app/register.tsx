import RegisterButton from "@/components/RegisterButton";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { auth } from "@/components/util/FirebaseConfig";
import { SignupData } from "@/constants/ApiTypes";
import { CommonColors } from "@/constants/Colors";
import { useSignal } from "@preact/signals-react";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

function Register() {
  const nickname = useSignal<string>("");
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


  const nicknameBorderColor = useSharedValue<string>("gray");

  const nicknameAnimatedTextInputStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      borderColor: nicknameBorderColor.value,
    };
  });

  const passwordBorderColor = useSharedValue<string>("gray");

  const passwordAnimatedTextInputStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      borderColor: passwordBorderColor.value,
    };
  });

  async function handleRegister() {
    await handleSignup(email.value, password.value, nickname.value);
  }

  async function handleSignup(
    email: string,
    password: string,
    nickname: string
  ) {
    if (email === "" || password === "" || nickname === "") {
      if (email === "") {
        emailBorderColor.value = "red";
      }
      if (password === "") {
        passwordBorderColor.value = "red";
      }
      if (nickname === "") {
        nicknameBorderColor.value = "red";
      }
      return;
    }

    isProcessing.value = true;

    await createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error.message);
      isProcessing.value = false;
    });

    //
    const data: SignupData = {
      email: email,
      nickname: nickname,
    };

    await callCloudFunction("StoreSignupData_Node", data);

    if (auth.currentUser === null) {
      throw new Error("auth.currentUser is null");
    }

    updateProfile(auth.currentUser, { displayName: nickname }).then(() => {
      console.log("Nickname set to", nickname);
    }).catch((error) => {
      console.error("Failed to set nickname", error);
    });

    // console.log("response", response);
    isProcessing.value = false;

    router.replace("/");

  }
  function onChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    email.value = event.nativeEvent.text;
  }

  function onChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    password.value = event.nativeEvent.text;
  }

  function onChangeNickname(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    nickname.value = event.nativeEvent.text;
  }
  return (
    <View style={styles.container}>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Email</Text>
        <AnimatedTextInput style={[{ paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white }, emailAnimatedTextInputStyle]} onChange={onChangeEmail} onFocus={() => emailBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Nickname</Text>
        <AnimatedTextInput style={[{ paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white }, nicknameAnimatedTextInputStyle]} onChange={onChangeNickname} onFocus={() => nicknameBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Password</Text>
        <AnimatedTextInput style={[{ paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white }, passwordAnimatedTextInputStyle]} onChange={onChangePassword} textContentType="password" secureTextEntry={true} onFocus={() => passwordBorderColor.value = "gray"} />
      </View>
      {isProcessing.value === true && <Text style={{ color: CommonColors.white }}>Processing...</Text>}
      <RegisterButton isProcessing={isProcessing} onPress={handleRegister} />
      <Link
        style={styles.loginContainer}
        href="/login"
      >
        <Text style={styles.loginText}>Have an account?</Text>
      </Link>
    </View>
  );
}

export default Register;

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
  loginContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
  },
  loginText: {
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
