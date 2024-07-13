import { StyleSheet, View, type ViewProps } from 'react-native';
import { useState, useEffect } from 'react'

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '../../atoms/ThemedText';
import { StockDescriptionModel } from '@/dto';
import mockStockDescriptionData from '@/mockedData/stockDescription';
import { getStockDescription } from '@/external/YahooFinance';
import { ApiResponseModel } from '@/model/ApiResponseModel';

export type StockDescriptionProps = ViewProps & {
  symbol: string,
  displayName: string,
  lightColor?: string;
  darkColor?: string;
};

export function StockDescription({ style, symbol, displayName, lightColor, darkColor, ...otherProps }: StockDescriptionProps) {
  const headerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'darkText');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'componentBackgroundColor');
  const [financeChartData, setFinanceChartData] = useState<StockDescriptionModel>(mockStockDescriptionData)

  useEffect(() => {
    getStockDescription(symbol).
      then((response: ApiResponseModel<StockDescriptionModel>) => {
        if (!response.isSuccess) {
          console.log("Failed to get stock desciption")
        }
        if (response.data !== undefined) {
          setFinanceChartData(response.data)
        }
      })
  }, [])

  return (
  <View style={{...styles.container, backgroundColor: backgroundColor}}>
    <ThemedText type="h5" style={{...styles.text, ...styles.header, color: headerColor}}>About {displayName}</ThemedText>
    <ThemedText type="p1">{financeChartData.longBusinessSummary || "Description curently not available."}</ThemedText>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  text: {
    paddingVertical: 3,
    textAlign: 'justify',
  },
  header: {
    marginBottom: 20,
  },
});
