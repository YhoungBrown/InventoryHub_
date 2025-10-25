import { useThemeContext } from '@/context/ThemeContext'
import styles from '@/stylesheets/ProductCardStylesheet'
import { Product } from '@/type'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

const ProductCard = ({ product }: { product: Product }) => {
   
    const router = useRouter();
    const {theme} = useThemeContext();
    //  
  return (
    <ThemedView style={styles.parent}>
        <TouchableOpacity style={{
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F8F8F8',
            shadowColor: theme === 'dark' ? '#F8F8F8' : '#1e0124ff',
            borderColor: theme === 'dark' ? '#333' : '#ddd',
            ...styles.cardContainer
        }}
        onPress={() =>
            router.push({
                pathname: "/productDetail/[id]",
                params: { id: String(product.id) }
            })
        }
        >
            {product.imageUri && (
                <ThemedView style={styles.cardImageContainer}>
                    <Image
                        source={{ uri: product.imageUri }}
                        style={styles.cardImage} 
                        resizeMode="cover"
                    />
                </ThemedView>

            )} 
            
            <ThemedView style={styles.cardContent}>
                <ThemedView style={styles.priceContainer}>
                    <ThemedText
                        type='subtitle'
                        style={{
                            color: theme === 'dark' ? '#C86DD7' : '#4B006E'
                        }}
                    >
                        {product.name}
                    </ThemedText>

                    <ThemedText 
                        style={{
                            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                            ...styles.price
                        }}
                    >
                        {`₦${product.price}`}
                    </ThemedText>
                </ThemedView>

                <ThemedText 
                    style={{
                        color: theme === 'dark' ? '#ddd' : '#4B006E',
                        ...styles.quantity
                    }}
                >
                    Product Quantity: {product.quantity}
                </ThemedText>

                {product.description && ( 
                    <ThemedText
                        numberOfLines={3} 
                        style={{
                            color: theme === 'dark' ? '#ddd' : '#4B006E',
                            ...styles.description
                        }}
                    >
                        {product.description}
                    </ThemedText>

                )}

            </ThemedView>
        </TouchableOpacity>
    </ThemedView>
  )
}

export default ProductCard