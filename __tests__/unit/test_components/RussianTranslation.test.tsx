import RussianTranslation from "../../../components/text_components/RussianTranslation";
import { renderWithProviders, screen } from "../../../utils/test-utils";

describe(
  "RussianTranslation",
  () => {
    test(
      "Renders correctly",
      () => {
        const translation = "случаться";
        renderWithProviders(<RussianTranslation translation={translation} searchString="juhtuma" />);

        const translationText = screen.getByTestId("RUSSIAN_TRANSLATION.TRANSLATION:TEXT");
        expect(translationText).toBeOnTheScreen();

        expect(translationText).toHaveTextContent(translation);

      }
    );
  }
)
