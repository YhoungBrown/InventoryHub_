export interface User {
  id: number;
  name: string;
};


export interface Product {
  userId: number,
  name: string,
  description?: string,
  imageUri?: string,
  quantity: number = 0
};