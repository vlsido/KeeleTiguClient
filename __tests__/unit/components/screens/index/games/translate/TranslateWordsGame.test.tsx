import TranslateWordsGame from "../../../../../../../components/screens/index/games/translate/TranslateWordsGame";
import { renderWithProviders, screen } from "../../../../../../../utils/test-utils";

describe(
  "TranslateWordsGame",
  () => {
    test(
      "Renders correctly",
      () => {

        renderWithProviders(<TranslateWordsGame />);

        expect(screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER:VIEW")).toBeOnTheScreen();

        const numberOfWordsInput = screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER.NUMBER_OF_WORDS_CONTAINER.NUMBER:INPUT");

        expect(numberOfWordsInput).toBeOnTheScreen();

        expect(numberOfWordsInput).toHaveProp("value", "20");

        const checkbox = screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER.NUMBER_OF_WORDS.UNLIMITED_WORDS.CHECKBOX:PRESSABLE");

        expect(checkbox).toBeOnTheScreen();

        expect(screen.getByTestId("TRANSLATE_WORDS_GAME.CONTAINER.START_CONTAINER:VIEW")).toBeOnTheScreen();

      }
    );
  }
);
