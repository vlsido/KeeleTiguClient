import { SharedValue } from "react-native-reanimated";
import { renderWithProviders, screen, userEvent } from "../../../../../utils/test-utils";
import SendAnswerButton from "../../../../../components/screens/translate/SendAnswerButton";
import { textAnswerFieldContainerWidthAtom } from "../../../../../components/screens/translate/translateAtoms";

describe(
  "SendAnswerButton",
  () => {

    const mockFn = jest.fn();
    const mockOpacity: SharedValue<number> = {
      value: 1,
      get: mockFn,
      set: mockFn,
      addListener: mockFn,
      removeListener: mockFn,
      modify: mockFn
    };

    test(
      "renders null if textAnswerFieldContainerWidth is 0",
      () => {
        renderWithProviders(
          <SendAnswerButton opacity={mockOpacity} onPress={mockFn} />,
          {
            atomsState: [
              [
                textAnswerFieldContainerWidthAtom,
                0
              ]
            ]
          }
        );

        expect(screen.queryByTestId("SEND_ANSWER_BUTTON.ICON_CONTAINER:PRESSABLE")).not.toBeOnTheScreen();
      }
    );

    test(
      "renders correctly if textAnswerFieldContainerWidth is not 0",
      async () => {
        const user = userEvent.setup();

        renderWithProviders(
          <SendAnswerButton opacity={mockOpacity} onPress={mockFn} />,
          {
            atomsState: [
              [
                textAnswerFieldContainerWidthAtom,
                // Any value but 0
                100
              ]
            ]
          }
        );

        const button = screen.getByTestId("SEND_ANSWER_BUTTON.ICON_CONTAINER:PRESSABLE");

        expect(button).toBeOnTheScreen();

        expect(screen.getByTestId("SEND_ANSWER_BUTTON.SEND:ICON")).toBeOnTheScreen();

        await user.press(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
      }
    );

  }
);
