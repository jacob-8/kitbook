import { writable, type Readable } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { decodeParam, encodeParam } from './url-helpers';

export interface QueryParamStore<T> extends Readable<T> {
  set: (value: any) => void;
  remove: () => void;
}

export interface QueryParamStoreOptions<T> {
  key: string;
  replaceState?: boolean;
  startWith?: T;
  log?: boolean;
  persist?: 'localStorage' | 'sessionStorage';
}

export function createQueryParamStore<T>(
  opts: QueryParamStoreOptions<T> = {
    key: 'queryParam',
    replaceState: true,
  }
): QueryParamStore<T> {
  const { key, startWith, log, replaceState, persist } = opts;

  const updateQueryParam = (value: any) => {
    if (typeof window === 'undefined') return; // safety check in case store value is assigned via $: call server side
    if (value === undefined || value === null) return removeQueryParam();
    // from https://github.com/sveltejs/kit/issues/969
    const url = new URL(window.location.href);
    url.searchParams.set(key, encodeParam(value));

    if (replaceState) {
      history.replaceState({}, '', url);
      setStoreValue(value);
    } else {
      goto(url.toString(), { noScroll: true }); // breaks input focus
    }

    log && console.log(`user action changed: ${key} to ${value}`);
  };

  const removeQueryParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);

    if (replaceState) {
      history.replaceState({}, '', url);
      setStoreValue(null);
    } else {
      goto(url.toString(), { noScroll: true }); // breaks input focus
    }

    log && console.log(`user action removed: ${key}`);
  };

  const setStoreValue = (value: string) => {
    const properlyTypedValue = decodeParam(value) as T;
    typeof window !== 'undefined' && localStorage.setItem(key, JSON.stringify(properlyTypedValue));
    log && console.log(`URL set ${key} to ${properlyTypedValue}`);
    set(properlyTypedValue);
  };

  let firstUrlCheck = true;

  const start = () => {
    const _teardown = page.subscribe(({ url: { searchParams } }) => {
      let value = searchParams.get(key);

      // Subsequent URL changes
      if (!firstUrlCheck) return setStoreValue(value);
      firstUrlCheck = false;

      // URL load
      // 1st Priority: query param
      // @ts-ignore
      if (value !== undefined && value !== null && value !== '') return setStoreValue(value);

      // 2nd Priority: local/sessionStorage
      if (typeof window === 'undefined') return;
      if (persist === 'localStorage') {
        value = JSON.parse(localStorage.getItem(key));
        log && console.log(`cached: ${key} is ${value}`);
      }
      if (persist === 'sessionStorage') {
        value = JSON.parse(sessionStorage.getItem(key));
        log && console.log(`cached: ${key} is ${value}`);
      }
      if (value) return updateQueryParam(value);
    });

    // Unsubscribes from page store when query param store is no longer in use
    return () => _teardown();
  };

  // 3rd Priority: startWith won't be overridden if query param nor local/sessionStorage key is set
  const store = writable<T>(startWith, start);
  const { subscribe, set } = store;

  return {
    subscribe,
    set: updateQueryParam,
    remove: removeQueryParam,
  };
}

// const newValues = {}
// for (const key of page.url.searchParams.keys()) {
//   console.log(page.url.searchParams.get(key));
//   newValues[key] = page.url.searchParams.get(key);
//   set(newValues)
// }

// window.addEventListener('popstate', (e) => {
//   console.log(e);
//   const { searchParams } = new URL(window.location.href);
//   console.log(`${searchParams.get(key)}, ${e.state}`);
// });
