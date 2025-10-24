import { Alert } from 'react-native';
import type { User } from '../type';
import { openDB } from './InventoryDb';

// Find an existing user or create a new one
export const createOrFindUser = async (name: string): Promise<User> => {
  const db = await openDB();

  // Check if this user already exists
  const existingUser = await db.getFirstAsync<User>(
    'SELECT * FROM users WHERE name = ?;',
    [name]
  );

  if (existingUser) {
    Alert.alert('User Found', `Welcome back, ${existingUser.name}`);
    return existingUser;
  }

  // Otherwise, create the user
  const result = await db.runAsync(
    'INSERT INTO users (name) VALUES (?);',
    [name]
  );

  const newUser: User = { id: result.lastInsertRowId, name };
  return newUser;
};


