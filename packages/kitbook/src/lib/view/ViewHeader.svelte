<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let src: string
  export let hovered = false
  export let width: number
  export let height: number

  const dispatch = createEventDispatcher<{ refresh: void; resetDimensions: void }>()
</script>

<div class="flex items-center absolute z-1 right-0 top--8" class:bg-white={hovered}>
  <button
    type="button"
    title="Reset Dimensions"
    class:opacity-50={hovered}
    class="text-sm p-1 opacity-0 hover:opacity-100"
    on:click={() => dispatch('resetDimensions')}>{width} x {height}</button>

  <a
    href={src}
    title="Open by Itself"
    class:opacity-50={hovered}
    class="px-2 py-1 opacity-0 hover:opacity-100"><span class="i-tabler-external-link align--3px" /></a>

  <button
    type="button"
    title="Refresh Iframe"
    class:opacity-50={hovered}
    class="px-2 py-1 opacity-0 hover:opacity-100"
    on:click={() => dispatch('refresh')}><span class="i-material-symbols-refresh align--3px" /></button>
</div>
