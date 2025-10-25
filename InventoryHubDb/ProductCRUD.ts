import { Product } from '@/type';
import { openDB } from './InventoryDb';


//POST
export const addProduct = async ( {userId, name, description, imageUri, quantity, price} : Product
) => {
  const db = await openDB();

  await db.runAsync(
    `INSERT INTO products (name, description, imageUri, quantity, price, userId)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [name, description || null, imageUri || null, quantity, price || 0, userId]
  );
};


// GET PRODUCTS
export const getProductsByUser = async (userId: number) : Promise<Product[]> => {
  const db = await openDB();

  const products = await db.getAllAsync(
    'SELECT * FROM products WHERE userId = ?;',
    [userId]
  );
  
  return products as Product[];
};


//GET PRODUCT BY PRODUCT ID
export const getProductByProductId = async (
  userId: number,
  productId: number
): Promise<Product | null> => {
  const db = await openDB();

  const product = await db.getFirstAsync(
    'SELECT * FROM products WHERE userId = ? AND id = ?;',
    [userId, productId]
  );

  return product as Product | null;
};


// DELETE
export const deleteProduct = async (productId: number) => {
  const db = await openDB();
  await db.runAsync('DELETE FROM products WHERE id = ?;', [productId]);
};


//PUT
export const updateProduct = async (productId: number, updatedProductInfo: Partial<Product>) => {
  const db = await openDB();

  const existingProduct = await db.getAllAsync('SELECT * FROM products WHERE id = ? LIMIT 1;', [productId]);

  if (existingProduct.length === 0) {
    throw new Error('Product not found');
  }

  const product = existingProduct[0] as Product; 

  await db.runAsync(
    `UPDATE products 
     SET name = ?, description = ?, imageUri = ?, quantity = ?, price = ? 
     WHERE id = ?;`,
    [
      updatedProductInfo.name ?? product.name,
      updatedProductInfo.description ?? product.description,
      updatedProductInfo.imageUri ?? product.imageUri,
      updatedProductInfo.quantity ?? product.quantity,
      updatedProductInfo.price ?? product.price,
      productId
    ].map(value => value === undefined ? null : value) 
  );
};


