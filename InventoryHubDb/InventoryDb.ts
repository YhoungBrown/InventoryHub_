import * as SQLite from 'expo-sqlite';


export const openDB = async () => {
  const db = await SQLite.openDatabaseAsync('inventoryApp.db');

  // Create the tables if they don’t already exist
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      imageUri TEXT,
      quantity INTEGER DEFAULT 0,
      price REAL DEFAULT 0,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  return db;
};
