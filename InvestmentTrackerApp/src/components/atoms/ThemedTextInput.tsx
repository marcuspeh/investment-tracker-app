import { TextInput, TextInputProps, DimensionValue, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  width: DimensionValue
  height: DimensionValue
  hasError: boolean

  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({ lightColor, darkColor, height, width, hasError, ...rest }: ThemedTextInputProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const errorBorderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'errorBorderColor');

  return (
    <TextInput
      style={[
        styles.input,
        {
          width: width,
          height: height,
          color: textColor,
          borderColor: hasError ? errorBorderColor : "gray",
        }
      ]}
      placeholderTextColor={`${textColor}88`}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
