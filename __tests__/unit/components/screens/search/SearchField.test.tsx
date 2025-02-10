import Search from "../../../../../app/search";
import { renderWithProviders, screen } from "../../../../../utils/test-utils";

describe(
  "SearchField",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Search />);

        const searchTextInput = screen.getByTestId("SEARCH_FIELD.QUERY:INPUT");

        const searchButton = screen.getByTestId("SEARCH_FIELD.FIND_WORD:PRESSABLE");

        expect(searchTextInput).toBeOnTheScreen();
        expect(searchButton).toBeOnTheScreen();
        expect(screen.getByTestId("SEARCH_FIELD.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );

  }
);
