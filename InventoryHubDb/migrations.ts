
import { openDB } from '../InventoryHubDb/InventoryDb';

export const migrateProductsTable = async () => {
  const db = await openDB();


  const columns = await db.getAllAsync(`PRAGMA table_info(products);`);
  const hasPrice = columns.some((col: any) => col.name === 'price');

  if (!hasPrice) {

    await db.runAsync(`
      ALTER TABLE products
      ADD COLUMN price INTEGER DEFAULT 0;
    `);
    console.log('Migration done: price column added.');
  } else {
    console.log('Migration skipped: price column already exists.');
  }
};
