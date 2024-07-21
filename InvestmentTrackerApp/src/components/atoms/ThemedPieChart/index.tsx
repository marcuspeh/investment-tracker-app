import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import { Pie, PolarChart, useSlicePath, type PieSliceData, useAnimatedPath } from "victory-native";
import { Path } from "@shopify/react-native-skia";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPieChartData = {
  value: number
  label: string
}

export type ThemedPieChartProps = {
  data: ThemedPieChartData[]

  lightColor?: string;
  darkColor?: string;
};


function PieSlice({ slice }: { slice: PieSliceData }) {
  const path = useSlicePath({
    slice: {
      ...slice,
      startAngle: slice.startAngle,
      endAngle: slice.endAngle - 1.5,
    }
  });
  
  return (
    <Path path={path} color={slice.color} style="fill" strokeWidth={5} />
  )
}

export function ThemedPieChart({ data, lightColor, darkColor  }: ThemedPieChartProps) {
  const donutChartColor = useThemeColor({ light: lightColor, dark: darkColor }, 'donutChartColor');

  const pieData = data.map(data => {
    return {
      value: data.value,
      label: data.label,
      color: donutChartColor,
    }
  }).sort((a, b) => b.value - a.value)

  return  (
    <View style={styles.container}>
      <PolarChart
        data={pieData}
        colorKey={"color"}
        valueKey={"value"}
        labelKey={"label"}
      >
        <Pie.Chart innerRadius={"60%"} startAngle={-90}>
          {
            ({ slice }) => {
              return <PieSlice slice={slice} />
            }
          }
        </Pie.Chart>
      </PolarChart>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    padding: 25,
  },  
})
