<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { Button } from 'svelte-pieces';
  import SearchModal from './SearchModal.svelte';

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  let searching = false;

  afterNavigate(() => {
    searching = false;
  });
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.code === 'Escape') searching = false;
    if (['k', 'p'].includes(e.key) && (isMac ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      searching = !searching;
    }
  }}
/>

<Button
  onclick={() => (searching = true)}
  form="menu"
  size="sm"
  title="Search ({isMac ? '⌘' : 'Ctrl'} + K)"
>
  <span class="i-carbon-search text-lg" />
</Button>

{#if searching}
  <SearchModal on:close={() => (searching = false)} />
{/if}
