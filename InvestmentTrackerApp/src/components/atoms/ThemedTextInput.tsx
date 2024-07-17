import { TextInput, TextInputProps, DimensionValue, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  width: DimensionValue
  height: DimensionValue

  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({ lightColor, darkColor, height, width, ...rest }: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  return (
    <TextInput
      style={[
        styles.input,
        {
          width: width,
          height: height,
          color: color,
        }
      ]}
      placeholderTextColor={`${color}88`}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
