import { StyleSheet, Text, View } from "react-native";
import { auth } from "./util/FirebaseConfig";
import { router } from "expo-router";
import TextButton from "./TextButton";
import { CommonColors } from "@/constants/Colors";

function RightHeaderButton() {
  async function handleLogout() {
    console.log("Logout");
    await auth.signOut();
    router.replace("/");
  }

  if (auth.currentUser && !auth.currentUser.isAnonymous) {
    return (
      <TextButton
        onPress={handleLogout}
        text="Logout"
        style={styles.logoutContainer}
        textStyle={styles.logoutText}
        label="Login"
      />
    );
  }

  return (
    <TextButton
      onPress={() => router.replace("/login")}
      text="Login"
      style={styles.loginContainer}
      textStyle={styles.loginText}
      label="Login"
    />
  );
}

export default RightHeaderButton;

const styles = StyleSheet.create({
  logoutContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
    backgroundColor: CommonColors.yellow,
    marginRight: 20,
  },
  logoutText: {
    fontSize: 16,
    color: CommonColors.black,
  },
  loginContainer: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: CommonColors.white,
    padding: 10,
    backgroundColor: CommonColors.green,
    marginRight: 20,
  },
  loginText: {
    fontSize: 16,
    color: CommonColors.black,
  }
});
