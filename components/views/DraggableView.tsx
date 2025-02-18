import {
  useCallback,
  useMemo
} from "react";
import {
  View,
  ViewProps
} from "react-native";
import {
  Gesture,
  GestureDetector
} from "react-native-gesture-handler";
import {
  runOnJS,
  useSharedValue
} from "react-native-reanimated";
import { Position } from "../../constants/types";

interface DraggableViewProps extends ViewProps {
  /**
  * @description used to cache previous {x, y} position
  */
  uid?: string;
}

function DraggableView(props: DraggableViewProps) {
  const getPosition = useCallback(() => {
    if (!props.uid) return { x: 0, y: 0 };

    const positionString = localStorage.getItem(`${props.uid}.position`);

    if (!positionString) return { x: 0, y: 0 };

    const position = JSON.parse(positionString);

    return position as Position;

  }, []);

  const originalPosition = useSharedValue<Position>(getPosition());
  const position = useSharedValue<Position>(getPosition());

  const savePosition = useCallback((position: Position) => {
    if (!props.uid) return;

    const positionString = JSON.stringify(position);

    localStorage.setItem(`${props.uid}.position`, positionString);

  }, [position]);

  const dragGesture = useMemo(() =>
    Gesture.Pan()
      .onBegin((event) => {
        position.value = {
          x: originalPosition.value.x + event.translationX,
          y: originalPosition.value.y + event.translationY
        };
      }).onUpdate((event) => {
        position.value = {
          x: originalPosition.value.x + event.translationX,
          y: originalPosition.value.y + event.translationY
        };
      }).onEnd(() => {
        originalPosition.value = position.value;
        runOnJS(savePosition)(position.value);
      }),
    [position, originalPosition]
  );


  return (
    <GestureDetector gesture={dragGesture}>
      <View
        style={props.style}
        collapsable={false}
      />
    </GestureDetector>
  )
}

export default DraggableView;
