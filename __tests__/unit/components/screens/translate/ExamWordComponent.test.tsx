import { renderWithProviders, screen } from "../../../../../utils/test-utils";
import ExamWordComponent from "../../../../../components/screens/translate/ExamWordComponent";
import { twoWordsAndExamDataArray } from "../../../../../__mocks__/words";
import { WordAndExamData } from "../../../../../app/(tabs)/dictionary";

describe(
  "ExamWordComponent",
  () => {
    test(
      "renders correctly when no game words are available",
      () => {
        const gameWords: WordAndExamData[] = [];
        renderWithProviders(<ExamWordComponent mode="any" gameWords={gameWords} isAnswerVisible={false} />,);

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER:VIEW")).toBeOnTheScreen();

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER.LOADING:ACTIVITY_INDICATOR")).toBeOnTheScreen();
      }
    );

    test(
      "renders correctly when answer IS visible",
      () => {
        renderWithProviders(<ExamWordComponent mode="any" gameWords={twoWordsAndExamDataArray} isAnswerVisible={true} />,);

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.WORD_CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("EXAM_WORD_COMPONENT.ANSWER_CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );

    test(
      "renders correctly when answer IS NOT visible",
      () => {

        renderWithProviders(<ExamWordComponent mode="any" gameWords={twoWordsAndExamDataArray} isAnswerVisible={false} />,);

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.WORD_CONTAINER:VIEW")).toBeOnTheScreen();

        expect(screen.queryByTestId("EXAM_WORD_COMPONENT.ANSWER_CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    );
  }
);
