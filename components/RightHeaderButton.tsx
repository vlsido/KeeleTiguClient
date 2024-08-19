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

  console.log(auth.currentUser);

  if (auth.currentUser && !auth.currentUser.isAnonymous) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: CommonColors.white, marginRight: 15 }}>Tere, {auth.currentUser.displayName}!</Text>
        <TextButton
          onPress={handleLogout}
          text="Logi välja"
          style={styles.logoutContainer}
          textStyle={styles.logoutText}
          label="Logout"
        />
      </View>
    );
  }

  return (
    <TextButton
      onPress={() => router.replace("/login")}
      text="Logi sisse"
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
