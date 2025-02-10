import { Pressable, View } from "react-native";
import { TrashIcon } from "../icons/TrashIcon";

interface TrashButton {
  onPress: () => void
}

function TrashButton() {

  return (
    <Pressable>
      <TrashIcon />
    </View>
  );
}
