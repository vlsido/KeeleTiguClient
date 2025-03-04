import { View } from "react-native";
import Example from "../../text_components/Example";
import { i18n } from "../../store/i18n";

interface ExamplesProps {
  examples: {
    estonianExample: string;
    russianTranslations: string[];
  }[] | undefined;
  searchString: string | undefined;
}

function Examples(props: ExamplesProps) {
  if (!props.examples || props.examples.length === 0) {
    return null;
  }

  return (
    <View
      testID="EXAMPLES.CONTAINER:VIEW"
      accessible={true}
      role="list"
      aria-label={i18n.t("examples", { defaultValue: "Näited" })}
    >
      {props.examples.map((
        example, index
      ) => {
        return (
          <Example
            key={index}
            estonianExample={example.estonianExample}
            russianTranslations={example.russianTranslations}
            searchString={props.searchString} />
        );
      })}
    </View>
  )
}

export default Examples;
