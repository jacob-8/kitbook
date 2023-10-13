<script>
  import './forms.css'
  import { pagesStore } from 'kitbook'
  import { setContext } from 'svelte'

  setContext('pages-store', pagesStore)

  /** @type {import('kitbook').KitbookSettings} */
  const kitbookSettings = {
    title: 'Svelte Pieces',
    description: 'Useful Svelte UI pieces for building web apps',
    githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces',
    expandTree: true,
  }

  setContext('kitbook-settings', kitbookSettings)
</script>

<slot />
