
import ProductForm from '@/components/ProductForm';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useThemeContext } from '@/context/ThemeContext';
import { addProduct } from '@/InventoryHubDb/ProductCRUD';
import { get } from '@/secureStore';
import styles from '@/stylesheets/addProductStylesheet';
import { Product } from '@/type';
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function TabTwoScreen() {
      const {theme} = useThemeContext();
      const inset = useSafeAreaInsets();
      const [loading, setLoading] = useState<Boolean>(false)
      const [editFormData, setEditFormData] = useState<Partial<Product>>({});


      const handleFormChange = (field: keyof Product, value: string | number) => {
        setEditFormData(prev => ({ ...prev, [field]: value }));
      };


      const handleCreateProduct = async () => {
        try {
          setLoading(true);

          const userIdString = await get('UserId');
          const userId = userIdString ? Number(userIdString) : null;

          if (!editFormData.name || !editFormData.price || !editFormData.quantity) {
            alert('Please fill out all fields.');
            return;
          }

          if(userId !== null){
            const productData: Product = {
              name: editFormData.name, 
              price: editFormData.price,
              quantity: editFormData.quantity,
              description: editFormData.description, 
              imageUri: editFormData.imageUri,       
              userId, 
            };

          await addProduct(productData);
            alert('Product created successfully!');
            setEditFormData({});
          }

        } catch (error: any) {
          console.error('Error creating product:', error.message);
          alert('Failed to create product. Please try again.');
        } finally {
          setLoading(false);
          }
      }
      


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
          <ProductForm
            product={editFormData as Product}
            onChange={handleFormChange}
          />

          <TouchableOpacity
            style={styles.createButtonTouchableOpacity}
            onPress={handleCreateProduct}
          >
            <ThemedView style={styles.createButton}>
              <ThemedText 
                style={styles.createText}
              >
                Create Product
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>

        </ScrollView>

      </ThemedView>

    </ThemedView>
  );
}


