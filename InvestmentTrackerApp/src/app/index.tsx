import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native';

import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import { InternalLink } from "@/components/atoms/InternalLink";
import { TopBar } from "@/components/page/portfolioPage/TopBar";
import { InvestmentSummary } from "@/components/page/portfolioPage/InvestmentSummary";
import { PortfolioList } from "@/components/page/portfolioPage/portfolioList";
import Portfolio from "@/watermelonDB/Portfolio";

export default function HomeScreen() {
  const portfolio: Portfolio[] = [
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

  return (
    <ThemedScrollView>
      <TopBar username="John Doe"/>
      <InvestmentSummary />
      <PortfolioList portfolios={portfolio}/>
    
      <InternalLink href="/stock">Stock</InternalLink>
      <InternalLink href="/portfolio/edit">New portfolio</InternalLink>
      <StatusBar style="auto" />
    </ThemedScrollView>
  );
}


