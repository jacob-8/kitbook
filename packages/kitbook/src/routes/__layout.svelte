<script lang="ts" context="module">
  import { Layout } from '$lib';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    const modules = import.meta.glob('./**/*.{md,svx}');
    return { stuff: { kitbook: { modules } } };
  };
</script>

<Layout title="Kitbook" githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/kitbook">
  <slot />
</Layout>
