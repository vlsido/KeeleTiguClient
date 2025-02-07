import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CommonColors } from "../../constants/Colors";
import RussianTranslation from "./RussianTranslation";

interface ExampleProps {
  estonianExample: string;
  russianTranslations: string[];
  searchString: string | undefined;
}

function Example(props: ExampleProps) {
  const estonianExampleWords = props.estonianExample.split(" ");

  const searchStringIndex = estonianExampleWords.findIndex((word) => word.toLowerCase() === props.searchString);

  return (
    <View style={styles.container} >
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
        data={props.russianTranslations}
        renderItem={({ item, index }) => {
          return <RussianTranslation
            key={index}
            translation={item}
            searchString={props.searchString}
            russianText={styles.russianExample}
            russianAccentText={styles.russianAccentText}
            highlightedText={styles.highlightedRussianText}
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
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "thin",
  },
  highlightedEstonianText: {
    backgroundColor: CommonColors.yellowA50,
  },
  highlightedRussianText: {
    flexDirection: "row",
    backgroundColor: CommonColors.yellowA50,
    marginRight: "auto",
  },
})
