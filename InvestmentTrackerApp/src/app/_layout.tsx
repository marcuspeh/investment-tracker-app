import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Investing Tracker App" }} />
      <Stack.Screen name="stock" options={{ title: "Stocks" }}/>
      <Stack.Screen name="portfolio/edit" options={{ title: "Portfolio" }}/>
    </Stack>
  );
}
