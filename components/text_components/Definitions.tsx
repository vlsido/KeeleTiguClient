import {
  StyleSheet,
  Text,
  View
} from "react-native";
import RussianTranslation from "./RussianTranslation";
import { CommonColors } from "../../constants/Colors";
import { useAppSelector } from "../../hooks/storeHooks";
import { i18n } from "../store/i18n";

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
  const highlightRussianAccentLetters = useAppSelector((state) => state.settings.highlightRussianAccentLetters);

  return (
    <View
      accessible={true}
      role="list"
      aria-label={i18n.t("definitions", { defaultValue: "Definitsioonid" })}
    >
      {props.definitionData.map((
        definition, index
      ) => {
        const definitionMark: string = index === 0 ? `${props.usageIndex + 1}. ` : "\u25A0 ";

        const splitDefinitionWords = definition.definitionText?.split(" ");

        const searchStringIndex = splitDefinitionWords?.findIndex((word) => word === props.searchString);

        return (
          <View
            testID={`DEFINITIONS.CONTAINER:VIEW:ITEM-${index}`}
            key={index}
            accessible={true}
            role="listitem"
            accessibilityLabel={i18n.t("definition", { defaultValue: "Definitsioon" })}
          >
            <Text
              style={styles.definitionText}
            >
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
            <View
              accessible={true}
              aria-label={i18n.t("russian_translations", { defaultValue: "Vene tõlked" })}
              role="list" >
              {definition.russianTranslations.map((
                translation, index
              ) => {
                return (
                  <RussianTranslation
                    key={index}
                    translation={translation}
                    searchString={props.searchString}
                    textStyle={styles.russianExample}
                    accentTextStyle={
                      highlightRussianAccentLetters === true
                        ? styles.russianAccentText
                        : styles.russianExample
                    }
                    highlightedTextStyle={styles.highlightedRussianText}
                    highlightedAccentTextStyle={
                      highlightRussianAccentLetters === true
                        ? styles.highlightedRussianAccentText
                        : styles.highlightedRussianText
                    }
                  />
                );
              })}
            </View>
          </View>

        )
      })}
    </View>
  )
}

export default Definitions;

const styles = StyleSheet.create({
  definitionText: {
    color: "rgba(243, 245, 243, 0.8)",
    fontSize: 16
  },
  highlightedWord: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold"
  },
  russianExample: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold"
  },
  highlightedRussianText: {
    flexDirection: "row",
    backgroundColor: "white",
    color: "black",
  },
  highlightedRussianAccentText: {
    flexDirection: "row",
    backgroundColor: "white",
    color: "red",
  },
})
