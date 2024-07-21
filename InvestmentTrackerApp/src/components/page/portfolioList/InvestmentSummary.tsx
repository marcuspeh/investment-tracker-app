import { StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ParsePercentage, ParsePrice, ParsePriceWithFormat } from '@/util/FormatNumber';

export type InvestmentSummaryProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function InvestmentSummary({ lightColor, darkColor, ...otherProps }: InvestmentSummaryProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'componentBackgroundColor');
  const lightText = useThemeColor({ light: lightColor, dark: darkColor }, 'lightColor');

  const value: number = 232425.53
  const changeAmount: number = 5536
  const percent: number = (changeAmount / value) * 100

  let percentageColor: string = ""
  let iconName: "chevron-up" | "chevron-down" = "chevron-up"
  if (changeAmount > 0) {  
    percentageColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseText')
  } else if (changeAmount < 0) {
    percentageColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseText')
    iconName = "chevron-down"
  } else {
    percentageColor = useThemeColor({ light: lightColor, dark: darkColor }, 'neutralText')
  }

  return <View style={{
      ...styles.container,
      backgroundColor: backgroundColor,
    }}>
      <View style={styles.leftColumn}>
        <ThemedText type='p1' style={[{ color: lightText }, styles.label]}>
          Your Investments
        </ThemedText>
        <ThemedText type='h5'>
          {ParsePriceWithFormat(value)}
        </ThemedText>
      </View>
      <View style={styles.rightColumn}>
        <ThemedText type='p1' style={[{ color: lightText }, styles.label]}>
          Change
        </ThemedText>
        <ThemedText type='p1'>
          {ParsePriceWithFormat(changeAmount)}
        </ThemedText>
        <View style={styles.row}>
          <Ionicons name={iconName} size={16} color={percentageColor}/>
          <ThemedText type='l2' style={[{ color: percentageColor }, styles.label]}>
            {ParsePercentage(percent)}
          </ThemedText>
        </View>
      </View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 45,
  },
  rightColumn: {
    display: "flex",
    alignItems: "flex-end",
  },
  leftColumn: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    marginBottom: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  }
});