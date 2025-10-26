import EmptyInventory from '@/components/emptyInventory';
import ProductCard from '@/components/ProductCard';
import { ThemedView } from '@/components/themed-view';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useThemeContext } from '@/context/ThemeContext';
import { getProductsByUser } from '@/InventoryHubDb/ProductCRUD';
import { get } from '@/secureStore';
import styles from '@/stylesheets/InventoryScreenStylesheet';
import { ITEM_HEIGHT } from '@/stylesheets/ProductCardStylesheet';
import { Product } from '@/type';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsIndex() {
  const { theme } = useThemeContext();
  const inset = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);

  const { height } = Dimensions.get('window');
  const initialBatch = Math.ceil(height / ITEM_HEIGHT);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProducts = async () => {
        try {
          setLoading(true);

          const userIdString = await get('UserId');
          const userId = userIdString ? Number(userIdString) : null;

          const fetchedUsername = (await get('Username')) ?? null;

          if (!isActive) return;

          setUsername(fetchedUsername);

          if (userId !== null) {
            const fetchedProducts = await getProductsByUser(userId);
            console.log('fetchedProducts:', fetchedProducts); 
            if (isActive) setProducts(fetchedProducts);
          } else {
            console.warn('No user ID found in SecureStore');
            if (isActive) setProducts([]);
          }
        } catch (err: any) {
          console.log('Error loading products:', err.message);
          if (isActive) setProducts([]);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadProducts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ThemedView
      style={{
        ...styles.container,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      <ThemeSwitcher />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? '#C86DD7' : '#4B006E'}
          style={styles.activityIndicator}
        />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard key={item.id} product={item} />}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          initialNumToRender={initialBatch}
          maxToRenderPerBatch={initialBatch * 2}
          windowSize={5}
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      ) : (
        <EmptyInventory username={username} />
      )}
    </ThemedView>
  );
}
