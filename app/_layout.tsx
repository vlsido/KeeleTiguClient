import DictionaryLink from "@/components/DictionaryLink";
import ExamLink from "@/components/ExamLink";
import LeftHeaderButton from "@/components/LeftHeaderButton";
import RightHeaderButton from "@/components/RightHeaderButton";
import AuthContextProvider from "@/components/store/AuthContext";
import HintContextProvider from "@/components/store/HintContext";
import { CommonColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import WordsContextProvider from "@/components/store/WordsContext";

export default function RootLayout() {


  return (
    <HintContextProvider>
      <AuthContextProvider>
        <WordsContextProvider>
          <RootLayoutStack />
        </WordsContextProvider>
      </AuthContextProvider>
    </HintContextProvider >
  );

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
          title: "",
          headerRight: () => (
            <RightHeaderButton />
          ),
          headerLeft: () => (
            <DictionaryLink />
          ),
        })} />
      < Stack.Screen name="login" options={{
        title: "", headerBackVisible: true,

        headerLeft: () => (
          <LeftHeaderButton />
        )
      }} />
      < Stack.Screen name="register" options={{ title: "" }} />
      < Stack.Screen name="dictionary" options={{
        title: "",
        headerLeft: () => (
          <ExamLink />
        )
      }} />
    </Stack >
  );
}



