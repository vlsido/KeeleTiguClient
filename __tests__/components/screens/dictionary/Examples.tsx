import { renderWithProviders, screen } from "../../../../utils/test-utils";
import Examples from "../../../../components/screens/dictionary/Examples";

describe(
  "Examples",
  () => {
    test(
      "renders correctly",
      () => {
        const examples = [
          {
            estonianExample: "tugev kui karu",
            russianTranslations: [
              "силён, как медведь"
            ]
          }
        ];

        renderWithProviders(<Examples
          examples={examples}
          searchString="karu"
        />);

        expect(screen.getByTestId("EXAMPLES.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    )
  }
);
