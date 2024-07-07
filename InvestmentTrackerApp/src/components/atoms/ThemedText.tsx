import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'h4' | 'h5'  | 's1' | 's2' | 'l1' | 'l2' | 'l3' | 'p1' | 'p2' | 'b1' | 'b2' | 'b3';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'h4' ? styles.h4 : undefined,
        type === 'h5' ? styles.h5 : undefined,
        type === 's1' ? styles.s1 : undefined,
        type === 's2' ? styles.s2 : undefined,
        type === 'l1' ? styles.l1 : undefined,
        type === 'l2' ? styles.l2 : undefined,
        type === 'l3' ? styles.l3 : undefined,
        type === 'p1' ? styles.p1 : undefined,
        type === 'p2' ? styles.p2 : undefined,
        type === 'b1' ? styles.b1 : undefined,
        type === 'b2' ? styles.b2 : undefined,
        type === 'b3' ? styles.b3 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  h4: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 33,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 33,
  },
  s1: {
    fontSize: 15,
    letterSpacing: 0.15,
  },
  s2: {
    fontSize: 13,
    letterSpacing: 0.1,
  },
  l1: {
    fontSize: 15,
    fontWeight: 'semibold',
  },
  l2: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'semibold',
  },
  l3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'semibold',
  },
  p1: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  p2: {
    fontSize: 13,
    letterSpacing: 0.25,
  },
  b1: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  b2: {
    fontSize: 14,
    fontWeight: 'semibold',
    lineHeight: 24,
  },
  b3: {
    fontSize: 12,
    fontWeight: 'semibold',
    lineHeight: 24,
  }
});
