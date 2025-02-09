import Index from "../../app/index";
import { renderWithProviders, screen } from "../../utils/test-utils";

describe(
  "Index",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Index />);
        expect(screen.getByTestId("INDEX.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );
  }
);
