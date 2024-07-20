import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/atoms/ThemedText';
import { ThemedTextInput } from '@/components/atoms/ThemedTextInput';
import { useThemeColor } from '@/hooks/useThemeColor';

export type FormRowProps = {
	label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  errorText: string

  lightColor?: string;
  darkColor?: string;
};

export function FormRow({ label, value, onChange, errorText, placeholder, lightColor, darkColor }: FormRowProps) {
  const errorTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'errorText');

  return <View style={styles.container}>
		<View style={styles.labelRow}>
			<ThemedText type='l1'>
				{ label }
			</ThemedText>
      <ThemedTextInput
          height={40} 
          width={"70%"} 
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          hasError={errorText.length > 0}
        />
		</View>
    <View style={styles.errorRow}>
      <ThemedText type='l2' style={{ color: errorTextColor }}>
        { errorText }
      </ThemedText>
    </View>

  </View>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 7,
  },
  labelRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  errorRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    height: 16,
    position: "relative",
    paddingLeft: "30%"
  },
});