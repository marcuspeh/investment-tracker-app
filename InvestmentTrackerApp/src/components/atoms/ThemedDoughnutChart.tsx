import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useFonts, Skia, TextAlign, Paragraph, Canvas, SkParagraph, SkPoint } from "@shopify/react-native-skia";
import { Pie, PolarChart, useSlicePath, type PieSliceData } from "victory-native";
import { Path } from "@shopify/react-native-skia";
import { useThemeColor } from "@/hooks/useThemeColor";
import spacemono from "../../../assets/fonts/SpaceMono-Regular.ttf";

export type ThemedDoughnutChartData = {
  value: number
  label: string
}

export type ThemedDoughnutChartProps = {
  data: ThemedDoughnutChartData[]

  lightColor?: string;
  darkColor?: string;
};

type ParsedThemedDoughnutChartData = {
  value: number
  label: string
  color: string
}


function prepareData(data: ThemedDoughnutChartData[], donutChartColor: string, startingAngle: number): ParsedThemedDoughnutChartData[] {
  return data.sort((a, b) => b.value - a.value).map(data => ({
      value: data.value,
      label: data.label,
      color: donutChartColor,
    })
  )
}

export function ThemedDoughnutChart({ data, lightColor, darkColor  }: ThemedDoughnutChartProps) {
  const donutChartColor = useThemeColor({ light: lightColor, dark: darkColor }, 'donutChartColor');
  const font = useFonts({
    SpaceMono: [spacemono]
  });

  function PieSlice({ slice }: { slice: PieSliceData }) {  
    const path = useSlicePath({
      slice: {
        ...slice,        
        endAngle: pieData.length > 1 ? slice.endAngle - 1.5 : slice.endAngle,
      }
    });

    // const pieLabel = PieLabel(slice.label, slice.value, slice.center, slice.radius)
    return (
      <>
        <Path path={path} color={slice.color} style="fill" strokeWidth={5} />
        {/* {pieLabel} */}
      </>
    )
  }

  function PieLabel(label: string, value: number, center: SkPoint, radius: number) {  
    const paragraph = GetParagraph(label, value)
    if (!paragraph) {
      return null;
    }

    const width = radius * 0.9
    paragraph.layout(width);

    return (
      <Paragraph 
        paragraph={paragraph} 
        x={center.x - (paragraph?.getMaxWidth() || 0) / 2}
        y={center.y - (paragraph?.getHeight() || 0) / 2} 
        width={width} 
      />
    )
  }

  function GetParagraph(label: string, value: number): SkParagraph | undefined {
    if (!font) {
      return;
    }

    const paragraphStyle = {
      textAlign: TextAlign.Center
    };
    const labelStyle = {
      color: Skia.Color("white"),
      fontFamilies: ["SpaceMono"],
      fontSize: 14,
      fontStyle: { 
        weight: 800 
      } 
    };
    const dataNumStyle = {
      color: Skia.Color("white"),
      fontFamilies: ["SpaceMono"],
      fontSize: 12
    };

    return  Skia.ParagraphBuilder.Make(paragraphStyle, font)
      .pushStyle(labelStyle)
      .addText(label)
      .addText('\n')
      .pushStyle(dataNumStyle)
      .addText(`${value}`)
      .pop()
      .build();
  }

  let pieData: ParsedThemedDoughnutChartData[] = prepareData(data, donutChartColor, -90)
  let innerRadius: string = "65%"
  if (pieData.length === 0) {
    innerRadius = "100%"
    pieData.push(
      {
        value: 50,
        label: "",
        color: donutChartColor
      },
    )
  } else if (pieData.length === 1) {
    // innerRadius = "100%"
  }

  return  (
    <View style={styles.container}>
      <PolarChart
        data={pieData}
        colorKey={"color"}
        valueKey={"value"}
        labelKey={"label"}
      >
        <Pie.Chart innerRadius={innerRadius} startAngle={-90}>
          {
            ({ slice }) => (
                <PieSlice slice={slice}/>
            )
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
