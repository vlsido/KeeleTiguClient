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

        expect(screen.getByTestId("TRANSLATE_WORDS_GAME.GAME:PRESSABLE")).toBeOnTheScreen();

        expect(screen.getByTestId("TRANSLATE_WORDS_GAME.GAME.TRANSLATION:ICON")).toBeOnTheScreen();

        const expandingView = screen.getByTestId("TRANSLATE_WORDS_GAME.EXPANDING:VIEW");

        expect(expandingView).toBeOnTheScreen();

        expect(expandingView).toHaveStyle({ height: 0 });

      }
    );
  }
);
