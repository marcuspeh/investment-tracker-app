import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import { InternalLink } from "@/components/atoms/InternalLink";
import { TopBar } from "@/components/page/portfolioList/TopBar";
import { InvestmentSummary } from "@/components/page/portfolioList/InvestmentSummary";
import { PortfolioList } from "@/components/page/portfolioList/portfolioList";
import Portfolio from "@/watermelon/Portfolio";

export default function HomeScreen() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([] as Portfolio[])

  useEffect(() => {
    const portfolios: Portfolio[] = [
      {
        id: "1",
        title: "Portfolio 1",
        description: "My first portfolio",
      } as Portfolio,
      {
        id: "2",
        title: "Portfolio 2",
        description: "My second portfolio",
      } as Portfolio
    ]
    setPortfolios(portfolios)
    
    // getPortfolio()
    //   .then((portfolios: Portfolio[]) => {
    //     setPortfolios(portfolios)
    // })

  }, [])

  return (
    <ThemedScrollView>
      <TopBar username="John Doe"/>
      <InvestmentSummary />
      <PortfolioList portfolios={portfolios}/>
    
      <InternalLink href="/stock">Stock</InternalLink>
      <InternalLink href="/portfolio/edit">New portfolio</InternalLink>
      <StatusBar style="auto" />
    </ThemedScrollView>
  );
}


