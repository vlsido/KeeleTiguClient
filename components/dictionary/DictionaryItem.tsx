import { Word } from "@/app/dictionary";
import { StyleSheet, Text, View } from "react-native";
import Forms from "../text_components/Forms";
import { CommonColors } from "@/constants/Colors";
import Examples from "./Examples";
import KebabMenuButton from "./KebabMenuButton";
import Type from "./Type";

interface DictionaryItemProps extends Word {
  index: number;
}

function DictionaryItem(props: DictionaryItemProps) {

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{props.index}.</Text>
      <View style={styles.wordContainer}>
        <View>
          <Text style={styles.wordText}>
            {props.word}{" "}
          </Text>
          <Forms forms={props.forms} />
          <Type type={props.type} />
          {props.usages.map((usage, usageIndex) => {
            return (
              <>
                {usage.definitionData.map((definition, index) => {
                  const definitionIndexString: string = index === 0 ? `${usageIndex + 1}. ` : "\u25A0 "

                  return (
                    <>
                      <Text key={`definition-${index}`} style={styles.definitionText}>{definitionIndexString}{definition.definitionText}</Text>
                      {
                        definition.russianTranslations.map((translation, index) => {
                          const textElements: React.JSX.Element[] = [];
                          if (translation == null) {
                            console.log("Translation is null", translation);
                            return null;
                          }
                          const russianTranslationWordParts = translation.split("\"");

                          // Iterate over the word parts and style the accented letter
                          for (let i = 0; i < russianTranslationWordParts.length; i++) {
                            if (i === 0) {
                              // The first part before the first quote is normal
                              textElements.push(<Text key={`russian-translation-${index}-current-word-part-${i}`} style={styles.russianText}>{russianTranslationWordParts[i]}</Text>);
                            } else {
                              // The part after the quote, where the first letter is the accent
                              textElements.push(
                                <Text key={`russian-translation-${index}-current-word-part-${i}`} style={styles.russianAccentText}>{russianTranslationWordParts[i][0]}</Text>,
                                <Text key={`russian-translation-${index}-current-word-part-${i}-rest`} style={styles.russianText}>{russianTranslationWordParts[i].slice(1)}</Text>
                              );
                            }
                          }

                          return (
                            <View key={`russian-translation-${index}-current-word-translation-view`} style={styles.wordPartsTogether}> {textElements} </View>
                          )
                        })
                      }
                    </>
                  )
                })}
                <Examples examples={usage.examples} />
              </>
            )

          })}

        </View>
      </View>
      <KebabMenuButton word={props.word} />
    </View>
  );
}

export default DictionaryItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
  },
  wordContainer: {
    width: "95%",
  },
  wordText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  definitionText: {
    color: "rgba(243, 245, 243, 0.8)",
    fontSize: 16
  },
  indexText: {
    color: CommonColors.white,
    fontSize: 14,
    marginTop: 5,
    marginRight: 5
  },
  russianText: {
    color: CommonColors.purple,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianAccentText: {
    color: CommonColors.yellow,
    fontSize: 16,
    fontWeight: "bold"
  },
  wordPartsTogether: {
    flexDirection: "row",
  },
});
