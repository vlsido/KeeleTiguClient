import Forms from "../../../components/text_components/Forms";
import { renderWithProviders, screen } from "../../../utils/test-utils";

describe(
  "Forms",
  () => {
    const forms = "mine[ma m'inn[a lähe[b lähe[me_&_läh[me m'in[dud"

    test(
      "Renders correctly",
      () => {
        renderWithProviders(<Forms forms={forms} />);

        expect(screen.getByTestId("FORMS.CONTAINER:VIEW")).toBeOnTheScreen();
        expect(screen.getByTestId("FORMS.CONTAINER.FORMS:TEXT")).toBeOnTheScreen();
      }
    );

    test(
      "Doesn't render if forms is undefined",
      () => {

        renderWithProviders(<Forms forms={undefined} />);

        expect(screen.queryByTestId("FORMS.CONTAINER:VIEW")).not.toBeOnTheScreen();
        expect(screen.queryByTestId("FORMS.CONTAINER.FORMS:TEXT")).not.toBeOnTheScreen();
      }
    );

    test(
      "Fixes forms string",
      () => {
        const fixedForms = "mine[ma m'inn[a lähe[b lähe[me ~ läh[me m'in[dud"

        renderWithProviders(<Forms forms={forms} />);

        expect(screen.getByTestId("FORMS.CONTAINER.FORMS:TEXT")).toHaveTextContent(fixedForms);
      }
    );
  }
)
