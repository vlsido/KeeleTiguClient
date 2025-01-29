import {
  atom,
  useAtom
} from "jotai";
import RegisterButton from "../components/RegisterButton";
import { callCloudFunction } from "../components/util/CloudFunctions";
import { auth } from "../components/util/FirebaseConfig";
import { SignupData } from "../constants/ApiTypes";
import { CommonColors } from "../constants/Colors";
import {
  Link,
  router
} from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TextStyle,
  View,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { useMemo } from "react";
import { AnimatedTextInput } from "../components/util/AnimatedComponentsUtil";
import { OperationError } from "../components/errors/OperationError";
import { useHint } from "../hooks/useHint";

function Register() {
  const { showHint } = useHint();

  const [
    nickname,
    setNickname
  ] = useAtom<string>(useMemo(
    () => atom<string>(""),
    []
  ));

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

  const nicknameBorderColor = useSharedValue<string>("gray");

  const passwordBorderColor = useSharedValue<string>("gray");

  const emailAnimatedTextInputStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: emailBorderColor.value,
    };
  });

  const nicknameAnimatedTextInputStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: nicknameBorderColor.value,
    };
  });

  const passwordAnimatedTextInputStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      borderColor: passwordBorderColor.value,
    };
  });

  async function handleSignup() {
    if (auth.currentUser === null) {
      showHint("Midagi läks valesti. Proovige uuesti!")
      return;
    }
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

    setIsProcessing(true);

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      alert(error.message);
      setIsProcessing(false);
      return;
    });

    const data: SignupData = {
      email: email,
      nickname: nickname,
    };

    await callCloudFunction(
      "StoreSignupData_Node",
      data
    );



    updateProfile(
      auth.currentUser,
      { displayName: nickname }
    ).then(() => {
      console.log(
        "Nickname set to",
        nickname
      );
    }).catch((error) => {
      console.error(
        "Failed to set nickname",
        error
      );
    });

    // console.log("response", response);
    setIsProcessing(false);

    router.replace("/");

  }
  function onChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setEmail(event.nativeEvent.text);
  }

  function onChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setPassword(event.nativeEvent.text);
  }

  function onChangeNickname(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    setNickname(event.nativeEvent.text);
  }
  return (
    <View style={styles.container}>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Email</Text>
        <AnimatedTextInput style={[
          { paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white },
          emailAnimatedTextInputStyle
        ]} onChange={onChangeEmail} onFocus={() => emailBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Nickname</Text>
        <AnimatedTextInput style={[
          { paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white },
          nicknameAnimatedTextInputStyle
        ]} onChange={onChangeNickname} onFocus={() => nicknameBorderColor.value = "gray"} />
      </View>
      <View style={styles.textField}>
        <Text style={styles.textInputName}>Password</Text>
        <AnimatedTextInput style={[
          { paddingLeft: 10, height: 40, borderWidth: 1, borderRadius: 3, color: CommonColors.white },
          passwordAnimatedTextInputStyle
        ]} onChange={onChangePassword} textContentType="password" secureTextEntry={true} onFocus={() => passwordBorderColor.value = "gray"} />
      </View>
      {isProcessing === true && <Text style={{ color: CommonColors.white }}>Processing...</Text>}
      <RegisterButton isProcessing={isProcessing} onPress={handleSignup} />
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
