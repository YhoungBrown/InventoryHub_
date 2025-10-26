// InventoryHubDb/ProductCRUD.ts
import { Product } from '@/type';
import * as SQLite from 'expo-sqlite';

// Keep a single DB instance
let db: SQLite.SQLiteDatabase | null = null;

// Open DB
export const openDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('InventoryHub.db');
    await migrateProductsTable(); // Ensure migration runs
  }
  return db;
};

// Migration: ensure `products` table exists and has `price` column
const migrateProductsTable = async () => {
  const db = await openDB();

  // Create products table if it doesn't exist
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      imageUri TEXT,
      quantity INTEGER NOT NULL,
      userId INTEGER NOT NULL
    );
  `);

  // Check if price column exists
  const columns = await db.getAllAsync(`PRAGMA table_info(products);`);
  const hasPrice = columns.some((col: any) => col.name === 'price');

  if (!hasPrice) {
    await db.runAsync(`ALTER TABLE products ADD COLUMN price INTEGER DEFAULT 0;`);
    console.log('Migration: Added price column to products table.');
  }
};



// ADD PRODUCT
export const addProduct = async (product: Product) => {
  const db = await openDB();

  const stmt = await db.prepareAsync(
    `INSERT INTO products (name, description, imageUri, quantity, price, userId)
     VALUES ($name, $description, $imageUri, $quantity, $price, $userId);`
  );

  try {
    const result = await stmt.executeAsync({
      $name: product.name?.trim() ?? '',
      $description: product.description?.trim() ?? null,
      $imageUri: product.imageUri ?? null,
      $quantity: Number(product.quantity),
      $price: Number(product.price),
      $userId: Number(product.userId),
    });
    return result.lastInsertRowId;
  } finally {
    await stmt.finalizeAsync();
  }
};




// GET ALL PRODUCTS FOR A USER
export const getProductsByUser = async (userId: number): Promise<Product[]> => {
  const db = await openDB();

  const stmt = await db.prepareAsync(
    `SELECT * FROM products WHERE userId = $userId;`
  );

  try {
    const result = await stmt.executeAsync({ $userId: userId });
    const rows = (await result.getAllAsync()) as unknown[];

    
    const products: Product[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      imageUri: row.imageUri,
      quantity: Number(row.quantity),
      price: Number(row.price),
      userId: Number(row.userId),
    }));

    return products;
  } finally {
    await stmt.finalizeAsync();
  }
};




// GET SINGLE PRODUCT BY ID
export const getProductById = async (id: number) => {
  const db = await openDB();

  const stmt = await db.prepareAsync(
    `SELECT * FROM products WHERE id = $id;`
  );

  try {
    const result = await stmt.executeAsync({ $id: id });
    return await result.getFirstAsync();
  } finally {
    await stmt.finalizeAsync();
  }
};


// UPDATE PRODUCT
export const updateProduct = async (product: {
  id: number;
  userId: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  imageUri?: string;
}) => {
  const db = await openDB();

  const fields: string[] = [];
  const values: Record<string, any> = {};

  if (product.name !== undefined) {
    fields.push('name = $name');
    values.$name = product.name;
  }
  if (product.price !== undefined) {
    fields.push('price = $price');
    values.$price = product.price;
  }
  if (product.quantity !== undefined) {
    fields.push('quantity = $quantity');
    values.$quantity = product.quantity;
  }
  if (product.description !== undefined) {
    fields.push('description = $description');
    values.$description = product.description;
  }
  if (product.imageUri !== undefined) {
    fields.push('imageUri = $imageUri');
    values.$imageUri = product.imageUri;
  }

  if (fields.length === 0) return; 

  
  values.$id = product.id;
  values.$userId = product.userId;

  const stmt = await db.prepareAsync(`
    UPDATE products
    SET ${fields.join(', ')}
    WHERE id = $id AND userId = $userId;
  `);

  try {
    const result = await stmt.executeAsync(values);
    return result.changes;
  } finally {
    await stmt.finalizeAsync();
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id: number, userId: number) => {
  const db = await openDB();

  const stmt = await db.prepareAsync(`
    DELETE FROM products
    WHERE id = $id AND userId = $userId;
  `);

  try {
    const result = await stmt.executeAsync({ $id: id, $userId: userId });
    return result.changes; 
  } finally {
    await stmt.finalizeAsync();
  }
};

