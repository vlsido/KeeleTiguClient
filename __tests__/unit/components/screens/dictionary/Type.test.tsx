import Type from "../../../../../components/screens/dictionary/Type"
import { CommonColors } from "../../../../../constants/Colors"
import { renderWithProviders, screen } from "../../../../../utils/test-utils"

type Type = "s" | "v" | "adj" | "adv" | "konj" | undefined

describe(
  "Type",
  () => {
    test.each([
      { type: "s", expectedText: "substantiiv" },
      { type: "v", expectedText: "verb" },
      { type: "adj", expectedText: "adjektiiv" },
      { type: "adv", expectedText: "adverb" },
      { type: "konj", expectedText: "konjunktiiv" },
      { type: "wrong type", expectedText: "" },
      { type: undefined, expectedText: "" },
    ])(
      "renders correct type test for $type",
      ({ type, expectedText }) => {
        renderWithProviders(<Type type={type as Type} />);

        expect(screen.getByTestId("TYPE.WORD_TYPE:TEXT")).toHaveTextContent(expectedText);

      }
    )

    test(
      "renders with correct style",
      () => {
        renderWithProviders(<Type type="s" />);

        expect(screen.getByTestId("TYPE.WORD_TYPE:TEXT")).toHaveStyle({
          color: CommonColors.green,
          fontSize: 16
        });

      }
    );
  }
)
