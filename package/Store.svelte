<script>import { writable } from 'svelte/store';
export let startWith = undefined;
let store = writable(startWith || null);
</script>

<slot set={store.set} data={$store} />
