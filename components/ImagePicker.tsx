import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void;
  currentImageUri?: string;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ 
  onImageSelected, 
  currentImageUri 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(currentImageUri);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (libraryStatus !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to select images!');
        return false;
      }

      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera permissions to take photos!');
        return false;
      }
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        onImageSelected(imageUri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const takePhotoWithCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        onImageSelected(imageUri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: takePhotoWithCamera,
        },
        {
          text: 'Photo Library',
          onPress: pickImageFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ThemedView>
      <TouchableOpacity
        onPress={showImageOptions}
        style={{
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: selectedImage ? '#4B006E' : '#999',
          borderRadius: 8,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        ) : (
          <ThemedText style={{ color: '#999', fontSize: 14 }}>
            Tap to select an image
          </ThemedText>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ImagePickerComponent;