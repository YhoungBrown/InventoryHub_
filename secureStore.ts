import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function get(key: string) {
  return await SecureStore.getItemAsync(key);
}

async function remove(key: string) {
  await SecureStore.deleteItemAsync(key);
}
export { get, remove, save };

