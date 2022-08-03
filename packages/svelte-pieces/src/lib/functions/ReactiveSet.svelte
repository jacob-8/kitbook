<script lang="ts">
  import { readable } from 'svelte/store';
  type T = $$Generic;
  export let input: T[];
  let set: Set<T>;

  $: if (input) {
    update(input);
  } else {
    update([]);
  }

  $: array = readable(Array.from(set) || null);

  function add(item: T) {
    set.add(item);
    set = set;
  }

  function update(newSet: T[]) {
    set = new Set(newSet);
  }

  function remove(item: T) {
    set.delete(item);
    set = set;
  }
</script>

<slot value={$array} {add} {update} {remove} size={set.size} />
