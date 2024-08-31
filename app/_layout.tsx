import ExamLink from "@/components/ExamLink";
import LeftHeaderButton from "@/components/LeftHeaderButton";
import AuthContextProvider from "@/components/store/AuthContext";
import HintContextProvider from "@/components/store/HintContext";
import { CommonColors } from "@/constants/Colors";
import { Stack } from "expo-router";
import WordsContextProvider from "@/components/store/WordsContext";
import DictionaryLink from "@/components/links/DictionaryLink";
import SearchLink from "@/components/links/SearchLink";
import { View } from "react-native";
import { allWords, cachedWordsAndData } from "@/components/util/WordsUtil";
import { callCloudFunction } from "@/components/util/CloudFunctions";
import { useSignalEffect } from "@preact/signals-react";
import { OnlyWordsResponse } from "./dictionary";
import ConfigContextProvider, { ConfigContext } from "@/components/store/ConfigContext";
import { useContext } from "react";

export default function RootLayout() {

  useSignalEffect(() => {
    if (allWords.value.length === 0) {
      getAllWords();
    }
  });

  useSignalEffect(() => {
    if (cachedWordsAndData.value.length > 0) {
      localStorage.setItem("cachedWordsAndData", JSON.stringify(cachedWordsAndData.value));
    }
  });

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
  const { isUnderMaintenance } = useContext(ConfigContext);

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



