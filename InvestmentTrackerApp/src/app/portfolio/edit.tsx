import { useLocalSearchParams } from 'expo-router'

import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import { PortfolioForm } from "@/components/page/portfolioEdit/PortfolioForm";
import Portfolio from '@/watermelon/Portfolio';
import { useEffect, useState } from 'react';
import { getPortfolioByID } from '@/db/portfolioDB';

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
  
  return (
    <ThemedScrollView>
      <PortfolioForm portfolio={portfolio}/>
    </ThemedScrollView>
  );
}