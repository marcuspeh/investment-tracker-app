import { StyleSheet, View, type ViewProps } from 'react-native';

import { TwoColumnTable, TwoColumnTableProps} from '@/components/atoms/TwoColumnTable';
import { FormatLargeNumber } from '@/util/FormatNumber';
import { QuoteModel } from '@/dto';
import { ThemedText } from '../atoms/ThemedText';

export type MarketStatsProps = ViewProps & {
  quoteData: QuoteModel,
  lightColor?: string;
  darkColor?: string;
};

export function MarketStats({ style, quoteData, lightColor, darkColor, ...otherProps }: MarketStatsProps) {
  function getMarketStatsData(): TwoColumnTableProps {
    const formattedMarketCap =  FormatLargeNumber(quoteData.marketCap)
    const formattedAverageVolume =  FormatLargeNumber(quoteData.averageDailyVolume10Day)
    const formattedTrailingPE =  FormatLargeNumber(quoteData.trailingPE)
    const formatted52WLow =  FormatLargeNumber(quoteData.fiftyTwoWeekLow)
    const formatted52WHigh =  FormatLargeNumber(quoteData.fiftyTwoWeekHigh)
    const formattedDividendRate =  FormatLargeNumber(quoteData.dividendRate)
    const formattedDividendYield =  FormatLargeNumber(quoteData.dividendYield)

    return {
      data: [
        {title: "MARKET CAPITALISATION", description: `\$${formattedMarketCap}`},
        {title: "AVERAGE VOLUME", description: `${formattedAverageVolume}`},
        {title: "TRAILING P/E", description: `${formattedTrailingPE}`},
        {title: "52W LOW", description: `\$${formatted52WLow}`},
        {title: "52W HIGH", description: `\$${formatted52WHigh}`},
        {title: "DIVIDENDS", description: `\$${formattedDividendRate}`},
        {title: "DIVIDENDS YIELD", description: `${formattedDividendYield}%`},
      ]
    }
  }

  return <View style={styles.container}>
    <ThemedText type='h5'>Market statistics</ThemedText>
    <TwoColumnTable data={getMarketStatsData().data}/>
  </View>
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  }
});