import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts, Skia, TextAlign, Paragraph } from "@shopify/react-native-skia";
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
  topic: string

  lightColor?: string;
  darkColor?: string;
};


export function ThemedDoughnutChart({ data, topic, lightColor, darkColor  }: ThemedDoughnutChartProps) {
  const [circleX, setCircleX] = useState<number>(0)
  const [circleY, setCircleY] = useState<number>(0)
  const [circleRadius, setCircleRadius] = useState<number>(0)

  const [label, setLabel] = useState<string>(topic)
  const [numData, setNumData] = useState<string>("")

  const donutChartColor = useThemeColor({ light: lightColor, dark: darkColor }, 'donutChartColor');
  const font = useFonts({
    SpaceMono: [spacemono]
  });

  const paragraph = useMemo(() => {
    if (!font) {
      return null;
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

    let para = Skia.ParagraphBuilder.Make(paragraphStyle, font)
      .pushStyle(labelStyle)
      .addText(label)

    if (numData !== "") {
      para = para      
      .addText('\n')
      .pushStyle(dataNumStyle)
      .addText(`${numData}`)
    }

    return para.pushStyle(dataNumStyle)
      .addText(`${numData}`)
      .pop()
      .build();
  }, [label, numData])

  function PieSlice({ slice }: { slice: PieSliceData }) {  
    const path = useSlicePath({
      slice: {
        ...slice,
        startAngle: slice.startAngle,
        endAngle: slice.endAngle - 1.5,
      }
    });

    setCircleRadius(slice.radius)
    setCircleX(slice.center.x)
    setCircleY(slice.center.y)

    return (
      <Path path={path} color={slice.color} style="fill" strokeWidth={5} />
    )
  }

  function PieLabel() {  
    if (!paragraph) {
      return null;
    }

    const width = circleRadius * 0.9
    paragraph.layout(width);

    return (
      <Paragraph 
        paragraph={paragraph} 
        x={circleX - (paragraph?.getMaxWidth() || 0) / 2}
        y={circleY - (paragraph?.getHeight() || 0) / 2} 
        width={width} 
      />
    )
  }

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
        <Pie.Chart innerRadius={"65%"} startAngle={-90}>
          {
            ({ slice }) => {
              return <PieSlice slice={slice}/>
            }
          }
        </Pie.Chart>
        {
          label !== "" && <PieLabel />
        }
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
