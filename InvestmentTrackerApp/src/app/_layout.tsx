import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Investing Tracker App" }} />
      <Stack.Screen name="stock"/>
      <Stack.Screen name="portfolio/edit"/>
      <Stack.Screen name="portfolio/detail"/>
    </Stack>
  );
}
