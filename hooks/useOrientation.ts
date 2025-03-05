import { useWindowDimensions } from "react-native";

export function useOrientation() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return {
    isLandscape: screenWidth > screenHeight,
    isWide: (screenHeight < screenWidth) && screenHeight < 400,
  };
}
