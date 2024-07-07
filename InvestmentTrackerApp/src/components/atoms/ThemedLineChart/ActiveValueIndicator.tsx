import {type SharedValue, useDerivedValue} from "react-native-reanimated";
import { Circle, Line as SkiaLine, Text as SkiaText, useFont, vec } from '@shopify/react-native-skia';

import spacemono from "../../../../assets/fonts/SpaceMono-Regular.ttf";
import { useThemeColor } from "@/hooks/useThemeColor";

type ActiveValueIndicatorProp =  {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  activeValue: SharedValue<number>;
  bottom: number;
  top: number;
  lineColor: string;
  indicatorColor: string;
  topOffset?: number;
  isRise: SharedValue<boolean>;

  lightColor?: string;
  darkColor?: string;
};

export function ActiveValueIndicator({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  lineColor,
  indicatorColor,
  topOffset = 0,
  isRise,
  lightColor,
  darkColor
}: ActiveValueIndicatorProp) {
  const increaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseText');
  const decreaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseText');

  const FONT_SIZE = 12;
  const font = useFont(spacemono, FONT_SIZE);

  const start = useDerivedValue(
    () => vec(xPosition.value, bottom)
  );
  const end = useDerivedValue(
    () => vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset)
  );
  const activeValueDisplay = useDerivedValue(
    () => "$" + activeValue.value.toFixed(2),
  );
  const activeValueWidth = useDerivedValue(
    () => font?.measureText(activeValueDisplay.value).width || 0,
  );
  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 2,
  );

  return (
    <>
      <SkiaLine 
        p1={start} 
        p2={end} 
        color={lineColor} 
        strokeWidth={1} 
      />
      <Circle 
        cx={xPosition} 
        cy={yPosition} 
        r={4} 
        color={indicatorColor} 
      />
      <SkiaText
        color={isRise.value ? increaseTextColor : decreaseTextColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  );
};
