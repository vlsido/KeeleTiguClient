import Example from "../../../components/text_components/Example"
import { renderWithProviders, screen } from "../../../utils/test-utils"

describe(
  "Example",
  () => {
    const mockEstonianExample = "mis siin juhtus?";
    const mockRussianTranslations = [
      "случаться",
      "быть"
    ];
    const mockSearchString = "juhtuma";
    test(
      "Renders correctly",
      () => {
        renderWithProviders(<Example
          estonianExample={mockEstonianExample}
          russianTranslations={mockRussianTranslations}
          searchString={mockSearchString} />);

        expect(screen.getByTestId("EXAMPLE.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("EXAMPLE.CONTAINER.TRANSLATIONS:FLATLIST")).toBeOnTheScreen();
      }
    )
  }
)
