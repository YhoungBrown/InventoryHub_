export interface User {
  id: number;
  name: string;
};


export interface Product {
  id?: number;
  name: string;
  description?: string;
  imageUri?: string;
  quantity: number;
  price: number;
  userId: number;
}

export interface usernameProps {
  username: string | null;
}

export interface ImagePickerComponentProps {
  onImageSelected: (uri: string) => void;
  currentImageUri?: string;
}

export interface ProductFormProps {
  product: Product;
  onChange: (field: keyof Product, value: string | number) => void;
}