<script>
  // import './global.css'; // you can import needed global styles here or via style tag demoed below
  
  import { setContext } from 'svelte';

  /** @type {import('kitbook').KitbookSettings} */
  const kitbookSettings = {
    title: 'Kitbook',
    description: 'Svelte Component Documentation and Prototyping Workbench built using SvelteKit',
    githubURL: 'https://github.com/jacob-8/kitbook/tree/main/packages/kitbook',
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
