import { writable } from 'svelte/store';

export function createPersistedStore<T>(key: string, initialValue: T, syncTabs = false) {
  const { subscribe, set } = writable<T>(initialValue);
  if (typeof window !== 'undefined') {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue) {
      set(JSON.parse(cachedValue));
    }
    subscribe((updatedValue) => {
      localStorage.setItem(key, JSON.stringify(updatedValue));
    });

    if (syncTabs) {
      window.addEventListener('storage', () => {
        const cachedValue = localStorage.getItem(key);
        if (cachedValue) {
          set(JSON.parse(cachedValue));
        }
      });
    }
  }
  return { subscribe, set };
}