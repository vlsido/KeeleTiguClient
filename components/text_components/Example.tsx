import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CommonColors } from "../../constants/Colors";
import RussianTranslation from "./RussianTranslation";
import { useAppSelector } from "../../hooks/storeHooks";

interface ExampleProps {
  estonianExample: string;
  russianTranslations: string[];
  searchString: string | undefined;
}

function Example(props: ExampleProps) {
  const highlightRussianAccentLetters = useAppSelector((state) => state.settings.highlightRussianAccentLetters);

  const estonianExampleWords = props.estonianExample.split(" ");

  const searchStringIndex = estonianExampleWords.findIndex((word) => word.toLowerCase() === props.searchString);

  return (
    <View
      testID="EXAMPLE.CONTAINER:VIEW"
      style={styles.container} >
      <Text>
        {estonianExampleWords.map((
          word, index
        ) => {

          const endSeparator = estonianExampleWords.length === index + 1 ? "" : " ";
          if (props.searchString !== undefined && word.includes(props.searchString)) {
            return [
              <Text key={index} style={[
                styles.estonianExample,
                index === searchStringIndex && styles.highlightedEstonianText
              ]}>{word}</Text>,
              <Text key={`${index}-separator`}>{endSeparator}</Text>
            ];
          }

          return (
            <Text key={index} style={[
              styles.estonianExample,
              index === searchStringIndex && styles.highlightedEstonianText
            ]}>{word + endSeparator}</Text>
          );
        })
        }
      </Text>
      <FlatList
        testID="EXAMPLE.CONTAINER.TRANSLATIONS:FLATLIST"
        data={props.russianTranslations}
        renderItem={({ item, index }) => {
          return <RussianTranslation
            key={index}
            translation={item}
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
        }}
      />
    </View>
  );

}

export default Example;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%"
  },
  estonianExample: {
    color: CommonColors.white,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianExample: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 16,
    fontWeight: "thin",
  },
  russianAccentText: {
    color: "red",
    fontSize: 16,
    fontWeight: "thin",
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
  highlightedEstonianText: {
    color: "black",
    backgroundColor: "white",
  },
})
