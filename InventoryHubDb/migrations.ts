// InventoryHubDb/migrations.ts
import { openDB } from '../InventoryHubDb/InventoryDb'; // or wherever your openDB function is

export const migrateProductsTable = async () => {
  const db = await openDB();

  // Get table columns
  const columns = await db.getAllAsync(`PRAGMA table_info(products);`);
  const hasPrice = columns.some((col: any) => col.name === 'price');

  if (!hasPrice) {
    // Add the price column
    await db.runAsync(`
      ALTER TABLE products
      ADD COLUMN price INTEGER DEFAULT 0;
    `);
    console.log('Migration done: price column added.');
  } else {
    console.log('Migration skipped: price column already exists.');
  }
};
