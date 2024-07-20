import { StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Portfolio from '@/watermelon/Portfolio';
import { PortfolioRow } from './portfolioRow';

export type PortfolioListProps = ViewProps & {
	portfolios: Portfolio[],

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioList({ portfolios, lightColor, darkColor, ...otherProps }: PortfolioListProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const getOverview = (): Portfolio => {
    const result = {
      id: "0",
      title: "Overall Investments",
      description: "All your portfolios in one",
    } as Portfolio

    for (const portfolio of portfolios) {
      // do something here
    }

    return result
  }

  const overviewPortfolio = getOverview();

  return <View style={styles.container}>
		<View style={styles.labelRow}>
			<ThemedText type='h5' style={styles.label}>
				Portfolios
			</ThemedText>
			<Ionicons name={"add"} size={24} color={textColor}/>
		</View>
		
		<View>
      <PortfolioRow portfolio={overviewPortfolio} />
      {
        portfolios.map((portfolio) => (
          <PortfolioRow key={portfolio.id} portfolio={portfolio} />
        ))
      }
		</View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 20,
  },
  labelRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  label: {
    marginBottom: 5,
  }
});