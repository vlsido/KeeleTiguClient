import { View } from "react-native";
import Example from "../../text_components/Example";

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
    <View testID="EXAMPLES.CONTAINER:VIEW">
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
