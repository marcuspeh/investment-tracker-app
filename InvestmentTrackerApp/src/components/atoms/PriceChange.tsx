import { StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ParsePrice } from '@/util/FormatNumber';

export type PriceChangeLabelProps = ViewProps & {
  change: number;
  percent: number;
  lightColor?: string;
  darkColor?: string;
};

export function PriceChangeLabel({ style, change, percent, lightColor, darkColor, ...otherProps }: PriceChangeLabelProps) {
  let backgroundColor = ""
  let textColor = ""
  let iconName = "chevron-up"
  let iconColor = "green"
  if (change > 0) {  
    backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseBackgroundColor')
    textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseText')
  } else if (change < 0) {
    backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseBackgroundColor')
    textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseText')
    iconName = "chevron-down"
    iconColor = "red"
    change = -change
    percent = -percent
  } else {
    backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'neutralBackgroundColor')
    textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'neutralText')
  }


  return (
    <View style={[{ backgroundColor }, styles.container, style]} >
      <Ionicons name={iconName} size={16} color={iconColor}/>
      <ThemedText type='s1' style={styles.text}>
        {ParsePrice(change)} ({percent.toFixed(3)}%)
      </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  text: {
    display: "flex",
    paddingVertical: 4,
    paddingLeft: 34,
    paddingRight: 50,
  },
})
