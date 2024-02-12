import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save a value
export const saveValue = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Value successfully saved');
  } catch (e) {
    // saving error
    console.error('Failed to save the value to AsyncStorage', e);
  }
};

// Function to load a value
export const loadValue = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error('Failed to fetch the value from AsyncStorage', e);
    return null; // In case of error, return null
  }
};
