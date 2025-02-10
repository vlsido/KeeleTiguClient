import Hint from "../../../../components/store/HintContext/Hint";
import { hintTextAtom, isHintVisibleAtom } from "../../../../components/store/HintContext/hintAtoms";
import { renderWithProviders, screen } from "../../../../utils/test-utils";

describe(
  "Hint",
  () => {

    const hintText = "Hint Text!";

    test(
      "Renders if hint is visible",
      () => {
        renderWithProviders(
          <Hint />,
          {
            atomsState: [
              [
                isHintVisibleAtom,
                true
              ],
              [
                hintTextAtom,
                hintText
              ]
            ]
          }
        );

        expect(screen.getByTestId("HINT.ABSOLUTE_CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("HINT.ABSOLUTE_CONTAINER.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("HINT.ABSOLUTE_CONTAINER.CONTAINER.HINT:TEXT")).toHaveTextContent(hintText);


      }
    );

    test(
      "Doesn't render if hint is not visible",
      () => {
        renderWithProviders(
          <Hint />,
          {
            atomsState: [
              [
                isHintVisibleAtom,
                false
              ],
              [
                hintTextAtom,
                hintText
              ]
            ]
          }
        );

        expect(screen.queryByTestId("HINT.ABSOLUTE_CONTAINER:VIEW")).not.toBeOnTheScreen();
      }
    );
  }
);
