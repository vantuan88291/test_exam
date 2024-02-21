import { MMKV } from "react-native-mmkv";

export const localStorage = new MMKV();

export const getDataTaskByUsername = (username: string) => {
  const jsonData = localStorage.getString(username);
  if (!jsonData) {
    return [];
  }
  return JSON.parse(jsonData);
};

export const getStorageKey = (key: string) => localStorage.contains(key);

export const getAllStorageKeys = (key: string) => localStorage.getAllKeys();

export const storeValueByKey = (key: string, value: any) =>
  localStorage.set(key, value);
