import { type ViewProps } from 'react-native';
import { useEffect, useState } from 'react';

import { FinanceChartModel, QuoteModel } from '@/dto';
import { ThemedLineChart } from '../atoms/ThemedLineChart';
import { getFinanceChart } from '@/external/YahooFinance';
import { mockedFinanceChartData } from '@/mockedData/financeChartData';
import { ApiResponseModel } from '@/model/ApiResponseModel';

export type QuoteChartProps = ViewProps & {
  symbol: string,
  lightColor?: string;
  darkColor?: string;
};

export function QuoteChart({ style, symbol, lightColor, darkColor, ...otherProps }: QuoteChartProps) {
  const [financeChartData, setFinanceChartData] = useState<FinanceChartModel>(mockedFinanceChartData)

  useEffect(() => {
    getFinanceChart("symbol", "1m").
      then((response: ApiResponseModel<FinanceChartModel>) => {
        if (!response.isSuccess) {
          console.log("Failed to get quote model")
        }
        if (response.data !== undefined) {
          setFinanceChartData(response.data)
        }
      })
  }, [])

  return (
  <ThemedLineChart
    labels={financeChartData.timestamps}
    datas={financeChartData.close}
  />
  )
}
