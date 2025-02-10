import { renderWithProviders, screen } from "../../../../utils/test-utils";
import Examples from "../../../../components/screens/dictionary/Examples";

describe(
  "Examples",
  () => {
    test(
      "renders correctly if examples are present",
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

    test(
      "Does not render if examples is undefined",
      () => {

        renderWithProviders(<Examples
          examples={undefined}
          searchString="karu"
        />);

        expect(screen.queryByTestId("EXAMPLES.CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    )

    test(
      "Does not render if examples length is 0",
      () => {
        renderWithProviders(<Examples
          examples={[]}
          searchString="karu"
        />);

        expect(screen.queryByTestId("EXAMPLES.CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    )
  }
);
