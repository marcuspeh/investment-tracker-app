import { DimensionValue, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '../atoms/ThemedText';

export type ThemedButtonProps = {
  buttonOnPress: () => void
  backgroundColor: string
  textColor: string
  label: string
  width: DimensionValue
  height: DimensionValue
};

export function ThemedButton({ buttonOnPress, backgroundColor, textColor, label, width, height}: ThemedButtonProps) {
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
        type="b3"
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
