import {
  StyleSheet,
  Text,
  View
} from "react-native";
import RussianTranslation from "./RussianTranslation";

interface DefinitionProps {
  definitionData: {
    definitionText: string | undefined;
    fieldsOfKnowledge: string[];
    russianTranslations: string[];
  }[];
  usageIndex: number;
  searchString: string | undefined;
}

function Definitions(props: DefinitionProps) {
  return (
    <>
      {props.definitionData.map((
        definition, index
      ) => {
        const definitionMark: string = index === 0 ? `${props.usageIndex + 1}. ` : "\u25A0 ";

        return (
          <View key={index}>
            <Text style={styles.definitionText}>{definitionMark}{definition.definitionText}</Text>
            {definition.russianTranslations.map((
              translation, index
            ) => {
              return (
                <RussianTranslation
                  key={index}
                  translation={translation}
                  searchString={props.searchString} />
              );
            })}
          </View>

        )
      })}
    </>
  )


}

export default Definitions;

const styles = StyleSheet.create({
  definitionText: {
    color: "rgba(243, 245, 243, 0.8)",
    fontSize: 16
  },
})
