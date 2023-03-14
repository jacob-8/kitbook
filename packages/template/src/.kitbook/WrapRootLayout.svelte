<script>
  // import './global.css'; // you can import need global styles here or via style tag demoed below
  import { pagesStore } from 'kitbook';
  import { setContext } from 'svelte';
  setContext('pages-store', pagesStore);

  /** @type {import('kitbook').KitbookSettings} */
  const kitbookSettings = {
    title: 'Kitbook Templates',
    description: 'Svelte Component Documentation and Prototyping Workbench built using SvelteKit',
    githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/template',
    expandTree: true,
  };

  setContext('kitbook-settings', kitbookSettings);
</script>

<slot />

<!-- <style global>
  :root {
    --foo: red;
  }
</style> -->
