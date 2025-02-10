import { StyleProp, ViewStyle } from "react-native";
import Index from "../../../app/index";
import { renderWithProviders, screen, userEvent } from "../../../utils/test-utils";
import { withReanimatedTimer } from "react-native-reanimated";

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
