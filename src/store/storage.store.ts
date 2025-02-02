import { MMKV } from "react-native-mmkv"
const storage = new MMKV()
export const reduxStorage = {
  getItem: (key: string): Promise<string | undefined> => {
    return Promise.resolve(storage.getString(key))
  },
  setItem: (key: string, value: string): Promise<void> => {
    storage.set(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key)
    return Promise.resolve()
  }
}
