import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack

      screenOptions={{
        headerTransparent: false,
        headerShown: true,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="Examinyasha" />
      <Stack.Screen name="Dictionary" />
    </Stack>
  );
}
