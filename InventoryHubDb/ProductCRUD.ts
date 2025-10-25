import { Product } from '@/type';
import { openDB } from './InventoryDb';


//POST
export const addProduct = async ( {userId, name, description, imageUri, quantity} : Product
) => {
  const db = await openDB();

  await db.runAsync(
    `INSERT INTO products (name, description, imageUri, quantity, userId)
     VALUES (?, ?, ?, ?, ?);`,
    [name, description || null, imageUri || null, quantity, userId]
  );
};


// GET
export const getProductsByUser = async (userId: number) : Promise<Product[]> => {
  const db = await openDB();

  const products = await db.getAllAsync(
    'SELECT * FROM products WHERE userId = ?;',
    [userId]
  );
  
  return products as Product[];
};

// DELETE
export const deleteProduct = async (productId: number) => {
  const db = await openDB();
  await db.runAsync('DELETE FROM products WHERE id = ?;', [productId]);
};


//PUT
export const updateProduct = async (productId: number, updatedProductInfo: Product) => {
  const db = await openDB();

  await db.runAsync(
    `UPDATE products SET name = ?, description = ?, imageUri = ?, quantity = ? WHERE id = ?;`,
    [
      updatedProductInfo.name,
      updatedProductInfo.description || null,
      updatedProductInfo.imageUri || null,
      updatedProductInfo.quantity,
      productId
    ]
  );

  //Alert.alert('Product Updated', `Product "${updatedProductInfo.name}" has been updated successfully.`);
};