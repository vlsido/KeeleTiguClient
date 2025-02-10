import { Text } from "react-native";
import OptionButton from "../../../../../../../components/screens/index/games/translate/OptionButton"
import { renderWithProviders, screen, userEvent } from "../../../../../../../utils/test-utils"

describe(
  "OptionButton",
  () => {
    const mockFn = jest.fn();
    const expectedText = "option name here";
    test(
      "Renders correctly",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={true} onPress={mockFn} />);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE")).toBeOnTheScreen();

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER.SELECTED:VIEW")).toBeOnTheScreen();
      }
    );

    test(
      "renders with correct style when selected",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={true} onPress={mockFn} />);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE")).toHaveStyle({ opacity: 1 });
      }
    );

    test(
      "renders with correct style when not selected",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn} />);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE")).toHaveStyle({ opacity: 0.75 });
      }
    )

    test(
      "renders correct option text",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn} />);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER.OPTION_NAME:TEXT")).toHaveTextContent(expectedText);
      }
    );

    test(
      "renders children if any",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn}><Text>Just a child</Text></OptionButton>);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER.CHILDREN:VIEW")).toBeOnTheScreen();
      }
    );


    test(
      "Doesn't render children if they are not present",
      () => {

        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn} />);

        expect(screen.queryByTestId("OPTION_BUTTON.CONTAINER.CHILDREN:VIEW")).not.toBeOnTheScreen();
      }
    );

    test(
      "Renders icon when option is selected",
      () => {
        renderWithProviders(<OptionButton text={expectedText} isSelected={true} onPress={mockFn} />);

        expect(screen.getByTestId("OPTION_BUTTON.CONTAINER.SELECTED.CHECKMARK:ICON")).toBeOnTheScreen();
      }
    );

    test(
      "Doesn't render icon when option is not selected",
      () => {
        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn} />);

        expect(screen.queryByTestId("OPTION_BUTTON.CONTAINER.SELECTED.CHECKMARK:ICON")).not.toBeOnTheScreen();
      }
    );

    test(
      "Button press works when option is not selected",
      async () => {
        const user = userEvent.setup();

        renderWithProviders(<OptionButton text={expectedText} isSelected={false} onPress={mockFn} />);

        const button = screen.getByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE");

        await user.press(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
      }
    );

    test(
      "Button is disabled when option is selected",
      () => {
        renderWithProviders(<OptionButton text={expectedText} isSelected={true} onPress={mockFn} />);

        const button = screen.getByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE");

        expect(button).not.toHaveProp(
          "disabled",
          true
        );
      }
    );

  }
);
