import { useThemeContext } from '@/context/ThemeContext'
import styles from '@/stylesheets/EmptyInventoryComponentStylesheet'
import { usernameProps } from '@/type'
import { Link } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'


const EmptyInventory = ({ username }: usernameProps) => {
    const { theme } = useThemeContext();
    
  return (
   <ThemedView style={styles.container}>
      <ThemedText 
          type="subtitle"  
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.emptyInventoryTextUsername
          }}
        >
          {username ? `Hey, ${username}!` : 'Hey there!'}
        </ThemedText>
        
        <Link href="/addProduct" asChild>
          <TouchableOpacity activeOpacity={0.4}>
            <ThemedText 
              type="default"  
              style={{  
                color: theme === 'dark' ? '#C86DD7' : '#4B006E',
                ...styles.emptyInventoryText
              }}
            >
              You currently have no products in your inventory. Click me to add Products
            </ThemedText>
          </TouchableOpacity>
        </Link>
        
        
        <ThemedView style={styles.ImageContainer}>
          <Image
            source={require('../assets/images/EmptyInventory.png')}
            style={styles.emptyStateImage}
            resizeMode="contain"
          />
        </ThemedView>
      </ThemedView>
  )
}

export default EmptyInventory