<script lang="ts" context="module">
  import { parseModulesIntoFolders, type Folder } from '$kitbook/sidebar/pages';
  const modules = import.meta.glob('./**/*.{md,svx}');

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    return { props: { folder: parseModulesIntoFolders(modules) } };
  };
</script>

<script lang="ts">
  import Layout from '$kitbook/Layout.svelte';
  import { page } from '$app/stores';
  export let folder: Folder;
</script>

<Layout
  {folder}
  activeURL={$page.url.pathname}
  githubURL="https://github.com/jacob-8/svelte-pieces"
>
  <svelte:fragment slot="index"><span class="i-ic-round-home mr-1" /> Svelte Pieces</svelte:fragment
  >
  <slot />
</Layout>
