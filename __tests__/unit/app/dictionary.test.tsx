import Dictionary from "../../../app/(tabs)/dictionary";
import { DictionaryState } from "../../../components/store/slices/dictionarySlice";
import { renderRouter, screen } from "expo-router/testing-library"
import RootLayoutTabs from "../../../app/(tabs)/_layout";
import { Provider } from "react-redux";
import { setupStore } from "../../../components/store/store";

import { Provider as JotaiProvider } from "jotai";
import { View } from "react-native";
import { useHydrateAtoms } from "jotai/utils";

function HydrateAtoms({ initialValues, children }) {
  useHydrateAtoms(initialValues);
  return children;
}

function AtomsProvider({ initialValues, children }) {
  return (
    <JotaiProvider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </JotaiProvider>
  )
}
describe(
  "Dictionary",
  () => {

    const MockComponent = jest.fn(() => <View />);
    test(
      "renders 'no words in dictionary' text when myDictionary length is 0",
      () => {
        const initialDictionary: DictionaryState = {
          myDictionary: [],
          examDictionary: [],
          words: []
        };

        const store = setupStore({
          settings: { language: "ee", highlightRussianAccentLetters: true },
          dictionary: initialDictionary
        });

        renderRouter(
          {
            _layout: () => (
              <Provider store={store}>
                <AtomsProvider initialValues={[]} >
                  <RootLayoutTabs />
                </AtomsProvider>
              </Provider>),
            "dictionary": () => <Dictionary />,
            "index": MockComponent,
            "search": MockComponent
          },
          { initialUrl: "/dictionary" }
        );



        expect(screen.getByTestId("DICTIONARY.WORDS_EMPTY:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORDS_EMPTY:TEXT")).toBeOnTheScreen();
      }
    );
    //
    test(
      "renders words list when myDictionary not empty",
      () => {

        const initialDictionary: DictionaryState = {
          myDictionary: [
            {
              index: 17062,
              word: "karu",
              type: "s",
              forms: "karu, karu, karu",
              usages: [
                {
                  definitionData: [
                    {
                      definitionText: undefined,
                      fieldsOfKnowledge: [],
                      russianTranslations: []

                    }
                  ]
                }
              ]
            }
          ],
          examDictionary: [],
          words: []
        };

        const store = setupStore({ dictionary: initialDictionary });
        renderRouter(
          {
            _layout: () => (
              <Provider store={store}>
                <AtomsProvider initialValues={[]} >
                  <RootLayoutTabs />
                </AtomsProvider>
              </Provider>),
            "dictionary": () => <Dictionary />,
            "index": MockComponent,
            "search": MockComponent
          },
          { initialUrl: "/dictionary" }
        );



        expect(screen.getByTestId("DICTIONARY.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORD_COUNT:TEXT")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORDS_LIST:FLATLIST")).toBeOnTheScreen();
      }
    );
  }
);
