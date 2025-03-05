import { useWindowDimensions } from "react-native";

export function useOrientation() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return {
    isLandscape: screenWidth > screenHeight,
    isWide: ((screenHeight * 2) < screenWidth) || screenHeight < 350,
  };
}
