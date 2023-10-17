<script>
  import { pagesStore } from 'kitbook'
  import { setContext } from 'svelte'

  setContext('pages-store', pagesStore)
</script>

<slot />
