import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { TransactionType } from "@/watermelon/Transaction";

function CalculateIndividualAsset(portfolio: Portfolio, assetPrices: Map<string, number>): ThemedDoughnutChartData[] {
  let result: ThemedDoughnutChartData[] = [];

  for (const financialInstrument of portfolio?.financialInstrucments) {
    let quantity: number = 0.0
    for (const transaction of financialInstrument?.transactions) {
      switch(transaction?.transactionType) {
        case TransactionType.Buy:
          quantity += transaction?.quantity || 0.0
          break
        case TransactionType.Sell:
          quantity -= transaction?.quantity || 0.0
          break
        case TransactionType.Dividend:
          continue
        default:
          console.log("Unknown transaction type", transaction?.transactionType)
      }
    }

    const symbol: string = financialInstrument.symbol
    const price: number = assetPrices.get(symbol) || 0
    const value: number = price * quantity
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