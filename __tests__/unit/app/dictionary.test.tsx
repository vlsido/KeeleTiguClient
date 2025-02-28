import Dictionary from "../../../app/(tabs)/dictionary";
import { renderWithProviders, screen } from "../../../utils/test-utils";
import { DictionaryState } from "../../../components/store/slices/dictionarySlice";
import { renderRouter } from "expo-router/testing-library"
import RootLayout from "../../../app/_layout";
import RootLayoutTabs from "../../../app/(tabs)/_layout";


describe(
  "Dictionary",
  () => {
    test(
      "renders 'no words in dictionary' text when myDictionary length is 0",
      () => {
        const initialDictionary: DictionaryState = {
          myDictionary: [],
          examDictionary: [],
          words: []
        };
        renderRouter({
          _layout: () => <RootLayoutTabs />,
          dictionary: () => <Dictionary />
        }, {
          initialUrl: "/dictionary"
        });
        // renderWithProviders(
        //   <Dictionary />,
        //   {
        //     preloadedState: {
        //       dictionary: initialDictionary
        //     }
        //   }
        // );

        expect(screen.getByTestId("DICTIONARY.WORDS_EMPTY:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORDS_EMPTY:TEXT")).toBeOnTheScreen();
      }
    );

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

        renderWithProviders(
          <Dictionary />,
          {
            preloadedState: {
              dictionary: initialDictionary
            }
          }
        );

        expect(screen.getByTestId("DICTIONARY.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORD_COUNT:TEXT")).toBeOnTheScreen();
        expect(screen.getByTestId("DICTIONARY.WORDS_LIST:FLATLIST")).toBeOnTheScreen();
      }
    );
  }
);
