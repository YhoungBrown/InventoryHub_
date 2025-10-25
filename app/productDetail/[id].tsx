import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

const productDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const productId = Number(id);

  return (
    <ThemedView>
      <Text>productDetail {id}</Text>
    </ThemedView>
  )
}

export default productDetail