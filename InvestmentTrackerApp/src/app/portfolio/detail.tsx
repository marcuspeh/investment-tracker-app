import { useLocalSearchParams, Stack } from 'expo-router'

import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import Portfolio from '@/watermelon/Portfolio';
import { useEffect, useState } from 'react';
import { PortfolioHeader } from '@/components/page/portfolioDetail/PortfolioHeader';
import { PortfolioChart } from '@/components/page/portfolioDetail/PortfolioChart';
import { PortfolioData } from '@/components/page/portfolioDetail/PortfolioData';
import { HoldingList } from '@/components/page/portfolioDetail/HoldingList';
import { ThemedDoughnutChart, ThemedDoughnutChartData } from '@/components/atoms/ThemedDoughnutChart';

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
  
  const pieChartData: ThemedDoughnutChartData[] = [
    {
      label: "number1",
      value: 353,
    },
    {
      label: "number2",
      value: 1944,
    },
    {
      label: "number3",
      value: 835,
    },
  ]

  return (
    <ThemedScrollView>
      <Stack.Screen
        options={{
          title: portfolio?.title,
        }}
      />
      <ThemedDoughnutChart data={pieChartData} topic={"Overall"}/>
      <PortfolioHeader marketPrice={132425.92} changeAmount={143394.234} />
      <PortfolioChart symbol={"aapl"} />
      <PortfolioData unrealized={-24252} realized={249784}/>
      <HoldingList />
    </ThemedScrollView>
  );
}