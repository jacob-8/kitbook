import { writable, type Readable } from 'svelte/store';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { decodeParam, encodeParam } from './url-helpers';

export interface QueryParamStore<T> extends Readable<T> {
  set: (value: any) => void;
  remove: () => void;
}

export function createQueryParamStore<T>(
  opts: {
    key: string;
    replaceState?: boolean;
    startWith?: T;
    log?: boolean;
    persist?: 'localStorage' | 'sessionStorage';
  } = {
    key: 'queryParam',
    replaceState: true,
  }
): QueryParamStore<T> {
  const { key, startWith, log, replaceState, persist } = opts;

  const updateQueryParam = (value: any) => {
    if (!browser) return; // safety check in case store value is assigned via $: call server side
    if (value === undefined || value === null || value === '') return removeQueryParam();
    // from https://github.com/sveltejs/kit/issues/969
    const url = new URL(window.location.href);
    url.searchParams.set(key, encodeParam(value));
    goto(url.toString(), { replaceState, noscroll: true });
    log && console.log(`user action changed: ${key} to ${value}`);
  };

  const removeQueryParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    goto(url.toString(), { replaceState, noscroll: true });
    log && console.log(`user action removed: ${key}`);
  };

  const setStoreValue = (value: T) => {
    browser && localStorage.setItem(key, JSON.stringify(value));
    log && console.log(`URL set ${key} to ${value}`);
    set(value);
  };

  let firstUrlCheck = true;

  const start = () => {
    const _teardown = page.subscribe(({ url: { searchParams } }) => {
      let value = decodeParam(searchParams.get(key)) as unknown as T;

      // Subsequent URL changes
      if (!firstUrlCheck) return setStoreValue(value);
      firstUrlCheck = false;

      // URL load
      // 1st Priority: query param
      // @ts-ignore
      if (value !== undefined && value !== null && value !== '') return setStoreValue(value);

      // 2nd Priority: local/sessionStorage
      if (!browser) return;
      if (persist === 'localStorage') {
        value = JSON.parse(localStorage.getItem(key)) as unknown as T;
        log && console.log(`cached: ${key} is ${value}`);
      }
      if (persist === 'sessionStorage') {
        value = JSON.parse(sessionStorage.getItem(key)) as unknown as T;
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
