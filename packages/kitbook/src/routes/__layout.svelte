<script lang="ts" context="module">
  import { Layout, parseModulesIntoFolders } from '$lib';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const folder = parseModulesIntoFolders(import.meta.glob('./**/*.{md,svx}'));
    console.log({folder});
    return { stuff: { kitbook: { folder } } };
  };
</script>

<Layout title="Kitbook" githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/kitbook">
  <slot />
</Layout>
