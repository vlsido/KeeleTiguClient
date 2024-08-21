import DictionaryLink from "@/components/DictionaryLink";
import ExamLink from "@/components/ExamLink";
import LeftHeaderButton from "@/components/LeftHeaderButton";
import RightHeaderButton from "@/components/RightHeaderButton";
import AuthContextProvider from "@/components/store/AuthContext";
import HintContextProvider from "@/components/store/HintContext";
import { CommonColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import WordsContextProvider from "@/components/store/WordsContext";
import { useEffect } from "react";
import { i18n } from "@/components/store/i18n";
import ee from "@/components/store/translations/ee.json"
import ru from "@/components/store/translations/ru.json"

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      console.log("I18n has changed!");
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    loadTranslations("ee");
  }, []);

  async function loadTranslations(locale: string) {
    i18n.defaultLocale = "ee";
    i18n.locale = "ee";

    i18n.store(ee);
  }

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
          // headerRight: () => (
          //   <RightHeaderButton />
          // ),
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



