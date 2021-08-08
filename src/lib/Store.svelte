<script>
  import { writable } from 'svelte/store';
  type T = $$Generic;
  export let startWith: T = undefined;
  let store = writable(startWith || null);
</script>

<slot set={store.set} data={$store} />
