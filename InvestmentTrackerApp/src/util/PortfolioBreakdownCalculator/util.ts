import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";

function ConvertCountToData(count: Map<string, number>): ThemedDoughnutChartData[] {
  return Array
    .from(count.entries())
    .map(([name, count]) => ({
      label: name,
      value: count
    }));
}

export {
  ConvertCountToData
}
