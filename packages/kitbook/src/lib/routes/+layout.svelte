<script>
  import { pagesStore } from 'kitbook';
  import { settings } from 'virtual:kitbook-settings';
  import { setContext } from 'svelte';

  setContext('pages-store', pagesStore);
  setContext('kitbook-settings', settings);
</script>

<slot />
