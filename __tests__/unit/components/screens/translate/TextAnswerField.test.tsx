import { RefObject } from "react";
import { renderWithProviders, screen } from "../../../../../utils/test-utils";
import TextAnswerField from "../../../../../components/screens/translate/TextAnswerField";
import { TextInput } from "react-native";

describe(
  "TextAnswerField",
  () => {
    const mockFn = jest.fn();
    const inputRef: RefObject<TextInput> = {
      current: null
    }

    test(
      "Renders correctly",
      () => {
        renderWithProviders(<TextAnswerField
          textInputRef={inputRef}
          isAnswerValid={true}
          onSubmit={mockFn}
          onFocus={mockFn}
        />);

        expect(screen.getByTestId("TEXT_ANSWER_FIELD.CONTAINER:VIEW")).toBeOnTheScreen();

      }
    );
  }
);
