import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../config/constants';

export const useLocalStorage = (key, initialValue = null) => {
  const storageKey = STORAGE_KEYS[key] || key;
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${storageKey}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      console.error(`Error removing localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, initialValue]);

  return [storedValue, setValue, removeValue];
};