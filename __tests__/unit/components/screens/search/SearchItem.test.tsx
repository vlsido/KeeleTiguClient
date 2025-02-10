import { renderWithProviders, screen } from "../../../../../utils/test-utils";
import SearchItem from "../../../../../components/screens/search/SearchItem";

describe(
  "SearchItem",
  () => {
    test(
      "renders correctly",
      () => {
        const mockFn = jest.fn();

        renderWithProviders(<SearchItem index={0} word="karu" onPress={mockFn} />);


        expect(screen.getByTestId("SEARCH_ITEM.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("SEARCH_ITEM.WORD:PRESSABLE")).toBeOnTheScreen();
      }
    );
  }
);
