import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native';

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { InternalLink } from "@/components/InternalLink";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="h4">Stock Screen</ThemedText>
      <InternalLink href="/stock">Stock</InternalLink>
      <StatusBar style="auto" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
