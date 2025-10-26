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