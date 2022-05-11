<script lang="ts" context="module">
  import { Layout, parseModulesIntoFolders } from 'kitbook';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = ({ url: { pathname } }) => {
    const folder = parseModulesIntoFolders(import.meta.glob('./**/*.{md,svx}'));
    console.log({ pathname });
    return { stuff: { folder } };
  };
</script>

<Layout githubURL="https://github.com/jacob-8/kitbook">
  <slot />
</Layout>
