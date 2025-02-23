import { screen, userEvent, waitFor } from "@testing-library/react-native";
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

        // const expandingViewStyle = { height: 0 };

        const translationGameButton = screen.getByTestId("TRANSLATE_WORDS_GAME.GAME:PRESSABLE");

        const expandingView = screen.getByTestId("TRANSLATE_WORDS_GAME.EXPANDING:VIEW");

        expect(screen.getByTestId("INDEX.CONTAINER:VIEW")).toBeOnTheScreen();

        expect(translationGameButton).toBeOnTheScreen();

        expect(expandingView).toBeOnTheScreen();

        await user.press(translationGameButton);

        const options = screen.getAllByTestId("OPTION_BUTTON.CONTAINER:PRESSABLE");

        const randomWordsModeButton = options[0];

        const wordsFromMyDictionaryModeButton = options[1];

        expect(randomWordsModeButton).toBeOnTheScreen();

        expect(wordsFromMyDictionaryModeButton).toBeOnTheScreen();

        await user.press(randomWordsModeButton);

        const startGameButton = screen.getByTestId("TRANSLATE_WORDS_GAME.EXPANDING.START:PRESSABLE");

        expect(startGameButton).toBeOnTheScreen();

      }
    );
  }
);
