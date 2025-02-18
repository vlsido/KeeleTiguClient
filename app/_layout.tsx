import ConfigContextProvider, {
  isUnderMaintenanceAtom
} from "../components/contexts/ConfigContext";
import AuthContextProvider from "../components/contexts/AuthContext";
import { Stack } from "expo-router";
import { CommonColors } from "../constants/Colors";
import { Provider } from "react-redux";
import store from "../components/store/store";
import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import HintContextProvider from "../components/store/HintContext/HintContext";
import { useAtomValue } from "jotai";
import Footer from "../components/Footer";
import LeftHeaderButton from "../components/buttons/LeftHeaderButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import {
  setExamDictionary,
  setMyDictionary
} from "../components/store/slices/dictionarySlice";
import { WordAndExamData } from "./dictionary";
import SettingsWrapper from "../components/wrappers/SettingsWrapper";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <ConfigContextProvider>
        <HintContextProvider>
          <AuthContextProvider>
            <SettingsWrapper>
              <>
                <RootLayoutStack />
                <Footer />
              </>
            </SettingsWrapper>
          </AuthContextProvider>
        </HintContextProvider >
      </ConfigContextProvider>
    </Provider>
  );
}

function RootLayoutStack() {
  const isUnderMaintenance = useAtomValue(isUnderMaintenanceAtom);

  const dispatch = useAppDispatch();

  const examDictionary = useAppSelector((state) => state.dictionary.examDictionary);


  useEffect(
    () => {
      dispatch({ type: "dictionary/fetchWordsRequest" })
      getExamDictionary();
    },
    []
  );

  useEffect(
    () => {
      if (examDictionary.length === 0) {
        const cachedWordsAndExamData = localStorage.getItem("wordsAndExamData");

        if (cachedWordsAndExamData != null) {
          const parsedCachedWordsAndExamData: WordAndExamData[] = JSON.parse(cachedWordsAndExamData);
          if (parsedCachedWordsAndExamData.length > 0) {
            dispatch(setExamDictionary(parsedCachedWordsAndExamData));
            return;

          }
        }
      }

      if (examDictionary.length < 3) {
        dispatch({ type: "dictionary/fetchRandomWords" });
        return;
      }

    },
    [
      examDictionary
    ]
  );

  function getExamDictionary() {
    const cached = localStorage.getItem("myDictionary");

    const myDictionaryCached = cached != null ? JSON.parse(cached) : [];

    dispatch(setMyDictionary(myDictionaryCached));
  }

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
        contentStyle: { backgroundColor: CommonColors.black },
        header: () => (
          <Header />

        )
      }}
      screenLayout={({ children }) => (
        <Suspense fallback={<Loading />}>{children}</Suspense>
      )}
    >
      <Stack.Screen
        redirect={!isUnderMaintenance}
        name="maintenance"
        options={{
          title: "",
        }} />
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="index"
        options={{
          title: "",
        }} />
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



