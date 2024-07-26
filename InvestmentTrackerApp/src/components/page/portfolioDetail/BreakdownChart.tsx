import { StyleSheet, View, type ViewProps } from 'react-native';

import { TwoColumnTable, TwoColumnTableProps} from '@/components/atoms/TwoColumnTable';
import { FormatLargeNumber, ParsePrice, ParsePriceWithFormat } from '@/util/FormatNumber';
import { QuoteModel } from '@/dto';
import { ThemedText } from '../../atoms/ThemedText';
import Portfolio from '@/watermelon/Portfolio';
import { ThemedDoughnutChart, ThemedDoughnutChartData } from '@/components/atoms/ThemedDoughnutChart';
import { ThemedDropdown, ThemedDropdownData } from '@/components/atoms/ThemedDropdown';

export type BreakdownChartProps = {
  portfolio: Portfolio,

  lightColor?: string;
  darkColor?: string;
};

const dropdownData: ThemedDropdownData[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export function BreakdownChart({ portfolio, lightColor, darkColor }: BreakdownChartProps) {
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

  return <View style={styles.container}>
    <ThemedText type='h5'>Assets Allocation</ThemedText>
    <ThemedDoughnutChart data={pieChartData}/>
    <View style={styles.row}>
      <View style={styles.leftColumn}>
        <ThemedText type="l1">Group by</ThemedText>
      </View>
      <View style={styles.rightColumn}>
        <ThemedDropdown datas={dropdownData} defaultData={dropdownData[0]} onSelect={(value: string) => {}}/>
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