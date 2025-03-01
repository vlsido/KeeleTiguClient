import { screen } from "@testing-library/react-native";
import { Word } from "../../../../../app/(tabs)/dictionary";
import { renderWithProviders } from "../../../../../utils/test-utils";
import DictionaryItem from "../../../../../components/screens/dictionary/DictionaryItem";

describe(
  "DictionaryItem",
  () => {
    test(
      "renders correctly",
      () => {

        const word: Word = {
          index: 1111,
          word: "karu",
          type: "s",
          forms: "karu, karu, karu",
          usages: [
            {
              definitionData: [
                {
                  definitionText: undefined,
                  fieldsOfKnowledge: [],
                  russianTranslations: [
                    "медведь"
                  ]
                }
              ]
            }
          ]
        };

        renderWithProviders(<DictionaryItem {...word} length={0} />)

        expect(screen.getByTestId("DICTIONARY_ITEM.CONTAINER:VIEW"))
      }
    );
  }
)
