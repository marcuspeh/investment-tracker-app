import { StyleSheet, View } from 'react-native';

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from 'react';
import { getFinanceChart } from '@/external/YahooFinance'
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { FinanceChartModel } from '@/model/external';
import { chartDataParsed } from '@/mockedData/chart';

export default function HomeScreen() {
  const [stockData, setStockData] = useState<FinanceChartModel>(chartDataParsed)

  useEffect(() => {
    getFinanceChart("aapl").
      then((response: ApiResponseModel<FinanceChartModel>) => {
        if (!response.isSuccess) {
          console.log("Failed to get chart data")
        }
        if (response.data !== undefined) {
          setStockData(response.data)
        }
      })
  }, [])

  return (
    <ThemedView style={styles.body}>
      <View style={styles.container}>
        <ThemedText type="h4">{stockData.meta.symbol}</ThemedText>
        <ThemedText type="h4">{stockData.meta.previousClose}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: "center"
  }
});
