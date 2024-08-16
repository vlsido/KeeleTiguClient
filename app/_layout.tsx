import RightHeaderButton from "@/components/RightHeaderButton";
import TextButton from "@/components/TextButton";
import AuthContextProvider from "@/components/store/AuthContext";
import { Colors, CommonColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {

  return (
    <AuthContextProvider>
      <RootLayoutStack />
    </AuthContextProvider>);

}

function RootLayoutStack() {

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: CommonColors.black,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "Exam",
          headerRight: () => (
            <RightHeaderButton />
          )
        })} />
      <Stack.Screen name="login" options={{ title: "", headerBackVisible: true }} />
      <Stack.Screen name="register" options={{ title: "" }} />
      <Stack.Screen name="dictionary" options={{}} />
    </Stack>
  );
}



