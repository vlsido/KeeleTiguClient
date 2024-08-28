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

            return (
              <View style={{ flexDirection: "column", width: "100%" }} key={`example-${index}`}>
                <Text style={styles.estonianExample} >{example.estonianExample}</Text>
                {example.russianTranslations.map((translation, index) => {
                  const russianTranslation: string = translation.split("\"").join("");

                  return (
                    <Text key={`russian-translation-${index}-current-word-part-${index}`} style={styles.russianExample}>
                      {russianTranslation}
                    </Text>
                  )
                })}
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
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "thin",

  },
  russianExampleAccented: {
    color: CommonColors.red,
    fontSize: 16,
  },
});
