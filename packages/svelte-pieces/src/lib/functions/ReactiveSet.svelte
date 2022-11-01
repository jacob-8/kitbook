<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    modified: T[];
  }>();

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

  function update(newSet: T[]) {
    set = new Set(newSet);
  }

  function add(item: T) {
    set.add(item);
    set = set;
    dispatch('modified', Array.from(set));
  }

  function remove(item: T) {
    set.delete(item);
    set = set;
    dispatch('modified', Array.from(set));
  }
</script>

<slot value={$array} {add} {update} {remove} size={set.size} />
