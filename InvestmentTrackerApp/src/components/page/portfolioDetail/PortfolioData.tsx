import { StyleSheet, View } from 'react-native';

import { TwoColumnTable, TwoColumnTableProps} from '@/components/atoms/TwoColumnTable';
import { ParsePrice } from '@/util/FormatNumber';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PortfolioDataProps = {
  realized: number;
  unrealized: number;

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioData({ realized, unrealized, lightColor, darkColor }: PortfolioDataProps) {
  const increaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'increaseText')
  const decreaseTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'decreaseText')
  const neutralTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'neutralText')
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

  const getColor = (num: number) => {
    if (num < 0) {
      return decreaseTextColor
    } 
    if (num > 0) {
      return increaseTextColor
    }
    return neutralTextColor
  }
  
  function getHoldingData(): TwoColumnTableProps {
    const unrealizedPL = ParsePrice(unrealized)
    const realizedPL = ParsePrice(realized)

    return {
      data: [
        {title: "Unrealized P/L", description: `${unrealizedPL}`, descriptionColor: getColor(unrealized)},
        {title: "Realized P/L", description: `${realizedPL}`, descriptionColor: getColor(realized)},
      ]
    }
  }

  return <View style={{
      ...styles.container,
      borderColor: borderColor,
    }}>
    <TwoColumnTable data={getHoldingData().data}/>

  </View>
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 20
  }
});