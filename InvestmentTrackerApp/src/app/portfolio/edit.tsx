import { ThemedScrollView } from "@/components/atoms/ThemedScrollView";
import { PortfolioForm } from "@/components/page/portfolioEdit/PortfolioForm";

export default function PortfolioEditScreen() {
  return (
    <ThemedScrollView>
      <PortfolioForm afterOperation={()=>{}}/>
    </ThemedScrollView>
  );
}