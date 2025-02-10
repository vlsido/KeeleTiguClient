import { renderWithProviders, screen } from "../../../../../utils/test-utils";
import ExamWordComponent from "../../../../../components/screens/translate/ExamWordComponent";
import { gameWordsAtom } from "../../../../../components/screens/translate/translateAtoms";
import { twoWordsAndExamDataArray } from "../../../../../__mocks__/words";
import { WordAndExamData } from "../../../../../app/dictionary";

describe(
  "ExamWordComponent",
  () => {
    test(
      "renders correctly when no game words are available",
      () => {
        const gameWords: WordAndExamData[] = [];
        renderWithProviders(
          <ExamWordComponent mode="any" isAnswerVisible={false} />,
          {
            atomsState: [
              [
                gameWordsAtom,
                gameWords
              ]
            ]
          }
        );

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER:VIEW")).toBeOnTheScreen();

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.NO_GAME_WORDS_CONTAINER.LOADING:ACTIVITY_INDICATOR")).toBeOnTheScreen();
      }
    );

    test(
      "renders correctly when answer IS visible",
      () => {
        renderWithProviders(
          <ExamWordComponent mode="any" isAnswerVisible={true} />,
          {
            atomsState: [
              [
                gameWordsAtom,
                twoWordsAndExamDataArray
              ]
            ]
          }
        );

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.WORD_CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("EXAM_WORD_COMPONENT.ANSWER_CONTAINER:VIEW")).toBeOnTheScreen();
      }
    );

    test(
      "renders correctly when answer IS NOT visible",
      () => {

        renderWithProviders(
          <ExamWordComponent mode="any" isAnswerVisible={false} />,
          {
            atomsState: [
              [
                gameWordsAtom,
                twoWordsAndExamDataArray
              ]
            ]
          }
        );

        expect(screen.getByTestId("EXAM_WORD_COMPONENT.WORD_CONTAINER:VIEW")).toBeOnTheScreen();

        expect(screen.queryByTestId("EXAM_WORD_COMPONENT.ANSWER_CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    );
  }
);
