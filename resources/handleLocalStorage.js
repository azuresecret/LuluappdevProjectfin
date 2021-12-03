import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeUser(value) {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(value.toJSON()));
  } catch (e) {
    console.error(e);
    throw new Error('encountered error when trying to store user from localstorage');
  }
}

export async function getUser() {
  try {
    const userVal = await AsyncStorage.getItem('@user');
    if (userVal !== null) {
      return userVal;
      // value previously stored, retrieve old username3
    }
    return {};
  } catch (e) {
    console.error(e);
    throw new Error('encountered error when trying to get user from localstorage');
  }
}

export default storeUser;
