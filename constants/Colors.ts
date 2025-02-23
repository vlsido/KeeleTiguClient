/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";


// white: "#F3FFF3",

export const CommonColors = {
  white: "#F3FFF3",
  whiteA50: "#F3FFF380",
  whiteAlternative: "#E2D0D0",
  black: "#212221",
  blackA50: "#21222180",
  blackAlternative: "#221E29",
  green: "#62DD7D",
  olive: "#CCFF02",
  saladGreen: "#719525",
  yellow: "#EBA575",
  yellowA50: "#EBA57580",
  orange: "rgba(255, 180, 255, 1)",
  purple: "#8375EB",
  red: "#EB7575",
  darkRed: "#540808",
  blue: "#75B2EB",
  purpleA10: "rgba(255, 0, 200, 0.1)",
}

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
