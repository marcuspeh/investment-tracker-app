import { StyleSheet, View, type ViewProps } from 'react-native';
import { CartesianChart, useChartPressState } from "victory-native";
import { useDerivedValue } from "react-native-reanimated";

import { useThemeColor } from '@/hooks/useThemeColor';
import spacemono from "../../../../assets/fonts/SpaceMono-Regular.ttf";
import { useFont } from '@shopify/react-native-skia';

import { ActiveValueIndicator } from './ActiveValueIndicator';
import { StockArea } from './StockArea';

export type ThemedLineChartProps = ViewProps & {
  labels: number[];
  prices: number[];

  lightColor?: string;
  darkColor?: string;
};

export function ThemedLineChart({ style, labels, prices, lightColor, darkColor, ...otherProps }: ThemedLineChartProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const graphGridColor = useThemeColor({ light: lightColor, dark: darkColor }, 'graphGridColor');

  const font = useFont(spacemono, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { "price": 0 } });

  const isRise = useDerivedValue(() => {
    if (!isActive) {
      return true;
    }

    const firstPrice = prices[0]
    const currPrice = state.y.price.value.value
    return firstPrice <= currPrice
  })

  const data = Array.from({ length: labels.length }, (_, i) => ({
    date: labels[i],
    price: prices[i],
  }));

  return  (
    <View style={styles.container}>
      <CartesianChart 
        data={data} 
        xKey="date" 
        yKeys={["price"]}
        domain={{
          y: [Math.min(...prices) * 0.99, Math.max(...prices) * 1.01]
        }}
        axisOptions={{ 
          font: font,
          labelColor: textColor,
          labelPosition: {
            x: 'outset',
            y: 'inset',
          },
          lineColor:{
            grid: graphGridColor,
            frame: "#FFFFFF00"
          },
          tickCount: {
            x: 0,
            y: 4,
          },
          labelOffset: {
            x: 0,
            y: 8
          },
          formatYLabel: (v) => `\$${v}`
        }}
        chartPressState={state}
        renderOutside={({ chartBounds }) => (
          <>
            {isActive && (
              <ActiveValueIndicator
                xPosition={state.x.position}
                yPosition={state.y.price.position}
                bottom={chartBounds.bottom}
                top={chartBounds.top}
                activeValue={state.y.price.value}
                lineColor={textColor}
                indicatorColor={textColor}
                isRise={isRise}
                lightColor={lightColor}
                darkColor={darkColor}
              />
            )}
          </>
        )}
      >
        {({ points, chartBounds }) => (
          <>
          <StockArea
            points={points.price}
            isWindowActive={isActive}
            startX={state.x.position}
            lightColor={lightColor}
            darkColor={darkColor}
            {...chartBounds}
          />
        </>
        )}
      </CartesianChart>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
})
