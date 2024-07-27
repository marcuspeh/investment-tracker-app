import Portfolio from "@/watermelon/Portfolio";

import { ThemedDoughnutChartData } from "@/components/atoms/ThemedDoughnutChart";
import { CalculateIndividualAsset } from "./IndividualAsset";
import { CalculateAssetClass } from "./AssetClass";
import { CalculateMarket } from "./Market";
import { CalculateCountry } from "./Country";


export enum DropdownType {
  IndividualAsset = "individual_asset",
  AssetClass = "asset_class",
  Market = "market",
  Country = "country"
}

function CalculateDropdownData(portfolio: Portfolio, assetPrice: Map<string, number>, dropdownValue: string): ThemedDoughnutChartData[] {
  switch (dropdownValue) {
    case DropdownType.IndividualAsset:
      return CalculateIndividualAsset(portfolio, assetPrice)
    case DropdownType.AssetClass:
      return CalculateAssetClass(portfolio, assetPrice)
    case DropdownType.Market:
      return CalculateMarket(portfolio, assetPrice)
    case DropdownType.Country:
      return CalculateCountry(portfolio, assetPrice)
    default:
      return []
  }
}

export {
    CalculateDropdownData
}