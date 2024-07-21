import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { CheckEmptyString } from '@/util/CheckEmpty';

type RowData = {
  title: string
  description: string
  titleColor?: string
  descriptionColor?: string
}

export type TwoColumnTableProps = {
  data: RowData[],
}


export function TwoColumnTable({ data, ...rest }: TwoColumnTableProps) {
  return (
    <View style={styles.table}>
      {
        data.map((prop, i) => 
          <View key={`${prop.title}-${i}`}  style={styles.row}>
            <ThemedText type="s1" style={[
              styles.leftCell, 
              !CheckEmptyString(prop.titleColor) && { color: prop.titleColor }
            ]}>
              {prop.title}
            </ThemedText>
            <ThemedText type="s1" style={[
              styles.rightCell, 
              !CheckEmptyString(prop.descriptionColor) && { color: prop.descriptionColor }
            ]}>
              {prop.description}
            </ThemedText>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 4,
  },
  row: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    width: "100%",
  },
  leftCell: {
    textAlign: "left",
  },
  rightCell: {
    textAlign: "right",
  },
});
