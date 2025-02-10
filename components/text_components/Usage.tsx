import {
  StyleSheet,
  View
} from "react-native";
import Definitions from "./Definitions";
import Examples from "../screens/dictionary/Examples";

interface UsageProps {
  searchString: string | undefined,
  definitionData: {
    definitionText: string | undefined;
    fieldsOfKnowledge: string[];
    russianTranslations: string[];
  }[];
  examples: {
    estonianExample: string;
    russianTranslations: string[];
  }[] | undefined;
  index: number;
}

function Usage(props: UsageProps) {

  return (
    <View
      testID="USAGE.CONTAINER:VIEW"
      style={styles.container}>
      <Definitions
        definitionData={props.definitionData}
        usageIndex={props.index}
        searchString={props.searchString} />
      <Examples
        examples={props.examples}
        searchString={props.searchString}
      />
    </View>
  )
}

export default Usage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
})
