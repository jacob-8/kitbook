<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { createQueryParamStore, type QueryParamStoreOptions } from './queryParam';

  export let key: string;
  export let replaceState = true;
  type T = $$Generic;
  export let startWith: T = undefined;
  export let log = false;
  export let persist: 'localStorage' | 'sessionStorage' = undefined;
  export let initializeValue: (value: any) => void = undefined;

  let opts: QueryParamStoreOptions<T> = {
    key,
    replaceState,
    startWith,
    log,
    persist,
  };

  let store = createQueryParamStore<T>(opts);
  if (initializeValue && $store) initializeValue($store);

  const dispatch = createEventDispatcher<{ value: T }>();
  let unsub: Unsubscriber;
  let currentValue: T;

  // Props changed
  $: {
    if (typeof window !== 'undefined') {
      if (unsub) {
        unsub();
        store = createQueryParamStore<T>(
          addStartValue({
            key,
            replaceState,
            log,
            persist,
          })
        );
      }

      unsub = store.subscribe(handleUpdate);
    }
  }

  const addStartValue = (opts: QueryParamStoreOptions<T>) => {
    return { ...opts, startWith: currentValue };
  };

  function handleUpdate(value: T) {
    currentValue = value;
    // @ts-ignore
    dispatch('value', value);
  };

  onDestroy(() => unsub && unsub());
</script>

<slot value={$store} set={store.set} remove={store.remove} />
