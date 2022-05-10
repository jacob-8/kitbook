<script lang="ts" context="module">
  import { Layout, parseModulesIntoFolders } from '$lib';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    return { stuff: { folder: parseModulesIntoFolders(import.meta.glob('./**/*.{md,svx}')) } };
  };
</script>

<Layout githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/kitbook#readme">
  <slot />
</Layout>
