import { useSignalEffect } from "@preact/signals-react";
import {
  allWords,
  cachedWordsAndData
} from "../components/util/WordsUtil";
import { callCloudFunction } from "../components/util/CloudFunctions";
import { OnlyWordsResponse } from "./Dictionary";
import ConfigContextProvider from "../components/store/ConfigContext";
import HintContextProvider from "../components/store/HintContext";
import AuthContextProvider from "../components/store/AuthContext";
import WordsContextProvider from "../components/store/WordsContext";
import { Stack } from "expo-router";
import { CommonColors } from "../constants/Colors";
import { useConfig } from "../hooks/useConfig";
import { View } from "react-native";
import ExamLink from "../components/ExamLink";
import DictionaryLink from "../components/links/DictionaryLink";
import SearchLink from "../components/links/SearchLink";
import LeftHeaderButton from "../components/LeftHeaderButton";

export default function RootLayout() {

  useSignalEffect(() => {
    if (allWords.value.length === 0) {
      getAllWords();
    }
  });

  useSignalEffect(() => {
    if (cachedWordsAndData.value.length > 0) {
      localStorage.setItem(
        "cachedWordsAndData",
        JSON.stringify(cachedWordsAndData.value)
      );
    }
  });

  async function getAllWords() {
    if (localStorage.getItem("allWords") != null) {
      allWords.value = JSON.parse(localStorage.getItem("allWords") as string);
      return;
    }

    const response = await callCloudFunction(
      "GetDictionaryWordsOnly_Node",
      {}
    ) as OnlyWordsResponse | null;

    if (response != null) {
      allWords.value = response.dictionary;
      localStorage.setItem(
        "allWords",
        JSON.stringify(allWords.value)
      );
    }
  }

  return (
    <ConfigContextProvider>
      <HintContextProvider>
        <AuthContextProvider>
          <WordsContextProvider>
            <RootLayoutStack />
          </WordsContextProvider>
        </AuthContextProvider>
      </HintContextProvider >
    </ConfigContextProvider>
  );

}

function RootLayoutStack() {
  const { isUnderMaintenance } = useConfig();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: CommonColors.black,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
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
        redirect={!isUnderMaintenance}
        name="maintenance"
        options={{
          title: "",
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="index"
        options={({ navigation }) => ({
          title: "",
          // headerRight: () => (
          //   <RightHeaderButton />
          // ),
        })} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="dictionary"
        options={{
          title: "",
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="search"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="word_data"
        options={{
          title: "",
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="translate"
        options={{
          title: "",
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="login"
        options={{
          title: "", headerBackVisible: true,
          headerLeft: () => (
            <LeftHeaderButton />
          )
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="register"
        options={{ title: "" }} />


    </Stack >
  );
}



