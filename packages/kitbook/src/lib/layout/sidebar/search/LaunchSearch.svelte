<script lang="ts">
  import { Button } from 'svelte-pieces'
  import SearchModal from './SearchModal.svelte'
  import { afterNavigate } from '$app/navigation'

  export let kitbookPath: string

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

  let searching = false

  afterNavigate(() => {
    searching = false
  })
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.code === 'Escape')
      searching = false
    if (['k', 'p'].includes(e.key) && (isMac ? e.metaKey : e.ctrlKey)) {
      e.preventDefault()
      searching = !searching
    }
  }} />

<Button
  onclick={() => (searching = true)}
  form="menu"
  size="sm"
  title="Search ({isMac ? '⌘' : 'Ctrl'} + K)">
  <span class="i-carbon-search text-lg" />
</Button>

{#if searching}
  <SearchModal {kitbookPath} on:close={() => (searching = false)} />
{/if}
