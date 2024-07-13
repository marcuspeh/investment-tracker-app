import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { getQuote } from '@/external/YahooFinance'
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { QuoteModel } from '@/dto';
import { mockedQuoteData } from '@/mockedData/quoteData';
import { MarketStats } from '@/components/page/stockDetails/MarketStats';
import { StockHeader } from '@/components/page/stockDetails/StockHeader';
import { QuoteChart } from '@/components/page/stockDetails/QuoteChart';
import { StockDescription } from '@/components/page/stockDetails/StockDescription';
import { ThemedScrollView } from '@/components/atoms/ThemedScrollView';
import { HoldingData } from '@/components/page/stockDetails/HoldingData';

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
    <ThemedScrollView>
      <StockHeader quoteData={quoteData} />
      <QuoteChart symbol={"aapl"} />
      <HoldingData />
      <MarketStats quoteData={quoteData}/>
      <StockDescription symbol={"aapl"} displayName={quoteData.displayName}/>
    </ThemedScrollView>
  );
}
