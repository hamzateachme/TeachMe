import * as SecureStore from 'expo-secure-store';

async function storeUser(user) {
  try {
    console.log(user);
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

async function getUser() {
  try {
    const user = await SecureStore.getItemAsync('user');
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
}

async function removeUser() {
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (error) {
    console.log(error);
  }
}

export default {storeUser, getUser, removeUser};
