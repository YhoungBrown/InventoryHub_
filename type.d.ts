export interface User {
  id: number;
  name: string;
};


export interface Product {
  id?: number,
  userId: number,
  name: string,
  description?: string,
  imageUri?: string,
  quantity: number = 0
  price: number
};

export interface usernameProps {
  username: string | null;
}