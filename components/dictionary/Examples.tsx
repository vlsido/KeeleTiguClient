import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import TextButton from "../TextButton";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSignal } from "@preact/signals-react";
import { CommonColors } from "@/constants/Colors";

interface ExamplesProps {
  examples?: {
    estonianExample: string;
    russianTranslations: string[];
  }[];
}

function Examples(props: ExamplesProps) {

  const examplesContainerHeight = useSignal<number>(0);

  const height = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: height.value,
    }
  });



  function triggerExamples() {

    height.value = withTiming(height.value === 0 ? examplesContainerHeight.value : 0, { duration: 100 });
    props.examples?.forEach((example) => {
      console.log(example);
    });
  }

  if (!props.examples || props.examples.length === 0) {
    return null;
  }

  return (
    <>
      <TextButton text="ava näited" textStyle={styles.openExamplesText} onPress={triggerExamples} label="Show examples" />
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View onLayout={(event) => { examplesContainerHeight.value = event.nativeEvent.layout.height }}>
          {props.examples?.map((example, index) => {
            const russianWordsElements: React.JSX.Element[] = [];

            example.russianTranslations.forEach((russianTranslation, index) => {
              const russianTextElements: React.JSX.Element[] = [];
              const russianTranslationWordParts = russianTranslation.split("\"");

              // Iterate over the word parts and style the accented letter
              russianTranslationWordParts.forEach((part, index) => {
                if (index === 0) {
                  // The first part before the first quote is normal
                  russianTextElements.push(<Text key={`russian-translation-${index}-current-word-part-${index}`} style={styles.russianExample}>{part}</Text>);

                } else {
                  // The part after the quote, where the first letter is the accent
                  russianTextElements.push(
                    <Text key={`russian-translation-${index}-current-word-part-${index}`} style={styles.russianExampleAccented}>{part[0]}
                    </Text>,
                    <Text key={`russian-translation-${index}-current-word-part-${index}-rest`} style={styles.russianExample}>{part.slice(1)}</Text>
                  );
                }
              });

              russianWordsElements.push(<View key={`russian-translation-${index}-current-word-translation-view`} style={{ flexDirection: "row", width: "100%" }}> {russianTextElements} </View>);

            });

            return (
              <View style={{ flexDirection: "column", width: "100%" }} key={`example-${index}`}>
                <Text style={styles.estonianExample} >{example.estonianExample}</Text>
                {russianWordsElements}
              </View>
            );
          })}
        </View>
      </Animated.View >
    </>
  )

}

export default Examples;

const styles = StyleSheet.create({
  openExamplesText: {
    color: "rgba(255, 0, 200, 0.7)",
    fontSize: 16
  },
  estonianExample: {
    color: CommonColors.white,
    fontSize: 16,
    fontWeight: "bold"
  },
  russianExample: {
    color: CommonColors.white,
    fontSize: 16,
    fontWeight: "thin"

  },
  russianExampleAccented: {
    color: CommonColors.red,
    fontSize: 16,
    fontWeight: "bold"
  },
});
