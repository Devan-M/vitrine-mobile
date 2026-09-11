import AsyncStorage from '@react-native-async-storage/async-storage';

export async function logout(): Promise<void> {
    await AsyncStorage.clear();
}