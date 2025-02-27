import {
  useCallback,
  useMemo
} from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";
import {
  atom,
  useAtom
} from "jotai";

interface CheckboxProps {
  testID: string;
  fillColor?: string;
  unFillColor?: string;
  isCheckedInitially?: boolean;
  style?: StyleProp<ViewStyle>;
  checkboxStyle?: StyleProp<TextStyle>;
  onPress: (isChecked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  const [isChecked, setIsChecked] =
    useAtom<boolean>(useMemo(() => atom<boolean>(props.isCheckedInitially ?? false), []));

  const onPress = useCallback(() => {
    const newIsChecked = !isChecked;

    setIsChecked(newIsChecked);

    props.onPress(newIsChecked);
  }, [isChecked, props.onPress]);

  return (
    <Pressable
      testID={props.testID}
      style={props.style ? props.style : styles.container}
      onPress={onPress}
    >
      <Text style={props.checkboxStyle ? props.checkboxStyle : styles.text}>
        {isChecked === true ? "✔" : ""}
      </Text>
    </Pressable>
  );
}

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16
  }
});
