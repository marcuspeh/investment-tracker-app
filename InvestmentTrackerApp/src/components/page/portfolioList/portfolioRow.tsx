import { StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Portfolio from '@/watermelonDB/Portfolio';

export type PortfolioRowProps = ViewProps & {
	portfolio: Portfolio,

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioRow({ portfolio, lightColor, darkColor, ...otherProps }: PortfolioRowProps) {
  const lightTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lightColor');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');


  return <View style={[styles.container, { borderBottomColor: borderColor }]}>
		<View style={styles.leftColumn}>
			<ThemedText type='p1'>
				{portfolio.title}
			</ThemedText>
			<ThemedText type='l2' style={{ color: lightTextColor }}>
				Note: {portfolio.description || "-"}
			</ThemedText>
		</View>
		
		<View>
			<Ionicons name={"pencil"} size={16} color={textColor}/>
		</View>
  </View>
}


const styles = StyleSheet.create({
  container: {
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
  },
});