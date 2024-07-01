import { Dimensions, type ViewProps } from 'react-native';
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedLineChartProps = ViewProps & {
  labels: number[];
  datas: number[];

  lightColor?: string;
  darkColor?: string;
};

export function ThemedLineChart({ style, labels, datas, lightColor, darkColor, ...otherProps }: ThemedLineChartProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lineChartColor');
  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 8, y: 13 },
    { x: 9, y: 11.5 },
    { x: 10, y: 12 }
  ]
  
  const data2 = [
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 }
  ]

  return (
    <Chart
      style={{ height: 200, width: '100%', backgroundColor: '#eee' }}
      xDomain={{ min: -2, max: 10 }}
      yDomain={{ min: -2, max: 20 }}
      padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
    >
      <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
      <HorizontalAxis tickCount={3} />
      <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
      <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
    </Chart>
  )
}
