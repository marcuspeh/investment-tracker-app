import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { QuoteModel } from '@/dto';
import { ThemedText } from '../atoms/ThemedText';
import { ParsePrice } from '@/util/FormatNumber';
import { PriceChangeLabel } from '../atoms/PriceChange';

export type StockHeaderProps = ViewProps & {
  quoteData: QuoteModel,
  lightColor?: string;
  darkColor?: string;
};

export function StockHeader({ style, quoteData, lightColor, darkColor, ...otherProps }: StockHeaderProps) {
  const headerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'darkText');

  return (
  <View style={styles.container}>
    <ThemedText type="h4" style={{...styles.text, color: headerColor}}>{quoteData.displayName}</ThemedText>
    <ThemedText type="h4" style={[styles.text, styles.price]}>{ParsePrice(quoteData.regularMarketPrice)}</ThemedText>
    <PriceChangeLabel change={quoteData.regularMarketChange} percent={quoteData.regularMarketChangePercent} />
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
