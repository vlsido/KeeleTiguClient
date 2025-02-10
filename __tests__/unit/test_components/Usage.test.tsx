import Usage from "../../../components/text_components/Usage";
import { renderWithProviders, screen } from "../../../utils/test-utils";

describe(
  "Usage",
  () => {
    const mockData = [
      {
        definitionText: "aset leidma",
        fieldsOfKnowledge: [],
        russianTranslations: [
          "случаться"
        ]
      }
    ];

    test(
      "Renders correctly",
      () => {
        renderWithProviders(<Usage
          searchString="juhtuma"
          definitionData={mockData}
          examples={undefined}
          index={0}
        />);

        expect(screen.getByTestId("USAGE.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    )
  }
);
