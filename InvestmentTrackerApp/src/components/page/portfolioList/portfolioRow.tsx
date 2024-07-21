import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/atoms/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import Portfolio from '@/watermelon/Portfolio';
import { InternalLink } from '@/components/atoms/InternalLink';
import { router } from 'expo-router';

export type PortfolioRowProps = ViewProps & {
	portfolio: Portfolio,
  isEditable: boolean,

  lightColor?: string;
  darkColor?: string;
};

export function PortfolioRow({ portfolio, isEditable, lightColor, darkColor, ...otherProps }: PortfolioRowProps) {
  const lightTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lightColor');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');

  const onClickPortfolio = () => {
    router.push({
      pathname: "/portfolio/detail?id=[id]",
      params: { "id": portfolio.id }
    });
  }

  return <View style={[styles.container, { borderBottomColor: borderColor }]}>
		<Pressable 
      onPress={onClickPortfolio} 
      style={styles.leftColumn}>
			<ThemedText type='p1'
    >
				{portfolio.title}
			</ThemedText>
			<ThemedText type='l2' style={{ color: lightTextColor }}>
				Note: {portfolio.description || "-"}
			</ThemedText>
		</Pressable>

    <View>
      {
        isEditable && (
          <InternalLink push href={{
            pathname: "/portfolio/edit?id=[id]",
            params: { "id": portfolio.id }
          }}>
            <Ionicons name={"pencil"} size={16} color={textColor}/>
          </InternalLink>
        )
      }
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
    width: "auto"
  },
});