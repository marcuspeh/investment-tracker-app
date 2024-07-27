import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { ConvertCountToData } from "./util";

function CalculateAssetClass(portfolio: Portfolio, assetPrices: Map<string, number>): ThemedDoughnutChartData[] {
  const count: Map<string, number> = new Map<string, number>()
    
  return ConvertCountToData(count)
}

export {
    CalculateAssetClass
};