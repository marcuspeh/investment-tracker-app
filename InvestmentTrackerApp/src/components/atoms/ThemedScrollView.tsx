import { ScrollView, type ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <ScrollView style={[styles.body, { backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  },
});