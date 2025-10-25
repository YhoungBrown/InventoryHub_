
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import styles from '@/stylesheets/InventoryScreenStylesheet';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function ProductInventory() {
  const inset = useSafeAreaInsets();
  return (
    <ThemedView
      style={{
        ...styles.container,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >

      <ThemedText type="default">
        You currently have no products in your inventory.
        <Link href="/addProduct">Add Product</Link>
      </ThemedText>
    </ThemedView>
  );
}


