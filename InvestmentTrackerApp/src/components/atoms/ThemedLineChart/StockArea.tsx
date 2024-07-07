import { type ChartBounds, type PointsArray, useAreaPath, useLinePath } from "victory-native";
import { type SharedValue, useDerivedValue } from "react-native-reanimated";
import { Path, Group, Skia, LinearGradient, vec } from '@shopify/react-native-skia';

import { useThemeColor } from "@/hooks/useThemeColor";

type StockAreaProps =  {
  points: PointsArray;
  isWindowActive: boolean;
  startX: SharedValue<number>;
  lightColor?: string;
  darkColor?: string;
} & ChartBounds

export function StockArea({
  points,
  isWindowActive,
  startX,
  lightColor,
  darkColor,
  left,
  right,
  top,
  bottom,
}: StockAreaProps) {
  const graphBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'graphBackgroundColor');
  const graphLineColor = useThemeColor({ light: lightColor, dark: darkColor }, 'graphLineColor');

  const { path: areaPath } = useAreaPath(points, bottom);
  const { path: linePath } = useLinePath(points);

  const backgroundClip = useDerivedValue(() => {
    let width = right - left;

    const path = Skia.Path.Make();
    path.addRect(Skia.XYWHRect(left, top, width, bottom - top));
    return path;
  });

  const windowClip = useDerivedValue(() => {
    if (!isWindowActive) {
      return Skia.Path.Make();
    }

    const path = Skia.Path.Make();
    path.addRect(Skia.XYWHRect(0, top, startX.value, bottom - top));
    return path;
  });

  return (
    <>
      <Group clip={backgroundClip} opacity={isWindowActive ? 0.3 : 0.8}>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(top, bottom)}
            colors={ [ graphBackgroundColor, `${graphBackgroundColor}33` ] }
          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={2}
          color={
            graphLineColor
          }
        />
      </Group>

      {isWindowActive && (
          <Group clip={windowClip}  opacity={0.8}>
            <Path path={areaPath} style="fill">
              <LinearGradient
                start={vec(0, 0)}
                end={vec(top, bottom)}
                colors={ [ graphBackgroundColor, `${graphBackgroundColor}33` ] }
              />
            </Path>
            <Path
              path={linePath}
              style="stroke"
              strokeWidth={2}
              color={graphLineColor}
            />
          </Group>
      )}
    </>
  );
};
