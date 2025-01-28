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
import { Provider } from "react-redux";
import store from "../components/store/store";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/storeHooks";



export default function RootLayout() {


  return (
    <Provider store={store}>
      <ConfigContextProvider>
        <HintContextProvider>
          <AuthContextProvider>
            <WordsContextProvider>
              <RootLayoutStack />
            </WordsContextProvider>
          </AuthContextProvider>
        </HintContextProvider >
      </ConfigContextProvider>
    </Provider>
  );

}

function RootLayoutStack() {
  const { isUnderMaintenance } = useConfig();

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch({ type: "dictionary/fetchWordsRequest" })
    },
    []
  );

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



