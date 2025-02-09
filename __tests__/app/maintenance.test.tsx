import Maintenance from "../../app/maintenance";
import { renderWithProviders, screen } from "../../utils/test-utils";

describe(
  "Maintenance",
  () => {
    test(
      "renders correctly",
      () => {
        renderWithProviders(<Maintenance />);

        expect(screen.getByTestId("MAINTENANCE.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("MAINTENANCE.CONTAINER:TEXT")).toBeOnTheScreen();
      }
    );
  }
);
