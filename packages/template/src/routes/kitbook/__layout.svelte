<script lang="ts" context="module">
  import { Layout, parseModulesIntoFolders } from 'kitbook';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const folder = parseModulesIntoFolders(import.meta.glob('./**/*.{md,svx}'));
    return { stuff: { kitbook: { folder, root: '/kitbook' } } };
  };
</script>

<Layout githubURL="https://github.com/jacob-8/kitbook">
  <slot />
</Layout>
