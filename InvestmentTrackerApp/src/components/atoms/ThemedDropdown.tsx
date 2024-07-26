import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';


import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedDropdownData = {
  label: string,
  value: string
}

export type ThemedDropdownProps = {
  onSelect: (value: string) => void
  datas: ThemedDropdownData[]
  defaultData: ThemedDropdownData
  
  lightColor?: string;
  darkColor?: string;
};


export function ThemedDropdown({ onSelect, datas, defaultData, lightColor, darkColor }: ThemedDropdownProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'dropdown');

  const [selectedData, setSelectedData] = useState<ThemedDropdownData>(defaultData);

  function renderItem(data: ThemedDropdownData) {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{data.label}</Text>
        {data === selectedData && (
          <Ionicons name={'checkmark'} size={20} color={"black"}/>
        )}
      </View>
    );
  }

  function onChange(item: ThemedDropdownData): void {
    setSelectedData(item);
    onSelect(item.value);
  }


  return (
    <Dropdown
      style={[styles.dropdown, { backgroundColor: backgroundColor }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={datas}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={selectedData}
      onChange={onChange}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: "100%",
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});