import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useThemeContext } from '@/context/ThemeContext';
import { createOrFindUser } from '@/InventoryHubDb/userCRUD';
import { save } from '@/secureStore';
import styles from '@/stylesheets/welcomeScreenStylesheet';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const index = () => {
    const inset = useSafeAreaInsets();
    const {theme} = useThemeContext();
    const [username, setUsername] = useState<string>('');
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const login = (username: string) => {
      if (username === '') {
        Alert.alert('Invalid Name', 'Please enter a valid name.');
        return;
      }

      setLoading(true);
      username = username.toLowerCase().trim();
      createOrFindUser(username)
      .then((user) => {
        save('UserId', user.id.toString());
        save('Username', user.name);
      })
      .then(() => router.push('/(tabs)'))
      .finally(() => setLoading(false));
    };



  return (
    <ThemedView style={{ 
        paddingTop: inset.top, 
        paddingBottom: inset.bottom,
        ...styles.container
    }}>
     
        <ThemeSwitcher />

        <ThemedView style={styles.welcomeTextContainer}>
          <ThemedText  
          type='title'
          style={{
            ...styles.welcomeText,
            color: theme === 'dark' ? '#C86DD7' : '#4B006E'
            }}>
            Welcome to InventoryHub
          </ThemedText>

          <ThemedText  
            style={{
             ...styles.welcomesubText,
              color: theme === 'dark' ? '#C86DD7' : '#4B006E'
            }}
          >
            Keep track of your products with ease!
          </ThemedText>
        </ThemedView>
      
      <ThemedView style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F8F8F8',
        shadowColor: theme === 'dark' ? '#F8F8F8' : '#1e0124ff',
        borderColor: theme === 'dark' ? '#333' : '#ddd',
        ...styles.welcomeUsernameContainer
        }}
      >
        <ThemedText
          style={{
            color: theme === 'dark' ? '#C86DD7' : '#4B006E',
            ...styles.textInputTitle,
          }}
        >
          Who is using InventoryHub today?
        </ThemedText>

        <TextInput
          placeholder='Enter your name...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#4B006E'}
          style={{
            ...styles.textInput,
            borderColor: theme === 'dark' ? '#4B006E' : '#C86DD7',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            color: theme === 'dark' ? 'white' : 'black',
          }}
          onChangeText={setUsername}
        />


        {loading ? 
        (
          <ActivityIndicator 
            size='large' 
            color={theme === 'dark' ? '#C86DD7' : '#4B006E'} 
            style={styles.activityIndicator} 
          />
        ) : (
          <TouchableOpacity
            style={styles.InventoryButtonTouchableOpacity} 
            onPress={() => login(username)}
          >
            <ThemedView style={styles.continueButton}>
               <ThemedText 
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
                >
                  Continue To Inventory
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
        )}

      </ThemedView>
    </ThemedView>
  )
}

export default index