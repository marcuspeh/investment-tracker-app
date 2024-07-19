import { StyleSheet, View, type ViewProps } from 'react-native';

import { InternalLink } from '@/components/atoms/InternalLink';
import { ThemedText } from '@/components/atoms/ThemedText';

export type TopBarProps = ViewProps & {
  username: string;

  lightColor?: string;
  darkColor?: string;
};

export function TopBar({ username, ...otherProps }: TopBarProps) {
 

  return <View style={styles.container}>
      <ThemedText type={'s2'}>Welcome back</ThemedText>
      {
        username !== "" 
          ?
          <ThemedText type={'b1'}>{username}</ThemedText>
          :
          <InternalLink href="/stock">Click here to sign in and sync your data</InternalLink>
      }
  </View>
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});