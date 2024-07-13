import { StyleSheet, View, Pressable, type ViewProps } from 'react-native';
import { useEffect, useState } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';
import { FinanceChartModel } from '@/dto';
import { ThemedLineChart } from '../atoms/ThemedLineChart';
import { getFinanceChart } from '@/external/YahooFinance';
import { mockedFinanceChartData } from '@/mockedData/financeChartData';
import { ApiResponseModel } from '@/model/ApiResponseModel';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedButton } from '../atoms/ThemedButton';

export type QuoteChartProps = ViewProps & {
  symbol: string;

  lightColor?: string;
  darkColor?: string;
};

type ChartDuration = '1d' | '5d' | '1mo' | '6mo' | '1y' | '5y' | 'max'
const ChartDurationList: ChartDuration[] = ['1d', '5d', '1mo', '6mo', '1y', '5y', 'max']

export function QuoteChart({ style, symbol, lightColor, darkColor, ...otherProps }: QuoteChartProps) {
  const buttonInactiveBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonInactiveBackground');
  const buttonInactiveText = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonInactiveText');
  const buttonActiveBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveBackground');
  const buttonActiveText = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveText');

  const [financeChartData, setFinanceChartData] = useState<FinanceChartModel>(mockedFinanceChartData)
  const [chartDuration, setChartDuration] = useState<ChartDuration>("1mo")

  useEffect(() => {
    getFinanceChart(symbol, chartDuration).
      then((response: ApiResponseModel<FinanceChartModel>) => {
        if (!response.isSuccess) {
          console.log("Failed to get quote model")
        }
        if (response.data !== undefined) {
          setFinanceChartData(response.data)
        }
      })
  }, [chartDuration])

  return (
    <View style={styles.container}>
      <ThemedLineChart
        labels={financeChartData.timestamps}
        prices={financeChartData.close}
      />
      <View style={styles.buttonContainer}>
        {
          ChartDurationList.map((duration, index) => (
            <ThemedButton 
              key={`chart-button-${index}`}
              buttonOnPress={() => setChartDuration(duration)}
              backgroundColor={duration === chartDuration ? buttonActiveBackground : buttonInactiveBackground}
              textColor={duration === chartDuration ? buttonActiveText : buttonInactiveText}
              label={duration === 'max' ? duration : duration.slice(0, 2)}
              width={"10%"}
              height={25}
            />
          ))
        } 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 3,
    width: 35,
    height: 25,
  },
  buttonText: {
    textTransform: "uppercase"
  }
});
