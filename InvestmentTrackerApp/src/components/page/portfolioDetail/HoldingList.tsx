import { StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Portfolio from '@/watermelon/Portfolio';
import { HoldingRow } from './HoldingRow';
import { InternalLink } from '@/components/atoms/InternalLink';

export type HoldingListProps = {
  lightColor?: string;
  darkColor?: string;
};

export function HoldingList({ lightColor, darkColor  }: HoldingListProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <View style={styles.container}>
		<View style={styles.labelRow}>
			<ThemedText type='h5' style={styles.label}>
				Holdings
			</ThemedText>

      <InternalLink href="/portfolio/edit"> 
			  <Ionicons name={"add"} size={24} color={textColor}/>
      </InternalLink>
		</View>
		
		<View>
      <HoldingRow 
        symbol={"AMZN"} 
        shortName={"Amazon"} 
        quantity={25} 
        price={184.7} 
        pricePercent={-1.24} 
        marketValue={4617.5}
        marketValuePercent={13.24}
      />
      <HoldingRow 
        symbol={"AMZN"} 
        shortName={"Amazon"} 
        quantity={25} 
        price={184.7} 
        pricePercent={-1.24} 
        marketValue={4617.5}
        marketValuePercent={13.24}
      />
      <HoldingRow 
        symbol={"AMZN"} 
        shortName={"Amazon"} 
        quantity={25} 
        price={184.7} 
        pricePercent={-1.24} 
        marketValue={4617.5}
        marketValuePercent={13.24}
      />
		</View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 50,
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