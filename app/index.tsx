import ThemeSwitcher from '@/components/ThemeSwitcher';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const index = () => {
    const inset = useSafeAreaInsets();
  return (
    <View style={{paddingTop: inset.top, paddingBottom: inset.bottom}}>
        <ThemeSwitcher />
      <Text>index</Text>
    </View>
  )
}

export default index