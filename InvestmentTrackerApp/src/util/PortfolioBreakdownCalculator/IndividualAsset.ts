import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { CalculateHoldingsInTransaction } from "./util";

function CalculateIndividualAsset(portfolio: Portfolio, assetPrices: Map<string, number>): ThemedDoughnutChartData[] {
  let result: ThemedDoughnutChartData[] = [];

  for (const financialInstrument of portfolio?.financialInstrucments) {
    const symbol: string = financialInstrument.symbol
    const price: number = assetPrices.get(symbol) || 0

    const quantity: number = CalculateHoldingsInTransaction(financialInstrument?.transactions)
    const value: number = price * quantity
    if (value === 0) {
      continue
    }

    result.push({
      value: value,
      label: symbol
    })
  }
  
  return result
}

export {
    CalculateIndividualAsset
};