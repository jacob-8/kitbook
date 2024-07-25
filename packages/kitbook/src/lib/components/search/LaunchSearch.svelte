<script lang="ts">
  import { Button } from 'svelte-pieces'

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

  export let onclick: () => void
</script>

<Button
  {onclick}
  form="menu"
  size="sm"
  title="Search ({isMac ? '⌘' : 'Ctrl'} + K)">
  <span class="i-carbon-search text-lg" />
</Button>
