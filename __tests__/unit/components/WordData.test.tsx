import { twoWordsAndDataArray } from "../../../__mocks__/words";
import WordData from "../../../components/WordData";
import { renderWithProviders, screen, userEvent } from "../../../utils/test-utils";

describe(
  "WordData",
  () => {
    test(
      "Renders correctly",
      () => {
        renderWithProviders(<WordData wordDataArray={twoWordsAndDataArray} searchString="karu" />);

        expect(screen.getByTestId("WORD_DATA.SCROLL_CONTAINER:VIEW")).toBeOnTheScreen();
        // expect(screen.getAllByTestId("WORD_DATA.SCROLL_CONTAINER.WORD:VIEW")).toBeOnTheScreen();
        // expect(screen.getAllByTestId("WORD_DATA.SCROLL_CONTAINER.WORD.USAGES:FLATLIST")).toBeOnTheScreen();
        // expect(screen.getAllByTestId("WORD_DATA.SCROLL_CONTAINER.ADD_WORD:PRESSABLE")).toBeOnTheScreen();
      }
    );

    test(
      "Does not render if wordDataArray is null",
      () => {
        renderWithProviders(<WordData wordDataArray={null} searchString="karu" />);

        expect(screen.queryByTestId("WORD_DATA.NOTHING_FOUND:TEXT")).not.toBeOnTheScreen();
        expect(screen.queryByTestId("WORD_DATA.SCROLL_CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    );

    test(
      "Renders 'nothing found' text if wordDataArray length is 0",
      () => {
        renderWithProviders(<WordData wordDataArray={[]} searchString="karu" />);

        expect(screen.getByTestId("WORD_DATA.NOTHING_FOUND:TEXT")).toBeOnTheScreen();
      }
    );
  }
);
