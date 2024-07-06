import { StyleSheet, View, type ViewProps } from 'react-native';
import { CartesianChart, Line as ChartLine, useChartPressState, Area } from "victory-native";
import type { SharedValue } from "react-native-reanimated";

import { useThemeColor } from '@/hooks/useThemeColor';
import spacemono from "../../../assets/fonts/SpaceMono-Regular.ttf";
import { Circle, Rect, LinearGradient, Line, useFont, vec, DashPathEffect } from '@shopify/react-native-skia';


export type ThemedLineChartProps = ViewProps & {
  labels: number[];
  prices: number[];

  lightColor?: string;
  darkColor?: string;
};

function ToolTip({ x, y, top, bottom }: { x: SharedValue<number>; y: SharedValue<number>; top: number; bottom: number;}) {
  return (
    <>
      <Circle cx={x} cy={y} r={4} color="red" />
      <Rect x={x} y={bottom} width={2} height={top - bottom} />
      <Line 
        p1={vec(x.value, bottom)} 
        p2={vec(x.value, top)} 
        color="red" 
        strokeWidth={2}
      >
        <DashPathEffect intervals={[4, 4]} />
      </Line>
    </>
  );
}

export function ThemedLineChart({ style, labels, prices, lightColor, darkColor, ...otherProps }: ThemedLineChartProps) {
  const lineColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lineChartColor');
  const font = useFont(spacemono, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { "price": 0 } });

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
          labelColor: "white",
          labelPosition: {
            x: 'outset',
            y: 'inset',
          },
          lineColor:{
            grid: "rgba(255, 255, 255, 0.3)",
            frame: "rgba(255, 255, 255, 0)"
          },
          tickCount: {
            x: 0,
            y: 5,
          },
        }}
        chartPressState={state}
      >
        {({ points, chartBounds }) => (
          <>
            <ChartLine points={points.price} color="red" strokeWidth={1} />
            {isActive ? (
                <ToolTip 
                  x={state.x.position} 
                  y={state.y.price.position} 
                  top={chartBounds.top} 
                  bottom={chartBounds.bottom}
                />
              ) : null}
            <Area
              points={points.price}
              y0={chartBounds.bottom}
              curveType='linear'
              color="#880000"
              opacity={0.5}
              animate={{ type: "timing", duration: 300 }}
            >
              <LinearGradient 
                start={vec(0, chartBounds.top)}
                end={vec(0, chartBounds.bottom)}
                colors={["rgba(255, 0, 0, 1)", "rgba(255, 0, 0, 0)"]}
              />
            </Area>
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
