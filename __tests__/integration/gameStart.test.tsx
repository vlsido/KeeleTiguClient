import { screen, userEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../utils/test-utils";
import Index from "../../app/(tabs)/index";

describe(
  "Game start flow",
  () => {
    // Integration
    test(
      "Can start the 'Translate Words' game",
      async () => {
        const user = userEvent.setup();

        renderWithProviders(<Index />);

        expect(screen.getByTestId("INDEX.CONTAINER:VIEW")).toBeOnTheScreen();

        const options = screen.getAllByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE");

        const randomWordsModeButton = options[0];

        const wordsFromMyDictionaryModeButton = options[1];

        expect(randomWordsModeButton).toBeOnTheScreen();

        expect(wordsFromMyDictionaryModeButton).toBeOnTheScreen();

        await user.press(randomWordsModeButton);

        expect(screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER.START_CONTAINER:VIEW")).toBeOnTheScreen();

        const startGameButton = screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER.START_CONTAINER.START:PRESSABLE");

        expect(startGameButton).toBeOnTheScreen();

      },
      10000
    );
  }
);
