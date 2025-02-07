import {
  useCallback,
  useEffect,
  useMemo
} from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  atom,
  useAtom
} from "jotai";
import TextButton from "../../TextButton";
import Example from "../../text_components/Example";

interface ExamplesProps {
  examples: {
    estonianExample: string;
    russianTranslations: string[];
  }[] | undefined;
  searchString: string | undefined;
}

function Examples(props: ExamplesProps) {
  const [
    examplesContainerHeight,
    setExamplesContainerHeight
  ] = useAtom<number>(useMemo(
    () => atom<number>(0),
    []
  ));

  const getAreExamplesOpen = useCallback(
    () => {
      if (props.searchString === undefined) return false;

      const hasMatchInThisExample: boolean | undefined = props.examples?.some((example) => {
        if (example.estonianExample.includes(props.searchString!)) return true;

        if (example.russianTranslations.some((translation) => translation.includes(props.searchString!))) return true;

        return false;
      });

      return hasMatchInThisExample ?? false;
    },
    [
      props.searchString,
      props.examples,
    ]
  );

  const [
    areExamplesOpen,
    setAreExamplesOpen
  ] = useAtom<boolean>(useMemo(
    () => atom<boolean>(getAreExamplesOpen()),
    []
  ));



  const height = useSharedValue<number>(0);

  const toggleExamples = useCallback(
    (
      isOpen?: boolean, layoutHeight?: number
    ) => {
      const targetHeight = layoutHeight ? layoutHeight : examplesContainerHeight;

      if (isOpen != null) {
        height.value = withTiming(
          isOpen ? targetHeight : 0,
          { duration: 500, reduceMotion: ReduceMotion.System }
        );

        setAreExamplesOpen(isOpen ? true : false);
        return;
      }

      if (height.value === 0) {
        height.value = withTiming(
          targetHeight,
          { duration: 500, reduceMotion: ReduceMotion.System },
        );
        setAreExamplesOpen(true);
      } else {
        height.value = withTiming(
          0,
          { duration: 500, reduceMotion: ReduceMotion.System }
        );
        setAreExamplesOpen(false);
      }


    },
    [
      setAreExamplesOpen,
      height,
      examplesContainerHeight,
    ]
  );

  const onExamplesLayout = useCallback(
    (height: number) => {
      setExamplesContainerHeight(height);

      if (props.searchString === undefined) return;

      if (getAreExamplesOpen() === true) {
        toggleExamples(
          true,
          height
        );
      };

    },
    [
      setExamplesContainerHeight,
      props.searchString,
      props.examples,
      toggleExamples
    ]
  );

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: height.value,
    }
  });

  if (!props.examples || props.examples.length === 0) {
    return null;
  }

  return (
    <>
      <TextButton
        text={areExamplesOpen === false ? "ava näited" : "sulge näited"}
        textStyle={styles.openExamplesText}
        onPress={() => toggleExamples()}
        label={areExamplesOpen === false ? "ava näited" : "sulge näited"}
      />
      <Animated.View style={[
        animatedStyle,
        { overflow: "hidden" }
      ]}

      >
        <View
          onLayout={(event) => onExamplesLayout(event.nativeEvent.layout.height)}>
          {props.examples.map((
            example, index
          ) => {
            return (
              <Example
                key={index}
                estonianExample={example.estonianExample}
                russianTranslations={example.russianTranslations}
                searchString={props.searchString} />

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
});
