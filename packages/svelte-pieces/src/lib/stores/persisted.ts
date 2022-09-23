import { writable } from 'svelte/store';

export function createPersistedStore<T>(key: string, initialValue: T, syncTabs = false) {
  if (typeof window === 'undefined') {
    const { subscribe, set } = writable<T>(initialValue);
    return { subscribe, set };
  }

  const getCached = () => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue && cachedValue !== 'undefined') {
      set(JSON.parse(cachedValue));
    }
  };

  const start = () => {
    getCached();
    syncTabs && window.addEventListener('storage', getCached);
    return () => {
      syncTabs && window.removeEventListener('storage', getCached);
    };
  };

  const { subscribe, set } = writable<T>(initialValue, start);

  const setStoreValue = (updatedValue: T) => {
    localStorage.setItem(key, JSON.stringify(updatedValue));
    set(updatedValue);
  };
  
  return { subscribe, set: setStoreValue };
}
