<script lang="ts" context="module">
  import { Layout } from 'kitbook';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    const modules = import.meta.glob('./**/*.{md,svx}');
    return { stuff: { kitbook: { modules } } };
  };
</script>

<Layout
  title="Svelte Pieces"
  githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces"
>
  <!-- <svelte:fragment slot="index"><span class="i-ic-round-home mr-1" /> Svelte Pieces</svelte:fragment> -->
  <slot />
</Layout>
