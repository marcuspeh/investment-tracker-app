import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Portfolio from '@/watermelon/Portfolio';
import { InternalLink } from '@/components/atoms/InternalLink';
import { router } from 'expo-router';
import { FormatLargeNumber, ParsePrice, ParsePriceWithFormat, ParsePercentage } from '@/util/FormatNumber';

export type HoldingRowProps = {
	symbol: string
  shortName: string
  quantity: number
  price: number
  pricePercent: number
  marketValue: number
  marketValuePercent: number

  lightColor?: string;
  darkColor?: string;
};

export function HoldingRow({ symbol, shortName, quantity, price, pricePercent, marketValue, marketValuePercent, lightColor, darkColor }: HoldingRowProps) {
  const lightTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lightColor');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');
  const increaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseText')
  const decreaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseText')
  const neutralTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'neutralText')

  const getColor = (num: number) => {
    if (num < 0) {
      return decreaseTextColor
    } 
    if (num > 0) {
      return increaseTextColor
    }
    return neutralTextColor
  }

  const onClickPortfolio = () => {
    router.push({
      pathname: "/stock",
      // params: { "id": portfolio.id }
    });
  }

  return (
    <Pressable 
      onPress={onClickPortfolio} 
      style={[styles.container, { borderBottomColor: borderColor }]}
    >
      <View style={styles.leftColumn}>
        <View style={styles.symbol}>
          <ThemedText type='s1'>
            {symbol}
          </ThemedText>
          <ThemedText type='p2' style={{ color: lightTextColor }}>
            {shortName}
          </ThemedText>
        </View>
        <ThemedText type='p2' style={{ color: lightTextColor }}>
          {FormatLargeNumber(quantity)} units
        </ThemedText>
      </View>

      <View style={styles.rightColumn}>
        <ThemedText type='p2'>
          {ParsePriceWithFormat(price)}
        </ThemedText>
        <ThemedText type='l3' style={{ color: getColor(pricePercent) }}>
          {ParsePercentage(pricePercent)}
        </ThemedText>
      </View>

      <View style={styles.rightColumn}>
        <ThemedText type='p2'>
          {ParsePriceWithFormat(marketValue)}
        </ThemedText>
        <ThemedText type='l3' style={{ color: getColor(marketValuePercent) }}>
          {ParsePercentage(marketValuePercent)}
        </ThemedText>
      </View>

    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
		borderBottomWidth: 1,
		alignItems: "center",
		paddingBottom: 6,
		paddingTop: 10,
  },
  leftColumn: {
    display: "flex",
    alignItems: "flex-start",
    width: "auto"
  },
  rightColumn: {
    display: "flex",
    alignItems: "flex-end",
    width: "auto"
  },
  symbol: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  }
});