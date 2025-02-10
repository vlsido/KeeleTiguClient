import { renderWithProviders, screen } from "../../../utils/test-utils";
import Footer from "../../../components/Footer";

describe(
  "Footer",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Footer />);

        expect(screen.getByTestId("FOOTER.AUTHOR:TEXT")).toBeOnTheScreen();
        expect(screen.getByTestId("FOOTER.APP_NAME:TEXT")).toBeOnTheScreen();
        expect(screen.getByTestId("FOOTER.APP_BUILD:TEXT")).toBeOnTheScreen();
      }
    );
  }
);
