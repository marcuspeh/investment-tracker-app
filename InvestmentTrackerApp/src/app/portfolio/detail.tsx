import { useLocalSearchParams, Stack } from 'expo-router'

import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import Portfolio from '@/watermelon/Portfolio';
import { useEffect, useState } from 'react';
import { PortfolioHeader } from '@/components/page/portfolioDetail/PortfolioHeader';
import { PortfolioChart } from '@/components/page/portfolioDetail/PortfolioChart';
import { PortfolioData } from '@/components/page/portfolioDetail/PortfolioData';
import { HoldingList } from '@/components/page/portfolioDetail/HoldingList';
import { BreakdownChart } from '@/components/page/portfolioDetail/BreakdownChart';
import { TransactionType } from '@/watermelon/Transaction';

export default function PortfolioEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [portfolio, setPortfolio] = useState<Portfolio | undefined>()

  useEffect(() => {
    if (id === "" || id === undefined) {
      return
    }

    setPortfolio({
      id: id,
      title: "Portfolio 2",
      description: "My second portfolio",
      financialInstrucments: [
        {
          symbol: "AAPL",
          shortName: "Apple Inc",
          assetType: "EQUITY",
          exchange: "NASDAQ",
          country: "US",
          currency: "USD",
          transactions: [
            {
              quantity: 24,
              amountPerUnit: 163.535,
              commission: 1.42,
              isCommissionPercentage: false,
              transactionType: TransactionType.Buy
            },
            {
              quantity: 9,
              amountPerUnit: 183.535,
              commission: 0.54,
              isCommissionPercentage: false,
              transactionType: TransactionType.Sell
            },
            {
              quantity: 6,
              amountPerUnit: 192.035,
              commission: 1.42,
              isCommissionPercentage: false,
              transactionType: TransactionType.Sell
            },
            {
              quantity: 26,
              amountPerUnit: 203.535,
              commission: 1.19,
              isCommissionPercentage: false,
              transactionType: TransactionType.Buy
            },
          ]
        },
        {
          symbol: "AMD",
          shortName: "Advanced Micro Devices, Inc.",
          assetType: "EQUITY",
          exchange: "NASDAQ",
          country: "US",
          currency: "USD",
          transactions: [
            {
              quantity: 24,
              amountPerUnit: 73.124,
              commission: 0.24,
              isCommissionPercentage: true,
              transactionType: TransactionType.Buy
            },
            {
              quantity: 9,
              amountPerUnit: 83.535,
              commission: 0.54,
              isCommissionPercentage: false,
              transactionType: TransactionType.Sell
            },
            {
              quantity: 6,
              amountPerUnit: 92.035,
              commission: 1.2,
              isCommissionPercentage: false,
              transactionType: TransactionType.Sell
            },
            {
              quantity: 26,
              amountPerUnit: 102.535,
              commission: 1.19,
              isCommissionPercentage: false,
              transactionType: TransactionType.Buy
            },
          ]
        }
      ]
    } as Portfolio)

    // getPortfolioByID(id)
    //   .then(portfolio => {
    //     if (portfolio === undefined) {
    //       console.log("Unable to find portfolio")
    //       return
    //     }
    //     setPortfolio(portfolio)
    //   })
  }, [])
  

  return (
    <ThemedScrollView>
      <Stack.Screen
        options={{
          title: portfolio?.title,
        }}
      />
      <PortfolioHeader marketPrice={132425.92} changeAmount={143394.234} />
      <PortfolioChart symbol={"aapl"} />
      <PortfolioData unrealized={-24252} realized={249784}/>
      <HoldingList />
      <BreakdownChart portfolio={portfolio!}/>
    </ThemedScrollView>
  );
}