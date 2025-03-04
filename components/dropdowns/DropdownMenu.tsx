import {
  useCallback,
  useMemo
} from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";
import {
  atom,
  useAtom
} from "jotai";
import { CommonColors } from "../../constants/Colors";
import { KeyboardArrowDownIcon } from "../icons/KeyboardArrowDown";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";

interface DropdownMenuProps {
  testID: string;
  items: string[];
  onSelect: (item: string) => void;
  ariaLabel: string;
  defaultItem?: string;
  style?: StyleProp<ViewStyle>
  dropdownStyle?: StyleProp<ViewStyle>
}

function DropdownMenu(props: DropdownMenuProps) {
  const [selectedItem, setSelectedItem] =
    useAtom<string>(useMemo(() => atom<string>(props.defaultItem ?? props.items[0]), []));

  const [containerWidth, setContainerWidth] = useAtom<number>(useMemo(() => atom<number>(0), []));
  const [containerHeight, setContainerHeight] = useAtom<number>(useMemo(() => atom<number>(0), []));

  const [isDropdownVisible, setIsDropdownVisible] =
    useAtom<boolean>(useMemo(() => atom<boolean>(false), []));

  const rotation = useDerivedValue<number>(() => {
    return withTiming(isDropdownVisible
      ? 180
      : 0, { duration: 133, reduceMotion: ReduceMotion.System });
  });

  const onSelect = useCallback((item: string) => {
    setSelectedItem(item);
    setIsDropdownVisible(false);

    props.onSelect(item);
  }, [props.onSelect]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
    setContainerHeight(event.nativeEvent.layout.height);
  }, []);

  const caretAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` }
      ]
    }
  });

  return (
    <View
      onLayout={onLayout}
    >
      <Pressable
        testID={props.testID}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        style={props.style ?? styles.container}
        aria-expanded={isDropdownVisible}
        aria-label={props.ariaLabel}
        role="button"
      >
        <Text ellipsizeMode="tail">{selectedItem}</Text>
        <Animated.View
          style={caretAnimatedStyle}>
          <KeyboardArrowDownIcon />
        </Animated.View>
      </Pressable>
      {isDropdownVisible === true && (
        <View style={[
          props.dropdownStyle ?? styles.dropdownContainer,
          {
            width: containerWidth,
            transform: [{ translateY: containerHeight }]
          }
        ]}
          accessible={true}
          role="group"
        >
          {props.items.map((item) => {
            return (
              <Pressable
                key={item}
                onPress={() => onSelect(item)}
                role="menuitem"
              >
                <Text>{item}</Text>
              </Pressable>
            );
          })
          }
        </View>
      )
      }
    </View>
  );
}

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonColors.whiteAlternative,
    borderRadius: 5,
    minWidth: 72,
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownContainer: {
    backgroundColor: CommonColors.whiteAlternative,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    position: "absolute",
    gap: 5
  }
})
