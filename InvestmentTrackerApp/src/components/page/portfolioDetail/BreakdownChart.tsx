import { StyleSheet, View, type ViewProps } from 'react-native';

import { TwoColumnTable, TwoColumnTableProps} from '@/components/atoms/TwoColumnTable';
import { FormatLargeNumber, ParsePrice, ParsePriceWithFormat } from '@/util/FormatNumber';
import { QuoteModel } from '@/dto';
import { ThemedText } from '../../atoms/ThemedText';
import Portfolio from '@/watermelon/Portfolio';
import { ThemedDoughnutChart, ThemedDoughnutChartData } from '@/components/atoms/ThemedDoughnutChart';
import { ThemedDropdown, ThemedDropdownData } from '@/components/atoms/ThemedDropdown';
import { CalculateDropdownData, DropdownType } from '@/util/PortfolioBreakdownCalculator';
import { useEffect, useState } from 'react';
import { updatePortfolio } from '@/db/portfolioDB';

export type BreakdownChartProps = {
  portfolio: Portfolio,
};

const dropdownLabels: ThemedDropdownData[] = [
  { label: 'Individual assets', value: DropdownType.IndividualAsset },
  { label: 'Asset class', value: DropdownType.AssetClass }, // (eg etf, options)
  { label: 'Market', value: DropdownType.Market }, // (eg NYSE, NASDAQ)
  { label: 'Country', value: DropdownType.Country } // (eg SG, US)
];

export function BreakdownChart({ portfolio }: BreakdownChartProps) {
  const [label, setLabel] = useState<ThemedDropdownData>(dropdownLabels[0])
  const [pieChartData, setPieChartData] = useState<ThemedDoughnutChartData[]>([])

  useEffect(() => {
    updatePieChartData(label)
  }, [portfolio, label])

  const onSelectDropdown = (label: ThemedDropdownData): void => {
    setLabel(label)
  }

  const updatePieChartData = (label: ThemedDropdownData): void => {
    if (portfolio === undefined) { 
      return
    }
    const assetPrices: Map<string, number> = new Map<string, number>()
    assetPrices.set("AMD", 129.23)
    assetPrices.set("AAPL", 201.24)
    assetPrices.set("D05.SI", 38.23)

    const data = CalculateDropdownData(portfolio, assetPrices, label.value)
    setPieChartData(data)
  }

  return <View style={styles.container}>
    <ThemedText type='h5'>Assets Allocation</ThemedText>
    <ThemedDoughnutChart data={pieChartData}/>
    <View style={styles.row}>
      <View style={styles.leftColumn}>
        <ThemedText type="l1">Group by</ThemedText>
      </View>
      <View style={styles.rightColumn}>
        <ThemedDropdown datas={dropdownLabels} selectedData={label} onChange={onSelectDropdown}/>
      </View>
    </View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },
  row: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
		borderBottomWidth: 1,
		alignItems: "center",
		paddingBottom: 6,
		paddingTop: 10,
  },
  leftColumn: {
    display: "flex",
    alignItems: "flex-start",
    width: "auto"
  },
  rightColumn: {
    display: "flex",
    alignItems: "flex-end",
    width: "60%"
  },
});