import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import Transaction, { TransactionType } from "@/watermelon/Transaction";

function ConvertCountToData(count: Map<string, number>): ThemedDoughnutChartData[] {
  return Array
    .from(count.entries())
    .map(([name, count]) => ({
      label: name,
      value: count
    }));
}

function CalculateHoldingsInTransaction(transactions: Transaction[]): number {
  let quantity: number = 0.0
  for (const transaction of transactions) {
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
  return quantity
}

export {
  ConvertCountToData,
  CalculateHoldingsInTransaction
}
