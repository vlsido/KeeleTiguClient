import { twoWordsAndDataArray } from "../../../../../__mocks__/words";
import FoundArticlesCounter from "../../../../../components/screens/word_data/FoundArticlesCounter";
import { renderWithProviders, screen } from "../../../../../utils/test-utils";

describe(
  "FoundArticlesCounter",
  () => {
    test(
      "Does not render if wordData is null",
      () => {
        renderWithProviders(<FoundArticlesCounter wordData={null} />);

        expect(screen.queryByTestId("FOUND_ARTICLES_COUNTER.CONTAINER:VIEW")).not.toBeOnTheScreen();
        expect(screen.queryByTestId("FOUND_ARTICLES_COUNTER.COUNT:TEXT")).not.toBeOnTheScreen();
      }
    );

    test(
      "Does not render if wordData length is 0",
      () => {
        renderWithProviders(<FoundArticlesCounter wordData={[]} />);

        expect(screen.queryByTestId("FOUND_ARTICLES_COUNTER.CONTAINER:VIEW")).not.toBeOnTheScreen();
        expect(screen.queryByTestId("FOUND_ARTICLES_COUNTER.COUNT:TEXT")).not.toBeOnTheScreen();
      }
    );

    test(
      "Render correctly if wordData is present",
      () => {
        renderWithProviders(<FoundArticlesCounter wordData={twoWordsAndDataArray} />);

        expect(screen.getByTestId("FOUND_ARTICLES_COUNTER.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("FOUND_ARTICLES_COUNTER.COUNT:TEXT")).toBeOnTheScreen();
      }
    );
  }
);
