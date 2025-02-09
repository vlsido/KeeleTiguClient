import { renderWithProviders, screen } from "../../utils/test-utils";
import Header from "../../components/Header";

describe(
  "Header",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Header />);

        expect(screen.getByTestId("HEADER.CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );
  }
);
