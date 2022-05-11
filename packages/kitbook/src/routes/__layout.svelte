<script lang="ts" context="module">
  import { Layout, parseModulesIntoFolders } from '$lib';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const folder = parseModulesIntoFolders(import.meta.glob('./**/*.{md,svx}'));
    return { stuff: { folder } };
  };
</script>

<Layout githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/kitbook#readme">
  <slot />
</Layout>
