import Search from "../../../app/search";
import { renderWithProviders, screen } from "../../../utils/test-utils";

describe(
  "Search",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Search />);
        expect(screen.getByTestId("SEARCH.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );
  }
);
