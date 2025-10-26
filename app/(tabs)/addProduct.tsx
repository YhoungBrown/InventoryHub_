import ProductForm from '@/components/ProductForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useThemeContext } from '@/context/ThemeContext';
import { addProduct } from '@/InventoryHubDb/ProductCRUD';
import { get } from '@/secureStore';
import styles from '@/stylesheets/addProductStylesheet';
import { Product } from '@/type';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddProductScreen() {
  const { theme } = useThemeContext();
  const inset = useSafeAreaInsets();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const [userId, setUserId] = useState<number | null>(null);

  // Load userId whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadUserId = async () => {
        try {
          const storedId = await get('UserId');
          if (storedId) {
            console.log('User ID loaded:', storedId);
            setUserId(Number(storedId));
          } else {
            console.warn('No user ID found in SecureStore');
            Alert.alert('Login Required', 'Please log in again.');
          }
        } catch (error) {
          console.error('Error loading user ID:', error);
        }
      };
      loadUserId();
    }, [])
  );

  const handleFormChange = (field: keyof Product, value: string | number) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProduct = async () => {
  if (!userId) {
    Alert.alert('Error', 'User not found. Please log in again.');
    return;
  }

  const { name, price, quantity, description, imageUri } = editFormData;

  if (!name || price == null || quantity == null) {
    Alert.alert('Validation Error', 'Please fill out all required fields.');
    return;
  }

  const productData: Product = {
    name: name.trim(),
    price: Number(price),
    quantity: Number(quantity),
    description: description?.trim() || '',
    imageUri: imageUri || '',
    userId,
  };

  try {
    setLoading(true);
    await addProduct(productData);

    Alert.alert('Success', 'Product created successfully!');
    setEditFormData({}); 
    router.push({ pathname: '/(tabs)' });
  } catch (error: any) {
    console.error('Error creating product:', error);
    Alert.alert('Error', 'Failed to create product. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <ThemedView
      style={{
        ...styles.container,
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      <ThemeSwitcher />

      <ThemedView style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductForm product={editFormData as Product} onChange={handleFormChange} />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme === 'dark' ? '#C86DD7' : '#4B006E'}
              style={styles.activityIndicator}
            />
          ) : (
            <TouchableOpacity style={styles.createButtonTouchableOpacity} onPress={handleCreateProduct}>
              <ThemedView style={styles.createButton}>
                <ThemedText style={styles.createText}>Create Product</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}
