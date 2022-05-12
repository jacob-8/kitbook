<script lang="ts" context="module">
  import { Layout } from 'kitbook';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const modules = import.meta.glob('./**/*.{md,svx}');
    return { stuff: { kitbook: { modules, root: '/kitbook' } } };
  };
</script>

<Layout githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/template">
  <slot />
</Layout>
