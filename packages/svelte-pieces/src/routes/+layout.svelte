<script lang="ts">
  import { Layout } from 'kitbook';
  import 'virtual:windi.css';
</script>

<Layout
  title="Svelte Pieces"
  githubURL="https://github.com/jacob-8/kitbook/tree/main/packages/svelte-pieces"
>
  <!-- <svelte:fragment slot="index"><span class="i-ic-round-home mr-1" /> Svelte Pieces</svelte:fragment> -->
  <slot />
</Layout>
