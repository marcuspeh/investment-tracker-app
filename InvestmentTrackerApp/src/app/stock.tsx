import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { ThemedView } from "@/components/atoms/ThemedView";
import { getQuote } from '@/external/YahooFinance'
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { QuoteModel } from '@/dto';
import { mockedQuoteData } from '@/mockedData/quoteData';
import { MarketStats } from '@/components/stockDetails/MarketStats';
import { StockHeader } from '@/components/stockDetails/StockHeader';
import { QuoteChart } from '@/components/stockDetails/QuoteChart';

export default function HomeScreen() {
  const [quoteData, setQuoteData] = useState<QuoteModel>(mockedQuoteData)

  useEffect(() => {
    getQuote("aapl").
      then((response: ApiResponseModel<QuoteModel>) => {
        if (!response.isSuccess) {
          console.log("Failed to get quote model")
        }
        if (response.data !== undefined) {
          setQuoteData(response.data)
        }
      })
  }, [])

  return (
    <ThemedView style={styles.body}>
      <StockHeader quoteData={quoteData} />

      <QuoteChart symbol={"aapl"} />
      
      <MarketStats quoteData={quoteData}/>
        
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  },
});
