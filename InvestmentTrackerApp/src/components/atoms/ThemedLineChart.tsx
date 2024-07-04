import { View, type ViewProps } from 'react-native';
import { LineSegment, VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme } from 'victory-native'

import { useThemeColor } from '@/hooks/useThemeColor';


export type ThemedLineChartProps = ViewProps & {
  labels: number[];
  prices: number[];

  lightColor?: string;
  darkColor?: string;
};

export function ThemedLineChart({ style, labels, prices, lightColor, darkColor, ...otherProps }: ThemedLineChartProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lineChartColor');

  const data = Array.from({ length: labels.length }, (_, i) => ({
    date: new Date(labels[i] * 1000).toLocaleDateString(),
    price: prices[i],
  }));

  const label = <VictoryLabel style={svgStyles.chartLabel} />
  const lineSegment = <LineSegment style={svgStyles.chartGrid} />

  return  (
    <View>
      <VictoryChart
        height={250}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          crossAxis
          gridComponent={lineSegment}
          tickCount={4}
          tickLabelComponent={<VictoryLabel style={svgStyles.chartLabel} />}
        />
        <VictoryAxis
          dependentAxis
          gridComponent={lineSegment}
          tickLabelComponent={label}
          tickFormat={t => t.toLocaleString('en-US')}
        />
        <VictoryLine
          data={data}
          style={{
            labels: {
              fill: 'transparent'
            },
            data: {
              stroke: "#FFFFFF"
            }
          }}
          y="price"
          x="date"
        />
      </VictoryChart>
    </View>

  )
}

const svgStyles = {
  chartGrid: {
    stroke: "#0F0FFF",
  },
  chartLabel: {
    fill: "#FFFFFF",
    fontSize: '11',
    stroke: 'transparent'
  },
  chartLine: {
    labels: {
      fill: 'transparent'
    }
  }
}
