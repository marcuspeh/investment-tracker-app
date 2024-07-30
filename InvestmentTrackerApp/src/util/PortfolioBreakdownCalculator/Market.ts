import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { ConvertCountToData, CalculateHoldingsInTransaction } from "./util";

function CalculateMarket(portfolio: Portfolio, assetPrices: Map<string, number>): ThemedDoughnutChartData[] {
  const count: Map<string, number> = new Map<string, number>()

  for (const financialInstrument of portfolio?.financialInstrucments) {
    const symbol: string = financialInstrument.symbol
    const price: number = assetPrices.get(symbol) || 0

    const quantity: number = CalculateHoldingsInTransaction(financialInstrument?.transactions)
    const value: number = price * quantity
    if (value === 0) {
      continue
    }

    const market: string = financialInstrument.exchange
    const totalValue: number = (count.get(market) || 0) + value;
    count.set(market, totalValue)
  }
  
  const result = ConvertCountToData(count)
  return result;
}

export {
    CalculateMarket
};