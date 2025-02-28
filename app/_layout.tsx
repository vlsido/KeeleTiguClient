import ConfigContextProvider, {
  isUnderMaintenanceAtom
} from "../components/contexts/ConfigContext";
import AuthContextProvider from "../components/contexts/AuthContext";
import { Stack } from "expo-router";
import { CommonColors } from "../constants/Colors";
import { Provider } from "react-redux";
import store from "../components/store/store";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector
} from "../hooks/storeHooks";
import HintContextProvider from "../components/store/HintContext/HintContext";
import { useAtomValue } from "jotai";
import LeftHeaderButton from "../components/buttons/LeftHeaderButton";
import {
  setExamDictionary,
  setMyDictionary
} from "../components/store/slices/dictionarySlice";
import { WordAndExamData } from "./(tabs)/dictionary";
import SettingsMenu from "../components/settings/SettingsMenu";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ConfigContextProvider>
          <HintContextProvider>
            <>
              <SettingsMenu />
              <RootLayoutStack />
            </>
          </HintContextProvider >
        </ConfigContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export function RootLayoutStack() {
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
      }}
    >
      <Stack.Screen
        redirect={isUnderMaintenance}
        name="(tabs)"
        options={{ headerShown: false }} />
      <Stack.Screen
        redirect={!isUnderMaintenance}
        name="maintenance"
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



