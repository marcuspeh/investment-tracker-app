import { StyleSheet, View, type ViewProps } from 'react-native';

import { TwoColumnTable, TwoColumnTableProps} from '@/components/atoms/TwoColumnTable';
import { FormatLargeNumber } from '@/util/FormatNumber';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from '../../atoms/ThemedButton';

export type HoldingDataProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function HoldingData({ style, lightColor, darkColor, ...otherProps }: HoldingDataProps) {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');
  const buttonActiveBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveBackground');
  const buttonActiveText = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonActiveText');
  
  function getHoldingData(): TwoColumnTableProps {
    const holding = FormatLargeNumber(535)
    const value = FormatLargeNumber(0)

    return {
      data: [
        {title: "Your holdings", description: `${holding}`},
        {title: "Value", description: `\$${value}`},
      ]
    }
  }

  return <View style={{
      ...styles.container,
      borderColor: borderColor,
    }}>
    <View style={styles.data}>
      <TwoColumnTable data={getHoldingData().data}/>
    </View>
    <View style={styles.button}>
      <ThemedButton 
        buttonOnPress={() => {}}
        backgroundColor={buttonActiveBackground}
        textColor={buttonActiveText}
        label={"Transactions"}
        labelType={'b1'}
        width={"100%"}
        height={45}
      />      
    </View>

  </View>
}


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  data: {
    marginBottom: 30,
  },
  button: {
    marginBottom: 15,
  }
});