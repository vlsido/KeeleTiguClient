import {
  StyleSheet,
  Text,
  View
} from "react-native";
import RussianTranslation from "./RussianTranslation";
import { CommonColors } from "../../constants/Colors";

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

        const splitDefinitionWords = definition.definitionText?.split(" ");

        const searchStringIndex = splitDefinitionWords?.findIndex((word) => word === props.searchString);

        return (
          <View testID={`DEFINITIONS.CONTAINER:VIEW:ITEM-${index}`} key={index}>
            <Text style={styles.definitionText}>
              {definitionMark}
              {splitDefinitionWords?.map((
                word, wordIndex
              ) => {
                const separator = wordIndex < splitDefinitionWords.length ? " " : "";
                if (wordIndex === searchStringIndex) {
                  return [
                    <Text key={wordIndex} style={[
                      wordIndex === searchStringIndex && styles.highlightedWord

                    ]}>{word}</Text>,
                    <Text key={`${wordIndex}-separator`}>{separator}</Text>,
                  ]
                }
                return (
                  <Text key={wordIndex} style={[
                    wordIndex === searchStringIndex && styles.highlightedWord

                  ]}>{word}{separator}</Text>
                )
              })}
            </Text>
            {definition.russianTranslations.map((
              translation, index
            ) => {
              return (
                <RussianTranslation
                  key={index}
                  translation={translation}
                  searchString={props.searchString}
                  textStyle={styles.russianExample}
                  accentTextStyle={styles.russianAccentText}
                  highlightedTextStyle={styles.highlightedRussianText}
                  highlightedAccentTextStyle={styles.highlightedRussianAccentText}
                />
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
  highlightedWord: {
    backgroundColor: CommonColors.yellow,
    color: CommonColors.black,
    fontWeight: "bold"
  },
  russianExample: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: CommonColors.red,
    fontSize: 16,
    fontWeight: "bold"
  },
  highlightedRussianText: {
    flexDirection: "row",
    backgroundColor: CommonColors.olive,
    color: "black",
  },
  highlightedRussianAccentText: {
    flexDirection: "row",
    backgroundColor: CommonColors.olive,
    color: CommonColors.darkRed,
  },
})
