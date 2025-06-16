import { SharedValue } from "react-native-reanimated";
import { renderWithProviders, screen, userEvent } from "../../../../../utils/test-utils";
import SendAnswerButton from "../../../../../components/screens/translate/SendAnswerButton";

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
      "renders correctly if textAnswerFieldContainerWidth is not 0",
      async () => {
        const user = userEvent.setup();

        renderWithProviders(<SendAnswerButton opacity={mockOpacity} onPress={mockFn} />);

        const button = screen.getByTestId("SEND_ANSWER_BUTTON.ICON_CONTAINER:PRESSABLE");

        expect(button).toBeOnTheScreen();

        expect(screen.getByTestId("SEND_ANSWER_BUTTON.SEND:ICON")).toBeOnTheScreen();

        await user.press(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
      }
    );

  }
);
