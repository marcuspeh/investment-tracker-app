import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { CalculateHoldingsInTransaction, ConvertCountToData } from "./util";

function CalculateCountry(portfolio: Portfolio, assetPrices: Map<string, number>): ThemedDoughnutChartData[] {
  const count: Map<string, number> = new Map<string, number>()

  for (const financialInstrument of portfolio?.financialInstrucments) {
    const symbol: string = financialInstrument.symbol
    const price: number = assetPrices.get(symbol) || 0

    const quantity: number = CalculateHoldingsInTransaction(financialInstrument?.transactions)
    const value: number = price * quantity
    if (value === 0) {
      continue
    }

    const country: string = financialInstrument.country
    const totalValue: number = (count.get(country) || 0) + value;
    count.set(country, totalValue)
  }
  
  const result = ConvertCountToData(count)
  return result;
}

export {
    CalculateCountry
};