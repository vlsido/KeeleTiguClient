import Definitions from "../../../components/text_components/Definitions";
import { renderWithProviders, screen } from "../../../utils/test-utils";

type DefinitionData = {
  definitionText: string | undefined;
  fieldsOfKnowledge: string[];
  russianTranslations: string[];
};

describe(
  "Definitions",
  () => {
    const mockData: DefinitionData[] = [
      {
        definitionText: "aset leidma, toimuma",
        fieldsOfKnowledge: [],
        russianTranslations: [
          "случаться"
        ]
      },
      {
        definitionText: "juhuslikult midagi tegema",
        fieldsOfKnowledge: [],
        russianTranslations: [
          "случаться"
        ]
      },
    ];

    test(
      "Renders correct number of items",
      () => {
        renderWithProviders(<Definitions
          definitionData={mockData}
          usageIndex={0}
          searchString="juhtuma"
        />);

        const items = screen.getAllByTestId(/DEFINITIONS\.CONTAINER:VIEW:ITEM-\d+/);

        expect(items).toHaveLength(mockData.length);
      }
    )
  }
);
