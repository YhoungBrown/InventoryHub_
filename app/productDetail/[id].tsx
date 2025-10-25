import ProductForm from '@/components/ProductForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { deleteProduct as deleteProductFromDB, getProductByProductId, updateProduct } from '@/InventoryHubDb/ProductCRUD';
import { get } from '@/secureStore';
import styles from '@/stylesheets/productDetailStylesheet';
import { Product } from '@/type';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, TouchableOpacity } from 'react-native';



const productDetail = () => {
  const router = useRouter();
  const {theme} = useThemeContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null> ();
  const [loading, setLoading] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});

  const productId = Number(id);


  const handleDeleteProduct = async (id: number) => {
    if (id == null) return;

    setLoading(true);
    try {
      await deleteProductFromDB(id);
      alert("Product deleted successfully");
      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Delete Alert', `Product delete not successful because ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productId) return;

    setLoading(true);
    try {
      await updateProduct(productId, editFormData);
      Alert.alert('Success', 'Product updated successfully');
      setEditModalVisible(false);
      
      // Reload product data
      const userIdString = await get('UserId');
      const userId = userIdString ? Number(userIdString) : null;
      if (userId) {
        const updatedProduct = await getProductByProductId(userId, productId);
        setProduct(updatedProduct);
      }
    } catch (error: any) {
      Alert.alert('Update Alert', `Product update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof Product, value: string | number) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const openEditModal = () => {
    if (product) {
      setEditFormData({
        name: product.name || '',
        description: product.description || '',
        imageUri: product.imageUri || '',
        quantity: product.quantity || 0,
        price: product.price || 0,
      });
    }
    setEditModalVisible(true);
  };


  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProduct = async () => {
        try {
          setLoading(true);

          const userIdString = await get('UserId');
          const userId = userIdString ? Number(userIdString) : null;

          if (!isActive) return;

          if (userId && !isNaN(productId)) {
            const fetchedProduct = await getProductByProductId(userId, productId);
            if (isActive) setProduct(fetchedProduct ?? null);

          } else {

            console.warn('No user ID found in SecureStore or invalid productId');
            if (isActive) setProduct(null);
          }
        } catch (err: any) {
          
          if (isActive) {
            Alert.alert('Error loading product', err.message);
            setProduct(null);
          }
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
          size='large' 
          color={theme === 'dark' ? '#C86DD7' : '#4B006E'} 
          style={styles.activityIndicator} 
        />
      )}

      {product?.imageUri && (
        <ThemedView style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUri }}
            style={styles.image}
          />
        </ThemedView>

      )}

      <ThemedView style={styles.textBodyContainer}>
        <ThemedView style={styles.contentContainer}>
          <ThemedView style={styles.titleRow}>
            <ThemedText
              type="subtitle"
              style={{
                color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                ...styles.productName
              }}
            >
              {product?.name}
            </ThemedText>
            
            <ThemedText
              style={{
                color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                ...styles.price
              }}
            >
              ₦{product?.price}
            </ThemedText>
          </ThemedView>

          {product?.description && (
            <ThemedText
              style={{
                color: theme === 'dark' ? '#ddd' : '#333',
                ...styles.description
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
                <ThemedText 
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}
                >
                  Edit
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButtonTouchableOpacity}
              onPress={() => handleDeleteProduct(productId)}
            >
              <ThemedView style={styles.deleteButton}>
                <ThemedText 
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}
                >
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
             <ThemedView style={[
               styles.modalContent,
               {
                 backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
               }
             ]}>
               <ThemedText
                 type="subtitle"
                 style={{
                   color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                   marginBottom: 20
                 }}
               >
                 Edit Product
               </ThemedText>

               <ProductForm
                 product={editFormData as Product}
                 onChange={handleFormChange}
               />

               <ThemedView style={styles.modalButtonContainer}>
                 <TouchableOpacity
                   style={[
                     styles.modalButton,
                     styles.cancelButton,
                     { backgroundColor: '#999' }
                   ]}
                   onPress={() => setEditModalVisible(false)}
                 >
                   <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                     Cancel
                   </ThemedText>
                 </TouchableOpacity>

                 <TouchableOpacity
                   style={[
                     styles.modalButton,
                     { backgroundColor: '#4B006E' }
                   ]}
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
  )
}

export default productDetail