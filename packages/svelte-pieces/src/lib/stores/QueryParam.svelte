<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { createQueryParamStore } from './queryParam';

  export let key: string;
  export let replaceState = true;
  type T = $$Generic;
  export let startWith: T = undefined;
  export let log = false;
  export let persist: 'localStorage' | 'sessionStorage' = undefined;

  let opts = {
    key,
    replaceState,
    startWith,
    log,
    persist,
  };

  let store = createQueryParamStore<T>(opts);

  const dispatch = createEventDispatcher<{ value: T }>();

  let unsub: Unsubscriber;

  // Props changed
  $: {
    if (typeof window !== 'undefined') {
      opts = {
        key,
        replaceState,
        startWith,
        log,
        persist,
      };
      
      if (unsub) {
        unsub();
        store = createQueryParamStore<T>(opts);
      }

      unsub = store.subscribe((value) => {
        dispatch('value', value);
      });
    }
  }

  onDestroy(() => unsub && unsub());
</script>

<slot value={$store} set={store.set} remove={store.remove} />
