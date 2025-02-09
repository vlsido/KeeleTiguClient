import { screen } from "@testing-library/react-native";
import { Word } from "../../../../../app/Dictionary";
import { renderWithProviders } from "../../../../../utils/test-utils";
import DictionaryItem from "../../../../screens/dictionary/DictionaryItem";

describe(
  "DictionaryItem",
  () => {
    test(
      "renders",
      () => {

        const word: Word = {
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

        renderWithProviders(<DictionaryItem {...word} index={0} />)

        expect(screen.getByTestId("DICTIONARY_ITEM.CONTAINER:VIEW"))
      }
    );
  }
)
