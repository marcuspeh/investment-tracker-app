import { DimensionValue, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '../atoms/ThemedText';

export type ThemedButtonProps = {
  buttonOnPress: () => void
  backgroundColor: string
  textColor: string
  label: string
  width: DimensionValue
  height: DimensionValue
  labelType: 'b1' | 'b2' | 'b3'
};

export function ThemedButton({ buttonOnPress, backgroundColor, textColor, label, width, height, labelType }: ThemedButtonProps) {
  return (
    <Pressable 
      onPress={buttonOnPress}
      style={{
        ...styles.button,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
      }}
    >
      <ThemedText
        type={labelType}
        style={{
          ...styles.buttonText,
          color: textColor,
        }}
      > 
        {label} 
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    textTransform: "uppercase"
  }
});
