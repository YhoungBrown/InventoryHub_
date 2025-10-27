import { useThemeContext } from '@/context/ThemeContext';
import styles from '@/stylesheets/FormStyles';
import { ProductFormProps } from '@/type';
import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import ImagePickerComponent from './ImagePicker';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';



const ProductForm: React.FC<ProductFormProps> = ({ product, onChange }) => {
  const { theme } = useThemeContext();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.productNameContainer}>
        <ThemedText
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.productname
          }}
        >
          Product Name
        </ThemedText>

        <TextInput
          placeholder='Enter product name...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#999'}
          style={{
           ...styles.productnameTextInput,
            borderColor: theme === 'dark' ? '#4B006E' : '#C86DD7',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
             color: theme === 'dark' ? '#C86DD7' : '#4B006E',
          }}
          value={product.name}
          onChangeText={(value) => onChange('name', value)}
        />

        <ThemedText
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.price
          }}
        >
          Price
        </ThemedText>

        <TextInput
          placeholder='Enter price...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#999'}
          keyboardType="numeric"
          style={{
            ...styles.priceTextInput,
            borderColor: theme === 'dark' ? '#4B006E' : '#C86DD7',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
             color: theme === 'dark' ? '#C86DD7' : '#4B006E',
          }}
          value={product.price?.toString() || ''}
          onChangeText={(value) => onChange('price', parseFloat(value) || 0)}
        />

        <ThemedText
          style={{
            ...styles.quantity,
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
          }}
        >
          Quantity
        </ThemedText>

        <TextInput
          placeholder='Enter quantity...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#999'}
          keyboardType="numeric"
          style={{
            ...styles.quantityTextInput,
            borderColor: theme === 'dark' ? '#4B006E' : '#C86DD7',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
          }}
          value={product.quantity?.toString() || ''}
          onChangeText={(value) => onChange('quantity', parseInt(value) || 0)}
        />

        <ThemedText
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.description
          }}
        >
          Description
        </ThemedText>

        <TextInput
          placeholder='Enter product description...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#999'}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{
            ...styles.descriptionTextInput,
            borderColor: theme === 'dark' ? '#4B006E' : '#C86DD7',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
             color: theme === 'dark' ? '#C86DD7' : '#4B006E',
          }}
          value={product.description || ''}
          onChangeText={(value) => onChange('description', value)}
        />

        <ThemedText
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.productImage
          }}
        >
          Product Image
        </ThemedText>
        
        <ImagePickerComponent
          onImageSelected={(uri) => onChange('imageUri', uri)}
          currentImageUri={product.imageUri}
        />
      </ThemedView>
    </ScrollView>
  );
};

export default ProductForm;