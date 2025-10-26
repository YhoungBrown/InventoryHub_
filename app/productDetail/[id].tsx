import ProductForm from '@/components/ProductForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import {
  deleteProduct as deleteProductFromDB,
  getProductById,
  updateProduct,
} from '@/InventoryHubDb/ProductCRUD';
import { get } from '@/secureStore';
import styles from '@/stylesheets/productDetailStylesheet';
import { Product } from '@/type';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, TouchableOpacity } from 'react-native';

const ProductDetail = () => {
  const router = useRouter();
  const { theme } = useThemeContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const productId = Number(id);

  const loadUserId = async (): Promise<number | null> => {
    const userIdString = await get('UserId');
    return userIdString ? Number(userIdString) : null;
  };

  const handleDeleteProduct = async () => {
    const userId = await loadUserId();
    if (!userId || !productId) return;

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await deleteProductFromDB(productId, userId);
              Alert.alert('Success', 'Product deleted successfully');
              router.push('/(tabs)');
            } catch (error: any) {
              Alert.alert('Delete Error', error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleUpdateProduct = async () => {
    const userId = await loadUserId();
    if (!userId || !productId) return;

    setLoading(true);
    try {
      await updateProduct({
        id: productId,
        userId,
        ...editFormData,
      });

      Alert.alert('Success', 'Product updated successfully');
      setEditModalVisible(false);

      // Reload updated product with type assertion
      const updatedProduct = (await getProductById(productId)) as Product | null;
      setProduct(updatedProduct);
    } catch (error: any) {
      Alert.alert('Update Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof Product, value: string | number) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openEditModal = () => {
    if (!product) return;

    setEditFormData({
      name: product.name ?? '',
      description: product.description ?? '',
      imageUri: product.imageUri ?? '',
      quantity: product.quantity ?? 0,
      price: product.price ?? 0,
    });
    setEditModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProduct = async () => {
        setLoading(true);
        try {
          if (!isActive || isNaN(productId)) return;
          const fetchedProduct = (await getProductById(productId)) as Product | null;

          if (isActive) {
            setProduct(fetchedProduct);
          }
        } catch (error: any) {
          if (isActive) Alert.alert('Error', error.message);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadProduct();

      return () => {
        isActive = false;
      };
    }, [id])
  );

  return (
    <ThemedView style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? '#C86DD7' : '#4B006E'}
          style={styles.activityIndicator}
        />
      )}

      {product?.imageUri && (
        <ThemedView style={styles.imageContainer}>
          <Image source={{ uri: product.imageUri }} style={styles.image} />
        </ThemedView>
      )}

      <ThemedView style={styles.textBodyContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.titleRow}>
            <ThemedText
              type="subtitle"
              style={{
                color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                ...styles.productName,
              }}
            >
              {product?.name}
            </ThemedText>

            <ThemedText
              style={{
                color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                ...styles.price,
              }}
            >
              ₦{product?.price}
            </ThemedText>
          </ThemedView>

          {product?.description && (
            <ThemedText
              style={{
                color: theme === 'dark' ? '#ddd' : '#333',
                ...styles.description,
              }}
            >
              {product.description}
            </ThemedText>
          )}
        </ThemedView>

        {productId && (
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButtonTouchableOpacity}
              onPress={openEditModal}
            >
              <ThemedView style={styles.editButton}>
                <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                  Edit
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButtonTouchableOpacity}
              onPress={handleDeleteProduct}
            >
              <ThemedView style={styles.deleteButton}>
                <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                  Delete
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ThemedView>
        )}

        <Modal
          visible={editModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <ThemedView style={styles.modalContainer}>
            <ThemedView
              style={[
                styles.modalContent,
                { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' },
              ]}
            >
              <ThemedText
                type="subtitle"
                style={{ color: theme === 'dark' ? '#C86DD7' : '#4B006E', marginBottom: 20 }}
              >
                Edit Product
              </ThemedText>

              <ProductForm product={editFormData as Product} onChange={handleFormChange} />

              <ThemedView style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton, { backgroundColor: '#999' }]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#4B006E' }]}
                  onPress={handleUpdateProduct}
                  disabled={loading}
                >
                  <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                    {loading ? 'Updating...' : 'Update Product'}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Modal>
      </ThemedView>
    </ThemedView>
  );
};

export default ProductDetail;
