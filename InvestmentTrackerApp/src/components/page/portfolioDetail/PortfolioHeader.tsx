import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '../../atoms/ThemedText';
import { ParsePrice } from '@/util/FormatNumber';
import { PriceChangeLabel } from '../../atoms/PriceChange';

export type PortfolioHeaderProps = {
  marketPrice: number,
  changeAmount: number,

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioHeader({ marketPrice, changeAmount, lightColor, darkColor }: PortfolioHeaderProps) {
  const headerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lightColor');
  const changePercent = changeAmount / marketPrice

  return (
  <View style={styles.container}>
    <ThemedText type="s2" style={{...styles.text, color: headerColor}}>MARKET VALUE"</ThemedText>
    <ThemedText type="h4" style={[styles.text, styles.price]}>{ParsePrice(marketPrice)}</ThemedText>
    <PriceChangeLabel change={changeAmount} percent={changePercent} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    display: "flex",
    paddingVertical: 3,
  },
  price: {
    marginVertical: 5,
  },
});
