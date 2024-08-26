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
import DictionaryLink from "@/components/links/DictionaryLink";
import SearchLink from "@/components/links/SearchLink";
import { View } from "react-native";
import { allWords, myDictionary, myDictionaryHistory } from "@/components/util/WordsUtil";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { useSignalEffect } from "@preact/signals-react";
import { OnlyWordsResponse } from "./dictionary";
import { getRemoteConfig, getValue } from "firebase/remote-config";
import { app } from "@/components/util/FirebaseConfig";



export default function RootLayout() {
  const remoteConfig = getRemoteConfig(app);

  remoteConfig.settings.minimumFetchIntervalMillis = 300000; // 5 minutes

  remoteConfig.defaultConfig = { current_build_version: "1.0.0" };

  useEffect(() => {
    const currentBuildVersion = getValue(remoteConfig, "current_build_version").asString();
    const cachedBuildVersion = localStorage.getItem("current_build_version");

    if (cachedBuildVersion == null || currentBuildVersion !== cachedBuildVersion) {
      localStorage.setItem("current_build_version", currentBuildVersion);
      removeCache().then(() => {
        loadTranslations("ee");
      });

      return;
    }

    getDictionaryHistory();
    loadTranslations("ee");
  }, []);



  async function removeCache() {
    console.log("Removing cache...");
    localStorage.removeItem("allWords");
    localStorage.removeItem("myDictionaryHistory");
    allWords.value = [];
    myDictionary.value = [];
    myDictionaryHistory.value = [];
  }

  useSignalEffect(() => {
    if (allWords.value.length === 0) {
      getAllWords();
    }
  });

  useSignalEffect(() => {
    if (myDictionaryHistory.value.length > 0) {
      localStorage.setItem("myDictionaryHistory", JSON.stringify(myDictionaryHistory.value));
    }
  });

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      console.log("I18n has changed!");
    });

    return unsubscribe;
  }, []);

  function getDictionaryHistory() {
    if (localStorage.getItem("myDictionaryHistory") != null) {
      myDictionaryHistory.value = JSON.parse(localStorage.getItem("myDictionaryHistory") as string);
      return;
    }
  }

  async function getAllWords() {
    if (localStorage.getItem("allWords") != null) {
      allWords.value = JSON.parse(localStorage.getItem("allWords") as string);
      return;
    }

    const response = await callCloudFunction("GetDictionaryWordsOnly_Node", {}) as OnlyWordsResponse | null;

    if (response != null) {
      allWords.value = response.dictionary;
      localStorage.setItem("allWords", JSON.stringify(allWords.value));
    }
  }

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
        headerLeft: () => (
          <View style={{ flexDirection: "row" }}>
            <ExamLink />
            <DictionaryLink />
            <SearchLink />
          </View>

        ),
      }}>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          title: "",
          // headerRight: () => (
          //   <RightHeaderButton />
          // ),
        })} />
      <Stack.Screen name="login" options={{
        title: "", headerBackVisible: true,
        headerLeft: () => (
          <LeftHeaderButton />
        )
      }} />
      <Stack.Screen name="register" options={{ title: "" }} />
      <Stack.Screen name="dictionary" options={{
        title: "",
      }} />
      <Stack.Screen name="search" options={{
        title: "",
      }} />
      <Stack.Screen name="word_data" options={{
        title: "",
      }} />
    </Stack >
  );
}



