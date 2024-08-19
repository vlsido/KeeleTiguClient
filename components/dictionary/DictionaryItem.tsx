import { Word } from "@/app/dictionary";
import { StyleSheet, Text, View } from "react-native";
import Forms from "../text_components/Forms";
import { CommonColors } from "@/constants/Colors";

interface DictionaryItemProps extends Word {
  index: number;
}

function DictionaryItem({ word, type, forms, definition, russianTranslations, examples, index }: DictionaryItemProps) {

  const typeString = (() => {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case "s":
        return "substantiiv";
      case "v":
        return "verb";
      case "adjektiiv":
        return "omadussõna";
    }

    return undefined;
  })


  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10 }}>
      <Text style={styles.indexText}>{index}.</Text>
      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: CommonColors.white, borderRadius: 5, padding: 5 }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.wordText}>
              {word}{" "}
            </Text>
            <Forms forms={forms} />
          </View>
          <Text style={styles.typeText} >{typeString()}
          </Text>
          <Text style={styles.definitionText}>{definition}</Text>
        </View>
      </View>
    </View>
  );
}

export default DictionaryItem;

const styles = StyleSheet.create({
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  typeText: {
    color: CommonColors.green,
    fontSize: 16
  },
  definitionText: {
    color: "white",
    fontSize: 20
  },
  indexText: {
    color: CommonColors.white,
    fontSize: 14,
  },
  russianText: {
    color: "#004fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold"
  }
});
